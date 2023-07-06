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
  if (onlyVerifiedHumans) {
    return (
      getFirstSBTToken(accountId) !== undefined ||
      skipHumanVericationFor.includes(accountId)
    );
  }
  return true;
};

let keys = `*/easypoll-${indexVersion}/poll/*`;

if (filterByUser) {
  keys = filterByUser.map((v) => {
    return `${v}/easypoll-${indexVersion}/poll/*`;
  });
}

let results = Social.keys(keys, "final", {
  return_type: "BlockHeight",
});
if (!results) {
  return "Loading...";
}

const polls_keys = [];

// TODO: should cache the logic bellow in state, polls_keys can be huge
Object.keys(results).forEach((accountId) => {
  return Object.keys(
    results[accountId][`easypoll-${indexVersion}`]["poll"]
  ).forEach((pollId) => {
    polls_keys.push({
      accountId,
      pollId,
      blockHeight:
        results[accountId][`easypoll-${indexVersion}`]["poll"][pollId],
    });
  });
});
polls_keys = polls_keys.sort((a, b) => b.blockHeight - a.blockHeight); // desc
polls_keys = polls_keys.filter((p) => shouldDisplayUserQuestions(p.accountId));

return (
  <>
    <div className="d-flex flex-column gap-4 mb-3">
      {polls_keys.map((p) => {
        const src = `${p.accountId}/easypoll-${indexVersion}/poll/${p.pollId}`;
        return (
          <Widget
            src={`${widgetOwner}/widget/EasyPoll.PollCard`}
            props={{
              src: src,
              blockHeight: p.blockHeight,
              href: tabs.VIEW_POLL.href(src, p.blockHeight),
              editHref: tabs.EDIT_POLL.href(src, p.blockHeight),
              deleteHref: tabs.DELETE_POLL.href(src, p.blockHeight),
              indexVersion,
            }}
          />
        );
      })}
    </div>
    {polls_keys.length < 1 && <div>Looks like there are no polls to show.</div>}
    {/* TODO: NEED PAGINATION */}
  </>
);
