const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
// const subscribe = !!props.subscribe;
const notifyAccountId = accountId;
const postUrl = `https://alpha.near.org/#/roshaan.near/widget/PostPage?accountId=${accountId}&blockHeight=${blockHeight}`;

State.init({
  postExists: true,
  comments: props.comments ?? undefined,
  content: JSON.parse(props.content) ?? undefined,
  likes: props.likes ?? undefined,
});

const item = {
  type: "social",
  path: `${accountId}/post/main`,
  blockHeight,
};

// Load post if not contents and comments are not passed in
if (!state.content || !state.comments || !state.likes) {
  console.log("making call again");
  const postsQuery = `
query IndexerQuery {
  roshaan_near_alphaindexer_posts(
    order_by: {block_height: desc}
    where: {_and: {block_height: {_eq: ${blockHeight}}, account_id: {_eq: "${accountId}"}}}
  ) {
    account_id
    block_height
    block_timestamp
    content
    receipt_id
    accounts_liked
    comments(order_by: {block_height: asc}) {
      account_id
      block_height
      block_timestamp
      content
    }
  }
}
`;

  function fetchGraphQL(operationsDoc, operationName, variables) {
    return asyncFetch(
      "https://query-api-hasura-vcqilefdcq-uc.a.run.app/v1/graphql",
      {
        method: "POST",
        headers: { "x-hasura-role": "roshaan_near" },
        body: JSON.stringify({
          query: operationsDoc,
          variables: variables,
          operationName: operationName,
        }),
      }
    );
  }

  fetchGraphQL(postsQuery, "IndexerQuery", {}).then((result) => {
    if (result.status === 200) {
      if (result.body.data) {
        const posts = result.body.data.roshaan_near_alphaindexer_posts;
        if (posts.length > 0) {
          const post = posts[0];
          let content = JSON.parse(post.content);
          const comments = post.comments;
          State.update({
            content: content,
            comments: comments,
            likes: JSON.parse(post.accounts_liked),
          });
        } else {
          State.update({
            postExists: false,
          });
        }
      }
    }
  });
  if (state.postExists == false) {
    return "Post does not exist.";
  }
  return "loading...";
}

const Post = styled.div`
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 19px;
    top: 52px;
    bottom: 12px;
    width: 2px;
    background: #ECEEF0;
  }
`;

const Header = styled.div`
  margin-bottom: 0;
  display: inline-flex;
`;

const Body = styled.div`
  padding-left: 52px;
  padding-bottom: 1px;
`;

const Content = styled.div`
  img {
    display: block;
    max-width: 100%;
    max-height: 80vh;
    margin: 0 0 12px;
  }
`;

const Text = styled.p`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #687076;
  white-space: nowrap;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: -6px -6px 6px;
`;

const Comments = styled.div`
  > div > div:first-child {
    padding-top: 12px;
  }
`;
const CommentWrapper = styled.div`
  > div:first-child {
    > a:first-child {
      display: inline-flex;
      margin-bottom: 24px;
      font-size: 14px;
      line-height: 20px;
      color: #687076;
      outline: none;
      font-weight: 600;

      &:hover,
      &:focus {
        color: #687076;
        text-decoration: underline;
      }
    }
  }
`;

const renderComment = (a) => {
  return (
    <div key={JSON.stringify(a)}>
      <Widget
        src="roshaan.near/widget/Comments.Comment"
        props={{
          accountId: a.account_id,
          blockHeight: a.block_height,
          content: a.content,
          highlight:
            a.account_id === props.highlightComment?.accountId &&
            a.block_height === props.highlightComment?.blockHeight,
        }}
      />
    </div>
  );
};

const renderedComments = state.comments.map(renderComment);
return (
  <Post>
    <Header>
      <Widget
        src="calebjacob.near/widget/AccountProfile"
        props={{
          accountId,
          hideAccountId: true,
          inlineContent: (
            <>
              <Text as="span">･</Text>
              <Text>
                {blockHeight === "now" ? (
                  "now"
                ) : (
                  <>
                    <Widget
                      src="mob.near/widget/TimeAgo"
                      props={{ blockHeight }}
                    />{" "}
                    ago
                  </>
                )}
              </Text>
            </>
          ),
        }}
      />
    </Header>

    <Body>
      {state.content && (
        <Content>
          {state.content.text && (
            <Widget
              src="calebjacob.near/widget/SocialMarkdown"
              props={{ text: state.content.text }}
            />
          )}

          {state.content.image && (
            <Widget
              src="mob.near/widget/Image"
              props={{
                image: state.content.image,
              }}
            />
          )}
        </Content>
      )}

      {blockHeight !== "now" && (
        <Actions>
          <Widget
            src="roshaan.near/widget/LikeButton"
            props={{
              item,
              notifyAccountId,
              likes: state.likes,
            }}
          />
          <Widget
            src="calebjacob.near/widget/CommentButton"
            props={{
              item,
              onClick: () => State.update({ showReply: !state.showReply }),
            }}
          />
          <Widget
            src="calebjacob.near/widget/CopyUrlButton"
            props={{
              url: postUrl,
            }}
          />
        </Actions>
      )}

      {state.showReply && (
        <div className="mb-2">
          <Widget
            src="calebjacob.near/widget/Comments.Compose"
            props={{
              notifyAccountId,
              item,
              onComment: () => State.update({ showReply: false }),
            }}
          />
        </div>
      )}
      {renderedComments && (
        <Comments>
          <CommentWrapper>{renderedComments}</CommentWrapper>
        </Comments>
      )}
    </Body>
  </Post>
);
