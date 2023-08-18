const { isTest, stateUpdate, libCalls } = props;

const prodAction = "sayALotUpVote-v1.0.0";
const testAction = `test_${prodAction}`;
const action = isTest ? testAction : prodAction;

// ========= GET UPVOTES STATISTICS =========
function countUpVotes(arrayLastInteractionForEachUser) {
  let upVotes =
    arrayLastInteractionForEachUser &&
    arrayLastInteractionForEachUser.filter(
      (interaction) => !interaction.value.deleteReaction
    );
  return upVotes.length;
}

function getUpVotes(props) {
  const { realArticleId } = props;
  // const { realArticleId, createdInteraction } = props;

  const allVotes = Social.index(action, realArticleId, {
    order: "desc",
    subscribe: true,
  });

  // const uniqueAccounts = [];
  let upVotes =
    allVotes &&
    allVotes
      .filter((obj) => {
        const userLatestInteraction = allVotes.find(
          (vote) => vote.accountId === obj.accountId
        );
        return JSON.stringify(userLatestInteraction) === JSON.stringify(obj);
        // if (!uniqueAccounts.includes(obj.accountId)) {
        //   // uniqueAccounts.push(obj.accountId);
        //   return true;
        // }
        // return false;
      })
      .filter((vote) => !vote.value.isDelete) ?? [];
  return upVotes;

  // const userInteraction =
  //   upVotes &&
  //   upVotes.find((obj) => {
  //     return obj.accountId === context.accountId;
  //   });

  // if (userInteraction && createdInteraction) {
  //   const newArrayOfLastInteractions = upVotes
  //     .filter((obj) => {
  //       return obj.accountId !== context.accountId;
  //     })
  //     .push({
  //       accountId: context.accountId,
  //       value: {
  //         type: "md",
  //         deleteReaction: createdInteraction.value.deleteReaction,
  //       },
  //     });

  //   upVotes = newArrayOfLastInteractions;
  // }

  // return {
  //   reactionsStatistics: countUpVotes(upVotes),
  //   userInteraction,
  // };
}

function addVote(props) {
  const { realArticleId } = props;
  console.log("in addVote")
  saveUpVote(realArticleId);

  resultLibCalls = resultLibCalls.filter((call) => {
    return call.functionName !== "addVote";
  });

  return upVote;
}

function deleteVote(props) {
  const { realArticleId, upVoteId } = props;

  saveDeleteVote(realArticleId, upVoteId);

  resultLibCalls = resultLibCalls.filter((call) => {
    return call.functionName !== "deleteVote";
  });
}

function saveDeleteVote(realArticleId, upVoteId) {
  const newData = composeDeleteUpVoteData(realArticleId, upVoteId);

  Social.set(newData, {
    force: true,
  });
}

function composeDeleteUpVoteData(realArticleId, upVoteId) {
  const data = {
    index: {
      [action]: JSON.stringify({
        key: realArticleId,
        value: {
          isDelete: true,
          upVoteId,
        },
      }),
    },
  };

  return data;
}

function composeUpVoteData(realArticleId) {
  console.log("in composeData")
  const data = {
    index: {
      [action]: JSON.stringify({
        key: realArticleId,
        value: {
          upVoteId: `uv-${context.accountId}-${Date.now()}`,
        },
      }),
    },
  };

  return data;
}

function saveUpVote(realArticleId) {
  console.log("in saveUpVote")
  const newData = composeUpVoteData(realArticleId);

  Social.set(newData, {
    force: true,
  });
}

function libCall(call) {
  if (call.functionName === "getUpVotes") {
    return getUpVotes(call.props);
  } else if (call.functionName === "addVote") {
    return addVote(call.props);
  } else if (call.functionName === "deleteVote") {
    return deleteVote(call.props);
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
