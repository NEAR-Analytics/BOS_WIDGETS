const ownerId = "nearhorizon.near";
const accountId = props.accountId ?? context.accountId;

State.init({
  isAdmin: false,
  isAdminIsFetched: false,
  project: null,
  projectIsFetched: false,
});

if (!state.isAdminIsFetched) {
  if (!context.accountId) {
    State.update({ isAdmin: false, isAdminIsFetched: true });
  } else {
    Near.asyncView(
      ownerId,
      "check_is_project_admin",
      { project_id: accountId, account_id: context.accountId },
      "final",
      false
    ).then((isAdmin) => State.update({ isAdmin, isAdminIsFetched: true }));
  }
}

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: accountId },
    "final",
    false
  ).then((project) => State.update({ project, projectIsFetched: true }));
}

if (!state.projectIsFetched || !state.isAdminIsFetched) {
  return <>Loading...</>;
}

const availableContent = [
  "overview",
  "requests",
  "people",
  "history",
  "documents",
];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "overview";
  }

  return content;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1em;
  width: 100%;
`;

const HeaderDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 80%;
`;

const HeaderProgress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 20%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 80%;
  padding-top: 0.25em;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 20%;
`;

const circledPlus = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1624_38049)">
      <path
        d="M9 6V12M6 9H12M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
        stroke="currentColor"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1624_38049">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const plus = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 3.75V14.25M3.75 9H14.25"
      stroke="#006ADC"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const CTARow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75em;
  margin-top: 1em;
`;

const content = {
  overview: (
    <Widget
      src={`${ownerId}/widget/Project.About`}
      props={{ accountId: props.accountId, isAdmin: state.isAdmin }}
    />
  ),
  requests: (
    <Widget
      src={`${ownerId}/widget/Project.Requests`}
      props={{ accountId: props.accountId }}
    />
  ),
  people: (
    <Widget
      src={`${ownerId}/widget/Project.People`}
      props={{ accountId: props.accountId, isAdmin: state.isAdmin }}
    />
  ),
  history: (
    <Widget
      src={`${ownerId}/widget/Project.History`}
      props={{ accountId: props.accountId }}
    />
  ),
  documents: (
    <Widget
      src={`${ownerId}/widget/Project.Documents`}
      props={{ accountId: props.accountId, isAdmin: state.isAdmin }}
    />
  ),
}[getContent(props.content)];

const GreyButton = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.75em 1em;
  gap: 0.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  color: #006adc;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  white-space: nowrap;
`;

const creditsCTA =
  state.project.application === "NotSubmitted" ||
    "Rejected" in state.project.application ? (
    <GreyButton
      onClick={() =>
        Near.call(ownerId, "apply_for_program", {
          account_id: accountId,
        })
      }
    >
      <svg
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.75 2.75C9.75 3.57843 7.90317 4.25 5.625 4.25C3.34683 4.25 1.5 3.57843 1.5 2.75M9.75 2.75C9.75 1.92157 7.90317 1.25 5.625 1.25C3.34683 1.25 1.5 1.92157 1.5 2.75M9.75 2.75V3.875M1.5 2.75V11.75C1.5 12.5784 3.34683 13.25 5.625 13.25M5.625 7.25C5.49859 7.25 5.37351 7.24793 5.25 7.24388C3.14756 7.17499 1.5 6.53246 1.5 5.75M5.625 10.25C3.34683 10.25 1.5 9.57843 1.5 8.75M16.5 7.625C16.5 8.45343 14.6532 9.125 12.375 9.125C10.0968 9.125 8.25 8.45343 8.25 7.625M16.5 7.625C16.5 6.79657 14.6532 6.125 12.375 6.125C10.0968 6.125 8.25 6.79657 8.25 7.625M16.5 7.625V13.25C16.5 14.0784 14.6532 14.75 12.375 14.75C10.0968 14.75 8.25 14.0784 8.25 13.25V7.625M16.5 10.4375C16.5 11.2659 14.6532 11.9375 12.375 11.9375C10.0968 11.9375 8.25 11.2659 8.25 10.4375"
          stroke="#006adc"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Apply for credits
    </GreyButton>
  ) : (
    <GreyButton disabled>
      <svg
        width="18"
        height="13"
        viewBox="0 0 18 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 1L6 12L1 7"
          stroke="#878a8e"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Credits requested
    </GreyButton>
  );

return (
  <Container>
    <Header>
      <HeaderDetails>
        <Widget
          src={`${ownerId}/widget/Project.HeaderDetails`}
          props={{ accountId, isAdmin: state.isAdmin }}
        />
        <CTARow>
          {state.isAdmin ? (
            <>
              <GreyButton
                href={`/${ownerId}/widget/Index?tab=createrequest&accountId=${accountId}`}
              >
                {plus}Create request
              </GreyButton>
            </>
          ) : (
            <>
              <Widget
                src={`${ownerId}/widget/Project.ProposeSideWindow`}
                props={{ accountId }}
              />
              <Widget
                src={`${ownerId}/widget/Project.ClaimSideWindow`}
                props={{ accountId }}
              />
            </>
          )}
        </CTARow>
      </HeaderDetails>
      <HeaderProgress>
        <Widget
          src={`${ownerId}/widget/Project.Progress`}
          props={{ accountId }}
        />
      </HeaderProgress>
    </Header>
    <ContentContainer>
      <MainContent>
        <Widget
          src={`${ownerId}/widget/TabSelector`}
          props={{
            tab: "project",
            content: getContent(props.content),
            search: props.search,
            update: props.update,
            accountId: props.accountId,
            buttons: [
              {
                id: "overview",
                text: "Overview",
              },
              {
                id: "requests",
                text: "Requests",
              },
              {
                id: "people",
                text: "People",
              },
              {
                id: "history",
                text: "Work history",
              },
              {
                id: "documents",
                text: "Documents",
              },
            ],
          }}
        />
        {content}
      </MainContent>
      <Sidebar>
        <Widget
          src={`${ownerId}/widget/Project.Sidebar`}
          props={{
            accountId,
            isAdmin: state.isAdmin,
          }}
        />
      </Sidebar>
    </ContentContainer>
  </Container>
);
