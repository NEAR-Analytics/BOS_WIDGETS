if (context.loading) return "Loading ...";

const elementToLike = "I<3Near";
const [hasLike, setHasLike] = useState(false);
const [totalLikes, setTotalLikes] = useState(0);

const likes = Social.index("like", elementToLike, { subscribe: true });
const userLike = context.accountId
  ? Social.index("like", elementToLike, {
      accountId: context.accountId,
    })
  : [];

let dataLoading = likes === null || userLike === null;

useEffect(() => {
  likes && setTotalLikes(likes.length);
}, [likes]);

useEffect(() => {
  userLike && setHasLike(userLike.length > 0);
}, [userLike]);

const LikeButton = styled.button`
  border: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #687076;
  font-weight: 400;
  font-size: 3rem;
  line-height: 17px;
  cursor: pointer;
  background: none;
  padding: 6px;
  transition: color 200ms;

  i {
    font-size: 3rem;
    transition: color 200ms;

    &.bi-heart-fill {
      color: #E5484D !important;
    }
  }
`;

const Main = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI
`;

const likeClick = () => {
  const data = {
    index: {
      like: JSON.stringify({
        key: elementToLike,
        value: "liked",
      }),
    },
  };

  Social.set(data, {
    onCommit: () => {
      setHasLike(true);
      setTotalLikes(totalLikes + 1);
    },
    onCancel: () => {},
  });
};

return (
  <Main>
    <div class="text-center">
      <h3 class="font-weight-bold"> Welcome to Near </h3>

      <div class="container py-3 text-dark bg-light rounded-3">
        <p class="small font-weight-light">
          You're gonna
          <span class="text-danger">like it</span>
          here
        </p>

        <LikeButton
          disabled={context.loading || dataLoading || !context.accountId}
          onClick={likeClick}
        >
          <i className={`${hasLike ? "bi-heart-fill" : "bi-heart"}`} />
          {totalLikes}
        </LikeButton>
      </div>
    </div>
  </Main>
);
