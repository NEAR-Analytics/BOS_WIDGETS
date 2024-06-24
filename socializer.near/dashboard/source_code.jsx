const Owner = "socializer.near";
const accountId = context.accountId;

const API_URL = props?.API_URL || "http://localhost:3000";
const changePage = props?.changePage || (() => {});
const page = props?.page || "";

const options = [
  {
    text: "Live Campaigns",
    value: "live",
  },
  {
    text: "Expired",
    value: "expired",
  },
];

const showDetail = (data) => {
  if (data.accountId !== accountId)
    State.update({ show_detail: true, selected: data });
};

const viewWins = (data) => {
  // if (data.accountId !== accountId)
  State.update({ view_win: true, selected: data });
};

const onClose = () => {
  State.update({ show_detail: false, view_win: false });
};

const handleSearch = (event) => {
  const value = event.target.value;
  State.update({ searchValue: value });
};

const selectMenu = (data) => {
  State.update({ menu: data, campaigns: [], timer_load: false });
};

State.init({
  campaigns: [],
  error: "",
  show_detail: false,
  view_win: false,
  selected: {},
  searchValue: "",
  menu: { value: "live" },
  columns: {
    live: [
      {
        title: "Project/User",
        key: "accountId",
        description: "Project/User",
        width: 16,
        project: true,
      },
      {
        title: "Near Social  Post",
        key: "social",
        description: "Near Social  Post",
        width: 32,
        align: "center",
      },
      {
        title: "Ends In",
        key: "endsin",
        description: "Ends In",
        width: 15,
        align: "center",
      },
      {
        title: "Reward",
        key: "reward",
        description: "Reward",
        width: 8,
        align: "center",
      },
      {
        title: "Total Rewards",
        key: "total_reward",
        description: "Total Rewards",
        width: 10,
        align: "center",
      },
      {
        title: "Winners",
        key: "winners",
        description: "Winners",
        width: 10,
        align: "center",
        click: () => {},
      },
      {
        title: "Engage Link",
        key: "post_link",
        description: "Engage Link",
        width: 10,
        align: "center",
        link: true,
        click: showDetail,
      },
    ],
    expired: [
      {
        title: "Project/User",
        key: "accountId",
        description: "Project/User",
        width: 20,
        project: true,
      },
      {
        title: "Reward",
        key: "reward",
        description: "Reward",
        width: 8,
        align: "center",
      },
      {
        title: "Total Rewards",
        key: "total_reward",
        description: "Total Rewards",
        width: 10,
        align: "center",
      },
      {
        title: "Claim Type",
        key: "claim",
        description: "Claim Type",
        width: 10,
        align: "center",
        value: "Raffle",
      },
      {
        title: "Winners",
        key: "winner",
        description: "Winners",
        width: 10,
        align: "center",
        button: true,
        value: "View Winners",
        click: viewWins,
      },
      {
        title: "Your Result ",
        key: "result",
        description: "Your Result",
        width: 10,
        align: "center",
        link: true,
        click: () => {},
      },
    ],
  },
  title: {
    live: {
      tl: "Live Campaigns",
      subtl: "The list of Near Social Posts are offering rewards",
    },
    expired: {
      tl: "Expired",
      subtl: "These Engage-To-Earn campaigns have ended",
    },
  },
  timer_load: false,
});

const MainComponent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  background: #FAFAFA;
  flex-direction: column;
`;

const TableComponent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 13px;
`;

const HeadComponent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 32px;
`;

const TitleComponent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 32px;
`;

const FilterContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap:14px;
`;

const SearchInput = styled.input`
  border-radius: 10px;
  padding: 14px 48px 14px 28px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.12px;
`;

const Button = styled.button`
  display: inline-flex;
  padding: 12px 24px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 6px;
  background: var(--Dark, #121212); 
  color: var(--light_95, #F3F3F3);
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  line-height: normal;
`;

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", right: 28 }}
  >
    <g clip-path="url(#clip0_1_3884)">
      <path
        d="M9.58329 17.5C13.9555 17.5 17.5 13.9556 17.5 9.58334C17.5 5.21108 13.9555 1.66667 9.58329 1.66667C5.21104 1.66667 1.66663 5.21108 1.66663 9.58334C1.66663 13.9556 5.21104 17.5 9.58329 17.5Z"
        stroke="#595959"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3333 18.3333L16.6666 16.6667"
        stroke="#595959"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_3884">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const getCampaignData = (type) => {
  return asyncFetch(
    API_URL + `/api/campaign?accountId=${accountId}&type=${type}`
  ).then((res) => {
    if (res.ok) {
      const { error, data } = res.body;
      if (error) State.update({ error });
      State.update({
        campaigns: data,
      });
    }
  });
};

if (!state.campaigns.length) getCampaignData(state.menu.value);

return (
  <MainComponent>
    <HeadComponent>
      <TitleComponent>
        <FilterContent>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchInput
              placeholder="Search"
              value={state.searchValue}
              onChange={handleSearch}
            />
            <SearchIcon />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 21,
            }}
          >
            <Widget
              props={{
                API_URL,
                noLabel: true,
                options,
                value: state.menu,
                onChange: selectMenu,
              }}
              src={`${Owner}/widget/Select`}
            />
            <Button
              onClick={() => {
                if (accountId) {
                  changePage("new_campaigns");
                }
              }}
            >
              {"+ Create New Campaigns"}
            </Button>
          </div>
        </FilterContent>
        <TitleContent>
          <h4 style={{ margin: 0 }}>{state.title[state.menu.value].tl}</h4>
          <p style={{ fontSize: 14, margin: 0 }}>
            {state.title[state.menu.value].subtl}
          </p>
          {state.error && (
            <p style={{ fontSize: 14, margin: 0, color: "red" }}>
              {state.error}
            </p>
          )}
        </TitleContent>
      </TitleComponent>
    </HeadComponent>
    {state.campaigns.length !== 0 && (
      <>
        <TableComponent>
          <Widget
            src={`${Owner}/widget/table-pagination`}
            props={{
              API_URL,
              themeColor: { table_pagination: themeColor.table_pagination },
              data: state.campaigns,
              columns: state.columns[state.menu.value],
              rowsCount: 8,
              searchValue: state.searchValue,
              timer: state.menu.value === "live" ? true : false,
              timer_load: state.timer_load,
            }}
          />
        </TableComponent>
        <Widget
          props={{
            API_URL,
            menu: state.menu,
          }}
          src={`${Owner}/widget/Status`}
        />
      </>
    )}

    {state.show_detail && state.selected && (
      <Widget
        props={{
          API_URL,
          onClose,
          data: state.selected,
        }}
        src={`${Owner}/widget/CampaignModal`}
      />
    )}
    {state.view_win && state.selected && (
      <Widget
        props={{
          API_URL,
          onClose,
          data: state.selected,
        }}
        src={`${Owner}/widget/WinnersModal`}
      />
    )}
  </MainComponent>
);
