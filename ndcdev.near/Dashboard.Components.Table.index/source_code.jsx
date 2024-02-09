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

const FILTER_IDS = {
  dao: "dao",
  userRetention: "userRetention",
  dapUsed: "dapUsed",
  aquisitionCost: "aquisitionCost",
};

const FILTER_OPENS = Object.keys(FILTER_IDS).map((item) => {
  return { [item]: false };
});

const [dataSet, setDataSet] = useState({});
const [loading, setLoading] = useState(false);

const [allDAOs, setAllDAOs] = useState([]);
const [allDapps, setAllDapps] = useState([]);
const [selectedDAOs, setSelectedDAOs] = useState([]);
const [selectedRetention, setSelectedRetention] = useState(0);
const [selectedCurrency, setSelectedCurrency] = useState(
  Object.keys(CURRENCIES)[0],
);

const [filtersIsOpen, setFiltersIsOpen] = useState(FILTER_OPENS);
const onFilterClick = (value) =>
  setFiltersIsOpen({ ...FILTER_OPENS, [value]: !filtersIsOpen[value] });

const FILTERS = [
  {
    id: FILTER_IDS.dao,
    text: "DAO",
    hintText: "NDC grassroots DAOs",
    options: [defaultDAOOption, ...ndcDAOs],
    values: selectedDAOs,
    defaultValue: defaultDAOOption,
    multiple: true,
    filterIsOpen: filtersIsOpen[FILTER_IDS.dao],
    onFilterClick,
    onChange: (value) => filterDAO(value),
    onClear: () => {
      setSelectedDAOs([]);
    },
  },
  {
    id: FILTER_IDS.userRetention,
    text: "User Retention",
    hintText:
      "The percentage of accounts who continue interacting on chain recently: Accounts onboarded/Accounts left",
    options: RETENTIONS,
    values: [RETENTIONS[selectedRetention]],
    filterIsOpen: filtersIsOpen[FILTER_IDS.userRetention],
    onFilterClick,
    onChange: (value) => setSelectedRetention(RETENTIONS.indexOf(value)),
  },
  {
    id: FILTER_IDS.dapUsed,
    text: "DApp's Used",
    hintText:
      "Median number of dApps used by accounts retained for more then a week",
    options: DAPPS_USED_PERIOD,
    values: [DAPPS_USED_PERIOD[0]],
    filterIsOpen: filtersIsOpen[FILTER_IDS.dapUsed],
    onFilterClick,
    onChange: (value) => {},
  },
  {
    id: FILTER_IDS.aquisitionCost,
    text: "Acquisition Cost",
    hintText:
      "Budget divided by the number of accounts interacting  through the funded initiative",
    options: Object.keys(CURRENCIES),
    values: [selectedCurrency],
    filterIsOpen: filtersIsOpen[FILTER_IDS.aquisitionCost],
    onFilterClick,
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
  let newSelection;

  if (value === defaultDAOOption) {
    const all = [defaultDAOOption, ...ndcDAOs];
    const isCurrentSelectionFull = selectedDAOs.length === all.length;
    newSelection = isCurrentSelectionFull ? [] : all;
  } else if (selectedDAOs.includes(value)) {
    newSelection = selectedDAOs.filter(
      (daoId) => daoId !== value && daoId !== defaultDAOOption,
    );
  } else {
    newSelection = [...selectedDAOs, value];
  }

  setSelectedDAOs(newSelection);
};

const fetchDapps = () => {
  setLoading(true);

  API.get_dapps().then((resp) => {
    if (!resp.body) {
      setLoading(false);
      return;
    }

    const dapps = resp.body;
    if (dapps)
      setAllDapps(
        Object.values(dapps)
          .map((dapps) => dapps.map((d) => d.account_id))
          .reduce((a, b) => [...a, ...b], []),
      );
  });
};

const fetchData = () => {
  setLoading(true);
  const filtredDAOs = selectedDAOs.length ? selectedDAOs : ndcDAOs;
  let newDataSet = {};

  const promises = filtredDAOs.flatMap((daoId) => {
    newDataSet[daoId] = {
      balance: 0,
      interactedAccounts: 0,
      dappsUsed: 0,
      retention: {
        start: 0,
        end: 0,
      },
    };

    return [
      API.get_retentions(daoId).then((resp) => {
        if (!resp.body) return;

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
        if (!resp.body) return;

        const data = resp.body;
        if (data)
          newDataSet[daoId].balance =
            data.find((d) => d.contract === CURRENCIES[selectedCurrency])
              ?.amount ?? 0;
      }),
      API.get_contract_relations(daoId).then((resp) => {
        if (!resp.body) return;

        const interactedAccounts = resp.body;
        if (interactedAccounts) {
          newDataSet[daoId].interactedAccounts = interactedAccounts.length;
          newDataSet[daoId].dappsUsed = allDapps.filter((dapp) =>
            interactedAccounts.includes(dapp),
          ).length;
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
          key={filter.id}
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
