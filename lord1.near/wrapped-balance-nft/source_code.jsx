const themeColor = props.themeColor;
const explor_balance_nft_theme = themeColor?.explor_balance?.nft || {};
const accountId = props.accountId ?? context.accountId ?? "";

const operationsDoc = `
  query MyQuery {
    mb_views_nft_tokens(
      order_by: {last_transfer_timestamp: desc}
      where: {owner: {_eq: "${state.searchedAccountId}"}, _and: {burned_timestamp: {_is_null: true}, last_transfer_timestamp: {}}}
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
const general_theme = {
  height: "150px",
  align: "center",
  description: "Total NFT",
  brand: `${state.result.data?.length || "0"}`,
  fontsize: "45px",
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

// --------------------------------------------

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
        data: result.data.data.mb_views_nft_tokens,
      },
    });
  }
};

const fetchData = () => {
  const data = fetch(`https://graph.mintbase.xyz/mainnet`, {
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

//-------------------------------------------------------------------------------------
const dataForReduce = state.result.data || [];
const countByNftContractName = dataForReduce.reduce((acc, item) => {
  acc[item.nft_contract_name] = (acc[item.nft_contract_name] || 0) + 1;
  return acc;
}, {});

const dataForChart = Object.entries(countByNftContractName).map(
  ([nft_contract_name, count]) => ({
    nft_contract_name,
    count,
  })
);

const countByNftContractName1 = dataForReduce.reduce((acc, item) => {
  acc[item.nft_contract_id] = (acc[item.nft_contract_id] || 0) + 1;
  return acc;
}, {});

const dataForChart1 = Object.entries(countByNftContractName1).map(
  ([nft_contract_id, counts]) => ({
    nft_contract_id,
    counts,
  })
);
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

// ----------------------------------------------------
const noData = <div className="w-100 py-4 text-center"> No data available</div>;
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

//-------------------------------------------------------------------------------------
return (
  <>
    <div className="row">
      <Widget src="lord1.near/widget/header-dynamic" props={general_theme} />

      <div className="col-lg-6 col-md-12">
        <div
          style={{ background: themeColor?.sbt_area?.section_bg }}
          className="shadow-sm rounded-2 overflow-auto p-2"
        >
          {ChartIsLoading()}
          {ChartHasError()}
          {dataForChart && (
            <Widget
              src="lord1.near/widget/Pie-chart"
              props={getPieProps(
                dataForChart1,
                ["nft_contract_id", "counts"],
                themeColor.chartColor,
                {
                  title: "Contract",
                  type: "pie",
                  connector: true,
                  legend: true,
                }
              )}
            />
          )}
        </div>
      </div>

      <div className="col-lg-6 col-md-12">
        <div
          style={{ background: themeColor?.sbt_area?.section_bg }}
          className="shadow-sm rounded-2 overflow-auto p-2"
        >
          {ChartIsLoading()}
          {ChartHasError()}
          {dataForChart && (
            <Widget
              src="lord1.near/widget/Pie-chart"
              props={getPieProps(
                dataForChart,
                ["nft_contract_name", "count"],
                themeColor.chartColor,
                {
                  title: "Collection",
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
    <div className="mt-4 border-top">
      <div
        style={{ background: themeColor?.sbt_area?.section_bg }}
        className="shadow-sm rounded-2 overflow-auto p-2"
      >
        <div
          style={{ background: themeColor?.sbt_area?.card_bg }}
          className="shadow-sm rounded-2 overflow-auto"
        >
          {CardIsLoading()}
          {CardHasError()}
          {state.result.data && (
            <Widget
              src="lord1.near/widget/table-pagination"
              props={{
                themeColor: { table_pagination: themeColor.table_pagination },
                data: state.result.data,
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
          )}
        </div>
      </div>
    </div>
  </>
);
