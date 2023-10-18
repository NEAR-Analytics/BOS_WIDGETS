const { isTest, stateUpdate, functionsToCallByLibrary, callLibs } = props;
const functionsToCall = functionsToCallByLibrary.upVotes;

const prodAction = "sayALotUpVote-v0.0.2";
const testAction = `test_${prodAction}`;
const action = isTest ? testAction : prodAction;

// const authorForWidget =
//   "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
// const authorForWidget = "sayalot.near";
// const authorForWidget = "kenrou-it.near";
const authorForWidget = "silkking.near";
const libSrcArray = [`${authorForWidget}/widget/SayALot.lib.SBT`];
// console.log(1, "upvote", props);

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
  const allVotes = Social.index(action, id, {
    order: "desc",
    subscribe: true,
  });

  let validUpVotes = allVotes;

  if (articleSbts.length > 0) {
    // We assume there will be only one SBT for each article
    const articleSbt = articleSbts[0];

    const validUpVotesAuthors = validUpVotes.map((upVote) => {
      return upVote.accountId;
    });

    setAreValidUsers(validUpVotesAuthors, articleSbts);

    const validAuthors = validUpVotesAuthors.filter((author) => {
      return state[`isValidUser-${author}`][articleSbt];
    });

    resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
      const discardCondition =
        call.functionName === "getUpVotes" &&
        state[`isValidUser-${call.props.accountId}`] !== undefined;
      return !discardCondition;
    });
    validUpVotes = validUpVotes.filter((vote) => {
      return validAuthors.includes(vote.accountId);
    });
  }

  let upVotes =
    validUpVotes &&
    validUpVotes
      .filter((obj) => {
        const userLatestInteraction = validUpVotes.find((vote) => {
          return vote.accountId === obj.accountId;
        });
        return JSON.stringify(userLatestInteraction) === JSON.stringify(obj);
      })
      .filter((vote) => !vote.value.isDelete);

  return upVotes ?? [];
}

function addVote(props) {
  const { id } = props;
  saveUpVote(id);

  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
    return call.functionName !== "addVote";
  });

  return upVote;
}

function deleteVote(props) {
  const { id, upVoteId } = props;

  saveDeleteVote(id, upVoteId);

  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
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

function callFunction(call) {
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
const CallLibrary = styled.div`
  display: none;
`;

return (
  <>
    <CallLibrary>
      {libSrcArray.map((src) => {
        return callLibs(src, libStateUpdate, state.libsCalls, "lib.upVotes");
      })}
    </CallLibrary>
  </>
);
