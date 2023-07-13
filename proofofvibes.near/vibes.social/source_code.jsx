const hashtags = [
  { name: "ProofOfVibes", required: true },
  { name: "Paris", required: true },
];

return (
  <Widget
    src="efiz.near/widget/Community.Posts"
    props={{
      communityHashtags: hashtags,
      exclusive: false,
      allowPublicPosting: true,
    }}
  />
);
