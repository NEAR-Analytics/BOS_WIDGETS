const themeColor = props.themeColor;

const operationsDoc = `
  query MyQuery {
    mb_views_nft_tokens(
      order_by: {last_transfer_timestamp: desc}
      where: {owner: {_eq: "${
        props.wallet_id || context.accountId
      }"}, _and: {burned_timestamp: {_is_null: true}, last_transfer_timestamp: {}}}
    ) {
      nft_contract_id
      title
      description
      media
      last_transfer_receipt_id
      metadata_id
      token_id
      nft_contract_name
      nft_contract_icon
    }
  }
`;

function fetchGraphQL() {
  const result = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: {},
      operationName: "MyQuery",
    }),
  });
  return result;
}

const res = fetchGraphQL();

if (!(res && res.body)) return "...";

const nfts = res.body.data.mb_views_nft_tokens;
//-------------------------------------------------------------------------------------
const tokenCounts = {};
nfts.forEach((nft) => {
  if (tokenCounts[nft.nft_contract_name]) {
    tokenCounts[nft.nft_contract_name]++;
  } else {
    tokenCounts[nft.nft_contract_name] = 1;
  }
});
//-------------------------------------------------------------------------------------

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
//-------------------------------------------------------------------------------------
const general_theme = {
  height: "110px",
  align: "center",
  description: "Total NFT",
  brand: `${nfts.length}`,
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
//-------------------------------------------------------------------------------------

return (
  <>
    <div className="row">
      <div className="col-4">
        <Widget src="lord1.near/widget/header-dynamic" props={general_theme} />
      </div>
      <div className="col-8">
        <div>
          {Object.keys(tokenCounts).map((contractId) => (
            <div key={contractId}>
              {contractId} : {tokenCounts[contractId]}
            </div>
          ))}
        </div>{" "}
      </div>{" "}
    </div>
    <Widget
      src="lord1.near/widget/table-pagination"
      props={{
        themeColor: { table_pagination: themeColor.table_pagination },
        data: nfts,
        columns: [
          { title: "Title", key: "title", colors: "#806ce1" },
          { title: "Contract Name", key: "nft_contract_name" },
          { title: "Token Id", key: "token_id", colors: "#806ce1" },
          { title: "Contract Id", key: "nft_contract_id" },
          { title: "Description", key: "description" },
          { title: "Image", key: "media", pic: "yes", src: "media" },
        ],
        rowsCount: 10,
      }}
    />
  </>
);
