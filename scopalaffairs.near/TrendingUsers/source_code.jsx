// Styled components
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

const Profile = styled.div`
`;

const Profiles = styled.div`
  // display: grid;
  // grid-template-columns: repeat(3, minmax(0, 1fr));
  // gap: 24px;

  // @media (max-width: 1024px) {
  //   grid-template-columns: repeat(2, minmax(0, 1fr));
  // }

  // @media (max-width: 800px) {
  //   grid-template-columns: minmax(0, 1fr);
  // }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Set inital State
State.init({
  currentPage: 1,
  isLoading: null,
  error: null,
});

const totalPages = 25; // all pages, get from files or set to 25 for now...
const STORE = "storage.googleapis.com";
const BUCKET = "databricks-near-query-runner";
const BASE_URL = `https://${STORE}/${BUCKET}/output`;

const userData = [];
const getTrendingUsers = (page) => {
  try {
    const url = `${BASE_URL}/trending_users_page_${page}.json`;
    const res = fetch(url);
    if (res.ok) {
      const parsedResults = JSON.parse(res.body);
      console.log(parsedResults.data);
      userData.push(parsedResults.data);
    } else {
      console.log("Error fetching data.");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadMore = () => {
  State.update({ currentPage: state.currentPage + 1 });
};

getTrendingUsers(state.currentPage);

if (state.isLoading) {
  return <p>Loading...</p>;
}

if (state.error) {
  return <p>Error: {error}</p>;
}

if (userData) {
  const trendingUsersList = userData.map((user, index) => (
    <Profiles className="list-group" key={index}>
      <Profile>
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
            profileImage: user.profileImage,
          }}
        />
      </Profile>
    </Profiles>
  ));

  return (
    <Wrapper>
      <H1>Trending Users</H1>
      {trendingUsersList}
      {
        <Button type="button" onClick={() => loadMore()}>
          Load More
        </Button>
      }
    </Wrapper>
  );
}
