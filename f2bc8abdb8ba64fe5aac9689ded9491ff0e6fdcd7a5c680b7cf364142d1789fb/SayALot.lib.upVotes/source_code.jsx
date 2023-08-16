const { isTest, stateUpdate, libCalls } = props;

const prodAction = "sayALotUpVote";
const testAction = `test_${prodAction}`;
const action = isTest ? testAction : prodAction;

function getUpVotes(props) {
  const { elementReactedId, createdInteraction } = props;

  const allVotes = Social.index(action, elementReactedId, {
    order: "desc",
  });

  const uniqueAccounts = [];
  let arrayLastInteractionForEachUser =
    allVotes &&
    allVotes.filter((obj) => {
      if (!uniqueAccounts.includes(obj.accountId)) {
        uniqueAccounts.push(obj.accountId);
        return true;
      }
      return false;
    });

  const userInteraction =
    arrayLastInteractionForEachUser &&
    arrayLastInteractionForEachUser.find((obj) => {
      return obj.accountId === context.accountId;
    });

  if (userInteraction && createdInteraction) {
    const newArrayOfLastInteractions = arrayLastInteractionForEachUser
      .filter((obj) => {
        return obj.accountId !== context.accountId;
      })
      .push({
        accountId: context.accountId,
        value: {
          type: "md",
          deleteReaction: createdInteraction.value.deleteReaction,
        },
      });

    arrayLastInteractionForEachUser = newArrayOfLastInteractions;
  }

  // ========= GET UPVOTES STATISTICS =========
  function countUpVotes() {
    let upVotes =
      arrayLastInteractionForEachUser &&
      arrayLastInteractionForEachUser.filter(
        (interaction) => !interaction.value.deleteReaction
      );
    return upVotes.length;
  }

  return { reactionsStatistics: countUpVotes(), userInteraction };
}

function addVote(props) {
  const { isDelete, elementReactedId, onCommit, onCancel } = props;

  saveUpVote(isDelete, elementReactedId, onCommit, onCancel);

  resultLibCalls = resultLibCalls.filter((call) => {
    return call.functionName !== "addVote";
  });

  return upVote;
}

function composeUpVoteData(isDelete, elementReactedId) {
  const data = {
    index: {
      [action]: JSON.stringify({
        key: elementReactedId,
        value: {
          type: "md",
          deleteReaction: isDelete,
        },
      }),
    },
  };

  return data;
}

function saveUpVote(isDelete, elementReactedId, onCommit, onCancel) {
  const newData = composeUpVoteData(isDelete, elementReactedId);

  Social.set(newData, {
    force: true,
    onCommit,
    onCancel,
  });
}

function libCall(call) {
  if (call.functionName === "getUpVotes") {
    return getUpVotes(call.props);
  } else if (call.functionName === "addVote") {
    return addVote(call.props);
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

return <></>;
