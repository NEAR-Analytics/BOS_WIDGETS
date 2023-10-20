const {
  isTest,
  stateUpdate,
  functionsToCallByLibrary,
  /*callLibs,*/
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

// const prodAction = `${baseAction}_v${currentVersion}`; // TODO consider versions
const prodAction = `${baseAction}`;
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
function setAreValidUsers(accountIds, sbtsNames) {
  const newLibCalls = Object.assign({}, state.libsCalls);
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

function canUserCreateComment(props) {
  const { accountId, sbtsNames } = props;
  setAreValidUsers([accountId], sbtsNames);

  const result = state[`isValidUser-${accountId}`];

  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
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

    resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
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
    action: baseAction,
  },
  "v0.0.1": {
    normalizationFunction: normalizeFromV0_0_1ToV0_0_2,
    action: `${baseAction}_v0.0.1`,
  },
  "v0.0.2": {
    normalizationFunction: normalizeFromV0_0_2ToV0_0_3,
    action: `${baseAction}_v0.0.2`,
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

const a = getValidComments({
  id: "",
  articleSbts: ["public"],
});

function callLibs(
  src,
  stateUpdate,
  functionsToCallByLibrary,
  extraProps,
  callerWidget
) {
  // if (callerWidget === "All articles list") {
  // console.log(
  //   -1,
  //   `Call libs props ${callerWidget}: `,
  //   src,
  //   functionsToCallByLibrary,
  //   callLibs
  // );
  // }

  return (
    <Widget
      src={src}
      props={{
        isTest,
        stateUpdate,
        functionsToCallByLibrary,
        callLibs,
        widgets,
        ...extraProps,
      }}
    />
  );
}
log(a);

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
