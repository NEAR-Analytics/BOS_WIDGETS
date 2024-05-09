const themeColor = props.themeColor;
const generaltheme = {
  height: "110px",
  align: "center",
  description:
    "Tracking the activity of Developers in the NEAR ecosystem.(whole ecosystem)",
  brand: "Developer' Tracker 🏦",
  fontsize: "25px",
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
const areatheme = {
  height: "90px",
  align: "left",
  description: "In which categories are developers most active?",
  brand: "Activity",
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: " by category",
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
const projecttheme = {
  height: "90px",
  align: "left",
  description: "Which projects do developers use most?",
  brand: "Project",
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: "interactions",
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

const daotheme = {
  height: "90px",
  align: "left",
  description: "Developers activity per DAO",
  brand: "DAO",
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: "activity",
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
const flowtheme = {
  height: "110px",
  align: "center",
  description: "Developers inflow and outflow of funds from and to CEXs",
  brand: "CEX inflow vs outflow",
  fontsize: "25px",
  fontweight: "15px",
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

const staketheme = {
  height: "110px",
  align: "center",
  description: "NEAR staking and unstaking activity of developers",
  brand: "Staking",
  fontsize: "25px",
  fontweight: "15px",
  afterbrand: "Behavior",
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

const queryHashes = [
  { id: 1, hash: "5f749570-d323-4db6-b3e9-f70c570493a4" },
  { id: 2, hash: "8af0b0f0-8751-467c-a08c-c30cd7a62aa1" },
  { id: 3, hash: "8102bc86-2a69-4fe6-8bf2-2003f641811b" },
  { id: 4, hash: "8f76fdcf-80d1-4d3d-89b0-4809aa12a996" },
  { id: 5, hash: "1c98ae05-fb1d-40c0-83aa-1ef5edc0343a" },
  { id: 6, hash: "4a89ae7c-8966-4899-9f1b-ef17f94cfade" },
  { id: 7, hash: "45445471-451d-4a14-829b-44d2a565b789" },
  { id: 8, hash: "13959c81-dab1-455f-ae0f-777041c0ab50" },
  { id: 9, hash: "132cae94-f2df-4e4f-92f4-0099ee6a3062" },
  { id: 10, hash: "f700b835-4d8e-4f79-8a15-951d4dfae080" },
  { id: 11, hash: "a63a8d4d-e6dc-4c59-90e0-0495df0677ae" },
];

State.init({
  light: true,
  data: [],
  isLoading: true,
  error: [],
});

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

const formatNumber = (num) => {
  if ((num ?? NaN) === NaN) return "-";
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "b";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toFixed(4);
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

return (
  <div className="container-fluid py-2">
    <div className="pl-2">
      <div
        className="my-4 shadow-sm pb-2 rounded-4"
        style={{ background: themeColor?.sbt_area?.section_bg }}
      >
        <Widget src="lord1.near/widget/header-dynamic" props={generaltheme} />
        <div style={{ marginLeft: "1rem" }}>
          <Widget
            src="lord1.near/widget/tab-component-area"
            props={{
              backgroundColor: themeColor?.tab_sbt?.backgroundColor,
              textColor: themeColor?.tab_sbt?.textColor,
              headerColor: themeColor?.tab_sbt?.headerColor,
              numberColor: themeColor?.tab_sbt?.numberColor,
            }}
          />
        </div>
      </div>

      <div className="row w-100 py-4 g-4">
        <div className=" col-12 col-md-6">
          <div
            style={{ background: themeColor?.sbt_area?.card_bg }}
            className="w-100 mx-auto shadow-sm rounded-4"
          >
            <h6
              style={{ color: themeColor?.sbt_area?.card_title_color }}
              className="pt-4 ps-4"
            >
              <i> Age of developers' wallets distribution</i>
            </h6>
            <Widget
              src="lord1.near/widget/Pie-chart"
              props={getPieProps(
                state.data?.hash2?.data,
                ["date_diff", "signer"],
                themeColor.chartColor,
                {
                  title: "",
                  type: "pie",
                  connector: true,
                  legend: true,
                }
              )}
            />
          </div>
        </div>
        <div className=" col-12 col-md-6">
          <div
            style={{ background: themeColor?.sbt_area?.card_bg }}
            className="w-100 mx-auto shadow-sm rounded-4"
          >
            <h6
              style={{ color: themeColor?.sbt_area?.card_title_color }}
              className="pt-4 ps-4"
            >
              <i> Distribution of #Trxs among the developers.</i>
            </h6>
            <Widget
              src="lord1.near/widget/Pie-chart"
              props={getPieProps(
                state.data?.hash3?.data,
                ["number_of_transaction", "signer"],
                themeColor.chartColor,
                {
                  title: "",
                  type: "pie",
                  connector: true,
                  legend: true,
                }
              )}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className=" col-12 col-md-8">
          <div
            className="my-4 shadow-sm  rounded-4"
            style={{ background: themeColor?.sbt_area?.section_bg }}
          >
            <Widget src="lord1.near/widget/header-dynamic" props={areatheme} />
            <div className="row w-100 pb-2 px-2 mx-0">
              <div
                style={{ background: themeColor?.sbt_area?.card_bg }}
                className="shadow-sm rounded-2 overflow-auto"
              >
                <Widget
                  src="lord1.near/widget/table-pagination"
                  props={{
                    themeColor: {
                      table_pagination: themeColor.table_pagination,
                    },
                    data: state.data?.hash4?.data,
                    rowsCount: 10,
                    columns: [
                      {
                        title: "Activity area",
                        key: "project",
                        colors: "#806ce1",
                      },
                      {
                        title: "Transactions",
                        key: "transactions",
                        round: "yes",
                        description:
                          "The number of developer transactions in the entire ecosystem",
                      },
                      {
                        title: "Users",
                        key: "active_users",
                        round: "yes",
                        description:
                          "The number of developers who are interacting in each area and section",
                      },
                      {
                        title: "Avg Trxs",
                        key: "avg_trxs",
                        description:
                          "The average number of developer transactions in the entire ecosystem",
                      },
                      {
                        title: "Volume(Near)",
                        key: "amount_near",
                        round: "yes",
                        description:
                          "The Volume of developer transactions (in Near) in the entire ecosystem",
                      },
                      { title: "Fee (Near)", key: "fee_in_near", round: "yes" },
                    ],
                  }}
                />
              </div>
            </div>
          </div>{" "}
        </div>{" "}
        <div className=" col-12 col-md-4">
          <div
            className="my-4 shadow-sm  rounded-4"
            style={{ background: themeColor?.sbt_area?.section_bg }}
          >
            <Widget src="lord1.near/widget/header-dynamic" props={daotheme} />
            <div className="row w-100 pb-2 px-2 mx-0">
              <div
                style={{ background: themeColor?.sbt_area?.card_bg }}
                className="shadow-sm rounded-2 overflow-auto"
              >
                <Widget
                  src="lord1.near/widget/table-pagination"
                  props={{
                    themeColor: {
                      table_pagination: themeColor.table_pagination,
                    },
                    data: state.data?.hash11?.data,
                    columns: [
                      { title: "Project", key: "project", colors: "#806ce1" },
                      {
                        title: "Transactions",
                        key: "transactions",
                        round: "yes",
                        description:
                          "Transactions of developers that are related to DAOs",
                      },
                      {
                        title: "Active Users",
                        key: "active_users",
                        round: "yes",
                        description: "How many developers are members of Dao?",
                      },
                    ],
                    rowsCount: 10,
                  }}
                />
              </div>
            </div>{" "}
          </div>
        </div>
      </div>

      <div
        className="my-4 shadow-sm  rounded-4"
        style={{ background: themeColor?.sbt_area?.section_bg }}
      >
        <Widget src="lord1.near/widget/header-dynamic" props={projecttheme} />
        <div className="row g-4 w-100 pb-2 mx-0">
          <div className="col-12 col-md-3">
            <div
              style={{ background: themeColor?.sbt_area?.card_bg }}
              className="shadow-sm rounded-2 overflow-auto"
            >
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: { table_pagination: themeColor.table_pagination },
                  data: state.data?.hash5?.data,
                  columns: [
                    { title: "Project", key: "PROJECT", colors: "#806ce1" },
                    {
                      title: "Active Users",
                      key: "ACTIVE_USERS",
                      round: "yes",
                    },
                  ],
                  rowsCount: 5,
                }}
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div
              style={{ background: themeColor?.sbt_area?.card_bg }}
              className="shadow-sm rounded-2 overflow-auto"
            >
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: { table_pagination: themeColor.table_pagination },
                  data: state.data?.hash6?.data,
                  columns: [
                    { title: "Project", key: "PROJECT", colors: "#806ce1" },
                    {
                      title: "Transactions",
                      key: "TRANSACTIONS",
                      round: "yes",
                    },
                  ],
                  rowsCount: 5,
                }}
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div
              style={{ background: themeColor?.sbt_area?.card_bg }}
              className="shadow-sm rounded-2 overflow-auto"
            >
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: { table_pagination: themeColor.table_pagination },
                  data: state.data?.hash7?.data,
                  columns: [
                    { title: "Project", key: "PROJECT", colors: "#806ce1" },
                    { title: "Fee(Near)", key: "FEE_IN_NEAR", round: "yes" },
                  ],
                  rowsCount: 5,
                }}
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div
              style={{ background: themeColor?.sbt_area?.card_bg }}
              className="shadow-sm rounded-2 overflow-auto"
            >
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: { table_pagination: themeColor.table_pagination },
                  data: state.data?.hash8?.data,

                  columns: [
                    { title: "Project", key: "PROJECT", colors: "#806ce1" },
                    { title: "Volume(Near)", key: "AMOUNT_NEAR", round: "yes" },
                  ],
                  rowsCount: 5,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className=" col-12 col-md-6">
          <div
            className="my-4 shadow-sm  rounded-4"
            style={{ background: themeColor?.sbt_area?.section_bg }}
          >
            <Widget src="lord1.near/widget/header-dynamic" props={staketheme} />
            <div className="row w-100 pb-2 px-2 mx-0">
              <div
                style={{ background: themeColor?.sbt_area?.card_bg }}
                className="shadow-sm rounded-2"
              >
                <Widget
                  src="lord1.near/widget/multiple-mix-chart"
                  props={{
                    data: state.data?.hash9?.data,
                    charts: [
                      {
                        title: "Volume(Near)",
                        subtitle:
                          "How much staked or unstaked by developers' wallets",
                        dateKey: "week",
                        oppKey: "staking_amount",
                        negKey: "unstaking_amount",
                        oppTitle: "Staking",
                        negTitle: "Unstaking",
                        type: "spline",
                      },
                      {
                        title: "User",
                        subtitle: "How many User staked or unstaked",
                        dateKey: "week",
                        oppKey: "staking_signer",
                        negKey: "unstaking_signer",
                        oppTitle: "Staking",
                        negTitle: "Unstaking",
                        type: "areaspline",
                      },
                      {
                        title: "Transactions",
                        subtitle:
                          "How many staked or unstaked transaction done by developers",
                        dateKey: "week",
                        oppKey: "staking_trxs",
                        negKey: "unstaking_trxs",
                        oppTitle: "Staking",
                        negTitle: "Unstaking",
                        type: "column",
                      },
                    ],
                    themeColor: { chart: themeColor.chart },
                    colors: themeColor.chartColor,
                    spinnerColors: themeColor?.spinnerColors,
                  }}
                />
              </div>
            </div>
          </div>{" "}
        </div>
        <div className=" col-12 col-md-6">
          <div
            className="my-4 shadow-sm  rounded-4"
            style={{ background: themeColor?.sbt_area?.section_bg }}
          >
            <Widget src="lord1.near/widget/header-dynamic" props={flowtheme} />
            <div className="row g-4 w-100 pb-2 px-2 mx-0">
              <div
                style={{ background: themeColor?.sbt_area?.card_bg }}
                className="shadow-sm rounded-2"
              >
                <Widget
                  src="lord1.near/widget/multiple-mix-chart"
                  props={{
                    data: state.data?.hash10?.data,
                    charts: [
                      {
                        title: "Near Volume",
                        subtitle:
                          "The developers' interactions with Cexs, inflow and outflow- Volume(Near)",
                        dateKey: "week",
                        oppKey: "inflow_amount",
                        negKey: "outflow_amount",
                        oppTitle: "inflow",
                        negTitle: "outflow",
                        type: "areaspline",
                      },
                      {
                        title: "Sender/Receiver",
                        subtitle:
                          "The developers' interactions with Cexs, inflow and outflow- wallets",
                        dateKey: "week",
                        oppKey: "inflow_signer",
                        negKey: "outflow_signer",
                        oppTitle: "inflow",
                        negTitle: "outflow",
                        type: "column",
                      },
                      {
                        title: "Send/Receive transactions",
                        subtitle:
                          "The developer's interactions with Cexs, inflow and outflow- transactions",
                        dateKey: "week",
                        oppKey: "inflow_trxs",
                        negKey: "outflow_trxs",
                        oppTitle: "inflow",
                        negTitle: "outflow",
                        type: "column",
                      },
                    ],
                    themeColor: { chart: themeColor.chart },
                    colors: themeColor.chartColor,
                    spinnerColors: themeColor?.spinnerColors,
                  }}
                />
              </div>{" "}
            </div>
          </div>
        </div>
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
