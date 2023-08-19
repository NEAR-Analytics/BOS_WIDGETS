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
  border-bottom: 1px solid #eee;
  margin: 0 -12px;
  line-height: normal;
  
  .post {
    position: relative;
    padding: 12px;
    padding-bottom: 4px;
    display: flex;
    h1, h2, h3, h4, h5, h6 {
      font-size: 16px !important;
    }
    h1, h2, h3, h4, h5, h6, strong, b {
      font-weight: 500 !important;
    }
    p, ol, ul, dl {
      margin-bottom: 0.5rem;
      white-space: inherit;
    }
    hr {
      display: none;
    }
    img {
      border-radius: var(--bs-border-radius-lg);
      max-heigth: 50vh;
    }

    :hover {
      background-color: rgba(0, 0, 0, 0.03);
    }

    .post-header {
      margin: 4px 0;
    }
  }

  .post:not(:last-child):before {
    content: "";
    position: absolute;
    left: 30px;
    top: 56px;
    bottom: 0;
    width: 2px;
    background-color: #ddd;
    z-index: -1;
  }

  .post:not(:first-child):after {
    content: "";
    position: absolute;
    left: 30px;
    top: 0;
    width: 2px;
    height: 8px;
    background-color: #ddd;
    z-index: -1;
  }
  
  .left {
    padding-right: 12px;
  }
  .right {
    margin-top: -4px;
    flex-grow: 1;
    min-width: 0;
  }

  .buttons-placeholder {
    padding-bottom: 10px;
  }

  .buttons {
    margin-left: -8px;
    margin-top: 10px;
    margin-bottom: 6px;
    column-gap: 4px;
    color: #888;
  }

  .reposted {
    padding-top: 30px;
  }
`;

return (
  <Wrapper>
    <div className={`post ${props.reposted ? "reposted" : ""}`}>
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
        <Widget
          src="mob.near/widget/MainPage.N.Post.Content"
          props={{ content, raw }}
        />
        {blockHeight !== "now" ? (
          <div className="buttons d-flex justify-content-between">
            <Widget
              src="mob.near/widget/N.CommentButton"
              props={{
                onClick: () => State.update({ showReply: !state.showReply }),
              }}
            />
            <Widget
              src="mob.near/widget/N.RepostButton"
              props={{
                notifyAccountId,
                item,
              }}
            />
            <Widget
              src="mob.near/widget/N.LikeButton"
              props={{
                notifyAccountId,
                item,
              }}
            />
            <Widget
              src="mob.near/widget/MainPage.N.Post.ShareButton"
              props={{ accountId, blockHeight, postType: "post" }}
            />
          </div>
        ) : (
          <div className="buttons-placeholder" />
        )}
      </div>
    </div>
    {state.showReply && (
      <div className="border-top">
        <Widget
          src="mob.near/widget/MainPage.N.Comment.Compose"
          props={{
            notifyAccountId,
            item,
            onComment: () => State.update({ showReply: false }),
          }}
        />
      </div>
    )}
    <Widget
      src="mob.near/widget/MainPage.N.Comment.Feed"
      props={{
        item,
        highlightComment: props.highlightComment,
        limit: props.commentsLimit,
        subscribe,
        raw,
      }}
    />
  </Wrapper>
);
