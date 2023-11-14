// lib.upVotes

const {
  mainStateUpdate,
  isTest,
  stateUpdate,
  functionsToCallByLibrary,
  callLibs,
  baseAction,
  widgets,
  usersSBTs,
} = props;

const libName = "upVotes"; // EDIT: set lib name
const functionsToCall = functionsToCallByLibrary[libName];

let resultFunctionsToCallByLibrary = Object.assign(
  {},
  functionsToCallByLibrary
);
let resultFunctionsToCall = [];

const currentVersion = "0.0.2"; // EDIT: Set version

const prodAction = `${baseAction}_v${currentVersion}`;
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

const otherFunctionsToCallByLibrary = {};
libSrcArray.forEach((libSrc) => {
  const libName = libSrc.split("lib.")[1];
  otherFunctionsToCallByLibrary[libName] = [];
});

State.init({
  functionsToCallByLibrary: otherFunctionsToCallByLibrary, // is a LibsCalls object
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
function canUserUpVote(props) {
  const { env, accountId, sbtsNames } = props;

  setAreValidUsers([accountId], sbtsNames);
  const result = state[`isValidUser-${accountId}`];

  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
    const discardCondition =
      call.functionName === "canUserUpVote" && result !== undefined;
    return !discardCondition;
  });

  return result;
}

function setAreValidUsers(accountIds, sbtsNames) {
  const newLibsCalls = Object.assign({}, state.functionsToCallByLibrary);
  if (!newLibsCalls.SBT) {
    logError("Key SBT is not set in lib.", libName);
  }

  accountIds.forEach((accountId) => {
    const isCallPushed =
      newLibsCalls.SBT.find((libCall) => {
        return (
          libCall.functionName === "isValidUser" &&
          libCall.props.accountId === accountId
        );
      }) !== undefined;
    const isCallReturned = state[`isValidUser-${accountId}`] !== undefined;

    if (isCallPushed || isCallReturned) {
      return;
    }

    const existingUserSBTs = usersSBTs.find(
      (userSBTs) => userSBTs.user === accountId
    );

    if (!existingUserSBTs) {
      newLibsCalls.SBT.push({
        functionName: "isValidUser",
        key: `isValidUser-${accountId}`,
        props: {
          accountId,
          sbtsNames,
        },
      });
    }
  });
  State.update({ functionsToCallByLibrary: newLibsCalls });
}

function addVote(props) {
  const { id, articleSbts } = props;
  saveUpVote(id, articleSbts);

  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
    return call.functionName !== "addVote";
  });

  // return upVote;
}

function deleteVote(props) {
  const { id, upVoteId } = props;

  saveDeleteVote(id, upVoteId);
  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
    return call.functionName !== "deleteVote";
  });
}

const saveDeleteVote = (id, upVoteId, onCommit, onCancel) => {
  if (id && upVoteId) {
    const newData = composeDeleteUpVoteData(id, upVoteId);

    Social.set(newData, {
      force: true,
      onCommit,
      onCancel,
    });
  } else {
    logError("delete upVote props are wrong");
  }
};

function composeDeleteUpVoteData(id, upVoteId) {
  const data = {
    index: {
      [action]: JSON.stringify({
        key: id,
        value: {
          isDelete: true,
          upVoteId,
        },
      }),
    },
  };

  return data;
}

const saveUpVote = (id, articleSbts, onCommit, onCancel) => {
  if (id) {
    const newData = composeUpVoteData(id, articleSbts);

    Social.set(newData, {
      force: true,
      onCommit,
      onCancel,
    });
  } else {
    logError("upVote id is missing");
  }
};

function composeUpVoteData(id, articleSbts) {
  const data = {
    index: {
      [action]: JSON.stringify({
        key: id,
        value: {
          upVoteId: `uv-${context.accountId}-${Date.now()}`,
          sbts: articleSbts,
        },
      }),
    },
  };

  return data;
}

function getUpVoteBlackListByBlockHeight() {
  return [];
}

function getUpVotesData(action, id, subscribe) {
  return Social.index(action, id, {
    order: "desc",
    subscribe,
  });
}

function getupVotesNormalized(id) {
  const upVotesByVersion = Object.keys(versions).map((version, index, arr) => {
    const action = versions[version].action;
    const subscribe = index + 1 === arr.length;
    const allUpVotes = getUpVotesData(action, id, subscribe);
    if (!allUpVotes) return undefined;

    const validUpVotes = filterInvalidUpVotes(env, allUpVotes);
    const latestEdits = getLatestEdits(validUpVotes);

    const nonDeletedVotes = latestEdits.filter((vote) => {
      return !vote.value.isDelete;
    });
    return nonDeletedVotes;
  });
  if (upVotesByVersion.includes(undefined)) return undefined;

  return normalizeLibData(upVotesByVersion);
}

