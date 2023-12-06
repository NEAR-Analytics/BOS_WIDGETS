const themeColor = props.themeColor;
const balances = props.balances; // expected to be in Pikespeak.ai balances API format
const showTable = props.showTable ?? true;

if (!balances) {
  const baseApi = "https://api.pikespeak.ai";
  const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
  const fetchApiConfig = {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  };
  const res = fetch(
    `${baseApi}/account/balances?accounts=${[
      props.accountId ?? context.accountId ?? "bobo.near",
    ]}`,
    fetchApiConfig
  );
  if (!res.body) {
    return "Loading...";
  }
  balances = res.body;
}

// Parsing the data to the format expected by the chart
const balanceData = balances.balancesTotal.map((balance) => balance.usdPrice);
const balanceLabels = balances.balancesTotal.map((balance) => balance.contract);

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

const totalUsd = formatNumber(balances.totalUsd);
//-----------------------------------------------------------------------------------------------------
const general_theme = {
  height: "110px",
  align: "center",
  description: "Total Balances (USD)",
  brand: `${totalUsd}`,
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
//-----------------------------------------------------------------------------------------------------
return (
  <div>
    <div className="row">
      <div className="col-4">
        <Widget src="lord1.near/widget/header-dynamic" props={general_theme} />
      </div>
    </div>
    <Widget
      src="lord1.near/widget/table-pagination"
      props={{
        themeColor: { table_pagination: themeColor.table_pagination },
        data: balances.balancesTotal,
        columns: [
          { title: "Symbol", key: "symbol", colors: "#806ce1" },
          { title: "Contract", key: "contract" },
          { title: "USD Price ", key: "usdPrice", colors: "#806ce1" },
          { title: "Amount", key: "amount" },
        ],
        rowsCount: 10,
      }}
    />
  </div>
);
