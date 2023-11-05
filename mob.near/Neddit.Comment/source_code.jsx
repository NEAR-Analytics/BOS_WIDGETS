const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/comment`, blockHeight) ?? "null");
const parentItem = content.item;
const rootItem = content.rootItem;
const highlight = !!props.highlight;

const extractNotifyAccountId = (item) => {
  if (!item || item.type !== "social" || !item.path) {
    return undefined;
  }
  const accountId = item.path.split("/")[0];
  return `${accountId}/post/main` === item.path ||
    `${accountId}/post/comment` === item.path
    ? accountId
    : undefined;
};

const link = `/mob.near/widget/Neddit.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

const item = {
  type: "social",
  path: `${accountId}/post/comment`,
  blockHeight,
};

return (
  <>
    <div className={`post ${highlight ? "bg-warning bg-opacity-10" : ""}`}>
      <div className="left">
        <Widget
          loading=""
          src="mob.near/widget/MainPage.N.Post.Left"
          props={{ accountId }}
        />
      </div>
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
          loading={
            <div
              className="overflow-hidden w-100 placeholder-glow"
              style={{ minHeight: "100px" }}
            />
          }
          src="mob.near/widget/MainPage.N.Post.Content"
          props={{ content }}
        />
        {blockHeight !== "now" ? (
          <div className="buttons d-flex justify-content-between">
            {parentItem && (
              <div key="comment">
                <Widget
                  loading=""
                  src="mob.near/widget/N.CommentButton"
                  props={{
                    disabled: permissions.disableComment,
                    onClick: () =>
                      !state.showReply && State.update({ showReply: true }),
                  }}
                />
              </div>
            )}
            <Widget
              loading=""
              src="mob.near/widget/N.RepostButton"
              props={{
                item,
                disabled: true,
              }}
            />
            <Widget
              loading=""
              src="mob.near/widget/N.LikeButton"
              props={{
                notifyAccountId,
                item,
              }}
            />
            <Widget
              loading=""
              src="mob.near/widget/MainPage.N.Post.ShareButton"
              props={{ accountId, blockHeight, postType: "comment", link }}
            />
          </div>
        ) : (
          <div className="buttons-placeholder" />
        )}
      </div>
    </div>
    {state.showReply && (
      <div className="mb-2" key="reply">
        <Widget
          src="mob.near/widget/MainPage.N.Comment.Compose"
          props={{
            initialText: `@${accountId}, `,
            notifyAccountId: extractNotifyAccountId(parentItem),
            item: parentItem,
            rootItem,
            onComment: () => State.update({ showReply: false }),
          }}
        />
      </div>
    )}
  </>
);
