let { contractName } = VM.require(`ndcdev.near/widget/daos.Config`);

if (!contractName) return <Widget src="flashui.near/widget/Loading" />;

let { post_id, comment_id } = props;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem;
  margin: 3rem 0;
  border-radius: 20px;
  background: white;

  @media screen and (max-width: 786px) {
    padding: 1rem;
  }
`;

const comments = Near.view(contractName, "get_post_comments", {
  post_id: parseInt(post_id),
});

const post = Near.view(contractName, "get_post_by_id", {
  id: parseInt(post_id),
});

return (
  <div className="w-100 d-flex flex-column justify-content-start">
    <h2>
      Comments for {post.post_type}:{" "}
      <a href={`/ndcdev.near/widget/daos.App?page=proposal&id=${post.id}`}>
        {post.title}
      </a>
    </h2>
    <Container>
      <Widget
        src="ndcdev.near/widget/daos.Components.Comments"
        props={{
          postId: post_id,
          commentId: comment_id,
          showCreate: true,
        }}
      />
      <Widget
        src="ndcdev.near/widget/daos.Components.CreateReply"
        props={{
          id: post_id,
          commentId: comment_id,
        }}
      />
    </Container>
  </div>
);
