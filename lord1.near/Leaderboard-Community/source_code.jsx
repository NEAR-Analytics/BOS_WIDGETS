const themeColor = props.themeColor;

const projecttheme = {
  height: "130px",
  align: "center",
  description: "Based on current month",
  brand: "Community ",
  fontsize: "40px",
  fontweight: "40px",
  afterbrand: "Monthly Status",
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
const projectthemes = {
  height: "130px",
  align: "center",
  description: "(in total)",
  brand: "Community ",
  fontsize: "40px",
  fontweight: "40px",
  afterbrand: "Status ",
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
  { id: 1, hash: "9027d2cc-9d8d-4baa-8bdf-7d93169d5077" }, //community-30days
  { id: 2, hash: "802b7a19-53b3-44d7-a966-edfaae614e64" }, //community-total
  { id: 3, hash: "7eb69f42-ce91-4258-8131-3b80063263ae" }, //community-total-pie chart-Community members (form filled in total)
  { id: 4, hash: "52801cba-294c-47e7-843f-5dc2680dc4b9" }, //community-total-pie chart-avg transactions
  { id: 5, hash: "0d1a5459-fa99-4ff7-8fef-40f868209f87" }, //community-total-pie chart-social transactions
  { id: 6, hash: "ea810c94-86ec-4829-8541-0c7d928267b3" }, //community-30days-pie chart-Community members (form filled in this month)
  { id: 7, hash: "94f3025d-4bb7-4707-8d4d-e543729aeb99" }, //community-30days-pie chart-avg transactions
  { id: 8, hash: "a2dde124-3164-4eee-b915-097d9829d218" }, //community-30days-pie chart-social transactions
];

State.init({
  light: true,
  data: [],
  isLoading: true,
  error: [],
});

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

return (
  <div className="container-fluid py-2">
    <div className="pl-2">
      <div
        className="my-4 shadow-sm  rounded-4"
        style={{ background: themeColor?.sbt_area?.section_bg }}
      >
        <Widget src="lord1.near/widget/header-dynamic" props={projecttheme} />
        <div className="row g-4 w-100 pb-2 mx-0">
          <div className="col-12">
            <div
              style={{ background: themeColor?.sbt_area?.card_bg }}
              className="shadow-sm rounded-2 overflow-auto"
            >
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: { table_pagination: themeColor.table_pagination },
                  data: state.data?.hash1?.data,
                  columns: [
                    {
                      title: "Profile",
                      key: "community",
                      profile: "yes",
                    },
                    {
                      title: "Community",
                      key: "user",
                      description: "Community Name",
                    },
                    {
                      title: "Member",
                      key: "member",
                      description:
                        "Number of community Members (Contributors + members + leader)",
                    },
                    {
                      title: "Contributor",
                      key: "contributor",
                      description: "Number of Contributor ",
                    },
                    {
                      title: "Total Transactions",
                      key: "transactions",
                      description:
                        "Total number of transactions of community member",
                      round: "yes",
                    },
                    {
                      title: "Avg Transactions",
                      key: "avg_transactions",
                      description: "Average number of transactions",
                    },
                    {
                      title: "Total Volume",
                      key: "volume",
                      description:
                        "Total volume of community member' transactions(Near)",
                      round: "yes",
                    },
                    {
                      title: "Avg Days",
                      key: "avg_days",
                      description:
                        "Average number of community member' active days",
                    },
                    {
                      title: "Avg Project",
                      key: "avg_project",
                      description:
                        "Average number of platforms that have been interacted by all members of the community",
                    },

                    {
                      title: "Total Social Trxs",
                      key: "social",
                      description:
                        "Total number of near social transactions for each community",
                    },
                    {
                      title: "Total Widget",
                      key: "widget",
                      description:
                        "Total number of widgets created by each community",
                    },
                  ],
                  rowsCount: 15,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row w-100 py-4 g-4">
        <div className=" col-12 col-md-4">
          <div
            style={{ background: themeColor?.sbt_area?.card_bg }}
            className="w-100 mx-auto shadow-sm rounded-4"
          >
            <h6
              style={{ color: themeColor?.sbt_area?.card_title_color }}
              className="pt-4 ps-4"
            >
              <i> Community members (form filled in this month)</i>
            </h6>
            <Widget
              src="lord1.near/widget/Pie-chart"
              props={getPieProps(
                state.data?.hash6?.data,
                ["user", "member"],
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
        </div>{" "}
        <div className=" col-12 col-md-4">
          <div
            style={{ background: themeColor?.sbt_area?.card_bg }}
            className="w-100 mx-auto shadow-sm rounded-4"
          >
            <h6
              style={{ color: themeColor?.sbt_area?.card_title_color }}
              className="pt-4 ps-4"
            >
              <i> Avg Transaction of Newcomers (in this month)</i>
            </h6>
            <Widget
              src="lord1.near/widget/Pie-chart"
              props={getPieProps(
                state.data?.hash7?.data,
                ["user", "member"],
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
        </div>{" "}
        <div className=" col-12 col-md-4">
          <div
            style={{ background: themeColor?.sbt_area?.card_bg }}
            className="w-100 mx-auto shadow-sm rounded-4"
          >
            <h6
              style={{ color: themeColor?.sbt_area?.card_title_color }}
              className="pt-4 ps-4"
            >
              <i> Total social transaction (in this month)</i>
            </h6>
            <Widget
              src="lord1.near/widget/Pie-chart"
              props={getPieProps(
                state.data?.hash8?.data,
                ["user", "member"],
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
        </div>{" "}
      </div>
      <div
        className="my-4 shadow-sm  rounded-4"
        style={{ background: themeColor?.sbt_area?.section_bg }}
      >
        <Widget src="lord1.near/widget/header-dynamic" props={projectthemes} />
        <div className="row g-4 w-100 pb-2 mx-0">
          <div className="col-12">
            <div
              style={{ background: themeColor?.sbt_area?.card_bg }}
              className="shadow-sm rounded-2 overflow-auto"
            >
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: { table_pagination: themeColor.table_pagination },
                  data: state.data?.hash2?.data,
                  columns: [
                    {
                      title: "Profile",
                      key: "community",
                      profile: "yes",
                    },
                    {
                      title: "Community",
                      key: "user",
                      description: "Community Name",
                    },
                    {
                      title: "Member",
                      key: "member",
                      description:
                        "Number of community Members (Contributors + members + leader)",
                    },
                    {
                      title: "Contributor",
                      key: "contributor",
                      description: "Number of Contributor ",
                    },
                    {
                      title: "Total Transactions",
                      key: "transactions",
                      description:
                        "Total number of transactions of community member",
                      round: "yes",
                    },
                    {
                      title: "Avg Transactions",
                      key: "avg_transactions",
                      description: "Average number of transactions",
                    },
                    {
                      title: "Total Volume",
                      key: "volume",
                      description:
                        "Total volume of community member' transactions(Near)",
                      round: "yes",
                    },
                    {
                      title: "Avg Days",
                      key: "avg_days",
                      description:
                        "Average number of community member' active days",
                    },
                    {
                      title: "Avg Months",
                      key: "avg_month",
                      description:
                        "Average number of community member' active days",
                    },
                    {
                      title: "Avg Years",
                      key: "avg_year",
                      description:
                        "Average number of community member' active days",
                    },
                    {
                      title: "Avg Project",
                      key: "avg_project",
                      description:
                        "Average number of platforms that have been interacted by all members of the community",
                    },

                    {
                      title: "Total Social Trxs",
                      key: "social",
                      description:
                        "Total number of near social transactions for each community",
                    },
                    {
                      title: "Total Widget",
                      key: "widget",
                      description:
                        "Total number of widgets created by each community",
                    },
                  ],
                  rowsCount: 15,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row w-100 py-4 g-4">
        <div className=" col-12 col-md-4">
          <div
            style={{ background: themeColor?.sbt_area?.card_bg }}
            className="w-100 mx-auto shadow-sm rounded-4"
          >
            <h6
              style={{ color: themeColor?.sbt_area?.card_title_color }}
              className="pt-4 ps-4"
            >
              <i> Community members (form filled in total)</i>
            </h6>
            <Widget
              src="lord1.near/widget/Pie-chart"
              props={getPieProps(
                state.data?.hash3?.data,
                ["user", "member"],
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
        </div>{" "}
        <div className=" col-12 col-md-4">
          <div
            style={{ background: themeColor?.sbt_area?.card_bg }}
            className="w-100 mx-auto shadow-sm rounded-4"
          >
            <h6
              style={{ color: themeColor?.sbt_area?.card_title_color }}
              className="pt-4 ps-4"
            >
              <i> Avg Transaction</i>
            </h6>
            <Widget
              src="lord1.near/widget/Pie-chart"
              props={getPieProps(
                state.data?.hash4?.data,
                ["user", "member"],
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
        </div>{" "}
        <div className=" col-12 col-md-4">
          <div
            style={{ background: themeColor?.sbt_area?.card_bg }}
            className="w-100 mx-auto shadow-sm rounded-4"
          >
            <h6
              style={{ color: themeColor?.sbt_area?.card_title_color }}
              className="pt-4 ps-4"
            >
              <i> Total social transaction</i>
            </h6>
            <Widget
              src="lord1.near/widget/Pie-chart"
              props={getPieProps(
                state.data?.hash5?.data,
                ["user", "member"],
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
