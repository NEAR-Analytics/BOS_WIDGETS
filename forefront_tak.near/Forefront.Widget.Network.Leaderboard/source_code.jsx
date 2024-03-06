const themeColor = props.themeColor;

const platform_leaderboard = {
  height: "90px",
  align: "left",
  description: "Top Blockchains based on different parameters",
  brand: "Blockchain",
  fontsize: "25px",
  fontweight: "30px",
  afterbrand: "Leaderboard",
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
const platform_growth = {
  height: "90px",
  align: "left",
  description: "",
  brand: "Blockchain",
  fontsize: "25px",
  fontweight: "30px",
  afterbrand: "Growth in 2024",
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
const platform_dominance = {
  height: "90px",
  align: "left",
  description: "",
  brand: "Network",
  fontsize: "25px",
  fontweight: "30px",
  afterbrand: "Dominance",
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
const queryHashes = [
  { id: 1, hash: "bc526c4e-575a-4602-a1ed-7546cda6e8d2" }, // daily
  { id: 3, hash: "d3eb2e3e-8407-46d1-8a63-10ce3a91fb95" }, //  30 days *
  { id: 4, hash: "de28fde6-9c64-4f60-a86d-5c345024da93" }, //  7 days *
  { id: 5, hash: "2b311776-c929-42b0-b4e0-cb9d7b8e9ae7" }, //  1 days *
  { id: 6, hash: "79e3e384-896b-46d1-88ea-451d7752d90a" }, //  total *
  { id: 8, hash: "26e7f1bb-e069-40ca-9d6a-2050c13bba22" }, //  bar-race
  { id: 9, hash: "79e3e384-896b-46d1-88ea-451d7752d90a" }, //  treemap
];
//----------------------------------------------------------
const tabs = {
  left_day: "Top Networks (today)",
  left: "Top Networks (last 7 days)",
  middle: "Top Networks (last 30 days)",
  right: "Top Networks (Total)",
};
const setTab = (tab) => State.update({ tab });
//----------------------------------------------------------

const barrace_tabs = {
  left: "Transaction ",
  middle: "Fee (USD) ",
  right: "TPS",
};
const setTab1 = (barrace_tab) => State.update({ barrace_tab });
//----------------------------------------------------------

const treemap_tabs = {
  left: "Transaction ",
  middle: "Fee (USD)",
  right: "Blocks",
};
const setTab2 = (treemap_tab) => State.update({ treemap_tab });
//----------------------------------------------------------

State.init({
  light: true,
  data: [],
  isLoading: true,
  error: [],
  tab: tabs.left_day,
  barrace_tab: barrace_tabs.left,
  treemap_tab: treemap_tabs.left,
});
const getStackingProps = (data, keys, colors, chartOption) => {
  data = data || [];
  colors = colors || [];
  chartOption = chartOption || {};
  const { categoryKey, seriesNameKey, seriesValueKey } = keys;

  const categoriesData = [...new Set(data.map((i) => i[categoryKey]))];
  const seriesNames = [...new Set(data.map((i) => i[seriesNameKey]))];
  const initialSeries = seriesNames.reduce((t, i) => {
    const c = categoriesData.reduce((t, i) => {
      t[i] = 0;
      return t;
    }, {});
    t[i] = c;
    return t;
  }, {});
  const initialSeriesData = data.reduce((t, i) => {
    t[i[seriesNameKey]][i[categoryKey]] = i[seriesValueKey];
    return t;
  }, initialSeries);
  const seriesData = Object.entries(initialSeriesData).map((i) => {
    const values = Object.values(i[1]);
    const eachSeries = { name: i[0], data: values };
    return eachSeries;
  });
  const props = {
    data: {
      categories: categoriesData,
      series: seriesData,
    },
    colors: colors,
    chartOption: {
      yAxisTitle: "y axis title",
      tooltipShare: true,
      stacking: "normal",
      dataLabels: false,
      title: {
        text: "title",
      },
      subtitle: {
        text: "subtitle",
      },
      ...chartOption,
    },

    overrideOptions: {},
    themeColor: { chart: themeColor.chart },
    spinnerColors: themeColor.spinnerColors,
  };
  return props;
};

const getTreemapProps = (data, keys, colors, chartOption) => {
  data = data || [];
  colors = colors || [];
  chartOption = chartOption || {};
  const { firstKey, lastKey, valueKeys } = keys;
  const formatedData = data.reduce((t, i) => {
    if (!t[i[firstKey]]) {
      t[i[firstKey]] = {};
    }
    t[i[firstKey]][i[lastKey]] = {};
    valueKeys.forEach((v) => {
      t[i[firstKey]][i[lastKey]][v] = i[v];
    });
    return t;
  }, {});
  const props = {
    data: formatedData,
    colors: colors,
    chartOption: {
      chartName: "chart name",
      title: {
        text: "title",
      },
      subtitle: {
        text: "subtitle",
      },
      ...chartOption,
    },

    overrideOptions: {},
    themeColor: { chart: themeColor.chart },
    spinnerColors: themeColor.spinnerColors,
  };
  return props;
};

const getPieProps = (data, [key, value], colors, chartOption) => {
  data = data || [];
  colors = colors || [];
  chartOption = chartOption || {};

  const dataFormat = data.map((s) => [s[key], s[value]]);
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

const handleData = () => {
  const data = {};
  const errors = [];
  queryHashes.forEach(({ hash, id }) => {
    const result = fetchData(hash);
    if (result.error) errors.push(`hash${id} : ${result.error}`);
    data[`hash${id}`] = {
      ...result,
      id,
    };
  });

  if (Object.values(data).every((d) => !d.isLoading)) {
    State.update({
      data: data,
      error: [...state.error, ...errors],
      isLoading: false,
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

if (state.isLoading) {
  handleData();
}

if (state.error.length > 0) {
  function hide() {
    const errors = state.error;
    errors.shift();
    if (errors.length > 0) setTimeout(hide, 2500);
    State.update({ error: errors });
  }
  setTimeout(hide, 2500);
}
//--------------------------------------
const getBarRaceProps = (
  data,
  [projectKey, dateKey, countKey],
  colors,
  chartOption
) => {
  data = data || [];
  colors = colors || [];
  chartOption = chartOption || {};

  const dataFormat = data.reduce((t, i) => {
    const count = i[countKey];
    const project = i[projectKey];
    const date = i[dateKey];
    if (!t[project]) {
      t[project] = {};
    }
    t[project][date] = count;
    return t;
  }, {});
  const props = {
    data: dataFormat,
    colors: colors,
    chartOption: {
      btn_bg: "red", //opt
      stepTime: 500, //opt
      barInChart: 3, //opt
      subBarChart: "",
      title: {
        text: "Transaction growth",
      },
      subtitle: {
        upSize: 20, //opt
        downSize: 15, //opt
        positionX: 0, //opt
        positionY: 0, //opt
      },
      ...chartOption,
    },
    themeColor: { chart: themeColor.chart },
    spinnerColors: themeColor.spinnerColors,
  };
  return props;
};

let bar_race_trxs = (
  <div
    style={{
      background: themeColor?.sbt_area?.section_bg,
      display: state.barrace_tab === barrace_tabs.left ? "" : "none",
    }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div
      style={{ background: themeColor?.sbt_area?.card_bg }}
      className="w-100 mx-auto shadow-sm rounded-4"
    >
      <Widget
        src="lord1.near/widget/bar-race"
        props={getBarRaceProps(
          state.data?.hash8?.data,
          ["BLOCKCHAIN", "DATE", "TOTAL_TXS"],
          themeColor.chartColor,
          {
            btn_bg: "",
            stepTime: 500,
            barInChart: 20,
            subBarChart: "",
            title: {
              text: "Top 20 network in terms of transaction number",
            },
            subtitle: {
              upSize: 20,
              downSize: 15,
              positionX: 0,
              positionY: 0,
            },
          }
        )}
      />
    </div>
  </div>
);
let bar_race_user = (
  <div
    style={{
      background: themeColor?.sbt_area?.section_bg,
      display: state.barrace_tab === barrace_tabs.middle ? "" : "none",
    }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <Widget
      src="lord1.near/widget/bar-race"
      props={getBarRaceProps(
        state.data?.hash8?.data,
        ["BLOCKCHAIN", "DATE", "TOTAL_FEES_USDS"],
        themeColor.chartColor,
        {
          btn_bg: "",
          stepTime: 500,
          barInChart: 20,
          subBarChart: "",
          title: {
            text: "Top 20 network in terms of fee (USD)",
          },
          subtitle: {
            upSize: 20,
            downSize: 15,
            positionX: 0,
            positionY: 0,
          },
        }
      )}
    />
  </div>
);
let bar_race_volume = (
  <div
    style={{
      background: themeColor?.sbt_area?.section_bg,
      display: state.barrace_tab === barrace_tabs.right ? "" : "none",
    }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <Widget
      src="lord1.near/widget/bar-race"
      props={getBarRaceProps(
        state.data?.hash8?.data,
        ["BLOCKCHAIN", "DATE", "TPS"],
        themeColor.chartColor,
        {
          btn_bg: "",
          stepTime: 500,
          barInChart: 20,
          subBarChart: "",
          title: {
            text: "Top 20 networks in terms of TPS ",
          },
          subtitle: {
            upSize: 20,
            downSize: 15,
            positionX: 0,
            positionY: 0,
          },
        }
      )}
    />
  </div>
);
//-----------------------------------

let growth_transaction = (
  <div className=" col-12 col-md-12">
    <div
      style={{
        background: themeColor?.sbt_area?.section_bg,
        display: state.treemap_tab === treemap_tabs.left ? "" : "none",
      }}
      className="shadow-sm rounded-2 overflow-auto p-2"
    >
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="w-100 mx-auto shadow-sm rounded-4"
      >
        <h6
          style={{ color: themeColor?.sbt_area?.card_title_color }}
          className="pt-4 ps-4"
        ></h6>
        <Widget
          src="lord1.near/widget/treemap-chart"
          props={getTreemapProps(
            state.data?.hash9?.data,
            {
              firstKey: "BLOCKCHAIN",
              valueKeys: ["TOTAL_TX"],
            },
            themeColor.chartColor,
            {
              yAxisTitle: "y axis title",
              tooltipShare: true,
              stacking: "percent",
              dataLabels: false,
              title: {
                text: "Transaction dominance (successful + failed)",
              },
              subtitle: {
                text: "",
              },
            }
          )}
        />
      </div>
    </div>
  </div>
);

let growth_user = (
  <div className=" col-12 col-md-12">
    <div
      style={{
        background: themeColor?.sbt_area?.section_bg,
        display: state.treemap_tab === treemap_tabs.middle ? "" : "none",
      }}
      className="shadow-sm rounded-2 overflow-auto p-2"
    >
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="w-100 mx-auto shadow-sm rounded-4"
      >
        <h6
          style={{ color: themeColor?.sbt_area?.card_title_color }}
          className="pt-4 ps-4"
        ></h6>
        <Widget
          src="lord1.near/widget/treemap-chart"
          props={getTreemapProps(
            state.data?.hash9?.data,
            {
              firstKey: "BLOCKCHAIN",
              valueKeys: ["TOTAL_FEES_USD"],
            },
            themeColor.chartColor,
            {
              yAxisTitle: "y axis title",
              tooltipShare: true,
              stacking: "percent",
              dataLabels: false,
              title: {
                text: "Fee (USD) dominance",
              },
              subtitle: {
                text: "",
              },
            }
          )}
        />
      </div>
    </div>
  </div>
);

let growth_volume = (
  <div className=" col-12 col-md-12">
    <div
      style={{
        background: themeColor?.sbt_area?.section_bg,
        display: state.treemap_tab === treemap_tabs.right ? "" : "none",
      }}
      className="shadow-sm rounded-2 overflow-auto p-2"
    >
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="w-100 mx-auto shadow-sm rounded-4"
      >
        <h6
          style={{ color: themeColor?.sbt_area?.card_title_color }}
          className="pt-4 ps-4"
        ></h6>
        <Widget
          src="lord1.near/widget/treemap-chart"
          props={getTreemapProps(
            state.data?.hash9?.data,
            {
              firstKey: "BLOCKCHAIN",
              valueKeys: ["BLOCK_COUNT"],
            },
            themeColor.chartColor,
            {
              yAxisTitle: "y axis title",
              tooltipShare: true,
              stacking: "percent",
              dataLabels: false,
              title: {
                text: "Blocks dominance (Number of blocks)",
              },
              subtitle: {
                text: "",
              },
            }
          )}
        />
      </div>
    </div>
  </div>
);
//-----------------------------------

let fourth = (
  <div
    style={{
      background: themeColor?.sbt_area?.section_bg,
      display: state.tab === tabs.left ? "" : "none",
    }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div className="row w-100 pb-2 px-2 mx-0">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2 overflow-auto"
      >
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.data?.hash4?.data,
            rowsCount: 15,
            columns: [
              {
                title: "Blockchain",
                key: "BLOCKCHAIN",
                colors: "#8b76f3",
              },

              {
                title: "Block Count",
                key: "BLOCK_COUNT",
                colors: "#8b76f3",
                round: "yes",
              },
              {
                title: "Transactions",
                key: "TOTAL_TX",
                description: "Number of transactions in last 7 days",
                round: "yes",
              },
              {
                title: "Successful Transactions",
                key: "TRANSACTION_COUNT_SUCCESS",
                description: "Number of Successful transactions in last 7 days",
                round: "yes",
              },
              {
                title: "Failed Transactions",
                key: "TRANSACTION_COUNT_FAILED",
                description: "Number of Failed transactions in last 7 days",
                round: "yes",
              },
              {
                title: "Success Rate",
                key: "SUCCESS_RATE",
                description:
                  "refers to the percentage of transactions that are successfully completed or confirmed on the blockchain out of the total number of attempted transactions over a given period.",
                round: "yes",
              },
              {
                title: "TPS",
                key: "TPS",
                round: "yes",
              },
              {
                title: "Total Fee (USD)",
                key: "TOTAL_FEES_USD",

                round: "yes",
              },
            ],
          }}
        />
      </div>
    </div>
  </div>
);
let fifth = (
  <div
    style={{
      background: themeColor?.sbt_area?.section_bg,
      display: state.tab === tabs.middle ? "" : "none",
    }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div className="row w-100 pb-2 px-2 mx-0">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2 overflow-auto"
      >
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.data?.hash3?.data,
            rowsCount: 15,
            columns: [
              {
                title: "Blockchain",
                key: "BLOCKCHAIN",
                colors: "#8b76f3",
              },

              {
                title: "Block Count",
                key: "BLOCK_COUNT",
                colors: "#8b76f3",
                round: "yes",
              },
              {
                title: "Transactions",
                key: "TOTAL_TX",
                description: "Number of transactions in last 30 days",
                round: "yes",
              },
              {
                title: "Successful Transactions",
                key: "TRANSACTION_COUNT_SUCCESS",
                description:
                  "Number of Successful transactions in last 30 days",
                round: "yes",
              },
              {
                title: "Failed Transactions",
                key: "TRANSACTION_COUNT_FAILED",
                description: "Number of Failed transactions in last 30 days",
                round: "yes",
              },
              {
                title: "Success Rate",
                key: "SUCCESS_RATE",
                description:
                  "refers to the percentage of transactions that are successfully completed or confirmed on the blockchain out of the total number of attempted transactions over a given period.",
                round: "yes",
              },
              {
                title: "TPS",
                key: "TPS",
                round: "yes",
              },
              {
                title: "Total Fee (USD)",
                key: "TOTAL_FEES_USD",

                round: "yes",
              },
            ],
          }}
        />
      </div>
    </div>
  </div>
);
let sixth = (
  <div
    style={{
      background: themeColor?.sbt_area?.section_bg,
      display: state.tab === tabs.right ? "" : "none",
    }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div className="row w-100 pb-2 px-2 mx-0">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2 overflow-auto"
      >
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.data?.hash6?.data,
            rowsCount: 15,
            columns: [
              {
                title: "Blockchain",
                key: "BLOCKCHAIN",
                colors: "#8b76f3",
              },
              {
                title: "Active Days",
                key: "DATE_COUNT",
                colors: "#8b76f3",
              },
              {
                title: "Block Count",
                key: "BLOCK_COUNT",
                colors: "#8b76f3",
                round: "yes",
              },
              {
                title: "Transactions",
                key: "TOTAL_TX",
                description: "Number of transactions in total",
                round: "yes",
              },
              {
                title: "Successful Transactions",
                key: "TRANSACTION_COUNT_SUCCESS",
                description: "Number of Successful transactions in total",
                round: "yes",
              },
              {
                title: "Failed Transactions",
                key: "TRANSACTION_COUNT_FAILED",
                description: "Number of Failed transactions in total",
                round: "yes",
              },
              {
                title: "Success Rate",
                key: "SUCCESS_RATE",
                description:
                  "refers to the percentage of transactions that are successfully completed or confirmed on the blockchain out of the total number of attempted transactions over a given period.",
                round: "yes",
              },
              {
                title: "TPS",
                key: "TPS",
                round: "yes",
              },
              {
                title: "Total Fee (USD)",
                key: "TOTAL_FEES_USD",

                round: "yes",
              },
            ],
          }}
        />
      </div>
    </div>
  </div>
);

let fourth_day = (
  <div
    style={{
      background: themeColor?.sbt_area?.section_bg,
      display: state.tab === tabs.left_day ? "" : "none",
    }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div className="row w-100 pb-2 px-2 mx-0">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2 overflow-auto"
      >
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.data?.hash5?.data,
            rowsCount: 15,
            columns: [
              {
                title: "Blockchain",
                key: "BLOCKCHAIN",
                colors: "#8b76f3",
              },

              {
                title: "Block Count",
                key: "BLOCK_COUNT",
                colors: "#8b76f3",
                round: "yes",
              },
              {
                title: "Transactions",
                key: "TOTAL_TX",
                description: "Number of transactions today",
                round: "yes",
              },
              {
                title: "Successful Transactions",
                key: "TRANSACTION_COUNT_SUCCESS",
                description: "Number of Successful transactions today",
                round: "yes",
              },
              {
                title: "Failed Transactions",
                key: "TRANSACTION_COUNT_FAILED",
                description: "Number of Failed transactions today",
                round: "yes",
              },
              {
                title: "Success Rate",
                key: "SUCCESS_RATE",
                description:
                  "refers to the percentage of transactions that are successfully completed or confirmed on the blockchain out of the total number of attempted transactions over a given period.",
                round: "yes",
              },
              {
                title: "TPS",
                key: "TPS",
                round: "yes",
              },
              {
                title: "Total Fee (USD)",
                key: "TOTAL_FEES_USD",
                round: "yes",
              },
            ],
          }}
        />
      </div>
    </div>
  </div>
);
return (
  <div className="container-fluid py-2">
    <div className="pl-2">
      <Widget
        src="lord1.near/widget/header-dynamic"
        props={platform_leaderboard}
      />
      <div className="w-100 d-flex justify-content-left">
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
      {fourth_day}
      {fourth}
      {fifth} {sixth}
      <div className="row w-100 py-4 g-4">
        <div className=" col-12 col-md-12">
          {" "}
          <Widget
            src="lord1.near/widget/header-dynamic"
            props={platform_dominance}
          />
          <div className="w-100 d-flex justify-content-left">
            <Container>
              <ul className="tabContent">
                {Object.values(treemap_tabs).map((treemap_tab) => (
                  <li key={treemap_tab} className="tab-item">
                    <button
                      className={`${
                        state.treemap_tab === treemap_tab ? "active" : ""
                      }`}
                      aria-current="page"
                      onClick={() => setTab2(treemap_tab)}
                    >
                      {treemap_tab}
                    </button>
                  </li>
                ))}
              </ul>
            </Container>
          </div>{" "}
          {growth_transaction}
          {growth_user}
          {growth_volume}
        </div>
        <div className=" col-12 col-md-12">
          <Widget
            src="lord1.near/widget/header-dynamic"
            props={platform_growth}
          />
          <div className="w-100 d-flex justify-content-left">
            <Container>
              <ul className="tabContent">
                {Object.values(barrace_tabs).map((barrace_tab) => (
                  <li key={barrace_tab} className="tab-item">
                    <button
                      className={`${
                        state.barrace_tab === barrace_tab ? "active" : ""
                      }`}
                      aria-current="page"
                      onClick={() => setTab1(barrace_tab)}
                    >
                      {barrace_tab}
                    </button>
                  </li>
                ))}
              </ul>
            </Container>
          </div>
          {bar_race_trxs}
          {bar_race_user}
          {bar_race_volume}
        </div>{" "}
      </div>
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
    </div>
  </div>
);

// const props = {
//   themeColor: {
//     dynamic_header: {
//       afterbrandcolor: "#789efb",
//       color1brand: "#000",
//       color2brand: "#806ce1",
//       colordescription: "#806ce1",
//       background:
//         "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
//     },
//     tab_sbt: {
//       backgroundColor: "rgb(49,62,89)",
//       textColor: "#fff",
//       headerColor: "#806ce1",
//       numberColor: "#fff",
//     },
//     sbt_area: {
//       section_bg: "rgba(25,33,80)",
//       card_bg: "rgb(49, 62, 89)",
//       card_title_color: "#806ce1",
//     },
//   },
// };
