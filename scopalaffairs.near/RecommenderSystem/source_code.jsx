let noDataScreen = null;
let trendingUsersContent = null;
let similarPostsContent = null;
let similarTagsContent = null;

const getRecommendationsFor = (_accountId) => {
  const bucketName = "near-public-lakehouse";
  const url = `https://${bucketName}.s3.amazonaws.com/silver/near-social/${_accountId}.json`;
  const res = fetch(url);

  if (res.ok) {
    return res.body;
  } else {
    noDataScreen = (
      <>
        <h1>No Data Available</h1>
        <p>No trending users or similar posts or similar profile tags found.</p>
      </>
    );
  }
};

const accountId = context.userId;
const rec = getRecommendationsFor(accountId);

if (!!rec[0].trending_users) {
  const trendingUsers = JSON.parse(rec[0].trending_users).user_name;
  const trendingUsersList = Object.values(trendingUsers).map(
    (accountId, index) => (
      <li key={index}>
        <Widget
          src="near/widget/AccountProfile"
          props={{
            accountId,
            showTags: props.showTags,
            showFollowerStats: true,
            showFollowButton: state.multiSelectMode === false,
          }}
        />
      </li>
    )
  );

  trendingUsersContent = (
    <>
      <h1>Trending Users</h1>
      <p>Finding the most relevant users for you based on common metrics.</p>
      <ul className="list-group">{trendingUsersList}</ul>
    </>
  );
}

if (!!rec[1].similar_posts) {
  const similarPosts = rec[1].similar_posts;
  const similarPostsList = similarPosts.map((accountId, index) => (
    <li key={index}>
      <Widget
        src="near/widget/AccountProfile"
        props={{
          username: accountId[2],
          showTags: props.showTags,
          showFollowerStats: true,
          showFollowButton: state.multiSelectMode === false,
        }}
      />
      <p>Similarity Score: {accountId[1].toFixed(2)}</p>
    </li>
  ));

  similarPostsContent = (
    <>
      <h1>Users with similar content</h1>
      <p>Because you recently posted.</p>
      <ul className="list-group">{similarPostsList}</ul>
    </>
  );
}

if (!!rec[2].similar_tags) {
  const similarTags = rec[2].similar_tags;
  console.log("similar+tags", similarTags);

  const similarTagsList = similarTags.map((accountId, index) => (
    <li key={index}>
      <Widget
        src="near/widget/AccountProfile"
        props={{
          username: accountId[2],
          showTags: props.showTags,
          showFollowerStats: true,
          showFollowButton: state.multiSelectMode === false,
        }}
      />
      <p>Similarity Score: {accountId[1].toFixed(2)}</p>
    </li>
  ));

  similarTagsContent = (
    <>
      <h1>Users with similar profiles</h1>
      <p>Because you added tags.</p>
      <ul className="list-group">{similarTagsList}</ul>
    </>
  );
}

return (
  <>
    {noDataScreen}
    {trendingUsersContent}
    {similarPostsContent}
    {similarTagsContent}
  </>
);
