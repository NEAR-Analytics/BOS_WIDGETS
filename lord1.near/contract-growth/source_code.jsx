const themeColor = props.themeColor;
const generaltheme = {
  height: "110px",
  align: "center",
  description: "",
  brand: "Dev",
  fontsize: "40px",
  fontweight: "25px",
  afterbrand: "Activity",
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
  height: "110px",
  align: "center",
  description: "Top 2000 contract developers",
  brand: "Developer",
  fontsize: "40px",
  fontweight: "25px",
  afterbrand: "List ",
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
  { id: 0, hash: "e2aa1a6c-a86b-473d-a41d-63261295390d" }, // year
  { id: 1, hash: "c93773f5-138f-4d50-a1df-4b1d805eb1ec" }, // build pie
  { id: 2, hash: "803064c3-8e52-4c78-a646-2298a552427f" }, // update pie
  { id: 3, hash: "80ff4983-ffc1-4e97-b0a4-44221917ddd9" }, // total pie
  { id: 4, hash: "11f0c2d9-4300-4206-b044-c98ef5820294" }, // dev list
  { id: 9, hash: "cbec6781-db04-41ed-b19e-b1ebb70ce920" }, // total
  { id: 10, hash: "17db4f15-f9ae-4a6b-970b-ca2b41a1fca8" }, // trxs daily
  { id: 11, hash: "cc43316e-2aa4-4c71-a16a-e4a8b26a7f11" }, // new and active dev(weekly)
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

const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2).replace(/\.0$/, "") + "b";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2).replace(/\.0$/, "") + "m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.0$/, "") + "k";
  }

  if (num < 1000 && num > 0.0001) {
    return (Math.round(num * 1000) / 1000).toFixed(3) + "";
  }

  return num;
};

