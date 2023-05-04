const lastEditorAccountId = props.lastEditorAccountId;
const wikiSiteBlockHeight = props.wikiSiteBlockHeight;

const addressForArticles = "wikiTest2Article";
const addressForComments = "wikiTest2Comment";
const authorForWidget =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
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
const parentItem = content.item;
const highlight = !!props.highlight;
const raw = !!props.raw;

//TODO - adress should be changed
const link = `#/mob.near/widget/MainPage.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

props.allWidgetsInlineStyles.shareWidget;

const shareWidgetStyles = {
  shareWidget: {
    i: { cursor: "pointer", padding: "1rem" },
    showShareOptionsContainer: {
      position: "absolute",
      right: "10%",
      backgroundColor: "#FFFFFF",
      border: "1.5px solid #F0F4F7",
      boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
      borderRadius: "28px",
      zIndex: "1",
      width: "40vw",
      maxWidth: "100%",
      minWidth: "240px",
      padding: "1rem",
      border: "1.5px solid #F0F4F7",
    },
    closeIcon: { cursor: "pointer" },
    popUpDescription: {
      color: "#474D55",
      letterSpacing: "-0.01em",
    },
    showLinkShared: {
      backgroundColor: "#F2F6FA",
      padding: "1rem 2rem",
      borderRadius: "17px",
    },
    linkShared: { color: "#0065FF", wordWrap: "anywhere" },
    clipboardContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginLeft: "0.5rem",
      minWidth: "2.5rem",
    },
    clipBoardIconCopied: {
      color: "#0065FF",
      transition: "color 0.3s linear",
      cursor: "pointer",
    },
    clipBoardIconNotCopied: {
      transition: "color 0.3s linear",
      cursor: "pointer",
      color: "black",
    },
    copiedFeedback: { fontSize: "0.7rem" },
  },
};

const shareWidgetClassNames = {
  shareWidget: {
    i: "bi bi-share d-inline-flex align-items-center",
    closePopUpContainer: "d-flex flex-row-reverse",
    closeIcon: "bi bi-x",
    showLinkShared: "d-flex justify-content-between align-items-center",
    clipboardIcon: "bi-clipboard",
    copiedFeedback: "text-secondary",
  },
};

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
        <div className="mt-1 d-flex justify-content-between">
          <Widget
            src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/shareWidget"
            props={{
              allWidgetsClassNames: shareWidgetClassNames,
              allWidgetsInlineStyles: shareWidgetStyles,
              popUpDescription: "Use this link to share the comment",
              shareingWidget: "WikiOnSocialDB_OneArticle",
              propName: [
                "articleId",
                "blockHeight",
                "lastEditor",
                "commentToShareBlockHeight",
              ],
              blockHeight: [
                "ThirdNewDBTest",
                wikiSiteBlockHeight,
                lastEditorAccountId,
                blockHeight,
              ],
              widgetOwner,
            }}
          />
          {parentItem && (
            <Widget
              src="mob.near/widget/CommentButton"
              props={{
                onClick: () => State.update({ showReply: !state.showReply }),
              }}
            />
          )}
        </div>
      )}
    </div>
    {state.showReply && (
      <div className="mb-2" key="reply">
        <Widget
          src={`${authorForWidget}/widget/WikiOnSocialDB_Comment.Compose`}
          props={{
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
