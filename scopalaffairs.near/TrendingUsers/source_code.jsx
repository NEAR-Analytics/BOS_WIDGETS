const limitPerPage = 20;
let trendingUsersResults = null;

State.init({
  currentPage: 0,
});

const showLoadMoreButton = data.length % limitPerPage === 0;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 8px;
  height: 32px;
  background: #fbfcfd;
  border: 1px solid #d7dbdf;
  border-radius: 50px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: #11181c !important;
  margin: 0;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
  }

  span {
    color: #687076 !important;
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

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const getTrendingUsers = () => {
  try {
    const url = `https://storage.googleapis.com/databricks-near-query-runner/output/trending_users.json`;
    const res = fetch(url);
    if (res.ok) {
      return res.json();
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

const data = getTrendingUsers();
if (data) {
  const trendingUsers = JSON.parse(data);
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
        }}
      />
    </Item>
  ));

  trendingUsersResults = (
    <>
      <H1>Leaderboard</H1>
      <Items className="list-group">{trendingUsersList}</Items>
    </>
  );
}

// if (data !== null && data.length === 0) {
//   return <Text>No recommendations? This should not happen.</Text>;
// }

return (
  <Wrapper>
    {trendingUsersResults}
    {showLoadMoreButton && (
      <Button
        type="button"
        onClick={() => State.update({ currentPage: state.currentPage + 1 })}
      >
        Load More
      </Button>
    )}
  </Wrapper>
);
