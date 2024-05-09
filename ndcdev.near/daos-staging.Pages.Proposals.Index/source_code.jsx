let { contractName } = VM.require(`ndcdev.near/widget/daos-staging.Config`);

if (!contractName) return <Widget src="flashui.near/widget/Loading" />;

let { id } = props;

const post = Near.view(contractName, "get_post_by_id", {
  id: parseInt(id),
});

return (
  <Widget
    src="ndcdev.near/widget/daos-staging.Components.Post"
    props={{
      item: post,
      index: post.id,
      type: post.post_type,
      id: post.id,
      showMoreDefault: post.id,
      showCommentsDefault: true,
      disabeleOpenReportLInk: true,
    }}
  />
);
