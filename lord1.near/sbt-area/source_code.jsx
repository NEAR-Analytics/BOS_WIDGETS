const generaltheme = {
  height: "110px",
  align: "center",
  description: "Tracking the activity of SBT holders on Near ecosystem.",
  brand: "Im Human tracking 👋",
  fontsize: "100",
  fontweight: "25px",
  afterbrand: "",
  afterbrandcolor: "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: "#000",
  color2brand: "#806ce1",
  colordescription: "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const areatheme = {
  height: "150px",
  align: "left",
  description:
    "Tracking the activity of SBT holders on various web3 areas like NFT, Cex, Dex & others. Where are they most active ?!",
  brand: "Area",
  fontsize: "300",
  fontweight: "25px",
  afterbrand: "interactions",
  afterbrandcolor: "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: "#000",
  color2brand: "#806ce1",
  colordescription: "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const projecttheme = {
  height: "150px",
  align: "left",
  description:
    "Tracking the activity of SBT holders on various web3 platforms.Where are they most active ?!",
  brand: "Project",
  fontsize: "300",
  fontweight: "25px",
  afterbrand: "interactions",
  afterbrandcolor: "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: "#000",
  color2brand: "#806ce1",
  colordescription: "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};

const daotheme = {
  height: "150px",
  align: "left",
  description: "Tracking the activity of SBT holders on various web3 Dao.",
  brand: "Dao",
  fontsize: "300",
  fontweight: "25px",
  afterbrand: "interactions",
  afterbrandcolor: "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: "#000",
  color2brand: "#806ce1",
  colordescription: "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const flowtheme = {
  height: "110px",
  align: "center",
  description:
    "Tracking the activity of SBT holders on various Cex (Like inflow/outflow).",
  brand: "Cex flow",
  fontsize: "100",
  fontweight: "15px",
  afterbrand: "interactions",
  afterbrandcolor: "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: "#000",
  color2brand: "#806ce1",
  colordescription: "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};

const staketheme = {
  height: "110px",
  align: "center",
  description: "Tracking the activity of SBT holders on Staking/Unstaking.",
  brand: "Staking",
  fontsize: "100",
  fontweight: "15px",
  afterbrand: "interactions",
  afterbrandcolor: "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: "#000",
  color2brand: "#806ce1",
  colordescription: "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};

const queryHashes = [
  { id: 1, hash: "41221fb4-4a48-4195-8818-c8ac2c1094f9" },
  { id: 2, hash: "e53d5bd2-dd38-4966-adcf-7fc39b081f39" },
  { id: 3, hash: "bccb6cff-7cac-430b-b644-f6fe327bea34" },
  { id: 4, hash: "9ca26f92-b149-43d7-8a2c-8a82047a7118" },
  { id: 5, hash: "0fcfb3da-835d-4be1-a09d-8cb72e99a0fe" },
  { id: 6, hash: "2aa6e842-bcb8-4315-a8d4-797a1e88bb6c" },
  { id: 7, hash: "2d1f1739-43b7-4eff-bf63-10be04de283e" },
  { id: 8, hash: "35eab9dc-94bf-402b-8f99-f631be815e08" },
  { id: 9, hash: "dd0a1722-586c-40d3-b4c0-9633b652c57c" },
  { id: 10, hash: "847f49fc-f98e-452a-9232-5721792401be" },
  { id: 11, hash: "d271534a-bf7e-4ed5-9cd0-c0c62b029408" },
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
      chart: {
        backgroundColor: "transparent",
        zooming: {
          mouseWheel: false,
        },
      },
      xAxis: {
        type: "datetime",
        dateTimeLabelFormats: { month: { main: "%b %Y" } },
      },
      plotOptions: {
        column: {
          stacking: "false",
        },
        series: {
          dataGrouping: { enabled: false },
        },
      },
    },
    spinnerColors: ["#6F61C0", "#241468"],
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
    spinnerColors: ["#6F61C0", "#241468"],
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
  <div
    style={{ backgroundColor: themeColors.page_bg }}
    className="container-fluid py-2"
  >
    <div className="pl-2">
      <div
        style={{
          backgroundColor: `${state.light ? "#d2cafa" : "rgb(49,62,89)"}`,
          borderRadius: "15px",
          display: "flex",
          justifyContent: "space-between",
          padding: ".5rem",
          marginBottom: "1rem",
        }}
      >
        <Widget
          src="efiz.near/widget/marquee"
          props={{
            text: "Broaden your horizen with Flipside",
            fontFamily: "Arial",
            fontSize: "20px",
            backgroundColor: `${state.light ? "#d2cafa" : "rgb(49,62,89)"}`,
            height: "60px",
            width: "100%",
            textColor: "white",
          }}
        />

        <img
          onClick={handelLight}
          Width={30}
          src="https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/lightmode.svg"
        />
      </div>
      <div
        className="shadow-sm pb-2 rounded-4"
        style={{ background: "#ebe7fd" }}
      >
        <Widget src="lord1.near/widget/header-dynamic" props={generaltheme} />
        <div style={{ marginLeft: "1rem" }}>
          <Widget
            src="lord1.near/widget/tab-sbt"
            props={{
              backgroundColor: `${state.light ? "#d2cafa" : "rgb(49,62,89)"}`,
              textColor: `${state.light ? "#fff" : "#fff"}`,
              headerColor: `${state.light ? "#806ce1" : "#806ce1"}`,
              numberColor: `${state.light ? "#fff" : "#fff"}`,
            }}
          />
        </div>
      </div>
      <div className="row w-100 py-4">
        <div className="shadow-sm bg-light rounded-2">
          <Widget
            src="lord1.near/widget/mix-chart"
            props={getMixProps(
              state.data?.hash1?.data,
              "issued_at",
              [
                {
                  key: "old_wallets",
                  seriesName: "Old Wallets",
                  type: "column",
                  id: 1,
                },
                {
                  key: "new_wallets",
                  seriesName: "New Wallets",
                  type: "column",
                  id: 1,
                },
              ],
              ["#A084E8", "#F79BD3"],
              {
                title: "SBT Minters",
                subtitle: "New Address : with less than 10 days history",
                stacking: "normal",
              }
            )}
          />
        </div>
      </div>
      <div className="row w-100 py-4 g-4">
        <div className=" col-12 col-md-6">
          <div className="w-100 mx-auto shadow-sm bg-light rounded-4">
            <h6 style={{ color: "#806ce1" }} className="pt-4 ps-4">
              <i> Distribution (SBT Wallet's Age)</i>{" "}
            </h6>
            <Widget
              src="lord1.near/widget/Pie-chart"
              props={getPieProps(
                state.data?.hash2?.data,
                ["date_diff", "signer"],
                [
                  "#A084E8",
                  "#6F61C0",
                  "#241468",
                  "#9F0D7F",
                  "#EA1179",
                  "#F79BD3",
                ],
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
          <div className="w-100 mx-auto shadow-sm bg-light rounded-4">
            <h6 style={{ color: "#806ce1" }} className="pt-4 ps-4">
              <i> Distribution (SBT Wallet's Trxs)</i>{" "}
            </h6>
            <Widget
              src="lord1.near/widget/Pie-chart"
              props={getPieProps(
                state.data?.hash3?.data,
                ["number_of_transaction", "signer"],
                [
                  "#A084E8",
                  "#6F61C0",
                  "#241468",
                  "#9F0D7F",
                  "#EA1179",
                  "#F79BD3",
                ],
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

      <div className="shadow-sm  rounded-4" style={{ background: "#ebe7fd" }}>
        <Widget src="lord1.near/widget/header-dynamic" props={areatheme} />
        <div className="row w-100 pb-2 px-2 mx-0">
          <div className="shadow-sm bg-light rounded-2">
            <Widget
              src="lord1.near/widget/table-pagination"
              props={{
                data: state.data?.hash4?.data,
                rowsCount: 10,
                columns: [
                  { title: "Activity area", key: "project" },
                  { title: "Transactions", key: "transactions" },
                  { title: "SBT Users", key: "active_users" },
                  { title: "Avg Trxs", key: "avg_trxs" },
                  { title: "Volume(Near)", key: "amount_near" },
                  { title: "Fee (Near)", key: "fee_in_near" },
                ],
              }}
            />
          </div>
        </div>{" "}
      </div>

      <div className="shadow-sm  rounded-4" style={{ background: "#ebe7fd" }}>
        <Widget src="lord1.near/widget/header-dynamic" props={projecttheme} />
        <div className="row g-4 w-100 pb-2 mx-0">
          <div className="col-6">
            <div className="shadow-sm bg-light rounded-2">
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  data: state.data?.hash5?.data,
                  columns: [
                    { title: "Project", key: "PROJECT" },
                    { title: "Active Users", key: "ACTIVE_USERS" },
                  ],
                  rowsCount: 5,
                }}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="shadow-sm bg-light rounded-2">
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  data: state.data?.hash6?.data,
                  columns: [
                    { title: "Project", key: "PROJECT" },
                    { title: "Transactions", key: "TRANSACTIONS" },
                  ],
                  rowsCount: 5,
                }}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="shadow-sm bg-light rounded-2">
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  data: state.data?.hash7?.data,
                  columns: [
                    { title: "Project", key: "PROJECT" },
                    { title: "Fee(Near)", key: "FEE_IN_NEAR" },
                  ],
                  rowsCount: 5,
                }}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="shadow-sm bg-light rounded-2">
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  data: state.data?.hash8?.data,

                  columns: [
                    { title: "Project", key: "PROJECT" },
                    { title: "Volume(Near)", key: "AMOUNT_NEAR" },
                  ],
                  rowsCount: 5,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-sm  rounded-4" style={{ background: "#ebe7fd" }}>
        <Widget src="lord1.near/widget/header-dynamic" props={staketheme} />
        <div className="row w-100 pb-2 px-2 mx-0">
          <div className="shadow-sm bg-light rounded-2">
            <Widget
              src="lord1.near/widget/multiple-mix-chart"
              props={{
                data: state.data?.hash9?.data,
                charts: [
                  {
                    title: "Volume(Near)",
                    subtitle: "How much staked or unstaked by SBT wallets",
                    dateKey: "week",
                    oppKey: "staking_amount",
                    negKey: "unstaking_amount",
                    oppTitle: "Staking",
                    negTitle: "Unstaking",
                    type: "spline",
                  },
                  {
                    title: "SBT User",
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
                      "How many staked or unstaked transaction done by sbt holders",
                    dateKey: "week",
                    oppKey: "staking_trxs",
                    negKey: "unstaking_trxs",
                    oppTitle: "Staking",
                    negTitle: "Unstaking",
                    type: "column",
                  },
                ],
                colors: ["#A084E8", "#F79BD3"],
                spinnerColors: ["#A084E8", "#F79BD3"],
              }}
            />
          </div>
        </div>
      </div>
      <div className="shadow-sm  rounded-4" style={{ background: "#ebe7fd" }}>
        <Widget src="lord1.near/widget/header-dynamic" props={flowtheme} />
        <div className="row g-4 w-100 pb-2 px-2 mx-0">
          <div className="shadow-sm bg-light rounded-2">
            <Widget
              src="lord1.near/widget/multiple-mix-chart"
              props={{
                data: state.data?.hash10?.data,
                charts: [
                  {
                    title: "Near Volume",
                    subtitle:
                      "The SBT holder's interactions with Cexs, inflow and outflow- Volume(Near)",
                    dateKey: "week",
                    oppKey: "inflow_amount",
                    negKey: "outflow_amount",
                    oppTitle: "inflow",
                    negTitle: "outflow",
                    type: "areaspline",
                  },
                  {
                    title: "SBT Sender/Receiver",
                    subtitle:
                      "The SBT holder's interactions with Cexs, inflow and outflow- wallets",
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
                colors: ["#A084E8", "#F79BD3"],
                spinnerColors: ["#A084E8", "#F79BD3"],
              }}
            />
          </div>
        </div>{" "}
      </div>
      <div className="shadow-sm  rounded-4" style={{ background: "#ebe7fd" }}>
        <Widget src="lord1.near/widget/header-dynamic" props={daotheme} />
        <div className="row w-100 pb-2 px-2 mx-0">
          <div className="shadow-sm bg-light rounded-2">
            <Widget
              src="lord1.near/widget/table-pagination"
              props={{
                data: state.data?.hash11?.data,
                columns: [
                  { title: "Project", key: "project" },
                  { title: "Transactions", key: "transactions" },
                  { title: "Active Users", key: "active_users" },
                ],
              }}
            />
          </div>
        </div>{" "}
      </div>
      <Widget
        src="lord1.near/widget/footer"
        props={{
          beBackground: "#fff",
          titlenelowBackground: `${state.light ? "#806ce1" : "#806ce1"}`,
          titleBackground: `${state.light ? "#fff" : "#fff"}`,
          svgBackground: "#806ce1",
          fromBackground: `${state.light ? "#d2cafa" : "rgb(55,72,107)"}`,
          toBackground: `${state.light ? "#d2cafa" : "rgb(55,72,107)"}`,
          belowBackground: `${state.light ? "#806ce1" : "#d2cafa"}`,
        }}
      />
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
37;
