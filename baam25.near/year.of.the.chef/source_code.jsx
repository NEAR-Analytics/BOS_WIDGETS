const [state, setState] = useState({
  currentTab: "list",
});

const { currentTab } = state;

const updateState = (update) => {
  setState({ ...state, ...update });
};

const font = fetch("https://fonts.cdnfonts.com/css/seven-monkey-fury-bb").body;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: "Seven Monkey Fury BB", sans-serif;
  ${font}
  .no-nft {
    font-size: 34px;
    text-align: center;
  }
  .btn-main {
    font-size: 1rem;
    margin-top: 1rem;
    background-color: #fff;
    width: fit-content;
    background-image: none;
    background-position: 0 90%;
    background-repeat: repeat no-repeat;
    background-size: 4px 3px;
    border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
    border-style: solid;
    border-width: 2px;
    border-color: #ec2109;
    box-shadow: #890e3334 15px 28px 25px -18px;
    box-sizing: border-box;
    color: #ec2109;
    cursor: pointer;
    display: inline-block;
    outline: none;
    padding: 1rem;
    text-decoration: none;
    transition: all 235ms ease-in-out;
    border-bottom-left-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    &.active {
      background: #ec2109;
      color: white;
    }
  }
  .btn-main:hover {
    box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px -5px;
    transform: translate3d(0, 2px, 0);
  }
  .tabs {
    display: flex;
    gap: 1rem;
  }
`;

const bgIocns = [
  "bafkreicrkimq4qurz2otbav3qiffroysujryrny4min7lxqjlqpembzxay",
  "bafkreihutrcg7fvrcwq47yzg3kinnnl5bqzo7on7rrrb37xejojjx3vrya",
  "bafkreihlclbgvfhugq4y2gso2knpd6iiedyshc2lmn2eub3wwlmg77ah4e",
];
const tabs = ["list", "explore"];
return (
  <Container>
    <h1 className="mb-2" style={{ color: "#ec2109" }}>
      <div> year of the chef</div>
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => updateState({ currentTab: tab })}
            className={`btn-main ${tab === currentTab ? "active" : ""}`}
          >
            {tab}
          </div>
        ))}
      </div>
    </h1>
    {currentTab === "list" && <Widget src="baam25.near/widget/list" />}
    {currentTab === "explore" && <Widget src="baam25.near/widget/explore" />}
  </Container>
);
