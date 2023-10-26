// lib.comment
const {
  isTest,
  stateUpdate,
  functionsToCallByLibrary,
  callLibs,
  baseAction,
  widgets,
} = props;
const libName = "comment"; // EDIT: set lib name
const functionsToCall = functionsToCallByLibrary[libName];

let resultFunctionsToCallByLibrary = Object.assign(
  {},
  functionsToCallByLibrary
);
let resultFunctionsToCall = [];

const currentVersion = "0.0.2"; // EDIT: Set version

const prodAction = `${baseAction}_v${currentVersion}`; // TODO consider versions
// const prodAction = `${baseAction}`;
const testAction = `test_${prodAction}`;
const action = isTest ? testAction : prodAction;

// START LIB CALLS SECTION
// interface FunctionCall {
//     functionName: string,
//     key: string, // The state of the caller will be updated with this string as a key
//     props: Record<string, any> // function parameters as object
// }

// type LibsCalls = Record<string, FunctionCall> // Key is lib name after lib.

const libSrcArray = [widgets.libSBT]; // string to lib widget // EDIT: set libs to call

const libsCalls = {};
libSrcArray.forEach((libSrc) => {
  const libName = libSrc.split("lib.")[1];
  libsCalls[libName] = [];
});

State.init({
  libsCalls, // is a LibsCalls object
});
// END LIB CALLS SECTION

function log(message) {
  console.log(`lib.${libName}`, message);
}

function logError(message) {
  console.error(`lib.${libName}`, message);
}

function libStateUpdate(obj) {
  State.update(obj);
}

// START LIB FUNCTIONS: EDIT set functions you need

function canUserCreateComment(props) {
  const { accountId, sbtsNames } = props;

  setAreValidUsers([accountId], sbtsNames);
  const result =
    state[`isValidUser-${accountId}`]; /* || sbtsNames.includes("public")*/

  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
    const discardCondition =
      call.functionName === "canUserCreateComment" && result !== undefined;
    return !discardCondition;
  });

  return result;
}

