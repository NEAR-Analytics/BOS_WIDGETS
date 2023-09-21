/**
 * Change telegram tab, add resource tag
 * fix alignment on subheader
 */
const ownerId = "xvii.near";
const availableTabs = [
  "home",
  "register",
  "hackathon",
  "people",
  "forum",
  "resources",
];
const memberTab = props.memberTab ?? "";
const catTab = props.catTab ?? "";
/**
 * Add resources, change telegram icon
 */
const getTab = (tab) => {
  if (!tab || !availableTabs.includes(tab)) {
    return "home";
  }

  return tab;
};

State.init({
  tab: getTab(props.tab),
});

const showSidebar = ![].includes(state.tab);
const isForm = [].includes(state.tab);

const update = (state) => State.update(state);
// /devgovgigs.near/widget/gigs-board.entity.post.List?tag=boshacks
const tabContentWidget = {
  home: "BOSHACKS.Home.Main",
  register: "BOSHACKS.Register.Main",
  hackathon: "BOSHACKS.Builders.Main",
  people: "BOSHACKS.Members.Main",
  forum: "BOSHACKS.Forum.Main",
  resources: "BOSHACKS.Resources.Main",
}[state.tab];

const tabContent = (
  <Widget
    src={`${ownerId}/widget/${tabContentWidget}`}
    props={{ update, memberTab, catTab }}
  />
);

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

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Container = styled.div``;

return (
  <Container>
    <Widget src={`xvii.near/widget/BOSHACKS.Navbar`} props={{ update }} />
    <Content>
      <Sidebar show={showSidebar}>
        <Widget
          src={`${ownerId}/widget/BOSHACKS.Sidebar.Main`}
          props={{ tab: state.tab, update, collapsible: true }}
        />
        <Widget
          src={`${ownerId}/widget/BOSHACKS.Sidebar.Main`}
          props={{ tab: state.tab, update, collapsible: false }}
        />
      </Sidebar>
      <ContentContainer className={isForm ? "form" : ""}>
        {tabContent}
        <Widget src={`${ownerId}/widget/BOSHACKS.Footer`} />
      </ContentContainer>
    </Content>
  </Container>
);
