const { getPost } =
  VM.require("events-committee.near/widget/core.adapter.devhub-contract") ||
  (() => {});

const { postKey, template } = props;

const post = getPost({ post_id: parseInt(postKey) });

if (!post) {
  return <div>Loading ...</div>;
}

const Template = template || (() => <></>);

return (
  <Template
    labels={post.snapshot.labels}
    data={JSON.parse(post.snapshot.description || "null") || {}}
  />
);