const singers = {
  height: "110px",
  align: "center",
  brand: "Developers",
  description: `${formatNumber(state.data?.hash9?.data[0].creator)}`,
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
const total_trxs = {
  height: "110px",
  align: "center",
  brand: "Transactions",
  description: `${formatNumber(state.data?.hash9?.data[0].tx_hash)}`,
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
const widget = {
  height: "110px",
  align: "center",
  brand: "Contracts",
  description: `${formatNumber(state.data?.hash9?.data[0].contract)}`,
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
const update_trxs = {
  height: "110px",
  align: "center",
  brand: "Update Trxs",
  description: `${formatNumber(state.data?.hash9?.data[0].update)}`,
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

let header = (
  <div className="row">
    <div className="col-md-12">
      <Widget src="lord1.near/widget/header-dynamic" props={hellosinger} />
      <div className="row">
        <div className="col-md-3">
          <Widget src="lord1.near/widget/header-dynamic" props={singers} />
        </div>
        <div className="col-md-3">
          <Widget src="lord1.near/widget/header-dynamic" props={total_trxs} />{" "}
        </div>
        <div className="col-md-3">
          <Widget src="lord1.near/widget/header-dynamic" props={widget} />{" "}
        </div>
        <div className="col-md-3">
          <Widget src="lord1.near/widget/header-dynamic" props={update_trxs} />
        </div>{" "}
      </div>
    </div>
  </div>
);
let zero = (
  <div
    className="my-4 shadow-sm pb-2 rounded-4"
    style={{ background: themeColor?.sbt_area?.section_bg }}
  >
    {" "}
    <div className="row w-100 pb-2 px-2 mx-0">
      <div className="col-md-6">
        <Widget
          src="lord1.near/widget/mix-chart"
          props={getMixProps(
            state.data?.hash10?.data,
            "date",
            [
              {
                key: "total_trxs",
                seriesName: "Total Trxs",
                type: "spline",
                id: 1,
              },

              {
                key: "update_trxs",
                seriesName: "Update Trxs",
                type: "spline",
                id: 1,
              },
              {
                key: "contracts",
                seriesName: "Contracts",
                type: "column",
                id: 1,
              },
            ],
            themeColor.chartColor,
            {
              title: "Development Trend on weekly basis",
              subtitle: "",
              stacking: "normal",
            }
          )}
        />{" "}
      </div>{" "}
      <div className="  col-md-6">
        <Widget
          src="lord1.near/widget/mix-chart"
          props={getMixProps(
            state.data?.hash10?.data,
            "date",
            [
              {
                key: "cum_contracts",
                seriesName: "Total Contracts",
                type: "areaspline",
                id: 2,
              },

              {
                key: "cum_total_trxs",
                seriesName: "Total Trxs",
                type: "areaspline",
                id: 2,
              },
              {
                key: "cum_update_trxs",
                seriesName: "Total Update Trxs",
                type: "areaspline",
                id: 2,
              },
            ],
            themeColor.chartColor,
            {
              title: "Development Growth on weekly basis",
              subtitle: "",
              stacking: "normal",
            }
          )}
        />{" "}
      </div>{" "}
    </div>
  </div>
);

let first = (
  <div
    className="my-4 shadow-sm pb-2 rounded-4"
    style={{ background: themeColor?.sbt_area?.section_bg }}
  >
    <Widget src="lord1.near/widget/header-dynamic" props={generaltheme} />
    <div className="row w-100 pb-2 px-2 mx-0">
      <div className=" col-12 col-md-8">
        <Widget
          src="lord1.near/widget/mix-chart"
          props={getMixProps(
            state.data?.hash11?.data,
            "date",
            [
              {
                key: "new",
                seriesName: "New Dev",
                type: "column",
                id: 1,
              },
              {
                key: "old",
                seriesName: "Returend Dev",
                type: "column",
                id: 1,
              },

              {
                key: "cum",
                seriesName: "Total Dev",
                type: "spline",
                id: 2,
              },
            ],
            themeColor.chartColor,
            {
              title: "Number of weekly devs",
              subtitle: "",
              stacking: "normal",
            }
          )}
        />{" "}
      </div>

      <div className=" col-12 col-md-4">
        <div
          style={{ background: themeColor?.sbt_area?.card_bg }}
          className="w-100 mx-auto shadow-sm rounded-4"
        >
          <h6
            style={{ color: themeColor?.sbt_area?.card_title_color }}
            className="pt-4 ps-4"
          >
            <i>Number of devs based on year joint</i>
          </h6>
          <Widget
            src="lord1.near/widget/Pie-chart"
            props={getPieProps(
              state.data?.hash0?.data,
              ["first_tx", "singer"],
              themeColor.chartColor,
              {
                title: "",
                type: "pie",
                connector: true,
                legend: true,
              }
            )}
          />
        </div>{" "}
      </div>
    </div>
  </div>
);
let second = (
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
          <i> Number of Devs based on Build Trxs</i>
        </h6>
        <Widget
          src="lord1.near/widget/Pie-chart"
          props={getPieProps(
            state.data?.hash1?.data,
            ["build", "singer"],
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
    <div className=" col-12 col-md-4">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="w-100 mx-auto shadow-sm rounded-4"
      >
        <h6
          style={{ color: themeColor?.sbt_area?.card_title_color }}
          className="pt-4 ps-4"
        >
          <i> Number of Devs based on Update Trxs</i>
        </h6>
        <Widget
          src="lord1.near/widget/Pie-chart"
          props={getPieProps(
            state.data?.hash2?.data,
            ["build", "singer"],
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
    <div className=" col-12 col-md-4">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="w-100 mx-auto shadow-sm rounded-4"
      >
        <h6
          style={{ color: themeColor?.sbt_area?.card_title_color }}
          className="pt-4 ps-4"
        >
          <i> Number of Devs based on Total Trxs</i>
        </h6>
        <Widget
          src="lord1.near/widget/Pie-chart"
          props={getPieProps(
            state.data?.hash3?.data,
            ["build", "singer"],
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
              {
                title: "Developer",
                key: "creator",
                link: "yes",
                beforehref: `https://near.social/mob.near/widget/ProfilePage?accountId=`,
                hyperlink: "yes",
              },
              {
                title: "Trxs",
                key: "tx_hash",
                description:
                  "Number of developers treansactions (both build + upgrade)",
              },
              {
                title: "Contract Built",
                key: "build",
                colors: "#806ce1",
                description:
                  "Number of developer's contract (Built or built then upgraded )",
              },
              {
                title: "First date",
                key: "date",
                description: "First date of developer's activity",
              },
              {
                title: "Active date",
                key: "active_date",
                description:
                  "For how many days has the developer been active? ",
              },
              {
                title: "Update Trxs",
                key: "update",
                description: "Number of contract upgrade transactions",
              },
              {
                title: "Contract Updated",
                key: "update_contract",
                colors: "#806ce1",
                description:
                  "How many contracts did the developer just upgrade?",
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
      {header}
      {zero}
      {first}
      {second}
      {third}

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
