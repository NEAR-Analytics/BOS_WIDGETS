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
    return "explore";
  }

  return tab;
};

State.init({
  tab: getTab(state.tab),
  contractId: "",
  tokenId: "",
});

const update = (state) => State.update(state);

const tabContentWidget = {
  explore: "agwaze.near/widget/CPlanet.Explore.index",
  singleNFT: "agwaze.near/widget/CPlanet.Explore.SingleNFT",
}[state.tab];

const tabContent = <Widget src={tabContentWidget} props={{ update }} />;

return (
  <Root>
    <Widget
      src="agwaze.near/widget/CPlanet.Navbar.index"
      props={{ tab: state.tab }}
    />
    <Contents>{tabContent}</Contents>
    <Widget src="agwaze.near/widget/CPlanet.Footer" />
  </Root>
);
