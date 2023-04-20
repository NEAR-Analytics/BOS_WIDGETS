const bucket = props.bucket;
const domain = props.domain;
const hashtags = props.hashtags || [];

if (!domain) {
  return <p>no domain provided</p>;
}

let index = [];
if (hashtags && hashtags.length > 0) {
  index = hashtags.map((it) => ({
    action: "hashtag",
    key: it.toLowerCase(),
    options: {
      limit: 10,
      order: "desc",
      accountId: props.accounts,
    },
  }));
} else {
  index.push({
    action: domain,
    key: "main",
    options: {
      limit: 10,
      order: "desc",
      accountId: props.accounts,
    },
  });
  if (domain !== bucket) {
    index.push({
      action: domain,
      key: "main",
      options: {
        limit: 10,
        order: "desc",
        accountId: props.accounts,
      },
    });
  }
}

const Post = styled.div`
  border-bottom: 1px solid #eceef0;
  padding: 24px 0 12px;

  @media (max-width: 1200px) {
    padding: 12px 0 0;
  }
`;

const renderItem = (a) =>
  a.value.type === "md" && (
    <Post className="post" key={JSON.stringify(a)}>
      <Widget
        src="near/widget/Posts.Post"
        props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
      />
    </Post>
  );

return (
  <Widget src="mob.near/widget/MergedIndexFeed" props={{ index, renderItem }} />
);
