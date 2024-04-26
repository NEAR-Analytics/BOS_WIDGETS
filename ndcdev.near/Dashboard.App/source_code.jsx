const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const SelectContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
`;

const Title = styled.div`
  color: #1b1b18;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-wrap: nowrap;
  font-size: 24px;

  @media screen and (max-width: 768px) {
    font-size: 22px;
  }
`;

const Filters = styled.div`
  display: flex;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    gap: 0.5rem;
  }

  .wrapper {
    position: relative;
    display: flex;
    justify-content: flex-end;
    width: 300px;

    &.mobile {
      display: none;
      width: 50px;

      @media screen and (max-width: 768px) {
        display: flex;
      }
    }

    @media screen and (max-width: 768px) {
      display: none;
    }

    .value {
      display: flex;
      color: #3f3f3f;
      font-size: 16px;
      font-style: normal;
      font-weight: 350;
      line-height: 16px;
      width: 100%;
      height: 46px;
      padding: 0px 14px;
      align-items: center;
      border-radius: 100px;
      border: 1px solid #e3e3e0;
      background: var(--NEAR-Primary-Colors-White, #fff);
    }

    .icon {
      position: absolute;
      top: 14px;
      right: 20px;
      z-index: 1001;
      display: flex;

      @media screen and (max-width: 768px) {
        top: 0;
        right: 0;
        width: 40px;
        height: 40px;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid #e3e3e0;
      }
    }
  }
`;

const ChartContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;

  @media screen and (max-width: 1188px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
  }
`;

const DesktopPicker = styled.div`
  display: flex;

  @media screen and (max-width: 1188px) {
    display: none;
  }
`;

const MobilePicker = styled.div`
  display: none;

  @media screen and (max-width: 1188px) {
    display: flex;
  }
`;

const { contractName } = VM.require(`ndcdev.near/widget/dashboard.Config`);

const defaultDAOOption = "All DAOs";
const dailyTotal = { labels: [], data: [] };
const dailyTotalUsers = { labels: [], data: [] };
const today = new Date();
const [loading, setLoading] = useState(false);
const [period, setPeriod] = useState([
  new Date(),
  new Date(today.setMonth(today.getMonth() - 1)),
]);
const [showDatePicker, setShowDatePicker] = useState(false);
const [dateRange, setDateRange] = useState("");
const [selectedDAOs, setSelectedDAOs] = useState([]);
const [dashboardView, setDashboardView] = useState("Table");
const [mobile, setMobile] = useState(false);
const [dataState, setDataState] = useState({
  totalTx: 0,
  totalAccounts: 0,
  uniqueAccounts: 0,
  totalBalance: 0,
  distributed: 0,
  dailyStats: [],
});

const baseUrl = "https://dashboard.chatme.page";
const Loading = () => <Widget src="flashui.near/widget/Loading" />;

const get = async (url) => {
  try {
    return asyncFetch(`${baseUrl}/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log(e);
  }
};

if (!contractName) return <Loading />;

const daos = Near.view(contractName, "get_dao_list");
if (!daos) return <Loading />;

const formatDate = () => {
  const fmt = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return { year, month, day };
  };

  const startDate = `${fmt(period[0]).year}-${fmt(period[0]).month}-${
    fmt(period[0]).day
  }`;
  const endDate = `${fmt(period[1]).year}-${fmt(period[1]).month}-${
    fmt(period[1]).day
  }`;

  setDateRange(`start_date=${startDate}&end_date=${endDate}`);

  return { startDate, endDate };
};

const API = {
  getTotal: () =>
    get(`api/total?${dateRange}&&dao_list=[${daos.map((d) => d.id)}]`),
  getDailyStats: () =>
    get(`api/daily-stats?${dateRange}&&dao_list=[${daos.map((d) => d.id)}]`),
  userRetentions: (daos) =>
    get(`api/user-retention?${dateRange}&dao_list=[${daos.map((d) => d.id)}]`),
  dappsUsed: (daos) =>
    get(`api/dapps-used?${dateRange}&dao_list=[${daos.map((d) => d.id)}]`),
  acquisitionCost: (daos) =>
    get(
      `api/acquisition-cost?${dateRange}&dao_list=[${daos.map((d) => d.id)}]`,
    ),
  socialEngagement: (daos) =>
    get(
      `api/social-engagement?${dateRange}&dao_list=[${daos.map((d) => d.id)}]`,
    ),
};

const fetchData = () => {
  setLoading(true);

  API.getTotal().then((resp) => {
    if (!resp.body) return;

    const data = resp.body.data;
    const newState = dataState;
    newState.totalTx = data.transactions;
    newState.totalAccounts = data.accounts;
    newState.uniqueAccounts = data.active_users;
    newState.totalBalance = data.totalBalance;
    newState.distributed = data.distributed;
    setDataState(newState);
    setLoading(false);
  });

  API.getDailyStats().then((resp) => {
    if (!resp.body) return;

    const data = resp.body.data;
    const newState = dataState;
    newState.dailyStats = data;
    setDataState(newState);
    setLoading(false);
  });
};

useEffect(() => {
  formatDate();
}, [period]);

useEffect(() => {
  if (dateRange) fetchData();
}, [selectedDAOs, daos, dateRange]);

const onSelectChange = (value) => {
  const isDefaultOption = value === defaultDAOOption;

  const updateSelectedDAOs = () => {
    if (isDefaultOption) {
      const all = [...daos, defaultDAOOption];
      if (selectedDAOs.length === all.length) {
        return [];
      }
      return all;
    } else if (selectedDAOs.includes(value)) {
      return selectedDAOs.filter(
        (dao) => dao !== value && dao !== defaultDAOOption,
      );
    } else {
      return [...selectedDAOs, value];
    }
  };

  setSelectedDAOs(updateSelectedDAOs());
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

return (
  <Container>
    <SelectContainer>
      <Title>NDC Dashboard</Title>
      <Filters>
        <div className="d-flex flex-column gap-1">
          <div
            role="button"
            className="wrapper"
            onClick={() => {
              setShowDatePicker(!showDatePicker);
              setMobile(false);
            }}
          >
            <div className="value">{`${formatDate().startDate} - ${
              formatDate().endDate
            }`}</div>
            <i className="icon ph ph-calendar-blank" />
          </div>
          <div
            className="wrapper mobile"
            onClick={() => {
              setShowDatePicker(!showDatePicker);
              setMobile(true);
            }}
          >
            <i className="icon ph ph-calendar-blank" />
          </div>
          <Widget
            src={`ndcdev.near/widget/dashboard.Components.DatePicker`}
            props={{
              period,
              show: showDatePicker,
              mobile,
              handleChange: ({ startDate, endDate }) => {
                setPeriod([startDate, endDate]);
                setShowDatePicker(false);
              },
            }}
          />
        </div>

        <div className="w-100">
          <Widget
            src={`ndcdev.near/widget/dashboard.Components.Switch`}
            props={{
              options: [
                { title: "Charts", icon: "ph ph-chart-bar" },
                { title: "Table", icon: "ph ph-table" },
              ],
              value: dashboardView,
              onChange: () =>
                setDashboardView(
                  dashboardView === "Charts" ? "Table" : "Charts",
                ),
            }}
          />
        </div>
      </Filters>
    </SelectContainer>
    <Widget
      src={`ndcdev.near/widget/dashboard.Components.Aggregators`}
      props={{
        totalTx: dataState.totalTx,
        totalAccounts: dataState.totalAccounts,
        uniqueAccounts: dataState.uniqueAccounts,
        totalBalance: dataState.totalBalance,
        totalDistributed: dataState.distributed,
      }}
    />
    {dashboardView === "Charts" ? (
      <ChartContainer>
        <Widget
          src={`ndcdev.near/widget/dashboard.Components.Chart`}
          props={{
            title: "DAILY NUMBER OF TRANSACTIONS",
            data: dataState.dailyStats,
            key: "total_transactions",
            color: "#A39ACD",
            loading,
          }}
        />
        <Widget
          src={`ndcdev.near/widget/dashboard.Components.Chart`}
          props={{
            title: "UNIQUE ACTIVE USERS",
            data: dataState.dailyStats,
            key: "unique_wallets",
            color: "#E89DBB",
            loading,
          }}
        />
      </ChartContainer>
    ) : (
      <>
        {loading ? (
          <Loading />
        ) : (
          <div className="w-100 flex-column">
            <Widget
              src={`ndcdev.near/widget/dashboard.Components.Table`}
              props={{ daos, API, dateRange }}
            />
          </div>
        )}
      </>
    )}
  </Container>
);
