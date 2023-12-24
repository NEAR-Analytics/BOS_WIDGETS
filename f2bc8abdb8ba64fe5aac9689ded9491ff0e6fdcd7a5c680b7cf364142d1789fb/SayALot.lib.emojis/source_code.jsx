const { isTest, stateUpdate, functionsToCallByLibrary, callLibs } = props;
const functionsToCall = functionsToCallByLibrary.emojis;

const prodAction = "sayALotReaction";
const testAction = `test_${prodAction}`;
const action = isTest ? testAction : prodAction;

const authorForWidget =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
//const authorForWidget = "sayalot.near";
// const authorForWidget = "kenrou-it.near";
// const authorForWidget = "silkking.near";
const libSrcArray = [`${authorForWidget}/widget/SayALot.lib.SBT`];
const initialEmoji = "🤍 Like";

State.init({ libCalls: [], libsCalls: { SBT: [] } });

let resultFunctionsToCallByLibrary = Object.assign(
  {},
  functionsToCallByLibrary
);
let resultFunctionsToCall = [];

function libStateUpdate(obj) {
  State.update(obj);
}

function setAreValidUsers(accountIds, sbtsNames) {
  const newLibsCalls = Object.assign({}, state.libsCalls);

  accountIds.forEach((accountId, index) => {
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

// function callLibs(srcArray, stateUpdate, libCalls) {
//   return (
//     <>
//       {srcArray.map((src) => {
//         return (
//           <Widget
//             src={src}
//             props={{
//               isTest,
//               stateUpdate,
//               libCalls,
//             }}
//           />
//         );
//       })}
//     </>
//   );
// }

function canUserReact(props) {
  const { env, accountId, sbtsNames } = props;

  setAreValidUsers([accountId], sbtsNames);

  const result = state[`isValidUser-${accountId}`];

  resultLibCalls = resultLibCalls.filter((call) => {
    const discardCondition =
      call.functionName === "canUserReact" && result !== undefined;
    return !discardCondition;
  });

  return result;
}

function createReaction(props) {
  const { reaction, elementReactedId, onCommit, onCancel } = props;

  saveReaction(reaction, elementReactedId, onCommit, onCancel);

  resultLibCalls = resultLibCalls.filter((call) => {
    return call.functionName !== "createReaction";
  });

  return reaction;
}

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

function saveReaction(reaction, elementReactedId, onCommit, onCancel) {
  if (reaction) {
    const newData = composeReactionData(reaction, elementReactedId);

    Social.set(newData, {
      force: true,
      onCommit,
      onCancel,
    });
  }
}

function getReactionsData(props) {
  // const { elementReactedId, createdReaction } = props;
  const { elementReactedId, articleSbts } = props;
  const allReactions = Social.index(action, elementReactedId, {
    order: "desc",
    subscribe: true,
  });

  let validReactions = allReactions;

  if (articleSbts.length > 0) {
    const validReactionsAuthors = validReactions.map((reaction) => {
      return reaction.accountId;
    });

    setAreValidUsers(validReactionsAuthors, articleSbts);

    const validAuthors = validReactionsAuthors.filter((author) => {
      return state[`isValidUser-${author}`] === true;
    });

    resultLibCalls = resultLibCalls.filter((call) => {
      const discardCondition =
        call.functionName === "getReactions" &&
        state[`isValidUser-${call.props.accountId}`] !== undefined;
      return !discardCondition;
    });

    validReactions = validReactionsAuthors.filter((author) => {
      return validAuthors.includes(author.accountId);
    });
  }

  // const uniqueAccounts = [];
  let arrayLastReactionForEachUser =
    validReactions &&
    validReactions.filter((obj) => {
      const userLatestInteraction = validReactions.find(
        (vote) => vote.accountId === obj.accountId
      );
      return JSON.stringify(userLatestInteraction) === JSON.stringify(obj);
      // if (!uniqueAccounts.includes(obj.accountId)) {
      //   uniqueAccounts.push(obj.accountId);
      //   return true;
      // }
      // return false;
    });

  const userReaction =
    arrayLastReactionForEachUser &&
    arrayLastReactionForEachUser.find((obj) => {
      return obj.accountId === context.accountId;
    });

  // if (userReaction && createdReaction) {
  //   const newArrayOfLastReactions = arrayLastReactionForEachUser
  //     .filter((obj) => {
  //       return obj.accountId !== context.accountId;
  //     })
  //     .push({
  //       accountId: context.accountId,
  //       value: {
  //         type: "md",
  //         reaction: createdReaction,
  //       },
  //     });

  //   arrayLastReactionForEachUser = newArrayOfLastReactions;
  // }

  // ========= GET REACTIONS STATISTICS =========
  function getReactionStats(acc, reactionObj) {
    if (reactionObj.value.reaction === initialEmoji) {
      return acc;
    }

    if (!acc.hasOwnProperty(reactionObj.value.reaction)) {
      acc[reactionObj.value.reaction] = {
        quantity: 0,
        emoji: reactionObj.value.reaction.slice(0, 2),
        text: reactionObj.value.reaction.slice(2),
        accounts: [],
      };
      // acc[reactionObj.value.reaction].quantity = 0;
      // acc[reactionObj.value.reaction].emoji = reactionObj.value.reaction.slice(0, 2);
      // acc[reactionObj.value.reaction].accounts = [];
    }
    acc[reactionObj.value.reaction].quantity += 1;
    acc[reactionObj.value.reaction].accounts = [
      reactionObj.accountId,
      ...acc[reactionObj.value.reaction].accounts,
    ];

    return acc;
  }
  function countReactionsStats(arr) {
    return Object.values(arr.reduce(getReactionStats, {}));
  }

  let reactionsStatistics =
    arrayLastReactionForEachUser &&
    countReactionsStats(arrayLastReactionForEachUser);
  //reactionsStatistics - array of objects {emoji: '😁', quantity: 2, accounts: []}

  // if (reactionsStatistics !== null) {
  //   resultLibCalls = resultLibCalls.filter((call) => {
  //     return call.functionName !== "getReactionsData";
  //   });
  // }

  return { reactionsStatistics, userReaction };
}

function callFunction(call) {
  if (call.functionName === "createReaction") {
    return createReaction(call.props);
  } else if (call.functionName === "getReactionsData") {
    return getReactionsData(call.props);
  } else if (call.functionName === "canUserReact") {
    return canUserReact(call.props);
  }
}

if (functionsToCall && functionsToCall.length > 0) {
  const updateObj = Object.assign({}, functionsToCallByLibrary);
  resultFunctionsToCall = [...functionsToCall];
  functionsToCall.forEach((call) => {
    updateObj[call.key] = callFunction(call);
  });

  resultFunctionsToCallByLibrary.article = resultFunctionsToCall;
  updateObj.functionsToCallByLibrary = resultFunctionsToCallByLibrary;
  stateUpdate(updateObj);
}

return (
  <>
    {libSrcArray.map((src) => {
      return callLibs(src, libStateUpdate, state.libsCalls, "lib.emojis");
    })}
  </>
);
