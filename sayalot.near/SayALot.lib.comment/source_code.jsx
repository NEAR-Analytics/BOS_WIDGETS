const { isTest, stateUpdate, libCalls } = props;

const prodAction = "sayALotComment-v0.0.2";
const testAction = `test_${prodAction}`;
const action = isTest ? testAction : prodAction;

// const authorForWidget =
//   "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
const authorForWidget = "sayalot.near";
// const authorForWidget = "kenrou-it.near";
// const authorForWidget = "silkking.near";
const libSrcArray = [`${authorForWidget}/widget/SayALot.lib.SBT`];

State.init({ libCalls: [] });

function libStateUpdate(obj) {
  State.update(obj);
}

function setAreValidUsers(accountIds, sbtsNames) {
  const newLibCalls = [...state.libCalls];
  accountIds.forEach((accountId) => {
    const isCallPushed =
      newLibCalls.find((libCall) => {
        return (
          libCall.functionName === "isValidUser" &&
          libCall.props.accountId === accountId
        );
      }) !== undefined;
    const isCallReturned = state[`isValidUser-${accountId}`] !== undefined;

    if (isCallPushed || isCallReturned) {
      return;
    }

    newLibCalls.push({
      functionName: "isValidUser",
      key: `isValidUser-${accountId}`,
      props: {
        accountId,
        sbtsNames,
      },
    });
  });
  State.update({ libCalls: newLibCalls });
}

function callLibs(srcArray, stateUpdate, libCalls) {
  return (
    <>
      {srcArray.map((src) => {
        return (
          <Widget
            src={src}
            props={{
              isTest,
              stateUpdate,
              libCalls,
            }}
          />
        );
      })}
    </>
  );
}

function canUserCreateComment(props) {
  const { accountId, sbtsNames } = props;
  setAreValidUsers([accountId], sbtsNames);

  const result = state[`isValidUser-${accountId}`];

  resultLibCalls = resultLibCalls.filter((call) => {
    const discardCondition =
      call.functionName === "canUserCreateComment" && result !== undefined;
    return !discardCondition;
  });

  return result;
}

function createComment(props) {
  const { comment, onClick, onCommit, onCancel } = props;

  onClick();

  saveComment(comment, onCommit, onCancel);

  resultLibCalls = resultLibCalls.filter((call) => {
    return call.functionName !== "createComment";
  });

  return comment;
}

function composeCommentData(comment) {
  const data = {
    index: {
      [action]: JSON.stringify({
        key: comment.id,
        value: {
          type: "md",
          comment,
        },
      }),
    },
  };

  return data;
}

function saveComment(comment, onCommit, onCancel) {
  if (comment.text) {
    const newData = composeCommentData(comment);
    Social.set(newData, {
      force: true,
      onCommit,
      onCancel,
    });
  }
}

function getComments(id) {
  return Social.index(action, id, {
    order: "desc",
    subscribe: true,
  });
}

function getCommentBlackListByBlockHeight() {
  return [98588599];
}

function filterInvalidArticlesIndexes(commentIndexes) {
  return commentIndexes.filter(
    (commentIndexes) =>
      commentIndexes.blockHeight &&
      !getCommentBlackListByBlockHeight().includes(commentIndexes.blockHeight) // Comment is not in blacklist
  );
}

function getValidComments(props) {
  const { id, articleSbts } = props;
  const commentIndexes = getComments(id);
  const blacklistFilteredComments = commentIndexes
    ? filterInvalidArticlesIndexes(commentIndexes)
    : [];

  let finalComments = blacklistFilteredComments;
  if (articleSbts.length > 0) {
    // We assume there will only be just one articleSbt
    const articleSbt = articleSbts[0];

    const blacklistFilteredCommentsAuthors = blacklistFilteredComments.map(
      (comment) => {
        return comment.accountId;
      }
    );

    setAreValidUsers(blacklistFilteredCommentsAuthors, articleSbts);

    const validAuthors = blacklistFilteredCommentsAuthors.filter((author) => {
      return state[`isValidUser-${author}`][articleSbt];
    });

    resultLibCalls = resultLibCalls.filter((call) => {
      const discardCondition =
        call.functionName === "getValidComments" &&
        state[`isValidUser-${call.props.accountId}`] !== undefined;
      return !discardCondition;
    });
    finalComments = blacklistFilteredComments.filter((comment) => {
      return validAuthors.includes(comment.accountId);
    });
  }
  return finalComments;
}

function libCall(call) {
  if (call.functionName === "createComment") {
    return createComment(call.props);
  } else if (call.functionName === "getValidComments") {
    return getValidComments(call.props);
  } else if (call.functionName === "canUserCreateComment") {
    return canUserCreateComment(call.props);
  }
}

let resultLibCalls = [];
if (libCalls && libCalls.length > 0) {
  // console.log(
  //   "Calling functions",
  //   libCalls.map((lc) => lc.functionName)
  // );
  const updateObj = {};
  resultLibCalls = [...libCalls];
  libCalls.forEach((call) => {
    updateObj[call.key] = libCall(call);
  });

  updateObj.libCalls = resultLibCalls;
  stateUpdate(updateObj);
}

return <>{callLibs(libSrcArray, libStateUpdate, state.libCalls)}</>;
