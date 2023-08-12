const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/main`, blockHeight) ?? "null");
const subscribe = !!props.subscribe;
const raw = !!props.raw;

const notifyAccountId = accountId;
const item = {
  type: "social",
  path: `${accountId}/post/main`,
  blockHeight,
};

const link = `/mob.near/widget/MainPage.N.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

const Wrapper = styled.div`
  padding: 12px;
  display: flex;
  border-bottom: 1px solid var(--bs-border-color);
  
  .left {
    padding-right: 12px;
  }
  .right {
    flex-grow: 1,
    overflow: hidden,
  }
`;

return (
  <>
    <Wrapper>
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
            postType: "post",
            flagItem: item,
          }}
        />
        <div className="text-break">
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
      </div>
    </Wrapper>
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
    </div>
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
  </>
);
