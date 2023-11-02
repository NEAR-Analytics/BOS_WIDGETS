const ownerId = "nearcon23.near";
const apiUrl =
  "https://gqqkd7l7mk.execute-api.us-east-1.amazonaws.com/mainnet/api/v1";
const availableTabs = [
  "home",
  "register",
  "hackathon",
  "speakers",
  "schedule",
  "terms",
  "ticket",
  "profile",
  "travel",
];

const { secretkey } = props;

const storedSecretKey = Storage.get(
  "newPrivateKey",
  `${ownerId}/widget/Ticket.Page`
)
  ? Storage.get("newPrivateKey", `${ownerId}/widget/Ticket.Page`)
  : Storage.get("newPrivateKey", `${ownerId}/widget/RegisterMobile.Index`);

const fetchData = () => {
  const key = secretkey ? secretkey : storedSecretKey;
  asyncFetch(`${apiUrl}/accounts/auth/${key}`).then(({ body }) => {
    State.update({ redirectToMobile: !!body?.nearconId });
  });
};

useEffect(() => {
  fetchData();
}, [secretkey, storedSecretKey]);

if (state.redirectToMobile) {
  return <Redirect to="/mobile" />;
}

const getTab = (tab) => {
  if (!tab || !availableTabs.includes(tab)) {
    return "home";
  }

  return tab;
};

State.init({
  tab: getTab(props.tab),
  collapsible: true,
});

const isForm = [].includes(state.tab);

const update = (state) => State.update(state);

const tabContentWidget = {
  profile: "Profile.Page",
  home: "Home.Page",
  register: "Register.Page",
  hackathon: "Hackathon.Page",
  speakers: "Speakers.Page",
  schedule: "Schedule.Page",
  terms: "Terms.Page",
  ticket: "Ticket.Page",
  travel: "Travel.Page",
}[state.tab];

const tabContent = (
  <Widget
    src={`${ownerId}/widget/${tabContentWidget}`}
    props={{ update, props }}
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
    <Widget
      src={`${ownerId}/widget/Navbar`}
      props={{ update, collapsible: state.collapsible }}
    />
    <Content>
      <Sidebar>
        <Widget
          src={`${ownerId}/widget/Sidebar`}
          props={{
            tab: state.tab,
            update,
            collapsible: state.collapsible,
          }}
        />
        <Widget
          src={`${ownerId}/widget/Sidebar`}
          props={{ tab: state.tab, update, collapsible: false }}
        />
      </Sidebar>

      <ContentContainer className={isForm ? "form" : ""}>
        {tabContent}
        <Widget src={`${ownerId}/widget/Footer`} />
      </ContentContainer>
    </Content>
  </Container>
);
