const Root = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    .topNav {
        display: flex;
        width: 100%;
        @media screen and (max-width: 768px) {
            display: none;
        }
    }
`;

const ownerId = "agwaze.near";
const availableTabs = ["home", "event", "teams", "about", "project"];

const getTab = (tab) => {
  if (!tab || !availableTabs.includes(tab)) {
    return "home";
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
  home: "agwaze.near/widget/WebFusion.Home.index",
  teams: "agwaze.near/widget/WebFusion.Team.index",
}[state.tab];

const tabContent = <Widget src={tabContentWidget} props={{ update }} />;

return (
  <Root>
    <div className="topNav">
      <Widget src="agwaze.near/widget/WebFusion.Navbar.Top" />
    </div>
    <Content>
      <Sidebar show={showSidebar}>
        <Widget
          src={`${ownerId}/widget/WebFusion.Navbar.Side`}
          props={{
            tab: state.tab,
            update,
            collapsible: true,
          }}
        />
        <Widget
          src={`${ownerId}/widget/WebFusion.Navbar.Side`}
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
