const API_KEY = props.API_KEY;
const themeColor = props.themeColor;

const singer = props.singer;
const interval = props.interval || "week";
const queries = [
  {
    hash: null,
    firstReqTime: 20,
    id: 1,
    queryOption: {
      sortBy: [
        {
          column: "transactions",
          direction: "desc",
        },
      ],
    },
    query: `SELECT  
      case when LABEL_SUBTYPE is not null then LABEL_SUBTYPE 
        else  'other'  end as "contract",  
      sum(round(TX_FEE,'3')) as "fee" ,
        COUNT(DISTINCT tx_hash) as "transactions" 
    FROM avalanche.core.fact_transactions 
            left JOIN  avalanche.core.dim_labels
           ON ADDRESS = TO_ADDRESS
    WHERE STATUS = 'SUCCESS'
        and FROM_ADDRESS='{{singer}}'
        and block_timestamp::date> '2023-01-01'

  GROUP BY 1 
  order by 2`,
  },
  {
    hash: null,
    firstReqTime: 20,
    id: 2,
    queryOption: {
      sortBy: [
        {
          column: "transactions",
          direction: "desc",
        },
      ],
    },
    query: `SELECT  
      case when PROJECT_NAME is not null then PROJECT_NAME 
        else  'other'  end as "contract",  
      sum(round(TX_FEE,'3')) as "fee" ,
        COUNT(DISTINCT tx_hash) as "transactions" 
    FROM avalanche.core.fact_transactions 
            left JOIN  avalanche.core.dim_labels
           ON ADDRESS = TO_ADDRESS
    WHERE STATUS = 'SUCCESS'
        and FROM_ADDRESS='{{singer}}'
        and block_timestamp::date> '2023-01-01'

  GROUP BY 1 
  order by 2`,
  },
  {
    hash: null,
    firstReqTime: 20,
    id: 3,
    queryOption: {
      sortBy: [
        {
          column: "transactions",
          direction: "desc",
        },
      ],
    },
    query: `SELECT  
      case when PROJECT_NAME is not null then PROJECT_NAME 
        else  'other'  end as "contract",  
      sum(round(TX_FEE,'3')) as "fee" ,
        COUNT(DISTINCT tx_hash) as "transactions" 
    FROM avalanche.core.fact_transactions 
            left JOIN  avalanche.core.dim_labels
           ON ADDRESS = TO_ADDRESS
    WHERE STATUS = 'SUCCESS'
        and FROM_ADDRESS='{{singer}}'
    and LABEL_SUBTYPE in ('token_contract','nf_token_contract')
        and block_timestamp::date> '2023-01-01'

  GROUP BY 1 
  order by 2`,
  },
  {
    hash: null,
    firstReqTime: 20,
    id: 4,
    queryOption: {
      sortBy: [
        {
          column: "first",
          direction: "desc",
        },
      ],
    },
    query: `SELECT  
      case when PROJECT_NAME is not null then PROJECT_NAME  else  'other' end as "project" ,
      split(min(BLOCK_TIMESTAMP::date)::date,'T')[0]  as "first"
    FROM avalanche.core.fact_transactions 
            left JOIN  avalanche.core.dim_labels
           ON ADDRESS = TO_ADDRESS
    WHERE STATUS = 'SUCCESS'
    and FROM_ADDRESS = lower('{{singer}}')  
  
  GROUP BY 1 
  order by 2`,
  },
  {
    hash: null,
    firstReqTime: 20,
    id: 5,
    queryOption: {
      sortBy: [
        {
          column: "activity_period",
          direction: "desc",
        },
      ],
    },
    query: `SELECT  
    case when PROJECT_NAME is not null then PROJECT_NAME  else  'other' end as "project" ,
    split(min(BLOCK_TIMESTAMP::date)::date,'T')[0]  as "first" , 
    split(max(BLOCK_TIMESTAMP::date)::date,'T')[0]  as "last" , 
    DATEDIFF('day',min(BLOCK_TIMESTAMP::date) ,max(BLOCK_TIMESTAMP::date)) as "activity_period"
    FROM avalanche.core.fact_transactions 
            left JOIN  avalanche.core.dim_labels
           ON ADDRESS = TO_ADDRESS
    WHERE STATUS = 'SUCCESS'
    and FROM_ADDRESS = lower('{{singer}}')  
  
  GROUP BY 1 
  order by 2`,
  },
  {
    hash: null,
    firstReqTime: 20,
    id: 6,
    queryOption: {
      sortBy: [
        {
          column: "date",
          direction: "asc",
        },
      ],
    },
    query: `SELECT  
      date_part(epoch, date_trunc('{{week}}',BLOCK_TIMESTAMP::date)) as "date" ,
      count(distinct tx_hash) as "hash" ,
      round(sum(TX_FEE),3) as "fee"
    FROM avalanche.core.fact_transactions 
 WHERE STATUS = 'SUCCESS'
    and FROM_ADDRESS = lower('{{singer}}')    
    and BLOCK_TIMESTAMP::date >='2023-01-01' 
  GROUP BY 1 
  order by 1 asc `,
  },
];

