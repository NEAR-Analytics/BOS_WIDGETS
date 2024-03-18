const Owner = "socializer.near";
const accountId = context.accountId;
const API_URL = "http://localhost:3000/api";

const changePage = props?.changePage || (() => {});
const page = props?.page || "";

const columns = [
  {
    title: "Project/User",
    key: "accountId",
    description: "Project/User",
    width: 20,
    project: true,
  },
  {
    title: "Near Social  Post",
    key: "social",
    description: "Near Social  Post",
    width: 40,
    align: "left",
  },
  {
    title: "Ends In",
    key: "endsin",
    description: "Ends In",
    width: 15,
    align: "left",
  },
  {
    title: "Reward",
    key: "reward",
    description: "Reward",
    width: 8,
    align: "left",
  },
  {
    title: "Total Rewards",
    key: "total_reward",
    description: "Total Rewards",
    width: 10,
    align: "left",
  },
  {
    title: "Status",
    key: "status",
    description: "Status",
    width: 10,
    align: "center",
    button: true,
  },
  {
    title: "Engage Link",
    key: "post_link",
    description: "Engage Link",
    width: 10,
    align: "center",
    link: true,
  },
];

const tableData = [
  {
    user: "Near Degens1",
    avatar:
      "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
    social: "Have you seen our monthly stats? With over 45 clien...",
    endsin: "Ends in 1hr 10m 50s",
    reward: "1 Near",
    total_rewards: "10 Near",
    status: "live",
    engage: "link",
  },
  {
    user: "Near Degens2",
    avatar:
      "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
    social: "Have you seen our monthly stats? With over 45 clien...",
    endsin: "Ends in 1hr 10m 50s",
    reward: "1 Near",
    total_rewards: "10 Near",
    status: "live",
    engage: "",
  },
  {
    user: "Near Degens3",
    avatar:
      "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
    social: "Have you seen our monthly stats? With over 45 clien...",
    endsin: "Ends in 1hr 10m 50s",
    reward: "1 Near",
    total_rewards: "10 Near",
    status: "live",
    engage: "",
  },
  {
    user: "Near Degens4",
    avatar:
      "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
    social: "Have you seen our monthly stats? With over 45 clien...",
    endsin: "Ends in 1hr 10m 50s",
    reward: "1 Near",
    total_rewards: "10 Near",
    status: "live",
    engage: "link",
  },
  {
    user: "Near Degens5",
    avatar:
      "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
    social: "Have you seen our monthly stats? With over 45 clien...",
    endsin: "Ends in 1hr 10m 50s",
    reward: "1 Near",
    total_rewards: "10 Near",
    status: "live",
    engage: "link",
  },
];

const options = [
  {
    text: "Ended",
    value: 1,
  },
  {
    text: "Claimed",
    value: 2,
  },
  {
    text: "Unclaimed",
    value: 3,
  },
];

State.init({
  loaded: false,
  campaigns: [],
  error: "",
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

const getCampaignData = () => {
  return asyncFetch(API_URL + `/campaign?accountId=${accountId}`).then(
    (res) => {
      if (res.ok) {
        const { error, data } = res.body;
        if (error) State.update({ error });
        State.update({
          loaded: true,
          campaigns: data,
        });
      }
    }
  );
};

if (!state.loaded) getCampaignData();

if (!state.loaded)
  return (
    <Widget
      props={{
        noLabel: true,
        placeholder: "Live-Campaigns",
        options,
      }}
      src={`${Owner}/widget/preload`}
    />
  );

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
            <SearchInput placeholder="Search" />
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
                noLabel: true,
                placeholder: "Live-Campaigns",
                options,
              }}
              src={`${Owner}/widget/Select`}
            />
            <Button
              onClick={() => {
                changePage("new_campaigns");
              }}
            >
              {"+ Create New Campaigns"}
            </Button>
          </div>
        </FilterContent>
        <TitleContent>
          <h4 style={{ margin: 0 }}>Live Campaigns</h4>
          <p style={{ fontSize: 14, margin: 0 }}>
            {`The list of Near Social Posts are offering rewards`}
          </p>
          {state.error && (
            <p style={{ fontSize: 14, margin: 0, color: "red" }}>
              {state.error}
            </p>
          )}
        </TitleContent>
      </TitleComponent>
    </HeadComponent>
    <TableComponent>
      <Widget
        src={`${Owner}/widget/table-pagination`}
        props={{
          themeColor: { table_pagination: themeColor.table_pagination },
          data: state.campaigns,
          columns,
          rowsCount: 4,
        }}
      />
    </TableComponent>
  </MainComponent>
);
