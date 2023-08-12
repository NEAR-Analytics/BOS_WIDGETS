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
  <div className={highlight ? "bg-warning bg-opacity-10" : ""}>
    <div className="post">
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
        <div className="mt-2 text-break">
          <Widget
            src="mob.near/widget/MainPage.Post.Content"
            props={{ content, raw }}
          />
        </div>
        {blockHeight !== "now" && (
          <div className="mt-1 d-flex justify-content-between">
            {parentItem && (
              <div key="comment" className="me-4">
                <Widget
                  src="mob.near/widget/CommentButton"
                  props={{
                    onClick: () =>
                      !state.showReply && State.update({ showReply: true }),
                  }}
                />
              </div>
            )}
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
                props={{ accountId, blockHeight, postType: "comment" }}
              />
            </div>
          </div>
        )}
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
  </div>
);