//---------------------------------------------------------------------------------------------------
const tabs = {
  left: "Contract Activity",
  middle: "Token Activity",
  right: "Platform Activity",
};
const setTab = (tab) => State.update({ tab });
const Container = styled.div`
  && {
    text-align: left;
  }
  .tabContent {
    display: inline-flex;
    align-items: left;
    background: rgba(26, 46, 51, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding: 3px 4px;
    list-style-type: none;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: center;
  }
  .tab-item .active {
    background: #304352;
  }
  .tab-item button {
    background-color: transparent;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    color: #fff;
    height: 30px;
    padding: 0 22px;
    border: none;
  }
`;
//---------------------------------------------------------------------------------------------------
const general_theme = {
  height: "110px",
  align: "center",
  description: "",
  brand: "Early ",
  fontsize: "35px",
  fontweight: "50px",
  afterbrand: "or Not",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const tabelabove = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Ecosystem ",
  fontsize: "30px",
  fontweight: "25px",
  afterbrand: "Activity",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const chartabove = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Activity ",
  fontsize: "30px",
  fontweight: "25px",
  afterbrand: "Trend",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
//---------------------------------------------------------------------------------------------------

// state ####################################

State.init({
  searchedSinger: "",
  searchedInterval: "",
  result: {},
  //loader: [],
  isLoading: false,
  error: [],
  queriesRuned: false,
  tab: tabs.left,
});

const checkNewSinger = () => {
  if (state.searchedSinger === singer && state.searchedInterval === interval) {
    return;
  } else {
    State.update({
      searchedSinger: singer,
      searchedInterval: interval,
      //loader: [],
      loader: false,
      result: {},
      isLoading: true,
      queriesRuned: false,
    });
  }
  return true;
};
if (checkNewSinger()) {
  return <div>loading...</div>;
}
checkNewSinger();
// handle hashed data #############################
const handleHasedData = ({ hash, id }) => {
  if (state.result["query" + id].isDone) return;
  const result = fetchData(hash);
  if (result.isLoading) {
    State.update({
      isLoading: true,
      result: {
        ...state.result,
        ["query" + id]: { isLoading: true, error: false, data: null },
      },
    });
  }
  if (result.error) {
    const errors = state.error;
    errors.push(`query ${id}: ${result.error}`);
    State.update({
      error: errors,
      result: {
        ...state.result,
        ["query" + id]: {
          isLoading: false,
          error: true,
          data: null,
          isDone: true,
        },
      },
    });
  }
  if (result.data) {
    const filteredData = result.data.filter(
      (row) => row.SINGER === state.searchedSinger
    );
    State.update({
      result: {
        ...state.result,
        ["query" + id]: {
          isLoading: false,
          error: false,
          data: filteredData,
          isDone: true,
        },
      },
    });
  }
};
const fetchData = (hash) => {
  const data = fetch(
    `https://api.flipsidecrypto.com/api/v2/queries/${hash}/data/latest`,
    {
      subscribe: true,
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    }
  );
  const result = {
    data: (data && data.body) || null,
    error: (data && !data.ok && (data.status || data.error)) || null,
    isLoading: !data && !error,
  };
  return result;
};
// handle runed data ###################################
const createQuery = (queries, singer, interval) => {
  const queriesArr = queries.map((q) => {
    const queryWithProps = q.query
      .replaceAll("{{singer}}", singer)
      .replaceAll("{{week}}", interval);
    q.query = queryWithProps;
    return q;
  });
  return queriesArr;
};
const isAllDataLoaded = () => {
  const resultArr = Object.entries(state.result);
  if (resultArr.length === 0) return false;
  return resultArr.every((query) => {
    return !query[1].isLoading;
  });
};
const updateResultState = ({ data, error, isLoading, queryRunId, id }) => {
  State.update(({ result, loader }) => {
    const newResult = {
      ...result,
      [`query${id}`]: {
        data:
          data?.rows === undefined ? null : data.rows === null ? [] : data.rows,
        error: !!error,
        isLoading: isLoading,
        queryRunId: queryRunId,
        id: id,
      },
    };
    //const newLoader = loader.filter(({ id: loaderId }) => loaderId !== id);
    if (error) {
      const queryError = `query${id} : ${error}`;
      return {
        ...state,
        result: { ...newResult },
        //loader: newLoader.length === 0 ? [] : newLoader,
        error: [...state.error, queryError],
      };
    } else {
      if (data) {
        Storage.set(
          `${state.searchedSinger}-${state.searchedInterval}-${id}`,
          queryRunId
        );
      }
      return {
        ...state,
        result: { ...newResult },
        //...(data && { loader: newLoader.length === 0 ? [] : newLoader }),
      };
    }
  });
};

const runqueries = (queries) => {
  if (state.searchedSinger.length === 0) {
    State.update({
      isLoading: false,
      error: [...state.error, "singer is not provided"],
    });
    return;
  }

  const queriesArr = createQuery(
    queries,
    state.searchedSinger,
    state.searchedInterval
  );
  const loader = queriesArr.map((q) => {
    const queryRunId = Storage.get(
      `${state.searchedSinger}-${state.searchedInterval}-${q.id}`
    );
    const props = {
      apiKey: API_KEY,
      id: q.id,
      query: q.query,
      onResult: updateResultState,
      firstReqTime: q.firstReqTime,
      queryRunId,
      queryOption: {
        page: {
          number: 1,
          size: 1000,
        },
        cacheTime: 60,
        ...q?.queryOption,
      },
    };
    return {
      id: q.id,
      element: (
        <Widget src="lord1.near/widget/api-flipside" id={q.id} props={props} />
      ),
    };
  });
  State.update({
    loader: loader,
    isLoading: true,
    queriesRuned: true,
  });
};

if (isAllDataLoaded()) {
  State.update({ isLoading: false });
}

if (state.isLoading) {
  const withHashQueries = [];
  const withoutHashQueries = [];
  queries.forEach(({ hash, id, query, ...other }) => {
    if (hash) {
      withHashQueries.push({ hash, id });
    }
    if (query) {
      withoutHashQueries.push({ query, hash, id, ...other });
    }
  });
  withHashQueries.forEach((query) => handleHasedData(query));
  if (!state.queriesRuned) {
    runqueries(withoutHashQueries);
  }
}

// error managment #######################
if (state.error.length > 0) {
  function hide() {
    const errors = state.error;
    errors.shift();
    if (errors.length > 0) setTimeout(hide, 2500);
    State.update({ error: errors });
  }
  setTimeout(hide, 2500);
}

// get props charts #######################################
const getMixProps = (data, dateKey, serieses, colors, chartOption) => {
  data = data || [];
  serieses = serieses || [{ key: "", seriesName: "", type: "", id: 1 }];
  colors = colors || [];
  chartOption = chartOption || {};

  const dataFormat = serieses.map((series) => {
    const dataFormated = data.map((d) => [d[dateKey] * 1000, d[series.key]]);
    return {
      data: dataFormated,
      name: series.seriesName,
      type: series.type,
      axisId: series.id,
    };
  });
  const props = {
    series: dataFormat,
    colors: colors,
    chartOption: {
      title: "chart title",
      subtitle: "chart subtitle",
      legend: true,
      stacking: "false",
      ...chartOption,
    },
    overrideOptions: {
      plotOptions: {
        column: {
          stacking: "false",
        },
        series: {
          dataGrouping: { enabled: false },
        },
      },
    },
    themeColor: { chart: themeColor.chart },
    spinnerColors: themeColor.spinnerColors,
  };
  return props;
};

const getPieProps = (data, [key, value], colors, chartOption) => {
  data = data || [];
  colors = colors || [];
  chartOption = chartOption || {};

  const groupedData = {};
  for (const item of data) {
    const keyValue = item[key];
    const valueValue = item[value];

    if (groupedData[keyValue]) {
      groupedData[keyValue] += valueValue;
    } else {
      groupedData[keyValue] = valueValue;
    }
  }

  const dataFormat = Object.entries(groupedData).map(
    ([groupKey, groupValue]) => [groupKey, groupValue]
  );

  const props = {
    data: dataFormat,
    colors: colors,
    chartOption: {
      title: "chart title",
      type: "pie",
      legend: false,
      connector: false,
      ...chartOption,
    },
    themeColor: { chart: themeColor.chart },
    spinnerColors: themeColor.spinnerColors,
  };
  return props;
};

// dom sections ##############################################
const noData = <div className="w-100 py-4 text-center"> No data available</div>;
const ChartIsLoading = (queryId) => (
  <div
    className={`w-100 ${
      state.result?.[`query${queryId}`]?.isLoading ? "d-block" : "d-none"
    }`}
  >
    <Widget
      src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
      props={{ ...spinnerColors }}
    />
  </div>
);
const ChartHasError = (queryId) =>
  state.result?.[`query${queryId}`]?.error && (
    <div className="py-4 text-center">An error occurred for this section</div>
  );

const CardIsLoading = (queryId) =>
  state.result?.[`query${queryId}`]?.isLoading && (
    <div
      className="d-flex flex-column gap-1"
      style={{
        padding: "60px 12px",
      }}
    >
      <Widget
        src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
        props={{
          ...spinnerColors,
        }}
      />
      <span
        style={{
          fontWeight: "bold",
          fontsize: 15,
          color: "#4f46e5",
          textAlign: "center",
        }}
      >
        Loading...
      </span>
    </div>
  );
const CardHasError = (queryId) =>
  state.result?.[`query${queryId}`]?.error && (
    <div className="d-flex justify-content-center align-items-center h-100 p-4 pb-1">
      An error occurred for this section
    </div>
  );

let TableLeft = (
  <div
    style={{
      background: themeColor?.sbt_area?.section_bg,
      display: state.tab === tabs.left ? "" : "none",
    }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div
      style={{ background: themeColor?.sbt_area?.card_bg }}
      className="shadow-sm rounded-4 overflow-auto"
    >
      {CardIsLoading(1)}
      {CardHasError(1)}
      {state.result["query" + 1]?.data && (
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.result["query" + 1]?.data,
            rowsCount: 6,
            columns: [
              { title: "Contract", key: "contract", colors: "#806ce1" },
              { title: "Transactions", key: "transactions" },
              { title: "Fee(Avax)", key: "fee" },
            ],
          }}
        />
      )}
    </div>
  </div>
);
let TableRight = (
  <div
    style={{
      background: themeColor?.sbt_area?.section_bg,
      display: state.tab === tabs.right ? "" : "none",
    }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div
      style={{ background: themeColor?.sbt_area?.card_bg }}
      className="shadow-sm rounded-4 overflow-auto"
    >
      {CardIsLoading(2)}
      {CardHasError(2)}
      {state.result["query" + 2]?.data && (
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.result["query" + 2]?.data,
            rowsCount: 6,
            columns: [
              { title: "Contract", key: "contract", colors: "#806ce1" },
              { title: "Transactions", key: "transactions" },
              { title: "Fee(Avax)", key: "fee" },
            ],
          }}
        />
      )}
    </div>
  </div>
);

