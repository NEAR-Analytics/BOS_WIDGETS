const accountId = context.accountId;
const Owner = "dropcast.near";
const API_URL = props.API_URL || "http://localhost:3000";
const USER = props.USER || {};
const TOKEN = props.TOKEN || "";

//Styles
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 64px;
  position: relative;
  align-items: stretch;
  flex-direction: column;
  color: rgb(229 229 229);
  background: rgb(23,23,23);
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
`;

const Counter = styled.span`
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 50px;
  background-image: linear-gradient(to right, rgb(250, 204, 21), rgb(234, 88, 12));
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
  tab: "my_projects",
  member_option: "all",
});

const changeTab = (tab) => {
  State.update({ tab });
};

const changeMemberOption = (value) => {
  State.update({
    ...state,
    member_option: value,
  });
};

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
          <Counter>{tab.count}</Counter>
          {tab.value === state.tab && <SelectedTab />}
        </Tab>
      ))}
    </Tabs>
    {state.tab === "my_projects" && (
      <div
        className="d-flex justify-content-between align-items-center gap-3"
        style={{ padding: "25px 0" }}
      >
        <div className="d-flex flex-column w-50">
          <p>{`These are the projects on Vulcan which you're a member of.`}</p>
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
        <div
          className="d-flex flex-column w-50 p-4 rounded-3"
          style={{ backgroundColor: "rgb(38, 38, 38)" }}
        >
          <h6>{`Note`}</h6>
          <p
            className="m-0"
            style={{ fontSize: 14, color: "rgb(163, 163, 163)" }}
          >
            {`The wallet address put forward to projects for whitelisting is the address that is configured as "Default" on your Account. This can be changed as many times up until the project finishes whitelisting and has fully exported their whitelist addresses.`}
          </p>
        </div>
      </div>
    )}

    {state.tab === "other_projects" && (
      <div className="d-flex flex-column">
        <p className="py-4 m-0">{`These are the projects on Vulcan which you're a member of.`}</p>
        <GridWrapper>
          <div
            className="rounded-3 p-3 shadow-lg"
            style={{ backgroundColor: "rgb(38, 38, 38)" }}
          >
            <img
              className="w-100 object-fit-cover rounded-3"
              src="https://cdn.discordapp.com/icons/988431580538224641/e77dc47375e528b351f7ec287be40080.png?size=1024"
            />
            <div className="text-center px-2 py-3">
              <h5>AOI NFT</h5>
              <p style={{ fontSize: 14, color: "rgb(163, 163, 163)" }}>
                666 AOI NFT collections will stored on NEAR Blockchain, powered
                by utilities to amplify your thrill.
              </p>
            </div>
          </div>
          <div className="rounded-3 p-3 shadow-lg">
            <img
              className="w-100 object-fit-cover rounded-3"
              src="https://cdn.discordapp.com/icons/988431580538224641/e77dc47375e528b351f7ec287be40080.png?size=1024"
            />
          </div>
        </GridWrapper>
      </div>
    )}
  </Wrapper>
);
