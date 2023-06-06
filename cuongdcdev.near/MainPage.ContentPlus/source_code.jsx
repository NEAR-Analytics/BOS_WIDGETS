/**
 * MainPage.ContentPlus
 * Source: mob.near/widget/MainPage.Content
 */
const hashtag = props.hashtag;

//get blocked list
const userProfile = Social.getr(`${context.accountId}/profile`);
let blockedListArr = [];

if (context.accountId && userProfile.cdcBlockList) {
  blockedListArr = userProfile.cdcBlockList.split(",");
  blockedListArr = blockedListArr.map((e) => e.trim());
}

let isInBlockedList = (walletId) => {
  if (!context.accountId) return false;
  if (blockedListArr.length > 0 && blockedListArr.indexOf(walletId) >= 0) {
    return true;
  }
  return false;
};

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
    // console.log(
    //   "Following Accounts: ",
    //   accounts,
    //   "Socials: ",
    //   Socialm,
    //   "Context account Id",
    //   context.accountId
    // );
    accounts.push(context.accountId);
    accounts = accounts.filter(
      (e) => e != context.accountId && !isInBlockedList(e)
    );
  } else {
    accounts = [];
  }
}
/**
 * Widget Feed
 * Source: mob.near/widget/Mainpage.Feed
 * */
let WidgetFeed = (props) => {
  //console.log("Following accounts: ", props.accounts);
  let index = {
    action: "post",
    key: "main",
    options: {
      limit: 10,
      order: "desc",
      accountId: props.accounts,
    },
  };

  const repostSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fill-rule="evenodd"
        d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
        transform="rotate(180, 12, 12), translate(0, 4)"
      />
      <path
        fill-rule="evenodd"
        d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
        transform="translate(0, 4)"
      />
    </svg>
  );

  const extractParentPost = (item) => {
    if (!item || item.type !== "social" || !item.path || !item.blockHeight) {
      return undefined;
    }
    const accountId = item.path.split("/")[0];
    return `${accountId}/post/main` === item.path
      ? { accountId, blockHeight: item.blockHeight }
      : undefined;
  };

  const renderRepost = (a) => {
    if (a.value.type !== "repost") {
      return false;
    }
    const post = extractParentPost(a.value.item);
    if (!post) {
      return false;
    }
    const item = JSON.stringify(makePostItem(post));
    if (item in renderedPosts) {
      return false;
    }
    renderedPosts[item] = true;

    return (
      <div key={JSON.stringify(a)} className="mb-3">
        <div className="text-muted">
          {repostSvg} Reposted by{" "}
          <Widget
            src="mob.near/widget/ProfileLine"
            props={{
              accountId: a.accountId,
              hideImage: true,
              hideAccountId: true,
              tooltip: true,
            }}
          />
        </div>
        <Widget
          src="cuongdcdev.near/widget/MainPage.PostPlus"
          props={{ accountId: post.accountId, blockHeight: post.blockHeight }}
        />
      </div>
    );
  };

  const renderItem = (item) => {
    if (isInBlockedList(item.accountId)) {
      console.log(item.accountId + " is BLOCKED");
      return;
    }
    item.action === "post" ? renderPost(item) : renderRepost(item);
  };

  return (
    <div>
      <Widget src="mob.near/widget/IndexFeed" props={{ index, renderItem }} />
    </div>
  );
};
//End widget feed

return (
  <>
    {context.accountId && (
      <div className="mb-3">
        <Widget src="mob.near/widget/MainPage.Compose" props={{}} />
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
      WidgetFeed({ accounts })
    )}
  </>
);
