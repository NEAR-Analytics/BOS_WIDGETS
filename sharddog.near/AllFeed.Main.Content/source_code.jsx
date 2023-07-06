const hashtag = props.hashtag;
const contractId = "mint.sharddog.near";

if (!state || state.hashtag !== hashtag) {
  State.update({
    feedIndex: 1,
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

if (!context.accountId) {
  return (
    <>
      <div className="tab-content col-sm-10">
        <h3>Woof! Need to hold a ShardDog to view feed</h3>
      </div>
    </>
  );
}
const accountId = context.accountId;

const nftData = Near.view(contractId, "nft_tokens_for_owner", {
  account_id: accountId,
  limit: 1000,
});

let holder = false;

nftData.forEach((item) => {
  if (item.series_id === 141) {
    holder = true;
    return true;
  }
});

if (holder) {
  return (
    <>
      {state.feedIndex === 2 ? (
        <Widget src="mob.near/widget/Hashtag.Feed" props={{ hashtag }} />
      ) : (
        <Widget
          src="sharddog.near/widget/MainPage.Feed.Beta"
          props={{ accounts }}
        />
      )}
    </>
  );
} else {
  return (
    <>
      <div className="tab-content col-sm-10">
        <h3>
          Woof! Sorry, you need to hold a Social ShardDog to view the feed
          <br />
          Maybe someone you know has the link?
        </h3>
      </div>
    </>
  );
}
