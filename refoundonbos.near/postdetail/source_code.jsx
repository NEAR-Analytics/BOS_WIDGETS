const { seriesId } = props;
const contractId = "refoundjournalism.near";
State.init({
  post: null,
  postIsFetched: false,
});

if (!state.postIsFetched) {
  Near.asyncView(contractId, "get_series_details", {
    id: parseInt(seriesId),
  }).then((post) => State.update({ post, postIsFetched: true }));
}

if (!state.postIsFetched) return "Loading...";
console.log("post", state.post);
const Projects = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  list-style: none;
  grid-gap: 36px;
  margin-bottom: 36px;
`;

const Nav = styled.div`
  // commenting out stickiness for now
  // position: fixed;
  // top: 0;
  // left: 0;
  width: 100%;
  display: flex;
  padding: 0 64px 0 64px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: ${navHeightPx}px;
  background: #ffffff;
  z-index: 1000;
  // background: pink;

  @media screen and (max-width: 768px) {
    // display: none;
    padding: 24px 8px 24px 16px;
    height: ${navHeightPxMobile}px;
  }

  & > a {
    width: 10rem;
  }
`;

const NavLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  // background: green;
`;

const NavRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const NavRightMobile = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    padding-right: 16px;
  }
`;

const NavLogo = styled.a`
  text-align: center;
  color: #2e2e2e;
  font-size: 23.95px;
  font-weight: 700;
  line-height: 23.95px;
  word-wrap: break-word;
  margin-right: 48px;
  text-decoration: none;

  :hover {
    text-decoration: none;
  }
`;

const NavTabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavTab = styled.a`
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: ${(props) => (props.selected ? "#2E2E2E" : "#7B7B7B")};
  font-size: 14px;
  font-weight: ${(props) => (props.selected ? 500 : 400)};
  line-height: 16px;
  word-wrap: break-word;
  text-decoration: none;
  position: relative;

  :not(:last-child) {
    margin-right: 32px;
  }

  :hover {
    text-decoration: none;
  }
`;

const IB = "nearui.near/widget/Input.Button";

// projects = null;
return (
  <>
    <div style={{ marginTop: "5%" }}>
      <h3>{state.post.metadata.title}</h3>
      <p>by {state.post.owner_id}</p>
      <img
        src={
          state.post.metadata.media ||
          "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm"
        }
      ></img>
      <p>{state.post.metadata.description}</p>
      <p>
        Location:{" "}
        {state.post.metadata.extra &&
          JSON.parse(state.post.metadata.extra).locationTaken}
      </p>
      <p>
        Date Taken:{" "}
        {state.post.metadata.extra &&
          JSON.parse(state.post.metadata.extra).dateTaken}
      </p>
      <p>Tags: {tags}</p>
      <button style={{ backgroundColor: "black", borderColor: "black" }}>
        Up Vote
      </button>
      <button style={{ backgroundColor: "black", borderColor: "black" }}>
        Down Vote
      </button>
      <button>Purchase License</button>
      <div style={{ padding: "20px" }}></div>
      <button style={{ backgroundColor: "#A2733B", borderColor: "#A2733B" }}>
        Fund Relief
      </button>
      <div style={{ padding: "5%" }}></div>
    </div>
  </>
);
