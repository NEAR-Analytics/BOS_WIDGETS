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

const Root = styled.div`
  padding: 30px;
`

//jgodwill.near/widget/GenaDrop.MultiListing
const tabContentWidget = {
  feeds: "astraplusplus.ndctools.near/widget/Feed.index",
  discussion: "agwaze.near/widget/CreativeDAO.Discussions",
  collaboration: "https://near.org/nearhorizon.near/widget/Index",
  polling: "agwaze.near/widget/CreativeDAO.EasyPoll",
}[state.tab];

const tabContent = <Widget src={tabContentWidget} props={{ update }} />;

return (
  <Root>
  <h1>Drop Flow Skeletons</h1>
  <Content>
    <Sidebar show={showSidebar}>
      <Widget
        src={`${ownerId}/widget/CreativeDAO.Navbar`}
        props={{
          tab: state.tab,
          update,
          collapsible: true,
        }}
      />
      <Widget
        src={`${ownerId}/widget/CreativeDAO.Navbar`}
        props={{
          tab: state.tab,
          update,
          collapsible: false,
        }}
      />
    </Sidebar>
    <ContentContainer>{tabContent}</ContentContainer>
  </Content>
  </Root>
);
