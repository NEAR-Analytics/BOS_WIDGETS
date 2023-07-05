State.init({
  showQuestionsByThisUser: false,
  poll: {},
  polls: [{}],
  profile: {},
  userAnswers: [],
  pollAnswers: [],
});

if (!props.blockHeight) {
  return "Prop block height wasn't provided";
}

const widgetOwner = "sking.near";
const indexVersion = props.indexVersion ?? "3.2.0";
const tabs = props.tabs;
const accountId = props.accountId ?? context.accountId;
const isHuman = props.isHuman;
const resultsHref = props.resultsHref ?? "";

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

let answers = Social.index("poll_question", `answer-v${indexVersion}`, {
  accountId: accountId,
});
answers = answers.filter(
  (v) => Number(v.value.pollBlockHeight) == questionBlockHeight
);
if (JSON.stringify(answers) != JSON.stringify(state.userAnswers)) {
  State.update({ userAnswers: answers });
}

const isVerifiedHuman = (account) => {
  const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
    account: `${account}`,
    issuer: "fractal.i-am-human.near",
  });
  return view?.[0]?.[1]?.[0];
};
const getValidAnswersOnly = (input) => {
  const {
    value: { verifiedHumansOnly, endTimestamp, startTimestamp },
  } = state.poll;

  // should be only right poll
  input = input.filter(
    (v) => Number(v.value.pollBlockHeight) == questionBlockHeight
  );
  let filtered = input
    // should be 1 per user
    .map((e) => e["accountId"])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((e) => input[e])
    .map((e) => input[e])
    //
    .filter(async (v, i) => {
      // should respect human only
      if (verifiedHumansOnly && !isVerifiedHuman(v.accountId)) return false;
      // should respect startTimestamp
      if (v.value.timestamp < startTimestamp) return false;
      // should respect endTimestamp
      if (v.value.timestamp > endTimestamp) return false;

      return true;
    });

  return filtered;
};

let allAnswers = Social.index("poll_question", `answer-v${indexVersion}`);
if (!allAnswers) return "Loading";
allAnswers = getValidAnswersOnly(allAnswers);
if (JSON.stringify(allAnswers) != JSON.stringify(state.pollAnswers)) {
  State.update({ pollAnswers: allAnswers });
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
        href: tabs.VIEW_POLL.href + questionBlockHeight,
        userAnswers: state.userAnswers,
        isHuman,
        pollAnswers: state.pollAnswers,
        resultsHref,
      }}
    />
  </>
);
