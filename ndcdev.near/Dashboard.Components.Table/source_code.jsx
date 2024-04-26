const Wrapper = styled.div`
  width: 100%;

  .selected-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 16px;
    gap: 10px;
    font-size: 14px;
    font-weight: 600;

    i {
      color: #b0afb1;
    }

    &.dao {
      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
  }
`;

const DesktopFilters = styled.div`
  display: flex;
  width: 100%;
  border-radius: 6px;
  background: #f8f8f8;

  @media screen and (max-width: 1000px) {
    gap: 40px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileFilters = styled.div`
  display: none;
  width: 100%;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .filters {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
`;

const { daos, API, dateRange } = props;
const Loading = () => <Widget src="flashui.near/widget/Loading" />;

const defaultDAOOption = "All DAOs";

const FILTER_IDS = {
  dao: "dao",
  userRetentions: "userRetentions",
  dappsUsed: "dappsUsed",
  acquisitionCost: "acquisitionCost",
};

const FILTER_OPENS = Object.keys(FILTER_IDS).map((item) => {
  return { [item]: false };
});

const [dataSet, setDataSet] = useState([]);
const [loading, setLoading] = useState(false);
const [selectedDAOs, setSelectedDAOs] = useState(daos.map((d) => d.title));
const [filteredData, setFilteredData] = useState([]);
const [filtersIsOpen, setFiltersIsOpen] = useState(FILTER_OPENS);
const [mobileFilters, setMobileFilters] = useState(flase);

const onFilterClick = (value) =>
  setFiltersIsOpen({ ...FILTER_OPENS, [value]: !filtersIsOpen[value] });

const filterDAO = (value) => {
  let newSelection;

  if (value === defaultDAOOption) {
    const all = [defaultDAOOption, ...daos.map((d) => d.title)];
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

const fetchData = async (key) => {
  setLoading(true);
  const filtredDAOs = selectedDAOs.length
    ? daos.filter((d) => selectedDAOs.includes(d.title))
    : daos;

  let newDataSet = dataSet;

  API[key](filtredDAOs).then((resp) => {
    if (!resp.body) return;

    const data = resp.body;
    if (data)
      Object.entries(data).map(([id, value]) => {
        const targetData = newDataSet.find((d) => d.id === parseInt(id));
        // targetData[key] = value;
        targetData[key] = Math.random() * 10;
      });

    // mocked data
    newDataSet = [
      {
        id: 1,
        title: "HoM - Direct funding",
        userRetentions: 0.5,
        dappsUsed: 3,
        acquisitionCost: 1.5,
      },
      {
        id: 2,
        title: "Build DAO",
        userRetentions: 0.75,
        dappsUsed: 2,
        acquisitionCost: 0,
      },
      {
        id: 3,
        title: "Gaming DAO",
        userRetentions: 1,
        dappsUsed: 10,
        acquisitionCost: 24,
      },
      {
        id: 4,
        title: "Marketing DAO",
        userRetentions: 1,
        dappsUsed: 10,
        acquisitionCost: 0,
      },
      {
        id: 5,
        title: "Near Research Collective",
        userRetentions: 0.25,
        dappsUsed: 1,
        acquisitionCost: 0,
      },
      {
        id: 6,
        title: "Degen DAO",
        userRetentions: 0.2,
        dappsUsed: 4,
        acquisitionCost: 34.5,
      },
      {
        id: 7,
        title: "Onboard DAO",
        userRetentions: 0,
        dappsUsed: 2,
        acquisitionCost: 0,
      },
      {
        id: 8,
        title: "Aurora Community DAO",
        userRetentions: 0.66,
        dappsUsed: 3,
        acquisitionCost: 0,
      },
      {
        id: 9,
        title: "Near Globe DAO",
        userRetentions: 0,
        dappsUsed: 0,
        acquisitionCost: 0,
      },
      {
        id: 10,
        title: "NFT DAO",
        userRetentions: 0.8,
        dappsUsed: 3,
        acquisitionCost: 0,
      },
      {
        id: 11,
        title: "SHE IS NEAR",
        userRetentions: 0,
        dappsUsed: 1,
        acquisitionCost: 0.5,
      },
      {
        id: 12,
        title: "Africa Community DAO",
        userRetentions: 0,
        dappsUsed: 0,
        acquisitionCost: 0,
      },
      {
        id: 13,
        title: "Freelancer DAO",
        userRetentions: 0,
        dappsUsed: 0,
        acquisitionCost: 2.35,
      },
      {
        id: 14,
        title: "Service DAO",
        userRetentions: 0,
        dappsUsed: 0,
        acquisitionCost: 0.46,
      },
      {
        id: 15,
        title: "SMM",
        userRetentions: 0,
        dappsUsed: 3,
        acquisitionCost: 0.1,
      },
      {
        id: 16,
        title: "NDC Ops",
        userRetentions: 1,
        dappsUsed: 4,
        acquisitionCost: 2,
      },
      {
        id: 17,
        title: "HoM - Grassroot DAOs funding",
        userRetentions: 1,
        dappsUsed: 12,
        acquisitionCost: 0.75,
      },
    ];

    setDataSet(newDataSet);
    setFilteredData(newDataSet);
    setLoading(false);
  });
};

useEffect(() => {
  const filtredDAOs = selectedDAOs.length
    ? daos.filter((d) => selectedDAOs.includes(d.title))
    : daos;

  if (dataSet.length === 0)
    setDataSet(
      filtredDAOs.map((dao) => {
        return {
          id: dao.id,
          title: dao.title,
          [FILTER_IDS.userRetentions]: 0,
          [FILTER_IDS.dappsUsed]: 0,
          [FILTER_IDS.acquisitionCost]: 0,
        };
      }),
    );

  setFilteredData(
    dataSet.filter((d) => filtredDAOs.map((dd) => dd.title).includes(d.title)),
  );
}, [selectedDAOs]);

useEffect(() => {
  console.log(dataSet, dateRange);
  if (dataSet.length > 0 && dateRange) {
    fetchData(FILTER_IDS.userRetentions);
    fetchData(FILTER_IDS.dappsUsed);
    fetchData(FILTER_IDS.acquisitionCost);
  }
}, [dataSet, dateRange]);

const sortData = (field) =>
  setDataSet(filteredData.sort((a, b) => b[field] - a[field]));

const SortingRow = ({ title, field }) => (
  <div className="selected-container">
    <div className="d-flex align-items-end gap-2">
      <i className="ph ph-info fs-5" />
      <div>{title}</div>
    </div>
    <i
      role="button"
      className="ph ph-caret-up-down fs-5"
      onClick={() => sortData(field)}
    />
  </div>
);

return (
  <Wrapper>
    <MobileFilters>
      <div className="w-100 gap-3 d-flex justify-content-between align-items-center">
        <Widget
          src={`ndcdev.near/widget/dashboard.Components.Select`}
          props={{
            id: FILTER_IDS.dao,
            text: "DAO",
            hintText: "NDC grassroots DAOs",
            options: daos.map((d) => d.title),
            values: selectedDAOs,
            defaultValue: defaultDAOOption,
            multiple: true,
            filterIsOpen: filtersIsOpen[FILTER_IDS.dao],
            onFilterClick,
            onChange: (value) => filterDAO(value),
            onClear: () => {
              setSelectedDAOs([]);
            },
            isTooltipVisible: true,
            noBorder: true,
            containerClass: "selected-container dao",
          }}
        />
        <div
          role="button"
          className="btn btn-secondary outlined btn-icon"
          onClick={() => setMobileFilters(!mobileFilters)}
        >
          <i className="ph ph-funnel fs-5" />
        </div>
      </div>
      {mobileFilters && (
        <div className="filters">
          <SortingRow
            title="User Retention"
            field={FILTER_IDS.userRetentions}
          />
          <SortingRow title="DApp's Used" field={FILTER_IDS.dappsUsed} />
          <SortingRow
            title="Acquisition Cost"
            field={FILTER_IDS.acquisitionCost}
          />
        </div>
      )}
    </MobileFilters>
    <DesktopFilters>
      <div className="w-100 gap-5 d-flex justify-content-between align-items-center">
        <Widget
          src={`ndcdev.near/widget/dashboard.Components.Select`}
          props={{
            id: FILTER_IDS.dao,
            text: "DAO",
            hintText: "NDC grassroots DAOs",
            options: daos.map((d) => d.title),
            values: selectedDAOs,
            defaultValue: defaultDAOOption,
            multiple: true,
            filterIsOpen: filtersIsOpen[FILTER_IDS.dao],
            onFilterClick,
            onChange: (value) => filterDAO(value),
            onClear: () => {
              setSelectedDAOs([]);
            },
            isTooltipVisible: true,
            noBorder: true,
            containerClass: "selected-container dao",
          }}
        />
        <SortingRow title="User Retention" field={FILTER_IDS.userRetentions} />
        <SortingRow title="DApp's Used" field={FILTER_IDS.dappsUsed} />
        <SortingRow
          title="Acquisition Cost"
          field={FILTER_IDS.acquisitionCost}
        />
      </div>
    </DesktopFilters>
    <Widget
      src={`ndcdev.near/widget/dashboard.Components.Table.Cells`}
      props={{ dataSet: filteredData, loading }}
    />
  </Wrapper>
);
