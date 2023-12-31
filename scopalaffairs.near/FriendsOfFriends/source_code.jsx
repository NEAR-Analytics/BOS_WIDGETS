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

const FriendsOfFriends = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 100px;
`;

// Set initial State
State.init({
  currentPage: 1,
  userData: [],
  isLoading: true,
  error: null,
  totalPages: 1,
});

const STORE = "storage.googleapis.com";
const BUCKET = "databricks-near-query-runner";
const BASE_URL = `https://${STORE}/${BUCKET}/output/recommendations`;

const updateState = (data, totalPageNum) => {
  State.update({
    isLoading: false,
    userData: [...state.userData, ...data],
    totalPages: totalPageNum,
  });
};

const getFriendsOfFriends = (page) => {
  try {
    const url = `${BASE_URL}/second_degree_following_${context.accountId}_${page}.json`;
    if (state.currentPage == 1) {
      const res = fetch(url);
      if (res.ok) {
        const parsedResults = JSON.parse(res.body);
        const totalPageNum = parsedResults.total_pages;
        updateState(parsedResults.data, totalPageNum);
      } else {
        console.log(
          "Error fetching data. Try reloading the page, or no data available."
        );
      }
    } else {
      asyncFetch(url).then((res) => {
        if (res.ok) {
          const parsedResults = JSON.parse(res.body);
          const totalPageNum = parsedResults.total_pages;
          updateState(parsedResults.data, totalPageNum);
        } else {
          console.log("Error fetching data. Try reloading the page.");
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadMore = () => {
  const nextPage = state.currentPage + 1;
  if (nextPage <= state.totalPages) {
    State.update({ currentPage: nextPage });
    getFriendsOfFriends(nextPage);
  }
};

if (state.isLoading) {
  getFriendsOfFriends(state.currentPage);
}

return (
  <FriendsOfFriends>
    <H1>Friends of Friends</H1>
    {state.isLoading && <p>Loading...</p>}
    {state.error && <p>Error: {state.error}</p>}
    <Profiles>
      {state.userData.map((user, index) => (
        <Profile key={index}>
          <Widget
            src="scopalaffairs.near/widget/AccountProfileCardFriendsOfFriends"
            props={{
              accountId: user.recommended_profile,
              showTags: true,
              showFollowerStats: true,
              showFollowButton: state.multiSelectMode === false,
              follows_you: user.follows_you,
              because_you_follow: user.because_you_follow,
              aggregated_authority_score: user.aggregated_authority_score,
              aggregated_hub_score: user.aggregated_hub_score,
              tags_similarity_score: user.tags_similarity_score,
              signer_id: user.signer_id,
              similar_posts: user.similar_posts,
            }}
          />
        </Profile>
      ))}
    </Profiles>
    {state.currentPage < state.totalPages ? (
      <Button type="button" onClick={() => loadMore()}>
        Load More
      </Button>
    ) : null}
  </FriendsOfFriends>
);
