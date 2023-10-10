const {
  isTest,
  authorForWidget,
  reactedElementData,
  widgets,
  disabled,
  articleSbts,
  upVotes,
} = props;

const data = reactedElementData;

const libSrcArray = [widgets.libUpVotes];

const initLibCalls = [
  {
    functionName: "getUpVotes",
    key: "upVotes",
    props: {
      id: data.id ?? `${data.author}-${data.timeCreate}`,
      articleSbts,
    },
  },
];

if (!upVotes) {
  State.init({
    libCalls: initLibCalls,
    upVotes: [],
  });
}

let upVotesData = upVotes ?? state.upVotes;

let userVote = upVotesData.find((vote) => vote.accountId === context.accountId);

let hasUserVoted = userVote !== undefined;

function getUpVoteButtonClass() {
  if (hasUserVoted) {
    return "primary";
  } else {
    return "secondary dark";
  }
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

function stateUpdate(obj) {
  State.update(obj);
}

function upVoteButtonListener() {
  let newLibCalls = [...state.libCalls];

  if (!hasUserVoted) {
    newLibCalls.push({
      functionName: "addVote",
      key: "newVote",
      props: {
        id: data.id ?? `${data.author}-${data.timeCreate}`,
      },
    });
  } else {
    newLibCalls.push({
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
      src={widgets.styledComponents}
      props={{
        Button: {
          text: `+${upVotesData.length}`,
          disabled,
          className: `${getUpVoteButtonClass()}`,
          size: "sm",
          onClick: upVoteButtonListener,
          icon: (
            <IconContainer>
              <Icon className="bi bi-fast-forward-fill"></Icon>
            </IconContainer>
          ),
          // icon: (
          //   <IconContainer>
          //     <Icon className="bi bi-fast-forward-button"></Icon>
          //   </IconContainer>
          // ),
          // icon: <i className="bi bi-hand-thumbs-up"></i>,
          // icon: "⏫",
        },
      }}
    />

    <CallLibrary>
      {callLibs(libSrcArray, stateUpdate, state.libCalls)}
    </CallLibrary>
  </>
);
