const {
  isTest,
  stateUpdate,
  functionsToCallByLibrary,
  // callLibs,
  baseAction,
  widgets,
} = props;

const libName = "emojis"; // EDIT: set lib name
const functionsToCall = functionsToCallByLibrary[libName];

let resultFunctionsToCallByLibrary = Object.assign(
  {},
  functionsToCallByLibrary
);
let resultFunctionsToCall = [];

// const currentVersion = ""; // EDIT: Set version

// const prodAction = `${baseAction}_v${currentVersion}`;
const prodAction = `${baseAction}`; //NOTE: consider use versions
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
function canUserReact(props) {
  const { env, accountId, sbtsNames } = props;

  setAreValidUsers([accountId], sbtsNames);
  const result = state[`isValidUser-${accountId}`];

  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
    const discardCondition =
      call.functionName === "canUserReact" && result !== undefined;
    return !discardCondition;
  });

  return result;
}

function setAreValidUsers(accountIds, sbtsNames) {
  const newLibsCalls = Object.assign({}, state.libsCalls);
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

    newLibsCalls.SBT.push({
      functionName: "isValidUser",
      key: `isValidUser-${accountId}`,
      props: {
        accountId,
        sbtsNames,
      },
    });
  });
  State.update({ libsCalls: newLibsCalls });
}

function createEmoji(props) {
  const { reaction, elementReactedId, onCommit, onCancel } = props;

  saveHandler(reaction, elementReactedId, onCommit, onCancel);

  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
    return call.functionName !== "createEmoji";
  });

  return reaction;
}

const saveHandler = (reaction, elementReactedId, onCommit, onCancel) => {
  if (reaction) {
    const newData = composeReactionData(reaction, elementReactedId);

    Social.set(newData, {
      force: true,
      onCommit,
      onCancel,
    });
  } else {
    logError("Reaction is missing");
  }
};

function composeReactionData(reaction, elementReactedId) {
  const data = {
    index: {
      [action]: JSON.stringify({
        key: elementReactedId,
        value: {
          reactionId: `r-${context.accountId}-${Date.now()}`,
          reaction,
        },
      }),
    },
  };

  return data;
}

function getReactionBlackListByBlockHeight() {
  return [];
}

function getReactions(action, elementReactedId) {
  return Social.index(action, elementReactedId, {
    order: "desc",
    subscribe: true,
  });
}

function getEmojisNormalized(env, elementReactedId) {
  const emojisByVersion = Object.keys(versions).map((version) => {
    const action = versions[version].action;

    const allReactions = getReactions(action, elementReactedId);

    const validReactions = filterInvalidReactions(env, allReactions);

    return getLatestEdits(validReactions);
  });

  return normalizeLibData(emojisByVersion);
}

function getLatestEdits(reactions) {
  return reactions.filter((obj) => {
    const userLatestInteraction = reactions.find(
      (vote) => vote.accountId === obj.accountId
    );
    return JSON.stringify(userLatestInteraction) === JSON.stringify(obj);
  });
}

function filterInvalidReactions(env, reactions) {
  return reactions
    .filter((reaction) => reaction.value.reactionId) // Has id
    .filter(
      (reaction) =>
        !getReactionBlackListByBlockHeight().includes(reaction.blockHeight) // Blockheight is not in blacklist
    );
}

function getEmojis(props) {
  const { env, sbtsNames, elementReactedId } = props;
  // Call other libs
  const normReations = getEmojisNormalized(env, elementReactedId);

  // Keep last edit from every reaction
  const lastReactions = normReations.filter((reaction) => {
    return normReations.find(
      (compReaction) =>
        JSON.stringify(compReaction) === JSON.stringify(reaction)
    );
  });

  const lastReactionsAuthors = lastReactions.map((reaction) => {
    return reaction.accountId;
  });

  setAreValidUsers(lastReactionsAuthors, sbtsNames);

  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
    const discardCondition =
      call.functionName === "getEmojis" &&
      state[`isValidUser-${call.props.accountId}`] !== undefined;
    return !discardCondition;
  });

  const finalReactions = filterValidEmojis(lastReactions);
  const finalEmojisMapped = {};
  sbtsNames.forEach((sbtName) => {
    const sbtEmojis = finalReactions.filter((reaction) => {
      if (!reaction.sbts) return false;
      return reaction.sbts.indexOf(sbtName) !== -1;
    });
    finalEmojisMapped[sbtName] = sbtEmojis;
  });

  return finalEmojisMapped;
}

function filterValidator(emojis) {
  return emojis.filter((emoji) => {
    return (
      emoji.sbts.find((emojiSBT) => {
        return (
          state[`isValidUser-${emoji.accountId}`][emojiSBT] ||
          emojiSBT === "public"
        );
      }) !== undefined
    );
  });
}

function filterValidEmojis(emojis) {
  let filteredEmojis = filterValidator(filteredEmojis ?? emojis);

  return filteredEmojis;
}

function normalizeOld(reaction) {
  reaction.sbts = ["public"];

  return reaction;
}

// END LIB FUNCTIONS

// EDIT: set functions you want to export
function callFunction(call) {
  if (call.functionName === "canUserReact") {
    return canUserReact(call.props);
  } else if (call.functionName === "createEmoji") {
    return createEmoji(call.props);
  } else if (call.functionName === "getEmojis") {
    return getEmojis(call.props);
  }
}

// EDIT: set versions you want to handle, considering their action to Social.index and the way to transform to one version to another (normalization)
const versions = {
  old: {
    normalizationFunction: normalizeOld,
    action: props.isTest ? `test_${baseAction}` : baseAction,
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

function callLibs(
  src,
  stateUpdate,
  functionsToCallByLibrary,
  extraProps,
  callerWidget
) {
  // if (callerWidget === "lib.emojis") {
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

// const a = getEmojis({
//   env: undefined,
//   sbtsNames: [
//     "fractal.i-am-human.near - class 1",
//     "community.i-am-human.near - class 1",
//     "community.i-am-human.near - class 2",
//     "community.i-am-human.near - class 3",
//     "public",
//   ],
//   elementReactedId: "silkking.near-1696976701328",
// });

// console.log(a);

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
