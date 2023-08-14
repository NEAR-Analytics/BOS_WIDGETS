const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/comment`, blockHeight) ?? "null");
const parentItem = content.item;
const highlight = !!props.highlight;
const raw = !!props.raw;

const extractNotifyAccountId = (item) => {
  if (!item || item.type !== "social" || !item.path) {
    return undefined;
  }
  const accountId = item.path.split("/")[0];
  return `${accountId}/post/main` === item.path ? accountId : undefined;
};

const link = `/mob.near/widget/MainPage.N.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

const item = {
  type: "social",
  path: `${accountId}/post/comment`,
  blockHeight,
};

return (
  <>
    <div className={`post ${highlight ? "bg-warning bg-opacity-10" : ""}`}>
      <Widget
        src="mob.near/widget/MainPage.N.Post.Left"
        props={{ accountId }}
      />
      <div className="right">
        <Widget
          src="mob.near/widget/MainPage.N.Post.Header"
          props={{
            accountId,
            blockHeight,
            link,
            postType: "comment",
            flagItem: item,
          }}
        />
        <Widget
          src="mob.near/widget/MainPage.N.Post.Content"
          props={{ content, raw }}
        />
        <div className="buttons">
          {blockHeight !== "now" && (
            <div className="mt-1 d-flex justify-content-between">
              {parentItem && (
                <div key="comment">
                  <Widget
                    src="mob.near/widget/N.CommentButton"
                    props={{
                      onClick: () =>
                        !state.showReply && State.update({ showReply: true }),
                    }}
                  />
                </div>
              )}
              <Widget
                src="mob.near/widget/N.LikeButton"
                props={{
                  notifyAccountId,
                  item,
                }}
              />
              <Widget
                src="mob.near/widget/MainPage.N.Post.ShareButton"
                props={{ accountId, blockHeight, postType: "comment" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
    {state.showReply && (
      <div className="mb-2" key="reply">
        <Widget
          src="mob.near/widget/MainPage.Comment.Compose"
          props={{
            initialText: `@${accountId}, `,
            notifyAccountId: extractNotifyAccountId(parentItem),
            item: parentItem,
            onComment: () => State.update({ showReply: false }),
          }}
        />
      </div>
    )}
  </>
);
