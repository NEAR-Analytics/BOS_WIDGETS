const { isTest, stateUpdate, libCalls } = props;

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
          type: "md",
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
  const { elementReactedId, createdReaction } = props;

  const allReactions = Social.index(action, elementReactedId, {
    order: "desc",
  });

  if (allReactions) {
  }

  const uniqueAccounts = [];
  const arrayLastReactionForEachUser =
    allReactions &&
    allReactions.filter((obj) => {
      if (!uniqueAccounts.includes(obj.accountId)) {
        uniqueAccounts.push(obj.accountId);
        return true;
      }
      return false;
    });

  const userReaction =
    arrayLastReactionForEachUser &&
    arrayLastReactionForEachUser.find((obj) => {
      return obj.accountId === accountThatIsLoggedIn;
    });

  // ========= GET REACTIONS STATISTICS =========
  function getReactionStats(acc, reactionObj) {
    if (reactionObj.value.type === initialEmoji) {
      return acc;
    }
    if (!acc.hasOwnProperty(reactionObj.value.type)) {
      acc[reactionObj.value.type] = {
        quantity: 0,
        emoji: reactionObj.value.type.slice(0, 2),
        text: reactionObj.value.type.slice(2),
        accounts: [],
      };
      // acc[reactionObj.value.type].quantity = 0;
      // acc[reactionObj.value.type].emoji = reactionObj.value.type.slice(0, 2);
      // acc[reactionObj.value.type].accounts = [];
    }
    acc[reactionObj.value.type].quantity += 1;
    acc[reactionObj.value.type].accounts = [
      reactionObj.accountId,
      ...acc[reactionObj.value.type].accounts,
    ];

    return acc;
  }
  function countReactionsStats(arr) {
    Object.values(arr.reduce(getReactionStats, {}));
  }
  let reactionsStatistics =
    arrayLastReactionForEachUser &&
    countReactionsStats(arrayLastReactionForEachUser);
  //reactionsStatistics - array of objects {emoji: '😁', quantity: 2, accounts: []}

  return { reactionsStatistics, userReaction };
}

function libCall(call) {
  if (call.functionName === "createReaction") {
    return createReaction(call.props);
  } else if (call.functionName === "getReactionsData") {
    return getReactionsData(props);
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
