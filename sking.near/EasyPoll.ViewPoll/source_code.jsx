State.init({
  showQuestionsByThisUser: false,
  poll: {},
  polls: [{}],
  profile: {},
  pollsByThisCreator: [{}],
  answers: [{}],
});

if (!props.blockHeight) {
  return "Prop block height wasn't provided";
}

const widgetOwner = "sking.near";
const indexVersion = props.indexVersion ?? "3.2.0";
const canOperate = props.canOperate;
const whitelist = props.whitelist;
const tabs = props.tabs;

let questionBlockHeight = Number(props.blockHeight);

const polls =
  !props.previewInfo &&
  Social.index("poll_question", `question-v${indexVersion}`);
if (JSON.stringify(polls) != JSON.stringify(state.polls)) {
  State.update({ polls: polls });
}

if (!state.polls) {
  return "Loading";
} else {
  const poll =
    props.previewInfo ??
    state.polls.find((q) => q.blockHeight == questionBlockHeight);

  if (JSON.stringify(poll) != JSON.stringify(state.poll)) {
    State.update({ poll: poll });
  }

  if (!state.poll) {
    return "Loading... ";
  }
}

let profile = Social.getr(`${state.poll.accountId}/profile`);

if (JSON.stringify(profile) != JSON.stringify(state.profile)) {
  State.update({ profile: profile });
}

// if (!profile) {
//   return "Loading";
// }

let pollsByThisCreator = Social.index(
  "poll_question",
  `question-v${indexVersion}`,
  {
    accountId: state.poll.accountId,
  }
);

if (
  JSON.stringify(pollsByThisCreator) != JSON.stringify(state.pollsByThisCreator)
) {
  State.update({ pollsByThisCreator: pollsByThisCreator });
}

if (!state.pollsByThisCreator) {
  return "Loading";
}

return (
  <>
    <Widget
      src={`${widgetOwner}/widget/EasyPoll.PollDetails`}
      props={{
        poll: state.poll,
        profile,
        widgetOwner,
        blockHeight: questionBlockHeight,
        questionsByCreator,
        indexVersion,
        whitelist,
        href: tabs.VIEW_POLL.href + questionBlockHeight,
      }}
    />
  </>
);
