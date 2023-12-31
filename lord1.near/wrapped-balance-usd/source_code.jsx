const APIKEY = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const themeColor = props.themeColor;
const explor_balance_nft_theme = themeColor?.explor_balance?.nft || {};
const accountId = props.accountId ?? context.accountId ?? "";
// ------------------------
// format to small characters like 200k, 200m, 200b...
const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "b";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num;
};
// -------------------------------
const general_theme = {
  height: "110px",
  align: "center",
  description: "Total Balances (USD)",
  brand: `${
    state.result.data.totalUsd ? formatNumber(state.result.data.totalUsd) : "0"
  }`,
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
const general_theme1 = {
  height: "110px",
  align: "center",
  description: "",
  brand: "Balance ",
  fontsize: "30px",
  fontweight: "25px",
  afterbrand: "distribution",
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
// -----------------------

State.init({
  searchedAccountId: "",
  result: {},
  isLoading: true,
  error: [],
});

const checkNewAccountId = () => {
  if (state.searchedAccountId === accountId) {
    return;
  } else {
    State.update({
      searchedAccountId: accountId,
      result: {},
      isLoading: true,
    });
  }
};
checkNewAccountId();

const handleData = () => {
  const result = fetchData();
  if (result.isLoading) {
    State.update({
      isLoading: true,
      result: {
        isLoading: true,
        error: false,
        data: null,
      },
    });
  }
  if (result.error) {
    const errors = state.error;
    errors.push(`${result.error}`);
    State.update({
      error: errors,
      isLoading: false,
      result: {
        isLoading: false,
        error: true,
        data: null,
      },
    });
  }
  if (result.data) {
    State.update({
      isLoading: false,
      result: {
        isLoading: false,
        error: false,
        data: {
          balancesTotal: result.data.balancesTotal,
          totalUsd: result.data.totalUsd,
        },
      },
    });
  }
};

const fetchData = () => {
  const data = fetch(
    `https://api.pikespeak.ai/account/balances?accounts=${state.searchedAccountId}`,
    {
      mode: "cors",
      headers: {
        "x-api-key": APIKEY,
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

// ------------------------------

//-----------------------------------------------------------------------------------------------------

// -------------------------------
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
// ------------------------------------
const CardIsLoading = () =>
  state.isLoading && (
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
const CardHasError = () =>
  state.result.error && (
    <div className="d-flex justify-content-center align-items-center h-100 p-4 pb-1">
      An error occurred for this section
    </div>
  );
const ChartIsLoading = () => (
  <div className={`w-100 ${state.result?.isLoading ? "d-block" : "d-none"}`}>
    <Widget
      src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
      props={{ ...spinnerColors }}
    />
  </div>
);
const ChartHasError = () =>
  state.result?.error && (
    <div className="py-4 text-center">An error occurred for this section</div>
  );

//-----------------------------------------------------------------------------------------------------
return (
  <div>
    <div className="row">
      <div className="col-lg-8 col-md-12">
        <Widget src="lord1.near/widget/header-dynamic" props={general_theme} />
        <div
          style={{
            background: themeColor?.sbt_area?.section_bg,
            "margin-top": "20px",
          }}
          className="shadow-sm rounded-3 overflow-auto p-2"
        >
          <div
            style={{ background: themeColor?.sbt_area?.card_bg }}
            className="shadow-sm rounded-2 overflow-auto"
          >
            <div className="mt-4 border-top">
              {CardIsLoading()}
              {CardHasError()}
              {state.result.data && (
                <Widget
                  src="lord1.near/widget/table-pagination"
                  props={{
                    themeColor: {
                      table_pagination: themeColor.table_pagination,
                    },
                    data: state.result.data.balancesTotal,
                    columns: [
                      { title: "Symbol", key: "symbol", colors: "#806ce1" },
                      { title: "Contract", key: "contract" },
                      {
                        title: "USD Price ",
                        key: "usdPrice",
                        colors: "#806ce1",
                        round: "yes",
                      },
                      { title: "Amount", key: "amount", round: "yes" },
                    ],
                    rowsCount: 10,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-12">
        <Widget src="lord1.near/widget/header-dynamic" props={general_theme1} />
        <div
          style={{ background: themeColor?.sbt_area?.section_bg }}
          className="shadow-sm rounded-2 overflow-auto p-2"
        >
          {ChartIsLoading()}
          {ChartHasError()}
          {state.result.data && (
            <Widget
              src="lord1.near/widget/Pie-chart"
              props={getPieProps(
                state.result.data.balancesTotal,
                ["symbol", "usdPrice"],
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
    </div>
  </div>
);
