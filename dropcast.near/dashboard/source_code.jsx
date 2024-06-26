const accountId = context.accountId;
const Owner = "dropcast.near";
const API_URL = props.API_URL || "http://localhost:3000";
const USER = props.USER || {};
const TOKEN = props.TOKEN || "";
const Logout = props.Logout;

//Styles
const Wrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 64px;
    position: relative;
    height: fit-content;
    align-items: stretch;
    flex-direction: column;
    color: rgb(229 229 229);
    background: rgb(23,23,23);
    @media (max-width: 620px) {
      padding: 29px;
    }
`;

const Tabs = styled.div`
  gap: 20px;
  width: 100%;
  height: 52px;
  display: flex;
  border-bottom: 1px solid #e5e7eb;
`;

const Tab = styled.div`
  gap: 6px;
  height: 100%;
  display: flex;
  cursor: pointer;
  padding: 16px 4px;
  position: relative;
  align-items: center;
  @media (max-width: 620px) {
    text-align: center;
  }
`;

const Counter = styled.span`
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 50px;
  background-image: linear-gradient(to right, rgb(250, 204, 21), rgb(234, 88, 12));
  @media (max-width: 620px) {
    padding: 2px 7px;
  }
`;

const SelectedTab = styled.span`
  left: -2px;
  height: 4px;
  width: 100%;
  bottom: -1.75px;
  position: absolute;
  border-radius: 50px;
  background-image: linear-gradient(to right, rgb(250, 204, 21), rgb(234, 88, 12));
`;

const GridWrapper = styled.div`
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr));
  @media (max-width: 935px) {
    grid-template-columns: repeat(1,minmax(0,1fr));
  }
  @media (min-width: 935px) and (max-width: 1400px) {
    grid-template-columns: repeat(2,minmax(0,1fr));
  }
`;

const MyProjectCard = styled.div`
  gap: 16px;
  display: flex;
  padding: 25px 0;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 620px) {
    flex-direction: column;

    .w-50 {
      width: 100% !important;
    }
  }
`;

const TABS = [
  {
    label: "My Projects",
    value: "my_projects",
    count: 0,
  },
  {
    label: "Other Projects",
    value: "other_projects",
    count: 12,
  },
  {
    label: "Past Projects",
    value: "past_projects",
    count: 5,
  },
];

const MEMBER_OPTIONS = [
  {
    text: "All",
    value: "all",
  },
  {
    text: "Whitelist Status: Active",
    value: "status_active",
  },
  {
    text: "Whitelist Status: Closed",
    value: "status_closed",
  },
  {
    text: "Whitelist Obtained: All",
    value: "obtained_all",
  },
  {
    text: "Whitelist Obtained: Yes",
    value: "obtained_yes",
  },
  {
    text: "Whitelist Obtained: No",
    value: "obtained_no",
  },
];

State.init({
  detail: false,
  selected: {},
  loaded: false,
  my_projects: [],
  other_projects: [],
  past_projects: [],
  tab: "my_projects",
  member_option: "all",
});

const changeTab = (tab) => {
  State.update({ ...state, tab, detail: false });
};

const changeMemberOption = (value) => {
  State.update({
    ...state,
    member_option: value,
  });
};

const getList = () => {
  State.update({
    ...state,
    loaded: true,
  });
  let promise = asyncFetch(`${API_URL}/api/project?type=${state.tab}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-auth-token": TOKEN,
    },
    method: "GET",
  });

  promise
    .then((data) => {
      if (data.status === 200) {
        State.update({
          ...state,
          ...data.body,
          loaded: true,
        });
      } else {
        State.update({
          ...state,
          error: data.body,
        });
        Logout();
      }
    })
    .catch(() => {
      Logout();
    });
};

const showDetail = (project) => {
  State.update({
    ...state,
    detail: true,
    selected: project,
  });
};

const onCloseDetail = () => {
  State.update({
    ...state,
    detail: false,
    selected: null,
  });
};

if (!state.loaded) getList();

return (
  <Wrapper>
    <Tabs>
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          onClick={() => changeTab(tab.value)}
          style={{ opacity: tab.value === state.tab ? 1 : 0.5 }}
        >
          <p className="m-0">{tab.label}</p>
          <Counter>{state[tab.value].length}</Counter>
          {tab.value === state.tab && <SelectedTab />}
        </Tab>
      ))}
    </Tabs>
    {state.detail && state.selected && (
      <Widget
        props={{
          TOKEN,
          API_URL,
          onClose: onCloseDetail,
          project: state.selected,
        }}
        src={`${Owner}/widget/detail`}
      />
    )}

    {!state.detail && state.tab === "my_projects" && (
      <>
        <MyProjectCard>
          <div className="d-flex flex-column w-100">
            <p>{`These are the projects on Dropcast which you're a member of.`}</p>
            <div style={{ width: 240 }}>
              <Widget
                props={{
                  noLabel: true,
                  value: state.member_option,
                  options: MEMBER_OPTIONS,
                  onChange: changeMemberOption,
                }}
                src={`${Owner}/widget/Select`}
              />
            </div>
          </div>
        </MyProjectCard>
        <GridWrapper>
          {!state.loaded && <h5>Loading...</h5>}
          {state.my_projects
            .filter(
              (e) =>
                state.member_option === "all" ||
                (state.member_option === "status_active" &&
                  e.whitelist === true) ||
                (state.member_option === "status_closed" &&
                  e.whitelist === false)
            )
            .map((project) => (
              <Widget
                props={{ API_URL, TOKEN, project, type: "my", showDetail }}
                key={project._id}
                src={`${Owner}/widget/project`}
              />
            ))}
        </GridWrapper>
      </>
    )}

    {!state.detail && state.tab === "other_projects" && (
      <div className="d-flex flex-column gap-4 py-4">
        <p className="m-0">{`These are the projects on Dropcast that you’re not a member of.`}</p>
        <GridWrapper>
          {state.other_projects.map((project) => (
            <Widget
              props={{ API_URL, TOKEN, project }}
              key={project._id}
              src={`${Owner}/widget/project`}
            />
          ))}
        </GridWrapper>
      </div>
    )}

    {!state.detail && state.tab === "past_projects" && (
      <div className="d-flex flex-column gap-4 py-4">
        <p className="m-0">{`These are past projects on Dropcast that have already been minted.`}</p>
        <GridWrapper>
          {state.past_projects.map((project) => (
            <Widget
              props={{ API_URL, TOKEN, project, type: "past" }}
              key={project._id}
              src={`${Owner}/widget/project`}
            />
          ))}
        </GridWrapper>
      </div>
    )}
  </Wrapper>
);
