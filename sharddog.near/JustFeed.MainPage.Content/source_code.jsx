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

const nftDataCount = Near.view(contractId, "nft_supply_for_owner", {
  account_id: accountId,
  limit: 1000,
});

let canShare;
//Nice work if you found the access link from here ;)
if (nftDataCount > 2) {
  canShare = "Share this ShardDog to invite others: https://shard.dog/social";
}

const Greeting = () => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return <span>{greeting}</span>;
};

if (holder) {
  return (
    <>
      {context.accountId && (
        <div className="mb-3">
          <Widget src="sharddog.near/widget/Posts.Compose" props={{}} />
        </div>
      )}
      <p>
        <Greeting />, you currently hold <b>{nftDataCount} </b> ShardDogs <br />
        {canShare}
        <br />
        This is a super early beta, feedback is welcome 🐶
      </p>
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
