const {
  isTest,
  authorForWidget,
  reactedElementData,
  widgets,
  disabled,
  articleSbts,
  upVotes,
  callLibs,
} = props;

const data = reactedElementData;

const libSrcArray = [widgets.libUpVotes];

const initLibCalls = {
  upVotes: [
    {
      functionName: "getUpVotes",
      key: "upVotesBySBT",
      props: {
        id: data.id ?? `${data.author}-${data.timeCreate}`,
        sbtsNames: articleSbts,
      },
    },
  ],
};
const initUpVotesBySBT = {};

if (!upVotes) {
  State.init({
    libCalls: initLibCalls,
    upVotes: [],
    upVotesBySBT: initUpVotesBySBT,
  });
} else {
  State.init({
    upVotes,
  });
}

if (Object.keys(state.upVotesBySBT).length > 0) {
  const key = Object.keys(state.upVotesBySBT)[0]; // There should always be one for now
  const newUpvotes = state.upVotesBySBT[key];
  if (JSON.stringify(state.upVotes) !== JSON.stringify(newUpvotes)) {
    State.update({ upVotes: newUpvotes });
  }
}

let upVotesData = state.upVotes;

let userVote = upVotesData.find((vote) => vote.accountId === context.accountId);

let hasUserVoted = userVote !== undefined;

function getUpVoteButtonClass() {
  if (hasUserVoted) {
    return "info";
  } else {
    return "info outline";
  }
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

function stateUpdate(obj) {
  State.update(obj);
}

function upVoteButtonListener() {
  let newLibCalls = Object.assign({}, state.libCalls);

  if (!hasUserVoted) {
    newLibCalls.upVotes.push({
      functionName: "addVote",
      key: "newVote",
      props: {
        id: data.id ?? `${data.author}-${data.timeCreate}`,
      },
    });
  } else {
    newLibCalls.upVotes.push({
      functionName: "deleteVote",
      key: "deletedVote",
      props: {
        id: data.id ?? `${data.author}-${data.timeCreate}`,
        upVoteId: userVote.value.upVoteId,
      },
    });
  }
  State.update({ libCalls: newLibCalls });
}

const IconContainer = styled.div`
  transform: rotate(-90deg);
`;

const Icon = styled.i`
  margin: 0px !important;
`;

const CallLibrary = styled.div`
  display: none;
`;

return (
  <>
    <Widget
      src={widgets.newStyledComponents.Input.Button}
      props={{
        // text: `+${upVotesData.length}`,
        children: (
          <div className="d-flex">
            <span>{`+${upVotesData.length}`}</span>
            <IconContainer>
              <Icon className="bi bi-fast-forward-fill"></Icon>
            </IconContainer>
          </div>
        ),
        disabled,
        className: `${getUpVoteButtonClass()}`,
        size: "sm",
        onClick: upVoteButtonListener,
        // icon: (
        //   <IconContainer>
        //     <Icon className="bi bi-fast-forward-fill"></Icon>
        //   </IconContainer>
        // ),
        // icon: (
        //   <IconContainer>
        //     <Icon className="bi bi-fast-forward-button"></Icon>
        //   </IconContainer>
        // ),
        // icon: <i className="bi bi-hand-thumbs-up"></i>,
        // icon: "⏫",
      }}
    />

    <CallLibrary>
      {libSrcArray.map((src) => {
        return callLibs(
          src,
          libStateUpdate,
          state.libsCalls,
          { baseAction: "sayALotUpVote" },
          "Up vote button"
        );
      })}
    </CallLibrary>
  </>
);
