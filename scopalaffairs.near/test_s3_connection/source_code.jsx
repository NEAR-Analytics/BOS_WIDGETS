let noDataScreen = null;
let trendingUsersView = null;

const getRecommendationsFor = (_accountId) => {
  const url = `gs://databricks-near-query-runner/output/${_accountId}.json`;
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

const rec = getRecommendationsFor(context.userId);

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

  trendingUsersView = (
    <>
      <h1>Trending Users</h1>
      <ul className="list-group">{trendingUsersList}</ul>
    </>
  );
}

return (
  <>
    {noDataScreen}
    {trendingUsersContent}
  </>
);
