const { isTest, authorForWidget, reactedElementData, widgets } = props;

const data = reactedElementData;

const libSrcArray = [`${authorForWidget}/widget/SayALot.lib.upVotes`];

if (
  reactedElementData.realArticleId ==
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb-1689817432336"
) {
  console.log("Q si papá");
}

const libCalls = [
  {
    functionName: "getUpVotes",
    key: "upVotes",
    props: {
      realArticleId: data.realArticleId ?? `${data.author}-${data.timeCreate}`,
    },
  },
];

State.init({
  libCalls,
  upVotes: [],
});

let userVote = state.upVotes.find(
  (vote) => vote.accountId === context.accountId
);

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
        realArticleId:
          data.realArticleId ?? `${data.author}-${data.timeCreate}`,
      },
    });
  } else {
    newLibCalls.push({
      functionName: "deleteVote",
      key: "deletedVote",
      props: {
        realArticleId:
          data.realArticleId ?? `${data.author}-${data.timeCreate}`,
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
