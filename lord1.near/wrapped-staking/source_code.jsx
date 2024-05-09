const API_KEY = props.API_KEY;
const themeColor = props.themeColor;
const singer = props.singer;
const interval = props.interval || "week";
const queries = [
  {
    hash: null,
    firstReqTime: 5,
    id: 4,
    query: `
 with staketable as (
          select date_trunc ({{week}},block_timestamp) as date,
                  'Stake' as action_type,
                  count (distinct tx_hash) as Actions_Count,
                  count (distinct signer_id) as Users_Count,
                  sum (amount) as Volume,
                  avg (amount) as Average_Volume,
                  sum (actions_count) over (order by date) as Cumulative_Actions,
                  sum (volume) over (order by date) as Cumulative_Volume
          from near.gov.fact_staking_actions
          where ACTION in ('staking') 
          and SIGNER_ID='{{singer}}'
group by 1,2),

unstaketable as (
          select date_trunc ({{week}},block_timestamp) as date,
                'Unstake' as action_type,
                count (distinct tx_hash) as Actions_Count,
                count (distinct signer_id) as Users_Count,
                sum (amount)*-1 as Volume,
                avg (amount) as Average_Volume,
                sum (actions_count) over (order by date) as Cumulative_Actions,
                sum (volume*-1) over (order by date) as Cumulative_Volume
          from near.gov.fact_staking_actions
          where ACTION in ('unstaking') 
            and SIGNER_ID='{{singer}}' 
group by 1,2) 

select 
        COALESCE(t1.actions_count,0)+COALESCE(t2.actions_count,0) as "transactions",
        COALESCE(round(t1.volume,2),0) as "staked_volume",
        COALESCE(round(t2.volume,2),0) as "unstaked_volume",
        COALESCE("staked_volume" + "unstaked_volume" ,0) as "net_volume"
from staketable t1 , unstaketable t2 
order by 1 desc
`,
  },
  {
    hash: null,
    firstReqTime: 5,
    id: 6,
    queryOption: {
      sortBy: [
        {
          column: "date",
          direction: "asc",
        },
      ],
    },
    query: `
 with staketable as (
          select date_trunc ({{week}},block_timestamp) as date,
                  'Stake' as action_type,
                  count (distinct tx_hash) as Actions_Count,
                  count (distinct signer_id) as Users_Count,
                  sum (amount) as Volume,
                  avg (amount) as Average_Volume,
                  sum (actions_count) over (order by date) as Cumulative_Actions,
                  sum (volume) over (order by date) as Cumulative_Volume
          from near.gov.fact_staking_actions
          where ACTION in ('staking') 
          and SIGNER_ID='{{singer}}'
group by 1,2),

unstaketable as (
          select date_trunc ({{week}},block_timestamp) as date,
                'Unstake' as action_type,
                count (distinct tx_hash) as Actions_Count,
                count (distinct signer_id) as Users_Count,
                sum (amount)*-1 as Volume,
                avg (amount) as Average_Volume,
                sum (actions_count) over (order by date) as Cumulative_Actions,
                sum (volume*-1) over (order by date) as Cumulative_Volume
          from near.gov.fact_staking_actions
          where ACTION in ('unstaking') 
            and SIGNER_ID='{{singer}}' 
group by 1,2) 

select date_part(epoch,to_timestamp((COALESCE(t1.date::date,t2.date::date ))))  as "date",
        COALESCE(t1.actions_count,0) as "stake_transactions",
        COALESCE(t2.actions_count,0) as "unstake_transactions",
        COALESCE(round(t1.volume,2),0) as "staked_volume",
        COALESCE(round(t2.volume,2),0) as "unstaked_volume",
        COALESCE("staked_volume" + "unstaked_volume" ,0) as "net_volume",
        sum ("net_volume") over (order by t1.date) as "cumulative_net_staked_volume"
from staketable t1 
    full outer join unstaketable t2 
    on t1.date = t2.date
order by 1 desc`,
  },
];

//---------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------

const chartabove = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Un/Staking ",
  fontsize: "20px",
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
const transactions = {
  height: "110px",
  align: "center",
  brand: "Un/Stake Transactions",
  description: `${state.result.query4?.data[0]?.transactions || "0"}`,
  fontsize: "20px",
  fontweight: "25px",
  afterbrand: "",
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
const date = {
  height: "110px",
  align: "center",
  brand: "Stake Volume",
  description: `${state.result.query4?.data[0]?.staked_volume || "0"}`,
  fontsize: "20px",
  fontweight: "25px",
  afterbrand: "",
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
const contract = {
  height: "110px",
  align: "center",
  brand: "UnStake Volume",
  description: `${state.result.query4?.data[0]?.unstaked_volume || "0"}`,
  fontsize: "20px",
  fontweight: "25px",
  afterbrand: "",
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
const volume = {
  height: "110px",
  align: "center",
  brand: "Net Volume",
  description: `${state.result.query4?.data[0]?.net_volume || "0"}`,
  fontsize: "20px",
  fontweight: "25px",
  fontweight: "25px",
  afterbrand: "",
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
        // loader: newLoader.length === 0 ? [] : newLoader,
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
        // ...(data && { loader: newLoader.length === 0 ? [] : newLoader }),
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
                  key: "staked_volume",
                  seriesName: "Staked Volume",
                  type: "column",
                  id: 2,
                },
                {
                  key: "unstaked_volume",
                  seriesName: "UnStaked Volume",
                  type: "column",
                  id: 2,
                },
                {
                  key: "net_volume",
                  seriesName: "Net Volume",
                  type: "spline",
                  id: 2,
                },
                {
                  key: "cumulative_net_staked_volume",
                  seriesName: "Cumulative Net Volume",
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
        <div className="w-100 py-2"></div>

        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-3">
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={transactions}
                />
              </div>
              <div className="col-md-3">
                <Widget src="lord1.near/widget/header-dynamic" props={volume} />
              </div>
              <div className="col-md-3">
                <Widget src="lord1.near/widget/header-dynamic" props={date} />
              </div>
              <div className="col-md-3">
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={contract}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={chartabove}
                />
                <div>{ChartSections} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