function getLatestEdits(upVotes) {
  return upVotes.filter((obj) => {
    const userLatestInteraction = upVotes.find(
      (vote) => vote.accountId === obj.accountId
    );
    return JSON.stringify(userLatestInteraction) === JSON.stringify(obj);
  });
}

function filterInvalidUpVotes(env, upVotes) {
  return upVotes
    .filter((upVote) => upVote.value.upVoteId) // Has id
    .filter(
      (upVote) =>
        !getUpVoteBlackListByBlockHeight().includes(upVote.blockHeight) // Blockheight is not in blacklist
    );
}

function getUpVotes(props) {
  const { sbtsNames: articleSbts, id } = props;
  // Call other libs
  const normUpVotes = getupVotesNormalized(id);
  if (!normUpVotes) return undefined;

  const lastUpVotesAuthors = normUpVotes.map((upVote) => {
    return upVote.accountId;
  });
  setAreValidUsers(lastUpVotesAuthors, articleSbts);

  lastUpVotesAuthors.forEach((accountId) => {
    resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
      const discardCondition =
        call.functionName === "getUpVotes" &&
        state[`isValidUser-${accountId}`] !== undefined;
      return !discardCondition;
    });
  });

  const finalUpVotes = filterValidUpVotes(normUpVotes, articleSbts);
  const finalUpVotesMapped = {};

  articleSbts.forEach((sbt) => {
    finalUpVotesMapped[sbt] = finalUpVotes;
  });

  return finalUpVotesMapped;
}

function filterValidator(upVotes, articleSbts) {
  return upVotes.filter((upVote) => {
    return (
      articleSbts.find((sbt) => {
        return (
          state[`isValidUser-${upVote.accountId}`][sbt] || sbt === "public"
        );
      }) !== undefined
    );
  });
}

function filterValidUpVotes(upVotes, articleSbts) {
  let filteredUpVotes = filterValidator(
    filteredUpVotes ?? upVotes,
    articleSbts
  );

  return filteredUpVotes;
}

// END LIB FUNCTIONS

// EDIT: set functions you want to export
function callFunction(call) {
  if (call.functionName === "canUserUpVote") {
    return canUserUpVote(call.props);
  } else if (call.functionName === "addVote") {
    return addVote(call.props);
  } else if (call.functionName === "deleteVote") {
    return deleteVote(call.props);
  } else if (call.functionName === "getUpVotes") {
    return getUpVotes(call.props);
  }
}

// EDIT: set versions you want to handle, considering their action to Social.index and the way to transform to one version to another (normalization)
function normalizeOldToV_0_0_1(upVote) {
  return upVote;
}

function normalizeFromV0_0_1ToV0_0_2(upVote) {
  upVote.sbts = ["public"];
  return upVote;
}

function normalizeFromV0_0_2ToV0_0_3(upVote) {
  return upVote;
}

const versions = {
  old: {
    normalizationFunction: normalizeOldToV_0_0_1,
    action: props.isTest ? `test_${baseAction}` : baseAction,
  },
  "v0.0.1": {
    normalizationFunction: normalizeFromV0_0_1ToV0_0_2,
    action: props.isTest ? `test_${baseAction}-v0.0.1` : `${baseAction}-v0.0.1`,
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

  const oldUsersSBTs = usersSBTs;
  // {
  //   user: string,
  //   credentials: {},
  // }

  const newUsersSBTs = Object.keys(state).map((key) => {
    if (key.includes("isValidUser-")) {
      if (state[key] !== undefined) {
        const user = key.split("isValidUser-")[1];
        const credentials = state[key];

        const oldUsers = oldUsersSBTs.map((userSbts) => userSbts.user);

        if (!oldUsers.includes(user)) {
          return {
            user,
            credentials,
          };
        }
      }
    }
  });

  const finalUsersSBTs = [...oldUsersSBTs, ...newUsersSBTs].filter(
    (userSBTs) => userSBTs !== undefined
  );

  if (finalUsersSBTs[0]) {
    mainStateUpdate({ usersSBTs: finalUsersSBTs });
  }

  stateUpdate(updateObj);
}

return (
  <>
    {libSrcArray.map((src) => {
      return callLibs(
        src,
        libStateUpdate,
        state.functionsToCallByLibrary,
        {},
        `lib.${libName}`
      );
    })}
  </>
);
