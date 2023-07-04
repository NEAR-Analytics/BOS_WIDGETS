const indexVersion = props.indexVersion ?? "3.2.0";
const filterByUser = props.filterByUser;
const skipHumanVericationFor = props.skipHumanVericationFor;
const onlyVerifiedHumans = props.onlyVerifiedHumans ?? true;
const blackList = props.blackList;
const tabs = props.tabs;

State.init({
  polls: {},
});

const widgetOwner = "sking.near";

const getFirstSBTToken = (accountId) => {
  const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
    account: accountId,
    issuer: "fractal.i-am-human.near",
  });
  return view?.[0]?.[1]?.[0];
};

const shouldDisplayUserQuestions = (accountId) => {
  if (blackList) {
    return !blackList.includes(accountId);
  }
  if (filterByUser) {
    return filterByUser.includes(accountId);
  }
  if (onlyVerifiedHumans) {
    return (
      getFirstSBTToken(accountId) !== undefined ||
      skipHumanVericationFor.includes(accountId)
    );
  }
  return true;
};

let polls = Social.index("poll_question", `question-v${indexVersion}`, {
  accountId: filterByUser,
});

if (JSON.stringify(polls) != JSON.stringify(state.polls)) {
  State.update({ polls: polls });
}

if (!polls) {
  return "Loading";
}

polls = polls.filter((p) => shouldDisplayUserQuestions(p.accountId));

polls = polls.sort((q1, q2) => {
  const isQ1Finished = q1.value.endTimestamp < Date.now();
  const isQ2Finished = q2.value.endTimestamp < Date.now();
  if (isQ1Finished && !isQ2Finished) return 1;
  if (!isQ1Finished && isQ2Finished) return -1;
  if (isQ1Finished && isQ2Finished)
    return q2.value.endTimestamp - q1.value.endTimestamp;
  return q1.value.endTimestamp - q2.value.endTimestamp;
});

let usersMakingQuestions = [];
for (let i = 0; i < polls.length; i++) {
  if (!usersMakingQuestions.includes(polls[i].accountId)) {
    usersMakingQuestions.push(polls[i].accountId);
  }
}

return (
  <>
    <div className="d-flex flex-column gap-4 mb-3">
      {polls.map((poll) => {
        return (
          <Widget
            src={`${widgetOwner}/widget/EasyPoll.PollCard`}
            props={{
              poll: poll,
              indexVersion,
              href: tabs.VIEW_POLL.href + poll.blockHeight,
            }}
          />
        );
      })}
    </div>
    {polls.length < 1 && <div>Looks like there are no polls to show.</div>}
    {/*TODO add a page picker instead the infinite scroll?*/}
  </>
);
