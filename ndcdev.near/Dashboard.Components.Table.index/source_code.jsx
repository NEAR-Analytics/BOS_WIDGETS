const { ScrollableWrapper } = VM.require(
  `ndcdev.near/widget/Dashboard.Components.Table.styled`,
);

const { ndcDAOs, API } = props;
const Loading = () => <Widget src="flashui.near/widget/Loading" />;

if (!ScrollableWrapper) return <Loading />;

const defaultDAOOption = "All DAOs";
const CURRENCIES = {
  NEAR: "Near",
  "USDC.e": "a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near",
  "USDT.e": "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near",
};
const RETENTIONS = ["1 month", "2 months", "3 months", "4 months"];
const DAPPS_USED_PERIOD = ["All Time"];

const [dataSet, setDataSet] = useState({});
const [loading, setLoading] = useState(false);

const [allDAOs, setAllDAOs] = useState([]);
const [allDapps, setAllDapps] = useState([]);
const [selectedDAOs, setSelectedDAOs] = useState([]);
const [selectedRetention, setSelectedRetention] = useState(0);
const [selectedCurrency, setSelectedCurrency] = useState(
  Object.keys(CURRENCIES)[0],
);

const FILTERS = [
  {
    text: "DAO",
    hintText: "NDC grassroots DAOs",
    options: [defaultDAOOption, ...ndcDAOs],
    values: selectedDAOs,
    defaultValue: defaultDAOOption,
    multiple: true,
    onChange: (value) => filterDAO(value),
    onClear: () => {
      setSelectedDAOs([]);
    },
  },
  {
    text: "User Retention",
    hintText: "Text TBD",
    options: RETENTIONS,
    values: [RETENTIONS[selectedRetention]],
    onChange: (value) => setSelectedRetention(RETENTIONS.indexOf(value)),
  },
  {
    text: "DAP's Used",
    hintText: "Text TBD",
    options: DAPPS_USED_PERIOD,
    values: [DAPPS_USED_PERIOD[0]],
    onChange: (value) => {},
  },
  {
    text: "Aquisition Cost",
    hintText: "Text TBD",
    options: Object.keys(CURRENCIES),
    values: [selectedCurrency],
    onChange: (value) => setSelectedCurrency(value),
  },
];

const sortByDAOName = (keys) =>
  Object.keys(keys)
    .sort()
    .reduce((obj, key) => {
      obj[key] = keys[key];
      return obj;
    }, {});

const filterDAO = (value) => {
  setSelectedDAOs(
    value === defaultDAOOption
      ? []
      : selectedDAOs.includes(value)
      ? selectedDAOs.filter(
          (daoId) => daoId !== value && daoId !== defaultDAOOption,
        )
      : [...selectedDAOs, value],
  );
};

const fetchDapps = () => {
  setLoading(true);

  API.get_dapps().then((resp) => {
    const dapps = resp.body;
    if (dapps)
      setAllDapps(
        Object.values(dapps)
          .map((dapps) => dapps.map((d) => d.account_id))
          .reduce((a, b) => [...a, ...b], []),
      );
  });
  setLoading(false);
};

const fetchData = () => {
  setLoading(true);
  const filtredDAOs = selectedDAOs.length ? selectedDAOs : ndcDAOs;
  let newDataSet = {};

  const promises = filtredDAOs.flatMap((daoId) => {
    newDataSet[daoId] = {};

    return [
      API.get_retentions(daoId).then((resp) => {
        const data = resp.body;

        if (data) {
          const retentionIndex =
            selectedRetention > data.length - 1
              ? data.length - 1
              : selectedRetention;
          newDataSet[daoId].retention = {
            start: parseInt(data[retentionIndex].unique_users_start),
            end: parseInt(data[retentionIndex].unique_users_end),
          };
        }
      }),
      API.get_balance(daoId).then((resp) => {
        const data = resp.body;
        if (data)
          newDataSet[daoId].balance =
            data.find((d) => d.contract === CURRENCIES[selectedCurrency])
              ?.amount ?? 0;
      }),
      API.get_contract_relations(daoId).then((resp) => {
        const interactedAccounts = resp.body;
        if (interactedAccounts) {
          newDataSet[daoId].interactedAccounts = interactedAccounts.length;

          newDataSet[daoId].dappsUsed = allDapps.filter((dapp) =>
            interactedAccounts.includes(dapp),
          ).length;
          console.log(interactedAccounts);
          console.log(allDapps.length);
          console.log(newDataSet[daoId].dappsUsed);
        }
      }),
    ];
  });

  Promise.all(promises).then(() => {
    const orderedByDAOState = sortByDAOName(newDataSet);
    setDataSet(orderedByDAOState);
    setLoading(false);
  });
};

useEffect(() => {
  fetchDapps();
}, []);

useEffect(() => {
  fetchData();
}, [selectedDAOs, selectedRetention, selectedCurrency, allDapps]);

return (
  <ScrollableWrapper>
    <div className="d-flex gap-2 w-100">
      {FILTERS.map((filter) => (
        <Widget
          src={`ndcdev.near/widget/Dashboard.Components.Table.Filters.index`}
          props={{ ...filter }}
        />
      ))}
    </div>
    {loading ? (
      <Loading />
    ) : (
      <Widget
        src={`ndcdev.near/widget/Dashboard.Components.Table.Cells.index`}
        props={{ dataSet }}
      />
    )}
  </ScrollableWrapper>
);
