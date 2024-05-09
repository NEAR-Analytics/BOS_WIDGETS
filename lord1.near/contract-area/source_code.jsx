const themeColor = props.themeColor;
const generaltheme = {
  height: "110px",
  align: "center",
  description: "Tracking the activity of Developers on the NEAR ecosystem.",
  brand: "Developer' Tracker 🏦",
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
const areatheme = {
  height: "150px",
  align: "left",
  description: "In which categories are developers most active?",
  brand: "Activity",
  fontsize: "300",
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
  height: "150px",
  align: "left",
  description: "Which projects do developers use most?",
  brand: "Project",
  fontsize: "300",
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
  height: "150px",
  align: "left",
  description: "Developers activity per DAO",
  brand: "DAO",
  fontsize: "300",
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
  fontsize: "100",
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
  fontsize: "100",
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
  { id: 2, hash: "f09b0228-aab5-4010-82b6-d367234bda2a" }, //Distribution of holders based on age of wallet
  { id: 3, hash: "63361983-ecd6-44a4-97bd-30632a14e9e6" }, //Distribution of holders based on number of transactions
  { id: 4, hash: "c1e8970d-f470-48b6-b869-b8206a1c6832" }, //done- Top 25 area
  { id: 5, hash: "94ba1703-fcc0-4f32-9bc8-ef81c1979db4" }, //done-Top 10 platform based on user numbers
  { id: 6, hash: "1eee7717-ed51-43e0-afb9-416aafbf8970" }, //tabel-top platforms
  { id: 7, hash: "397475d1-4eca-4b39-919b-4bd625ab2704" }, //done-Top 10 platform  based on Fee(Near)
  { id: 8, hash: "79a796cf-8429-4a0d-b4c0-64c63fe81e5f" }, //done-Top 10 platform based on amount(Near)
  { id: 9, hash: "27cd1d05-945e-4a51-b588-5e34c4e3d662" }, //done-staking
  { id: 10, hash: "52c0bc46-3c8a-476f-84e4-9b050954ef41" }, //Flow (cex) activity
  { id: 11, hash: "eb40355e-6ea6-4cc9-92bb-ead5fa097c96" }, //done--Top dao
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
            src="lord1.near/widget/tab-contract-area"
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
                themeColor: { table_pagination: themeColor.table_pagination },
                data: state.data?.hash4?.data,
                rowsCount: 10,
                columns: [
                  { title: "Activity area", key: "project", colors: "#806ce1" },
                  { title: "Transactions", key: "transactions", round: "yes" },
                  { title: "Users", key: "active_users", round: "yes" },
                  { title: "Avg Trxs", key: "avg_trxs" },
                  { title: "Volume(Near)", key: "amount_near", round: "yes" },
                  { title: "Fee (Near)", key: "fee_in_near", round: "yes" },
                ],
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="my-4 shadow-sm  rounded-4"
        style={{ background: themeColor?.sbt_area?.section_bg }}
      >
        <Widget src="lord1.near/widget/header-dynamic" props={projecttheme} />
        <div className="row g-4 w-100 pb-2 mx-0">
          <div className="col-6">
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
          <div className="col-6">
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
          <div className="col-6">
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
          <div className="col-6">
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
      </div>
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
                      "The SBT holder's interactions with Cexs, inflow and outflow- transactions",
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
          </div>
        </div>
      </div>
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
                themeColor: { table_pagination: themeColor.table_pagination },
                data: state.data?.hash11?.data,
                columns: [
                  { title: "Project", key: "project", colors: "#806ce1" },
                  { title: "Transactions", key: "transactions", round: "yes" },
                  { title: "Active Users", key: "active_users", round: "yes" },
                ],
              }}
            />
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