let TableMiddle = (
  <div
    style={{
      background: themeColor?.sbt_area?.section_bg,
      display: state.tab === tabs.middle ? "" : "none",
    }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div
      style={{ background: themeColor?.sbt_area?.card_bg }}
      className="shadow-sm rounded-4 overflow-auto"
    >
      {CardIsLoading(3)}
      {CardHasError(3)}
      {state.result["query" + 3]?.data && (
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.result["query" + 3]?.data,
            rowsCount: 6,
            columns: [
              { title: "Contract", key: "contract", colors: "#806ce1" },
              { title: "Transactions", key: "transactions" },
              { title: "Fee(Avax)", key: "fee" },
            ],
          }}
        />
      )}
    </div>
  </div>
);

let BelowLeft = (
  <div
    style={{ background: themeColor?.sbt_area?.section_bg }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div
      style={{ background: themeColor?.sbt_area?.card_bg }}
      className="shadow-sm rounded-4 overflow-auto"
    >
      {CardIsLoading(4)}
      {CardHasError(4)}
      {state.result["query" + 4]?.data && (
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.result["query" + 4]?.data,
            rowsCount: 10,
            columns: [
              { title: "Project", key: "project", colors: "#806ce1" },
              { title: "Activity Period", key: "first" },
            ],
          }}
        />
      )}
    </div>
  </div>
);

