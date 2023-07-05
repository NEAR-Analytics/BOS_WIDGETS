const hashtag = props.hashtag;
const contractId = "mint.sharddog.near";

if (!state || state.hashtag !== hashtag) {
  State.update({
    feedIndex: hashtag ? 2 : context.accountId ? 0 : 1,
    hashtag,
  });
}
const options = [
  {
    title: "My Feed",
    disabled: !context.accountId,
  },
  {
    title: "All Posts",
  },
];

if (hashtag) {
  options.push({
    title: `#${hashtag}`,
  });
}

let accounts = undefined;

if (state.feedIndex === 0) {
  const graph = Social.keys(`${context.accountId}/graph/follow/*`, "final");
  if (graph !== null) {
    accounts = Object.keys(graph[context.accountId].graph.follow || {});
    accounts.push(context.accountId);
  } else {
    accounts = [];
  }
}

const accountId = context.accountId ?? "orangejoe.near";

const nftData = Near.view(contractId, "nft_tokens_for_owner", {
  account_id: accountId,
  limit: 100,
});

let holder = false;

nftData.forEach((item) => {
  if (item.series_id === 19) {
    holder = true;
    return true;
  }
});

if (holder === true) {
  return (
    <>
      {context.accountId && (
        <div className="mb-3">
          <Widget src="near/widget/Posts.Compose" props={{}} />
        </div>
      )}
      <ul className="nav nav-pills mb-3">
        {options.map((option, i) => (
          <li className="nav-item" key={i}>
            <button
              className={`nav-link ${state.feedIndex === i ? "active" : ""} ${
                option.disabled ? "disabled" : ""
              }`}
              aria-disabled={!!option.disabled}
              onClick={() => !option.disabled && State.update({ feedIndex: i })}
            >
              {option.title}
            </button>
          </li>
        ))}
      </ul>
      {state.feedIndex === 2 ? (
        <Widget src="mob.near/widget/Hashtag.Feed" props={{ hashtag }} />
      ) : (
        <Widget src="mob.near/widget/MainPage.Feed.Beta" props={{ accounts }} />
      )}
    </>
  );
} else {
  return (
    <>
      <h3>Need to hold a ShardDog to view feed</h3>
    </>
  );
}
