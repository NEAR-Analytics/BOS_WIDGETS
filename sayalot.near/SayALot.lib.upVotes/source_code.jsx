const { isTest, stateUpdate, libCalls } = props;

const prodAction = "sayALotUpVote-v0.0.2";
const testAction = `test_${prodAction}`;
const action = isTest ? testAction : prodAction;

// const authorForWidget =
//   "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
const authorForWidget = "sayalot.near";
// const authorForWidget = "kenrou-it.near";
const libSrcArray = [`${authorForWidget}/widget/SayALot.lib.SBT`];

State.init({ libCalls: [] });

function libStateUpdate(obj) {
  State.update(obj);
}

function setAreValidUsers(accountIds, sbtsNames) {
  const newLibCalls = [...state.libCalls];
  accountIds.forEach((accountId) => {
    const isCallPushed =
      newLibCalls.find((libCall) => {
        return (
          libCall.functionName === "isValidUser" &&
          libCall.props.accountId === accountId
        );
      }) !== undefined;
    const isCallReturned = state[`isValidUser-${accountId}`] !== undefined;

    if (isCallPushed || isCallReturned) {
      return;
    }

    newLibCalls.push({
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

function callLibs(srcArray, stateUpdate, libCalls) {
  return (
    <>
      {srcArray.map((src) => {
        return (
          <Widget
            src={src}
            props={{
              isTest,
              stateUpdate,
              libCalls,
            }}
          />
        );
      })}
    </>
  );
}

function canUserUpVote(props) {
  const { env, accountId, sbtsNames } = props;

  setAreValidUsers([accountId], sbtsNames);

  const result = state[`isValidUser-${accountId}`];

  resultLibCalls = resultLibCalls.filter((call) => {
    const discardCondition =
      call.functionName === "canUserUpVote" && result !== undefined;
    return !discardCondition;
  });

  return result;
}

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
  const { id, articleSbts } = props;
  // const { id, createdInteraction } = props;
  const allVotes = Social.index(action, id, {
    order: "desc",
    subscribe: true,
  });

  let validUpVotes = allVotes;

  if (articleSbts.length > 0) {
    const validUpVotesAuthors = validUpVotes.map((upVote) => {
      return upVote.accountId;
    });

    setAreValidUsers(validUpVotesAuthors, articleSbts);

    const validAuthors = validUpVotesAuthors.filter((author) => {
      return state[`isValidUser-${author}`] === true;
    });

    resultLibCalls = resultLibCalls.filter((call) => {
      const discardCondition =
        call.functionName === "getUpVotes" &&
        state[`isValidUser-${call.props.accountId}`] !== undefined;
      return !discardCondition;
    });

    validUpVotes = validUpVotesAuthors.filter((author) => {
      return validAuthors.includes(author.accountId);
    });
  }

  // const uniqueAccounts = [];
  let upVotes =
    validUpVotes &&
    validUpVotes
      .filter((obj) => {
        const userLatestInteraction = validUpVotes.find(
          (vote) => vote.accountId === obj.accountId
        );
        return JSON.stringify(userLatestInteraction) === JSON.stringify(obj);
        // if (!uniqueAccounts.includes(obj.accountId)) {
        //   // uniqueAccounts.push(obj.accountId);
        //   return true;
        // }
        // return false;
      })
      .filter((vote) => !vote.value.isDelete);

  return upVotes ?? [];

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
  const { id } = props;
  saveUpVote(id);

  resultLibCalls = resultLibCalls.filter((call) => {
    return call.functionName !== "addVote";
  });

  return upVote;
}

function deleteVote(props) {
  const { id, upVoteId } = props;

  saveDeleteVote(id, upVoteId);

  resultLibCalls = resultLibCalls.filter((call) => {
    return call.functionName !== "deleteVote";
  });
}

function saveDeleteVote(id, upVoteId) {
  const newData = composeDeleteUpVoteData(id, upVoteId);

  Social.set(newData, {
    force: true,
  });
}

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

function composeUpVoteData(id) {
  const data = {
    index: {
      [action]: JSON.stringify({
        key: id,
        value: {
          upVoteId: `uv-${context.accountId}-${Date.now()}`,
        },
      }),
    },
  };

  return data;
}

function saveUpVote(id) {
  const newData = composeUpVoteData(id);

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
  } else if (call.functionName === "canUserUpVote") {
    return canUserUpVote(call.props);
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
