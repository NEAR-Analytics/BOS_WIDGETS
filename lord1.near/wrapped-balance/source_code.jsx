const themeColor = props.themeColor;
const singer = props.singer;
// --------------------
const tabs = {
  USD: "Assets",
  NFT: "NFT",
  Collectibles: "Gallery",
};
const setTab = (tab) => State.update({ tab });

State.init({
  tab: tabs.USD,
});

// tabs container --------------------------------------------

const Container = styled.div`
  &&{text-align:left};
  .tabContent{
    display:inline-flex;
    align-items:left;
    background: rgba(26, 46, 51, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding:3px 4px;
    list-style-type:none;
    margin: 0 auto;
  }
  .tab-item .active{
    background: #304352;
  }
  .tab-item button{
    background-color:transparent;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    color:#fff;
    height:30px;
    padding:0 22px;
    border:none;
  }
`;

const USD = (
  <div className="w-100">
    <Widget
      src="lord1.near/widget/wrapped-balance-usd"
      props={{
        themeColor,
        accountId: singer,
      }}
    />
  </div>
);

const NFT = (
  <div className="w-100">
    <Widget
      src="lord1.near/widget/wrapped-balance-nft"
      props={{
        themeColor,
        accountId: singer,
      }}
    />
  </div>
);
const Collectibles = (
  <div className="w-100">
    <Widget
      src="lord1.near/widget/wrapped-balance-collection"
      props={{
        themeColor,
        accountId: singer,
      }}
    />
  </div>
);

return (
  <>
    <div className="w-100 d-flex justify-content-center mb-2">
      <Container>
        <ul className="tabContent">
          {Object.values(tabs).map((tab) => (
            <li className="tab-item">
              <button
                className={`${state.tab === tab ? "active" : ""}`}
                aria-current="page"
                onClick={() => setTab(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </Container>
    </div>
    <div className="w-100">
      {state.tab === tabs.USD && USD}
      {state.tab === tabs.NFT && NFT}
      {state.tab === tabs.Collectibles && Collectibles}
    </div>
  </>
);
