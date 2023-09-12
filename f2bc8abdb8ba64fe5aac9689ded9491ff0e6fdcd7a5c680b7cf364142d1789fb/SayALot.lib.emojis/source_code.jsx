const { isTest, stateUpdate, libCalls, initialEmoji } = props;

const prodAction = "sayALotReaction";
const testAction = `test_${prodAction}`;
const action = isTest ? testAction : prodAction;

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
  const { elementReactedId } = props;
  const allReactions = Social.index(action, elementReactedId, {
    order: "desc",
    subscribe: true,
  });

  console.log("allReactions: ", allReactions);

  // const uniqueAccounts = [];
  let arrayLastReactionForEachUser =
    allReactions &&
    allReactions.filter((obj) => {
      const userLatestInteraction = allReactions.find(
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

function libCall(call) {
  if (call.functionName === "createReaction") {
    return createReaction(call.props);
  } else if (call.functionName === "getReactionsData") {
    return getReactionsData(call.props);
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

return <>{}</>;
