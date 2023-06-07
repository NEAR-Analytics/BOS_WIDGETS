const addressForArticles = "wikiTest2Article";
const addressForComments = "wikiTest2Comment";
const authorForWidget = "eugenewolf507.near";
State.init({ showReply: false, copiedShareUrl: false });
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
const mainPartForSharingComment = props.mainPartForSharingComment;
const shareUrl = `${mainPartForSharingComment}&commentAccountId=${accountId}&commentBlockHeight=${blockHeight}`;

const ShareButtonWrapper = styled.div`
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    color: #11181c !important;

    &:hover,
    &:focus {
      text-decoration: none;
      outline: none;
    }

    i {
      color: #000;
    }

    .bi-16 {
      font-size: 21px;
    }
  }
`;

const link = `#/mob.near/widget/MainPage.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

const item = {
  type: "social",
  path: `${accountId}/post/comment`,
  blockHeight,
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
        <div className="mt-1 d-flex justify-content-between align-items-center">
          <span className="d-inline-flex align-items-center">
            {parentItem && (
              <Widget
                src="mob.near/widget/CommentButton"
                props={{
                  onClick: () => State.update({ showReply: !state.showReply }),
                }}
              />
            )}

            <Widget
              src={`${authorForWidget}/widget/WikiOnSocialDB_Like`}
              props={{
                // notifyAccountId,
                item,
              }}
            />
          </span>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Copy URL to clipboard</Tooltip>}
          >
            <ShareButtonWrapper>
              <button
                className="button"
                type="button"
                onMouseLeave={() => {
                  State.update({ copiedShareUrl: false });
                }}
                onClick={() => {
                  clipboard.writeText(shareUrl).then(() => {
                    State.update({ copiedShareUrl: true });
                  });
                }}
              >
                {state.copiedShareUrl ? (
                  <i className="bi-16 bi bi-check"></i>
                ) : (
                  <i className="bi-16 bi-link-45deg"></i>
                )}
              </button>
            </ShareButtonWrapper>
          </OverlayTrigger>
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
