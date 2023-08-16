const { isTest, authorForWidget, reactedElementData, widgets } = props;

const data = reactedElementData;

const libSrcArray = [`${authorForWidget}/widget/SayALot.lib.upVotes`];

const libCalls = [
  {
    functionName: "getUpVotes",
    key: "upVotes",
    props: {
      elementReactedId: data.realArticleId,
      createdInteraction: state.createdInteraction,
    },
  },
];

State.init({
  libCalls,
});

let userJustDeleted =
  state.createdInteraction !== undefined ? state.createdInteraction : false;

let userJustVoted =
  state.createdInteraction !== undefined ? !state.createdInteraction : false;

function getNumberOfUpVotes() {
  if (state.createdInteraction !== undefined && userJustDeleted) {
    return state.upVotes.reactionsStatistics - 1 ?? 0;
  } else if (state.createdInteraction !== undefined && userJustVoted) {
    return state.upVotes.reactionsStatistics + 1 ?? 0;
  } else {
    return state.upVotes.reactionsStatistics ?? 0;
  }
}

function getUpVoteButtonClass() {
  if (
    (state.createdInteraction !== undefined && userJustVoted) ||
    (state.createdInteraction !== undefined && !userJustDeleted) ||
    (state.upVotes.userInteraction.value.deleteReaction !== undefined &&
      !state.upVotes.userInteraction.value.deleteReaction)
  ) {
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

function upVoteListener() {
  let newLibCalls = [...libCalls];

  let isDelete =
    state.upVotes.userInteraction.value.deleteReaction !== undefined
      ? !state.upVotes.userInteraction.value.deleteReaction
      : false;

  function onCommit() {
    State.update({
      createdInteraction: isDelete,
    });
  }

  newLibCalls.push({
    functionName: "addVote",
    key: "addVote",
    props: {
      isDelete,
      elementReactedId: data.realArticleId,
      onCommit,
    },
  });
  State.update({ libCalls: newLibCalls });
}

const CallLibrary = styled.div`
  display: none;
`;

return (
  <>
    <Widget
      src={widgets.styledComponents}
      props={{
        Button: {
          text: `+${getNumberOfUpVotes()}`,
          className: getUpVoteButtonClass(),
          size: "sm",
          onClick: upVoteListener,
          icon: <i className="bi bi-hand-thumbs-up"></i>,
        },
      }}
    />

    <CallLibrary>
      {callLibs(libSrcArray, stateUpdate, state.libCalls)}
    </CallLibrary>
  </>
);
