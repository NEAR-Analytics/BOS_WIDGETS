let trendingUsersView = {};
const limitPerPage = 20;

State.init({
  currentPage: 1,
});

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

// // ASYNC VERSION >>>>>
// replace with value from meta file, or passed in the json
const num_pages = 2;

const BASE_URL =
  "https://storage.googleapis.com/databricks-near-query-runner/output";

const fetchPage = (page) => {
  const url = `${BASE_URL}/trending_users_page_${page}.json`;
  return asyncFetch(url);
};

const fetchAllPages = (currentPage) => {
  const results = [];
  if (currentPage <= num_pages) {
    const pageData = fetchPage(currentPage);
    if (pageData) {
      results.push(pageData);
    }
    // const nextPageData = fetchAllPages(currentPage + 1);
    // results.push(...nextPageData);
  }
  return results;
};

const getTrendingUsersAsync = () => {
  fetchAllPages(1).then((results) => {
    console.log("fulfill", results);
    State.update({
      data: JSON.parse(results.body),
    });
  });
};
// // <<<<<<

const getTrendingUsers = (page) => {
  try {
    const url = `https://storage.googleapis.com/databricks-near-query-runner/output/trending_users_page_${page}.json`;
    const res = fetch(url);
    if (res.ok) {
      return res.body;
    } else {
      console.log("Error fetching the data.");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const trendingUsers = getTrendingUsers(state.currentPage);
const data = JSON.parse(trendingUsers);
if (data) {
  const trendingUsersList = data.data.map((user, index) => (
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

  trendingUsersView = <Items className="list-group">{trendingUsersList}</Items>;
}

if (data !== null && data.length === 0) {
  return <Text>No data.</Text>;
}

const showLoadMoreButton = getTrendingUsers(state.currentPage);

const loadMore = () => {
  State.update({ currentPage: state.currentPage + 1 });
};

return (
  <Wrapper>
    <H1>Trending Users</H1>
    {trendingUsersView}
    {showLoadMoreButton && (
      <Button type="button" onClick={() => loadMore()}>
        Load More
      </Button>
    )}
  </Wrapper>
);
