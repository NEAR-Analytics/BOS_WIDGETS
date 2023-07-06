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
  limit: 100,
});

let holder = false;

nftData.forEach((item) => {
  if (item.series_id === 19) {
    holder = true;
    return true;
  }
});

const nftDataCount = Near.view(contractId, "nft_supply_for_owner", {
  account_id: accountId,
  limit: 100,
});

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

if (nftDataCount > 0) {
  return (
    <>
      {context.accountId && (
        <div className="mb-3">
          <Widget src="sharddog.near/widget/Posts.Compose" props={{}} />
        </div>
      )}
      <p>
        <Greeting />, you currently hold <b>{nftDataCount} </b> ShardDogs
      </p>
      <ul className="nav nav-pills mb-12">
        <li className="nav-item col-6 mb-6">
          <button
            className={`nav-link ${state.feedIndex === 0 ? "active" : ""} ${
              options[0].disabled ? "disabled" : ""
            }`}
            aria-disabled={!!options[0].disabled}
            onClick={() =>
              !options[0].disabled && State.update({ feedIndex: 0 })
            }
          >
            {options[0].title}
          </button>
        </li>
        <li className="nav-item col-6 mb-6">
          <button
            className={`nav-link ${state.feedIndex === 1 ? "active" : ""} ${
              options[1].disabled ? "disabled" : ""
            }`}
            aria-disabled={!!options[1].disabled}
            onClick={() =>
              !options[1].disabled && State.update({ feedIndex: 1 })
            }
          >
            {options[1].title}
          </button>
        </li>
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
      <div className="tab-content col-sm-10">
        <h3>Woof! Need to hold a ShardDog to view feed</h3>
      </div>
    </>
  );
}
