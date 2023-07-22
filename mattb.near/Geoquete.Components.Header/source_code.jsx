let { onRefresh, onConnect } = props;

State.init({
  account: "",
});

const HeaderBox = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%;

    .connect-wallet {
        background:rgba(0,0,0,1);
        border-radius:10px;
        font-size:.8rem;
        font-weight:bold;
        color:#fff;
        box-shadow: 0 0 0 4px rgba(0,0,0,.1);
        height:40px;
    }
`;

const Heading = styled.p`
  margin: 0;
  padding:0;
  font-size: 1.5em;
  color:#0f1d40;
  text-align: center;
  font-family: "SF Pro Display",sans-serif;
`;

const Links = styled.ul`
  display:flex;
  padding:0;
  margin:0;
  list-style:none;
  justify-content:center;

  li {
    display:block;
    background-color:rgba(0,0,0,.02);
    border:1px solid rgba(0,0,0,.05);
    border-radius:10px;
    padding: .2rem 1rem;
    margin-top: 20px;
    transition:all .2s;
    cursor:pointer;
    font-size:.8rem;

    &:hover {
      transition:all .2s;
      background-color:rgba(0,0,0,.07);
    }

    &:not(:last-of-type) {
      margin-right:10px;
    }
  }

`;

let tabs = {
  home: "Home",
  create: "Create quest",
  join: "Join quest",
  review: "Review quests",
};

// Init
if (state.account === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ account: accounts[0] });
    onConnect(() => Ethers);
  }
}

return (
  <>
    <HeaderBox>
      <Heading
        style={{
          "text-align": "left",
        }}
        className="fw-bold"
      >
        GeoQuête
      </Heading>
      <Web3Connect
        className="connect-wallet"
        connectLabel="Connect wallet"
        disconnectLabel="Disconnect"
      />
    </HeaderBox>
    <Links>
      {Object.keys(tabs).map((tab) => (
        <li onClick={() => onRefresh(tab)}>{tabs[tab]}</li>
      ))}
    </Links>
  </>
);
