const { isTest, authorForWidget, reactedElementData, widgets } = props;

const data = reactedElementData;

const libSrcArray = [`${authorForWidget}/widget/SayALot.lib.upVotes`];

const libCalls = [
  {
    functionName: "getUpVotes",
    key: "upVotes",
    props: {
      elementReactedId: data.realArticleId,
    },
  },
];

State.init({
  libCalls,
  upVotes: [],
});
console.log("suv: ", state.upVotes);

let userVote = state.upVotes.find(
  (vote) => vote.accountId === context.accountId
);

console.log("UV: ", userVote);
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
  let newLibCalls = [...libCalls];

  if (userVote) {
    newLibCalls.push({
      functionName: "addVote",
      key: "upVotes",
      props: {
        realArticleId: data.realArticleId,
      },
    });
  } else {
    newLibCalls.push({
      functionName: "deleteVote",
      key: "upVotes",
      props: {
        realArticleId: data.realArticleId,
        upVoteId: userVote.value.upVoteId,
      },
    });
  }
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
          text: `+${state.upVotes.length}`,
          className: `${getUpVoteButtonClass()}`,
          size: "sm",
          onClick: upVoteButtonListener,
          icon: <i className="bi bi-hand-thumbs-up"></i>,
        },
      }}
    />

    <CallLibrary>
      {callLibs(libSrcArray, stateUpdate, state.libCalls)}
    </CallLibrary>
  </>
);
