const API_KEY = "6d48c4c0-eb41-4e4b-ae4d-ba1148f01fb8";
const queries = [
  {
    hash: null,
    firstReqTime: 20,
    id: 1,
    queryOption: {
      sortBy: [
        {
          column: "rank",
          direction: "desc",
        },
      ],
    },
    query: `select 
            ft.TX_HASH as "hash" ,
            split(ft.BLOCK_TIMESTAMP::date,'T') as "date",
            fw.SIGNER_ID as singer,
            fw.WIDGET_NAME as "name",
            case when STATUS  !='false' then '✅' else '❌' end as "status",
            round(TRANSACTION_FEE/pow(10,24),4) as "fee",
            --METADATA:name as name ,
            row_number() over (partition by singer order by "date" asc ) as "rank",
            singer||'/widget/'||"name" as links,
            '1' as "total"

      from near.social.fact_widget_deployments as fw left join 
near.core.fact_transfers  as ft
on ft.tx_hash=fw.tx_hash
where singer='{{singer}}'  
order by fw.BLOCK_ID desc`,
  },
  {
    hash: "4fd2820b-b877-46f5-bdf1-b0c3cd9f64a6",
    firstReqTime: 15,
    id: 2,
    query: null,
  },
];
const themeColor = props.themeColor;

// header theme ######################################
const table_componentScan_theme = {
  height: "110px",
  align: "center",
  description: `Track the activity of Users in BOS development process`,
  brand: "Component Scan",
  fontsize: "100",
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

const activity_of_user_theme = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Activity of",
  fontsize: "75",
  fontweight: "25px",
  afterbrand: "developer",
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
// state ####################################

State.init({
  searchedSinger: "",
  result: {},
  loader: null,
  isLoading: false,
  error: [],
  queriesRuned: false,
});

const checkNewSinger = () => {
  if (state.searchedSinger === props.singer) {
    return;
  } else {
    State.update({
      searchedSinger: props.singer,
      loader: null,
      result: {},
      isLoading: true,
      queriesRuned: false,
    });
  }
};
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
const convertData = (data) => {
  if (typeof data !== "string") {
    return data;
  }
  let converted;
  try {
    converted = JSON.parse(data);
  } catch (er) {
    converted = data;
  }
  return converted;
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
    data: (data && convertData(data.body)) || null,
    error: (data && !data.ok && (data.status || data.error)) || null,
    isLoading: !data && !error,
  };
  return result;
};
// handle runed data ###################################
const createQuery = (queries, singer) => {
  const queriesArr = queries.map((q) => {
    const queryWithSinger = q.query.replaceAll("{{singer}}", singer);
    q.query = queryWithSinger;
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
  State.update(({ result }) => {
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
    if (error) {
      const queryError = `query${id} : ${error}`;
      return {
        ...state,
        result: { ...newResult },
        loader: null,
        error: [...state.error, queryError],
      };
    } else {
      return {
        ...state,
        result: { ...newResult },
        ...(data && { loader: null }),
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

  const queriesArr = createQuery(queries, state.searchedSinger);
  const loader = queriesArr.map((q) => {
    const props = {
      apiKey: API_KEY,
      id: q.id,
      query: q.query,
      onResult: updateResultState,
      firstReqTime: q.firstReqTime,
      queryOption: {
        page: {
          number: 1,
          size: 1000,
        },
        cacheTime: 60,
        ...q?.queryOption,
      },
    };
    return <Widget src="lord1.near/widget/api-flipside" props={props} />;
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
    <div className=" col-12 ">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="w-100 mx-auto shadow-sm rounded-4 p-2"
      >
        <Widget
          src="lord1.near/widget/header-dynamic"
          props={activity_of_user_theme}
        />
        {ChartIsLoading(1)}
        {ChartHasError(1)}
        {state.result["query" + 1]?.data && (
          <Widget
            src="lord1.near/widget/Pie-chart"
            props={getPieProps(
              state.result["query" + 1]?.data,
              ["name", "total"],
              themeColor.chartColor,
              {
                title: "",
                type: "pie",
                connector: true,
                legend: true,
              }
            )}
          />
        )}
      </div>
    </div>

    <div className="py-2"></div>
    <div className=" col-12">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2"
      >
        {ChartIsLoading(2)}
        {ChartHasError(2)}
        {state.result["query" + 2]?.data && (
          <Widget
            src="lord1.near/widget/mix-chart"
            props={getMixProps(
              state.result["query" + 2]?.data,
              "date",
              [
                {
                  key: "total_trxs",
                  seriesName: "Daily Transaction",
                  type: "column",
                  id: 1,
                },

                {
                  key: "forks",
                  seriesName: "Daily Forks",
                  type: "column",
                  id: 1,
                },
                {
                  key: "widget",
                  seriesName: "Daily Components",
                  type: "column",
                  id: 1,
                },
                {
                  key: "cum_total_trxs",
                  seriesName: "Total Transactions",
                  type: "spline",
                  id: 2,
                },
                {
                  key: "cum_forks",
                  seriesName: "Total Forks",
                  type: "spline",
                  id: 2,
                },

                {
                  key: "cum_widget",
                  seriesName: "Total Components",
                  type: "spline",
                  id: 1,
                },
              ],
              themeColor.chartColor,
              {
                title: "Daily Dev Activity",
                subtitle: `Number of daily transactions `,
                stacking: "normal",
              }
            )}
          />
        )}
      </div>
    </div>
  </div>
);
let TableSection = (
  <div
    style={{ background: themeColor?.sbt_area?.section_bg }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <Widget
      src="lord1.near/widget/header-dynamic"
      props={table_componentScan_theme}
    />
    <div className="p-2 rounded-4 overflow-auto">
      {CardIsLoading(1)}
      {CardHasError(1)}
      {state.result["query" + 1]?.data && (
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.result["query" + 1]?.data,
            rowsCount: 10,
            columns: [
              { title: "Number", key: "rank", colors: "#806ce1" },
              {
                title: "Status",
                key: "status",
              },
              { title: "Timestamp", key: "date" },
              {
                title: "Signer",
                key: "singer",
                link: "yes",
                beforehref:
                  "https://near.social/mob.near/widget/ProfilePage?accountId=",
                hyperlink: "yes",
              },
              { title: "Component ", key: "name" },
              {
                title: "Conponent Link",
                key: "links",
                link: "yes",
                beforehref: `https://bos.flipsidecrypto.xyz/`,
                afterhref: "",
              },
              { title: "Fee(Near)", key: "fee" },

              {
                title: "Hash",
                key: "hash",
                link: "yes",
                beforehref: "https://nearblocks.io/txns/",
                afterhref: "",
              },
            ],
          }}
        />
      )}
    </div>
  </div>
);

return (
  <>
    {state.loader && <div className="d-none">{state.loader}</div>}
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      {state.error.length > 0 &&
        state.error.map((er) => (
          <div
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
        {ChartSections}
        <div className="w-100 py-2"></div>
        {TableSection}
      </div>
    </div>
  </>
);
