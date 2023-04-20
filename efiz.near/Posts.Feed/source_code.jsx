const domains = props.domains;
const hashtags = props.hashtags;

let index;
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
  if (domain !== "") {
    index = domains.map((it) => ({
      action: it,
      key: "main",
      options: {
        limit: 10,
        order: "desc",
        accountId: props.accounts,
      },
    }));
  } else {
    index = {
      action: "post",
      key: "main",
      options: {
        limit: 10,
        order: "desc",
        accountId: props.accounts,
      },
    };
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