function setAreValidUsers(accountIds, sbtsNames) {
  const newLibCalls = Object.assign({}, state.libsCalls);

  if (newLibsCalls && !newLibsCalls.SBT) {
    logError("Key SBT is not set in lib.", libName);
  }

  accountIds.forEach((accountId) => {
    const isCallPushed =
      newLibCalls.SBT.find((libCall) => {
        return (
          libCall.functionName === "isValidUser" &&
          libCall.props.accountId === accountId
        );
      }) !== undefined;
    const isCallReturned = state[`isValidUser-${accountId}`] !== undefined;

    if (isCallPushed || isCallReturned) {
      return;
    }

    newLibCalls.SBT.push({
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

function createComment(props) {
  const { comment, onClick, onCommit, onCancel } = props;

  onClick();

  saveComment(comment, onCommit, onCancel);

  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
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

function getComments(action, id, subscribe) {
  return Social.index(action, id, {
    order: "desc",
    subscribe,
  });
}

function getCommentBlackListByBlockHeight() {
  return [98588599];
}

function filterInvalidComments(comments) {
  return comments.filter(
    (comment) =>
      comment.blockHeight &&
      !getCommentBlackListByBlockHeight().includes(comment.blockHeight) // Comment is not in blacklist
  );
}

function getValidComments(props) {
  const { env, articleSbts, id } = props;
  // Call other libs
  const normComments = getCommentsNormalized(env, id);

  // const blacklistFilteredComments = commentIndexes
  //   ? filterInvalidCommentsIndexes(commentIndexes)
  //   : [];

  const commentsAuthors = normComments.map((comment) => {
    return comment.accountId;
  });

  setAreValidUsers(commentsAuthors, articleSbts);

  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
    const discardCondition =
      call.functionName === "getValidComments" &&
      state[`isValidUser-${call.props.accountId}`] !== undefined;
    return !discardCondition;
  });

  const finalComments = filterValidComments(normComments, articleSbts);

  // if (articleSbts.length > 0) {
  // We assume there will only be just one articleSbt
  // const articleSbt = articleSbts[0];

  // const blacklistFilteredCommentsAuthors = blacklistFilteredComments.map(
  //   (comment) => {
  //     return comment.accountId;
  //   }
  // );

  // setAreValidUsers(blacklistFilteredCommentsAuthors, articleSbts);

  // const validAuthors = blacklistFilteredCommentsAuthors.filter((author) => {
  //   return state[`isValidUser-${author}`][articleSbt];
  // });

  // resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
  //   const discardCondition =
  //     call.functionName === "getValidComments" &&
  //     state[`isValidUser-${call.props.accountId}`] !== undefined;
  //   return !discardCondition;
  // });
  // finalComments = blacklistFilteredComments.filter((comment) => {
  //   return validAuthors.includes(comment.accountId);
  // });
  // }
  return finalComments;
}

function filterValidator(comments, articleSbts) {
  return comments.filter((comment) => {
    return (
      articleSbts.find((sbt) => {
        return (
          state[`isValidUser-${comment.accountId}`][sbt] ||
          commentSbt === "public"
        );
      }) !== undefined
    );
  });
}

function filterValidComments(comments, articleSbts) {
  let filteredComments = filterValidator(
    filteredComments ?? comments,
    articleSbts
  );

  return filteredComments;
}

function getCommentsNormalized(env, id) {
  const commentsByVersion = Object.keys(versions).map((version, index, arr) => {
    const action = versions[version].action;
    const subscribe = index + 1 === arr.length;

    const comments = getComments(action, id, subscribe);
    if (!comments) return [];

    const validComments = filterInvalidComments(comments);

    return validComments;
  });

  return normalizeLibData(commentsByVersion);
}

function normalizeOldToV_0_0_1(comment) {
  return comment;
}

function normalizeFromV0_0_1ToV0_0_2(comment) {
  return comment;
}

function normalizeFromV0_0_2ToV0_0_3(comment) {
  return comment;
}
// END LIB FUNCTIONS

// EDIT: set functions you want to export
function callFunction(call) {
  if (call.functionName === "createComment") {
    return createComment(call.props);
  } else if (call.functionName === "getValidComments") {
    return getValidComments(call.props);
  } else if (call.functionName === "canUserCreateComment") {
    return canUserCreateComment(call.props);
  }
}

// EDIT: set versions you want to handle, considering their action to Social.index and the way to transform to one version to another (normalization)
const versions = {
  old: {
    normalizationFunction: normalizeOldToV_0_0_1,
    action: props.isTest ? `test_${baseAction}` : baseAction,
  },
  "v1.0.1": {
    normalizationFunction: normalizeFromV0_0_1ToV0_0_2,
    action: props.isTest ? `test_${baseAction}-v1.0.1` : `${baseAction}-v1.0.1`,
  },
  "v0.0.2": {
    normalizationFunction: normalizeFromV0_0_2ToV0_0_3,
    action: props.isTest ? `test_${baseAction}_v0.0.2` : `${baseAction}_v0.0.2`,
  },
};

function normalizeLibData(libDataByVersion) {
  let libData;

  Object.keys(versions).forEach((version, index, array) => {
    const normFn = versions[version].normalizationFunction;
    const normLibData = libDataByVersion[index].map((libData, i) => {
      return normFn(libData);
    });

    if (index + 1 === array.length) {
      // Last index
      libData = normLibData;
      return;
    }
    libDataByVersion[index + 1] =
      libDataByVersion[index + 1].concat(normLibData);
  });

  return libData;
}

if (functionsToCall && functionsToCall.length > 0) {
  const updateObj = Object.assign({}, functionsToCallByLibrary);
  resultFunctionsToCall = [...functionsToCall];
  functionsToCall.forEach((call) => {
    updateObj[call.key] = callFunction(call);
  });

  resultFunctionsToCallByLibrary[libName] = resultFunctionsToCall;
  updateObj.functionsToCallByLibrary = resultFunctionsToCallByLibrary;
  stateUpdate(updateObj);
}

// function callLibs(
//   src,
//   stateUpdate,
//   functionsToCallByLibrary,
//   extraProps,
//   callerWidget
// ) {
//   return (
//     <Widget
//       src={src}
//       props={{
//         isTest,
//         stateUpdate,
//         functionsToCallByLibrary,
//         callLibs,
//         widgets,
//         ...extraProps,
//       }}
//     />
//   );
// }

return (
  <>
    {libSrcArray.map((src) => {
      return callLibs(
        src,
        libStateUpdate,
        state.libsCalls,
        {},
        `lib.${libName}`
      );
    })}
  </>
);
