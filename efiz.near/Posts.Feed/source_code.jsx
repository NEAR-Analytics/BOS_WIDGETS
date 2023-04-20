/**
 * Forked from near/widget/Posts.Feed
 *
 */

const bucket = props.bucket; // this should come from type
const domain = props.domain;
const hashtags = props.hashtags || [];

if (!domain) {
  return <p>no domain provided</p>;
}

let index = [];

if (hashtags && hashtags.length > 0) {
  // either grab all posts matching this hashtag
  // and filter them out in "renderItem"
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
  // or only look at this domain
  index.push({
    action: domain,
    key: "main",
    options: {
      limit: 10,
      order: "desc",
      accountId: props.accounts,
    },
  });
  // option to include all posts
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

const renderItem = (a) => {
  if (domain !== bucket) {
    return (
      (a.value.type === "md" && (
        <Post className="post" key={JSON.stringify(a)}>
          <Widget
            src="near/widget/Posts.Post"
            props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
          />
        </Post>
      )) || // check for hashtags
      (a.value.type === "social" &&
        `${a.accountId}/${domain}/main` === a.value.path && (
          <div key={JSON.stringify(a)} className="mb-3">
            <Widget
              src="mob.near/widget/MainPage.Post"
              props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
            />
          </div>
        )) ||
      (a.value.type === "social" &&
        `${a.accountId}/${domain}/comment` === a.value.path && (
          <div key={JSON.stringify(a)} className="mb-3">
            <Widget
              src="mob.near/widget/MainPage.Comment.Post"
              props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
            />
          </div>
        ))
    );
  } else {
    return (
      (a.value.type === "md" && (
        <Post className="post" key={JSON.stringify(a)}>
          <Widget
            src="near/widget/Posts.Post"
            props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
          />
        </Post>
      )) || // check for hashtags
      (a.value.type === "social" &&
        `${a.accountId}/post/main` === a.value.path && (
          <div key={JSON.stringify(a)} className="mb-3">
            <Widget
              src="mob.near/widget/MainPage.Post"
              props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
            />
          </div>
        )) ||
      (a.value.type === "social" &&
        `${a.accountId}/post/comment` === a.value.path && (
          <div key={JSON.stringify(a)} className="mb-3">
            <Widget
              src="mob.near/widget/MainPage.Comment.Post"
              props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
            />
          </div>
        ))
    );
  }
};

return (
  <Widget src="mob.near/widget/MergedIndexFeed" props={{ index, renderItem }} />
);
