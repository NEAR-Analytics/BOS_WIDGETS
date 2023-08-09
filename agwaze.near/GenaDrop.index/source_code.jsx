const ownerId = "agwaze.near";
const availableTabs = ["create", "list", "nearNFTs", "evmNFTs, ai, socials"];

const getTab = (tab) => {
  if (!tab || !availableTabs.includes(tab)) {
    return "create";
  }

  return tab;
};

State.init({
  tab: getTab(state.tab),
});

const showSidebar = ![].includes(state.tab);
const isForm = [].includes(state.tab);

const update = (state) => State.update(state);

const Sidebar = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: row;
  position: sticky;
  top: 0;

  @media screen and (max-width: 768px) {
    & > div {
      &:last-child {
        display: none;
      }
    }
  }

  @media screen and (min-width: 768px) {
    & > div {
      &:first-child {
        display: none;
      }
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  margin-top: 40px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border: 1px solid #eceef0;
  border-radius: 24px;
  padding: 0;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  &.form {
    border: none;
    background: #fafafa;
  }

  * {
    margin: 0;
  }
`;
const tabContentWidget = {
  create: "jgodwill.near/widget/GenaDropmultichainminter",
  list: "jgodwill.near/widget/GenaDrop.MultiListing",
  nearNFTs: "jgodwill.near/widget/GenaDrop.Explore",
  evmNFTs: "0xprometheus.near/widget/Eth-Explore",
  socials: "genadrop.near/widget/GenaDrop.Home",
  ai: "0xprometheus.near/widget/Genadrop-Ai-Minter",
}[state.tab];

const tabContent = <Widget src={tabContentWidget} props={{ update }} />;

return (
  <Content>
    <Sidebar show={showSidebar}>
      <Widget
        src={`${ownerId}/widget/GenaDrop.NavBar`}
        props={{
          tab: state.tab,
          update,
          collapsible: true,
        }}
      />
      <Widget
        src={`${ownerId}/widget/GenaDrop.NavBar`}
        props={{
          tab: state.tab,
          update,
          collapsible: false,
        }}
      />
    </Sidebar>
    <ContentContainer>{tabContent}</ContentContainer>
  </Content>
);
