const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  height: auto;
  .isHome {
    position: absolute;
    width: 100%;
  }
`;
const Contents = styled.div`

`;

const availableTabs = ["explore", "singleNFT", "home", "community"];

const getTab = (tab) => {
  if (!tab || !availableTabs.includes(tab)) {
    return "home";
  }

  return tab;
};

State.init({
  tab: getTab(state.tab),
  contractId: "",
  tokenId: "",
  chainState: "",
});

const update = (state) => State.update(state);

const tabContentWidget = {
  home: "agwaze.near/widget/CPlanet.Home.index",
  explore: "agwaze.near/widget/CPlanet.Explore.index",
  community: "agwaze.near/widget/CPlanet.DAO.Explore",
  singleNFT: "agwaze.near/widget/CPlanet.Explore.SingleNFT",
}[state.tab];

const tabContent = (
  <Widget
    src={tabContentWidget}
    props={{
      update,
      contractId: state.contractId,
      tokenId: state.tokenId,
      chainState: state.chainState,
    }}
  />
);

return (
  <Root>
    <div className={state.tab === "home" ? "isHome" : ""}>
      <Widget
        src="agwaze.near/widget/CPlanet.Navbar.index"
        props={{ tab: state.tab, update, isHome: state.tab === "home" }}
      />
    </div>
    <Contents>{tabContent}</Contents>
    <Widget src="agwaze.near/widget/CPlanet.Footer" />
  </Root>
);
