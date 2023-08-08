let trendingUsersView = null;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 64px;
  line-height: normal;
  color: #11181c;
  margin: 4rem 0;
`;

const Item = styled.div`
`;

const getTrendingUsers = () => {
  try {
    const url = `https://storage.googleapis.com/databricks-near-query-runner/output/trending_users.json`;
    const res = fetch(url);
    if (res.ok) {
      return res.body;
    } else {
      return (
        <>
          <h1>Error fetching the API...</h1>
        </>
      );
    }
  } catch (error) {
    console.log(error.message);
  }
};

const recs = getTrendingUsers();
if (recs) {
  const trendingUsers = JSON.parse(recs);
  const trendingUsersList = trendingUsers.data.map((user, index) => (
    <Item key={index}>
      <Widget
        src="scopalaffairs.near/widget/AccountProfileCardLeaderboard"
        props={{
          accountId: user.signer_id,
          showTags: true,
          showFollowerStats: true,
          showFollowButton: state.multiSelectMode === false,
          likers: user.likers,
          followers: user.followers,
          following: user.following,
          leaderboard_last_week: user.trending_metric_last_week,
          leaderboard_prev_week: user.trending_metric_prev_week,
        }}
      />
    </Item>
  ));

  trendingUsersView = (
    <>
      <H1>Leaderboard</H1>
      <Items className="list-group">{trendingUsersList}</Items>
    </>
  );
}

return <>{trendingUsersView}</>;
