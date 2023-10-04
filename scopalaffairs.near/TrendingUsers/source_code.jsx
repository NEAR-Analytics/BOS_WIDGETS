// Styling
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

const TrendingUsers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 100px;
`;

const Wrapper = styled.div``;

State.init({
  currentPage: 1,
  userData: [],
  isLoading: true,
  error: null,
  totalPages: 1,
});

const updateState = (data, totalPageNum) => {
  State.update({
    isLoading: false,
    userData: [...state.userData, ...data],
    totalPages: totalPageNum,
  });
};

const STORE = "storage.googleapis.com";
const BUCKET = "databricks-near-query-runner";
const BASE_URL = `https://${STORE}/${BUCKET}/output`;

const getTrendingUsers = (page) => {
  try {
    const url = `${props.dataset}_${page}.json`;
    if (state.currentPage == 1) {
      const res = fetch(url);
      if (res.ok) {
        const parsedResults = JSON.parse(res.body);
        const totalPageNum = parsedResults.total_pages || 10;
        updateState(parsedResults.data, totalPageNum);
      } else {
        console.log(
          res,
          "Error fetching data. Try reloading the page, or no data available."
        );
      }
    } else {
      asyncFetch(url).then((res) => {
        if (res.ok) {
          const parsedResults = JSON.parse(res.body);
          const totalPageNum = parsedResults.total_pages || 10;
          updateState(parsedResults.data, totalPageNum);
        } else {
          console.log(res, "Error fetching data. Try reloading the page.");
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadMore = () => {
  const nextPage = state.currentPage + 1;
  if (nextPage <= totalPages) {
    State.update({ currentPage: nextPage });
    getTrendingUsers(nextPage);
  }
};

if (state.isLoading) {
  getTrendingUsers(state.currentPage);

  return (
    <Wrapper>
      <H1>Trending Users</H1>
      <p>Loading...</p>
    </Wrapper>
  );
}

if (state.error) {
  return <p>Error: {state.error}</p>;
}

return (
  <TrendingUsers>
    <H1>Trending Users</H1>
    <Profiles>
      {state.userData.map((user, index) => (
        <Profile key={index}>
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
              profileName: user.profileName,
            }}
          />
        </Profile>
      ))}
    </Profiles>
    {state.currentPage < totalPages ? (
      <Button type="button" onClick={() => loadMore()}>
        Load More
      </Button>
    ) : null}
  </TrendingUsers>
);
