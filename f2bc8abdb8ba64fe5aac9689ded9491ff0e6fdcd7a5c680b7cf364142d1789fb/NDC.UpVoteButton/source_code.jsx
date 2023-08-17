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
  createdInteraction: false,
});

let numberOfvotesModified = state.numberOfvotesModified;

// if (state.upVotes.reactionsStatistics && !numberOfvotesModified) {
//   State.update({ numberOfVotes: state.upVotes.reactionsStatistics ?? 0 });
// }

const lastUserVote = state.upVotes.userInteraction;

let isDelete;
if (lastUserVote) {
  if (state.createdInteraction) {
    isDelete = lastUserVote.value.deleteReaction;
  } else {
    isDelete = !lastUserVote.value.deleteReaction;
  }
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
  let oldNumberOfvotes =
    state.numberOfVotes ?? state.upVotes.reactionsStatistics ?? 0;

  function onCommit() {
    State.update({
      numberOfvotesModified: !numberOfvotesModified,
      numberOfVotes: isDelete ? oldNumberOfvotes - 1 : oldNumberOfvotes + 1,
      createdInteraction: !isDelete,
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
          text: `+${
            state.numberOfVotes ?? state.upVotes.reactionsStatistics ?? 0
          }`,
          className: `${getUpVoteButtonClass()}`,
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
