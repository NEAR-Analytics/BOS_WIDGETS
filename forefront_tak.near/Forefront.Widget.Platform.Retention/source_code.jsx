const themeColor = props.themeColor;

const retention = {
  height: "90px",
  align: "left",
  description:
    "User Retention Analysis by Year/Month for Near Ecosystem Platforms",
  brand: "User",
  fontsize: "25px",
  fontweight: "50px",
  afterbrand: "Retention",
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
const new_user = {
  height: "90px",
  align: "left",
  description: "New users who have interacted with the platform.",
  brand: "New",
  fontsize: "25px",
  fontweight: "50px",
  afterbrand: "Users",
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
 &&{text-align:left};
  .tabContent{
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
  { id: 1, hash: "684dd152-23f3-4715-affe-e5f75486e305" }, // daily
  { id: 2, hash: "eb990f1e-3cc9-4dc6-9d8a-3ef1d3c82493" }, //  pie charts
  { id: 3, hash: "f4da72ec-736e-4018-88f5-1b617bdb03ab" }, //  user retention/ yearly
  { id: 4, hash: "dd11b2c2-507b-4a4e-8ad0-88325a382974" }, //  user retention/ monthly
  { id: 5, hash: "47c40b4d-633a-4d01-b8db-3b2ef5548db2" }, //  pie charts
  { id: 22, hash: "08f321f5-9d46-443e-b3e1-56ebb7d46c5f" }, // distribution
  { id: 33, hash: "d43213ff-7191-43b5-9219-fbcf22235c08" }, // growth
  { id: 44, hash: "d9038dd9-03b3-451c-9844-70b52a1cb828" }, // monthly
];
const tabs = {
  left: "User Retention (monthly)",
  middle: "User Retention (annually)",
};
const setTab = (tab) => State.update({ tab });
State.init({
  light: true,
  data: [],
  isLoading: true,
  error: [],
  tab: tabs.left,
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
  console.log(dataFormat);
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
  console.log(hash, data);
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

let second = (
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
          <i> Number of new users in a yearly basis</i>
        </h6>
        <Widget
          src="lord1.near/widget/Pie-chart"
          props={getPieProps(
            state.data?.hash2?.data,
            ["year", "singer"],
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
          <i> Distribution of new user transactions</i>
        </h6>
        <Widget
          src="lord1.near/widget/Pie-chart"
          props={getPieProps(
            state.data?.hash5?.data,
            ["count", "singer"],
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
);

let third = (
  <div
    className="my-4 shadow-sm  rounded-4"
    style={{ background: themeColor?.sbt_area?.section_bg }}
  >
    <Widget src="lord1.near/widget/header-dynamic" props={new_user} />
    <div className="row w-100 pb-2 px-2 mx-0">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2 overflow-auto"
      >
        <div className="col-md-12">
          <Widget
            src="lord1.near/widget/mix-chart"
            props={getMixProps(
              state.data?.hash1?.data,
              "date",
              [
                {
                  key: "new_user",

                  seriesName: "new_user",
                  type: "column",

                  id: 1,
                },
                {
                  key: "total_user",
                  seriesName: "total_user",
                  type: "spline",

                  id: 2,
                },
              ],
              themeColor.chartColor,
              {
                title: "",
                subtitle: ``,
                stacking: "normal",
              }
            )}
          />{" "}
        </div>{" "}
      </div>
    </div>
  </div>
);

let fourth = (
  <div
    style={{
      background: themeColor?.sbt_area?.section_bg,
      display: state.tab === tabs.left ? "" : "none",
    }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    {" "}
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
            withoutSearchBar: "yes",
            rowsCount: 15,
            columns: [
              {
                title: "Earliest month",
                key: "earliest_date",
                description:
                  "The earliest month of user' activity on one of Near's ecosystem platforms.",
                colors: "#8b76f3",
              },

              {
                title: "New Users",
                key: "new_users",
                round: "yes",

                description:
                  "The count of new users who joined the platform in the specified month.",
                colors: "#8b76f3",
              },
              {
                title: "1 Month",
                key: "one_month_later",
                description:
                  "The retention percentage of users who remained active one month after joining",
              },
              {
                title: "2 Month",
                key: "two_month_later",
                description:
                  "The retention percentage of users who remained active two month after joining",
              },
              {
                title: "3 Month",
                key: "three_month_later",
                description:
                  "The retention percentage of users who remained active three month after joining",
              },
              {
                title: "4 Month",
                key: "four_month_later",
                description:
                  "The retention percentage of users who remained active four month after joining",
              },
              {
                title: "5 Month",
                key: "five_month_later",
                description:
                  "The retention percentage of users who remained active five month after joining",
              },
              {
                title: "6 Month",
                key: "six_month_later",
                description:
                  "The retention percentage of users who remained active six month after joining",
              },
              {
                title: "7 Month",
                key: "seven_month_later",
                description:
                  "The retention percentage of users who remained active seven month after joining",
              },
              {
                title: "8 Month",
                key: "eight_month_later",
                description:
                  "The retention percentage of users who remained active eight month after joining",
              },
              {
                title: "9 Month",
                key: "nine_month_later",
                description:
                  "The retention percentage of users who remained active nine month after joining",
              },
              {
                title: "10 Month",
                key: "ten_month_later",
                description:
                  "The retention percentage of users who remained active ten month after joining",
              },
              {
                title: "11 Month",
                key: "eleven_month_later",
                description:
                  "The retention percentage of users who remained active eleven month after joining",
              },
              {
                title: "12 Month",
                key: "twelve_month_later",
                description:
                  "The retention percentage of users who remained active twelve month after joining",
              },
            ],
          }}
        />{" "}
      </div>{" "}
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
        {" "}
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.data?.hash3?.data,
            withoutSearchBar: "yes",

            rowsCount: 6,
            columns: [
              {
                title: "Earliest year",
                key: "earliest_date",
                description:
                  "The earliest year of user' activity on one of Near's ecosystem platforms.",
                colors: "#8b76f3",
              },

              {
                title: "New Users",
                key: "new_users",
                round: "yes",

                description:
                  "The count of new users who joined the platform in the specified year.",
                colors: "#8b76f3",
              },
              {
                title: "1 year later",
                key: "one_year_later",
                description:
                  "The retention percentage of users who remained active one year after joining",
              },
              {
                title: "2 year later",
                key: "two_year_later",
                description:
                  "The retention percentage of users who remained active two year after joining",
              },
              {
                title: "3 year later",
                key: "three_year_later",
                description:
                  "The retention percentage of users who remained active three year after joining",
              },
              {
                title: "4 year later",
                key: "four_year_later",
                description:
                  "The retention percentage of users who remained active four year after joining",
              },
              {
                title: "5 year later",
                key: "five_year_later",
                description:
                  "The retention percentage of users who remained active five year after joining",
              },
            ],
          }}
        />{" "}
      </div>
    </div>
  </div>
);

let percent = (
  <div
    className="my-4 shadow-sm  rounded-4"
    style={{ background: themeColor?.sbt_area?.section_bg }}
  >
    <div className="row w-100 pb-2 px-2 mx-0">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2 overflow-auto"
      >
        <div className="col-md-12">
          <Widget
            src="lord1.near/widget/column-stack-chart"
            props={getStackingProps(
              state.data?.hash22?.data,
              {
                categoryKey: "project",
                seriesNameKey: "count",
                seriesValueKey: "singer",
              },
              themeColor.chartColor,
              {
                yAxisTitle: "Percent",
                tooltipShare: true,
                stacking: "percent",
                dataLabels: false,
                title: {
                  text: "Share of User' transaction in each platform",
                },
                subtitle: {
                  text: "",
                },
              }
            )}
          />
        </div>
      </div>
    </div>{" "}
  </div>
);
let both = (
  <div className="row w-100 pb-2 px-2 mx-0">
    <div
      style={{ background: themeColor?.sbt_area?.card_bg }}
      className="shadow-sm rounded-2 overflow-auto"
    >
      <div className="row">
        <div className="col-md-6">
          <Widget
            src="lord1.near/widget/column-stack-chart"
            props={getStackingProps(
              state.data?.hash33?.data,
              {
                categoryKey: "date",
                seriesNameKey: "project",
                seriesValueKey: "growth",
              },
              themeColor.chartColor,
              {
                yAxisTitle: "New Users",
                tooltipShare: true,
                stacking: "false",
                dataLabels: false,
                title: {
                  text: "New Users Growth",
                },
                subtitle: {
                  text: "",
                },
              }
            )}
          />
        </div>
        <div className="col-md-6">
          <Widget
            src="lord1.near/widget/column-stack-chart"
            props={getStackingProps(
              state.data?.hash44?.data,
              {
                categoryKey: "date",
                seriesNameKey: "project",
                seriesValueKey: "new_user",
              },
              themeColor.chartColor,
              {
                yAxisTitle: "New Users",
                tooltipShare: true,
                stacking: "false",
                dataLabels: false,
                title: {
                  text: "Monthly New Users",
                },
                subtitle: {
                  text: "",
                },
              }
            )}
          />
        </div>
      </div>{" "}
    </div>
  </div>
);
return (
  <div className="container-fluid py-2">
    <div className="pl-2">
      {" "}
      <Widget src="lord1.near/widget/header-dynamic" props={retention} />
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
      </div>{" "}
      {fourth}
      {fifth}
      {third}
      {both}
      {percent} {second}
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
