const { isTest, stateUpdate, libCalls } = props;

const prodAction = "sayALotReaction";
const testAction = `test_${prodAction}`;
const action = isTest ? testAction : prodAction;

function createReaction(props) {
  const { reaction, onCommit, onCancel } = props;

  saveReaction(reaction, onCommit, onCancel);

  resultLibCalls = resultLibCalls.filter((call) => {
    return call.functionName !== "createReaction";
  });

  return reaction;
}

function composeReactionData(reaction) {
  console.log("composeDataReaction: ", reaction);
  const data = {
    index: {
      [action]: JSON.stringify({
        key: reaction.realArticleId,
        value: {
          type: "md",
          reaction,
        },
      }),
    },
  };

  return data;
}

function saveReaction(reaction, onCommit, onCancel) {
  if (reaction.emoji) {
    const newData = composeReactionData(reaction);

    Social.set(newData, {
      force: true,
      onCommit,
      onCancel,
    });
  }
}

function getReactionsData(props) {
  const { realArticleId } = props;

  const allReactions = Social.index(action, realArticleId, {
    order: "desc",
  });
  const userReaction = allReactions.find((obj) => {
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
    console.log("running createReaction");
    return createReaction(call.props);
  } else if (call.functionName === "getReactionsData") {
    return getReactionsData(props);
  }
}

let resultLibCalls = [];
if (libCalls && libCalls.length > 0) {
  console.log(
    "Calling functions",
    libCalls.map((lc) => lc.functionName)
  );
  const updateObj = {};
  resultLibCalls = [...libCalls];
  libCalls.forEach((call) => {
    updateObj[call.key] = libCall(call);
  });

  updateObj.libCalls = resultLibCalls;
  stateUpdate(updateObj);
}

return <>{}</>;
