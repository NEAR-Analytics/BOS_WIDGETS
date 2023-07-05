const widgetOwner = props.widgetOwner ?? "sking.near";
const src = props.src;
const href = props.href;
const editHref = props.editHref;
const accountId = props.accountId ?? context.accountId;
const tabs = props.tabs;
const isHuman = props.isHuman;
const blockHeight = props.blockHeight ?? "final";

if (!src) {
  return "Please provide poll src";
}

const poll = Social.get(`${src}`, blockHeight);

if (!poll) {
  return "Loading...";
}
poll = JSON.parse(poll);
poll.accountId = src.split("/")[0];

let profile = Social.getr(`${poll.accountId}/profile`);

let userAnswers = Social.index("easypoll_answer", `${src}`, {
  accountId: accountId,
});
if (!userAnswers) return "Loading...";

let allAnswers = Social.index("easypoll_answer", `${src}`);
if (!allAnswers) return "Loading...";

const isVerifiedHuman = (account) => {
  const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
    account: `${account}`,
    issuer: "fractal.i-am-human.near",
  });
  return view?.[0]?.[1]?.[0];
};
const getValidAnswersOnly = (input) => {
  const { verifiedHumansOnly, endTimestamp, startTimestamp } = poll;

  // should be only right poll
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

if (!state) {
  const filteredAnswers = getValidAnswersOnly(allAnswers);
  State.init({ filteredAnswers });
}

return (
  <>
    <Widget
      src={`${widgetOwner}/widget/EasyPoll.PollDetails`}
      props={{
        href: tabs.VIEW_POLL.href(src, blockHeight),
        editHref: tabs.EDIT_POLL.href(src, blockHeight),
        resultsHref: tabs.RESULTS.href(src, blockHeight),
        deleteHref: tabs.DELETE_POLL.href(src, blockHeight),
        widgetOwner,
        blockHeight: blockHeight,
        isHuman,
        poll: poll,
        profile,
        userAnswers: userAnswers,
        pollAnswers: state.filteredAnswers,
        src,
      }}
    />
  </>
);
