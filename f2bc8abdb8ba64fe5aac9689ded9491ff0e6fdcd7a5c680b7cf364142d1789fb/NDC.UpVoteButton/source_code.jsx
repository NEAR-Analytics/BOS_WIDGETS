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

if (state.upVotes.reactionsStatistics) {
  State.update({ numberOfVotes: state.upVotes.reactionsStatistics ?? 0 });
}

const lastUserVote = state.upVotes.userInteraction;

let isDelete;
if (state.createdInteraction !== undefined) {
  isDelete = !state.createdInteraction;
} else if (lastUserVote) {
  isDelete = !lastUserVote.value.deleteReaction;
} else {
  isDelete = false;
}

function getUpVoteButtonClass() {
  if (isDelete) {
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

  function onCommit() {
    State.update({
      numberOfVotes: isDelete ? numberOfVotes - 1 : numberOfVotes + 1,
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
          text: `+${state.numberOfVotes ?? 0}`,
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
