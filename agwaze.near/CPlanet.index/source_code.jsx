const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;
const Contents = styled.div`

`;

const availableTabs = ["explore", "singleNFT", "home"];

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
    {state.tab !== "home" && (
      <Widget
        src="agwaze.near/widget/CPlanet.Navbar.index"
        props={{ tab: state.tab, update }}
      />
    )}
    <Contents>{tabContent}</Contents>
    <Widget src="agwaze.near/widget/CPlanet.Footer" />
  </Root>
);
