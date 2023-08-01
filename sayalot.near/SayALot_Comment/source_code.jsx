const realArticleId = props.realArticleId;
if (!realArticleId) {
  return "Article id not provided";
}

console.log(props);

const isDebug = props.isDebug;

const addressForArticles = isDebug ? "test_sayALotArticle" : "sayALotArticle";
const addressForComments = isDebug
  ? "test_sayalot-comments"
  : "sayalot-comments";
const authorForWidget = "sayalot.near";
State.init({ showReply: false });
const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(
    Social.get(
      `${accountId}/${addressForArticles}/${addressForComments}`,
      blockHeight
    ) ?? "null"
  );

console.log(3, content);
console.log(4, `${accountId}/${addressForArticles}/${addressForComments}`);
console.log(5, blockHeight);

const parentItem = content.item;
const highlight = !!props.highlight;
const raw = !!props.raw;

const item = {
  type: "social",
  path: `${accountId}/post/comment`,
  blockHeight,
};

//TODO - adress should be changed
const link = `#/mob.near/widget/MainPage.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

console.log(
  "props: ",
  `{accountId: ${accountId}, blockHeight: ${blockHeight}, link: ${link}, postType: "comment" }`
);

return (
  <>
    <div
      className={`pt-3 border-top pb-2 ${
        highlight ? "bg-warning bg-opacity-10" : ""
      }`}
    >
      <Widget
        src="mob.near/widget/MainPage.Post.Header"
        props={{ accountId, blockHeight, link, postType: "comment" }}
      />
      <div className="mt-2 text-break">
        <Widget
          src="mob.near/widget/MainPage.Post.Content"
          props={{ content, raw }}
        />
      </div>
      {blockHeight !== "now" && (
        <div className="mt-1 d-flex">
          {parentItem && (
            <Widget
              src="mob.near/widget/CommentButton"
              props={{
                onClick: () => State.update({ showReply: !state.showReply }),
              }}
            />
          )}

          <Widget
            src={`${authorForWidget}/widget/SayALot_Reactions`}
            props={{
              // notifyAccountId,
              item,
              realArticleId,
              isDebug,
            }}
          />
        </div>
      )}
    </div>
    {state.showReply && (
      <div className="mb-2" key="reply">
        <Widget
          src={`${authorForWidget}/widget/SayALot_Comment.Compose`}
          props={{
            isDebug,
            initialText: `${accountId}, `,
            // notifyAccountId: extractNotifyAccountId(parentItem),
            item: parentItem,
            onComment: () => State.update({ showReply: false }),
          }}
        />
      </div>
    )}
  </>
);
