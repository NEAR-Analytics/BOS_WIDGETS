const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const whitelistedApps = props.whitelistedApps;
const subscribe = !!props.subscribe;
const raw = !!props.raw;

function getContent() {
  if (props.content) {
    return props.content;
  }
  for (let i = 0; i < whitelistedApps.length; i++) {
    const reposts = Social.index("repost", whitelistedApps[i].key);
    const repost = reposts.find((r) => r.blockHeight === blockHeight);
    if (repost) {
      const content = Social.index(whitelistedApps[i].key, "post").find(
        (p) => p.blockHeight === repost.value.item.blockHeight
      );
      return { text: content.value.answer };
    }
  }
  const content = JSON.parse(Social.get(`${accountId}/post/main`, blockHeight));
  if (content) {
    return content;
  }

  return "null";
}

const content = getContent();
const notifyAccountId = accountId;
const item = {
  type: "social",
  path: `${accountId}/post/main`,
  blockHeight,
};

const link = `#/mob.near/widget/MainPage.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}&whitelistedApps=${whitelistedApps}`;

return (
  <div className="border rounded-4 p-3 pb-1">
    <Widget
      src="mob.near/widget/MainPage.Post.Header"
      props={{ accountId, blockHeight, link, postType: "post", flagItem: item }}
    />
    <div className="mt-3 text-break">
      <Widget
        src="mob.near/widget/MainPage.Post.Content"
        props={{ content, raw }}
      />
    </div>
    {blockHeight !== "now" && (
      <div className="mt-1 d-flex justify-content-between">
        <div className="me-4">
          <Widget
            src="mob.near/widget/CommentButton"
            props={{
              onClick: () =>
                !state.showReply && State.update({ showReply: true }),
            }}
          />
        </div>
        <div className="me-4">
          <Widget
            src="mob.near/widget/RepostButton"
            props={{
              notifyAccountId,
              item,
            }}
          />
        </div>
        <div className="me-4">
          <Widget
            src="mob.near/widget/LikeButton"
            props={{
              notifyAccountId,
              item,
            }}
          />
        </div>
        <div>
          <Widget
            src="mob.near/widget/MainPage.Post.ShareButton"
            props={{ accountId, blockHeight, postType: "post" }}
          />
        </div>
      </div>
    )}
    <div className="mt-3 ps-5">
      {state.showReply && (
        <div className="mb-2">
          <Widget
            src="mob.near/widget/MainPage.Comment.Compose"
            props={{
              notifyAccountId,
              item,
              onComment: () => State.update({ showReply: false }),
            }}
          />
        </div>
      )}
      <Widget
        src="mob.near/widget/MainPage.Comment.Feed"
        props={{
          item,
          highlightComment: props.highlightComment,
          limit: props.commentsLimit,
          subscribe,
          raw,
        }}
      />
    </div>
  </div>
);