let BelowRight = (
  <div
    style={{ background: themeColor?.sbt_area?.section_bg }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div
      style={{ background: themeColor?.sbt_area?.card_bg }}
      className="shadow-sm rounded-4 overflow-auto"
    >
      {CardIsLoading(5)}
      {CardHasError(5)}
      {state.result["query" + 5]?.data && (
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.result["query" + 5]?.data,
            rowsCount: 10,
            columns: [
              { title: "Project", key: "project", colors: "#806ce1" },
              { title: "First Activity", key: "first" },
              { title: "Last Activity", key: "last" },
              { title: "Activity Period", key: "activity_period" },
            ],
          }}
        />
      )}
    </div>
  </div>
);
let ChartSections = (
  <div className=" col-12 col-md-12">
    <div className=" col-12">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2"
      >
        {ChartIsLoading(6)}
        {ChartHasError(6)}
        {state.result["query" + 6]?.data && (
          <Widget
            src="lord1.near/widget/mix-chart"
            props={getMixProps(
              state.result["query" + 6]?.data,
              "date",
              [
                {
                  key: "hash",
                  seriesName: "Transaction",
                  type: "column",
                  id: 1,
                },
                {
                  key: "fee",
                  seriesName: "Fee(Avax)",
                  type: "spline",
                  id: 2,
                },
              ],
              themeColor.chartColor,
              {
                title: "",
                subtitle: `Number of transactions `,
                stacking: "normal",
              }
            )}
          />
        )}
      </div>
    </div>
  </div>
);
return (
  <>
    {state.loader && (
      <div className="d-none">
        {state.loader.map((l) => (
          <pre key={l.id}>{l?.element}</pre>
        ))}
      </div>
    )}
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      {state.error.length > 0 &&
        state.error.map((er) => (
          <div
            key={er}
            className="toast show align-items-center text-bg-danger border-0"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body">{er}</div>
            </div>
          </div>
        ))}
    </div>
    <div
      className="w-100"
      style={{ backgroundColor: themeColor?.search_sbt?.table_bg }}
    >
      <div className="w-100">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={chartabove}
                />
                <div>{ChartSections} </div>
              </div>
              <div className="col-md-6">
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={tabelabove}
                />
                <div className="w-100 d-flex justify-content-center">
                  <Container>
                    <ul className="tabContent">
                      {Object.values(tabs).map((tab) => (
                        <li key={tab} className="tab-item">
                          <button
                            className={`${state.tab === tab ? "active" : ""}`}
                            aria-current="page"
                            onClick={() => setTab(tab)}
                          >
                            {tab}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </Container>
                </div>
                <div>
                  <div className="">
                    {TableLeft}
                    {TableMiddle}
                    {TableRight}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Widget
              src="lord1.near/widget/header-dynamic"
              props={general_theme}
            />
            <div className="row">
              <div className="col-md-4">{BelowLeft} </div>
              <div className="col-md-8"> {BelowRight} </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
