const { FilterItem, SubFilterItem, FilterContainer } = VM.require(
  `ndcdev.near/widget/Dashboard.Components.Table.Filters.styled`,
);

if (!FilterItem || !SubFilterItem || !FilterContainer)
  <Widget src="flashui.near/widget/Loading" />;

const { ndcDAOs } = props;

const defaultDAOOption = "All";
const PERIODS = ["daily", "weekly", "monthly"];
const CURRENCIES = ["near", "stable"];
const FILTERS = [
  {
    text: "DAO",
    hintText: "NDC grassroots DAOs",
    options: [defaultDAOOption, ...ndcDAOs],
  },
  {
    text: "User Retetntion",
    hintText: "Text TBD",
    options: PERIODS,
  },
  {
    text: "DAP's Used",
    hintText: "Text TBD",
    options: PERIODS,
  },
  {
    text: "Aquisition Cost",
    hintText: "Text TBD",
    options: CURRENCIES,
  },
];

const [loading, setLoading] = useState(false);
const [selectedDAOs, setSelectedDAOs] = useState([]);
const [filter, setFilter] = useState(
  FILTERS.map((filter) => filter.options[0]),
);
const [results, setResults] = useState(
  ndcDAOs.map((daoId) => {
    return { [daoId]: FILTERS.map((f) => "-") };
  }),
);

const fetchData = () => {
  setLoading(true);
  const daos = selectedDAOs.length ? selectedDAOs : ndcDAOs;

  daos.map((daoId) => {
    setResults[daoId] = [712, 4, 5];
  });
  setLoading(false);
};

useEffect(() => fetchData(), [selectedDAOs, filter]);

return (
  <FilterContainer>
    {FILTERS.map(({ text, hintText, options, value }, i) => (
      <div className="d-flex flex-column gap-1">
        <FilterItem>
          <Widget
            src={`ndcdev.near/widget/Dashboard.Components.Select.index`}
            props={{
              containerClass: "selected-container black",
              options,
              values: (
                <div className="d-flex align-items-center gap-2">
                  {text}
                  <i className="bi bi-info-circle" label={hintText} />
                </div>
              ),
              onChange: (value) => {
                let filterOptions = filter;
                filterOptions[i] = value;
                setFilter(filterOptions);
              },
            }}
          />
        </FilterItem>

        <SubFilterItem>
          <div>{filter[i]}</div>
        </SubFilterItem>
      </div>
    ))}
  </FilterContainer>
);
