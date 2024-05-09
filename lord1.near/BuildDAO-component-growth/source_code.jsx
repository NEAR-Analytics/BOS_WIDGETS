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
  description: "",
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

const retention = {
  height: "90px",
  align: "left",
  description: "Devs Retention Analysis by Year/Month (BOS Devs)",
  brand: "Devs",
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
const retentionTabs = {
  left: "User Retention (monthly)",
  middle: "User Retention (annually)",
};
const developmentTabs = {
  weekly: "weekly development",
  monthly: "monthly development",
};

const devTabs = {
  weekly: "weekly dev",
  monthly: "monthly dev",
};
const setTab = (tabsGroup, tabName) => State.update({ [tabsGroup]: tabName });

const queryHashes = [
  { id: 0, hash: "f9914ff4-5fbb-493b-aebc-817f98685193" }, // year
  { id: 1, hash: "61010048-45d5-4ba2-9fd0-2aba2e13f202" }, // deposited near pie
  { id: 2, hash: "979cf41e-8350-41b0-a0fc-552d75a16117" }, // widget pie
  { id: 3, hash: "340584ad-834f-4d5f-9f91-c930fab05bc2" }, // total pie
  { id: 4, hash: "6d159458-83c3-4c63-8335-48bfefb60bfb" }, // dev list
  { id: 9, hash: "ff057d08-f4df-4c68-abae-4698f1082211" }, // total

  { id: 10, hash: "c8943606-d1db-4a1a-a534-a52b0aee32e6" }, // trxs daily
  { id: 11, hash: "43513bf8-1697-4b79-96e4-93564fabaf41" }, // new and active dev(weekly)
  { id: 12, hash: "5b069fc6-ead8-4c5a-94c2-267ef10187c3" }, // retention monthly
  { id: 13, hash: "456cfeae-fd58-4189-a88d-9e0178b2ef6c" }, // retention yearly

  { id: 14, hash: "acbbd132-7497-485c-9115-f9f510c0d645" }, // new and active dev(monthly)
  { id: 15, hash: "9c001757-e541-4261-aac4-4822165320d9" }, // trxs monthly
];

State.init({
  light: true,
  data: [],
  isLoading: true,
  error: [],
  retentionTabs: retentionTabs.left,
  developmentTabs: developmentTabs.weekly,
  devTabs: devTabs.weekly,
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

  if (num < 0 && num > 0.0001) {
    return (Math.round(num * 1000) / 1000).toFixed(3) + "";
  }

  return num;
};

const singers = {
  height: "110px",
  align: "center",
  brand: "Developers",
  description: `${formatNumber(state.data?.hash9?.data[0].singer)}`,
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
  description: `${formatNumber(state.data?.hash9?.data[0].total_trxs)}`,
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
  brand: "Widgets",
  description: `${formatNumber(state.data?.hash9?.data[0].widget)}`,
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
  brand: "Deposits",
  description: `${formatNumber(state.data?.hash9?.data[0].deposit)}`,
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
const credits = {
  height: "110px",
  align: "center",
  brand: "Forks",
  description: `${formatNumber(state.data?.hash9?.data[0].fork_of)}`,
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
const build_trxs = {
  height: "110px",
  align: "center",
  brand: "Build | Update",
  description: `${formatNumber(
    state.data?.hash9?.data[0].build_trxs
  )} | ${formatNumber(state.data?.hash9?.data[0].update_trxs)}`,
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
      <div className="row">
        <div className="col-md-2">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip> Number of developers </Tooltip>}
          >
            <div>
              <Widget src="lord1.near/widget/header-dynamic" props={singers} />
            </div>
          </OverlayTrigger>
        </div>
        <div className="col-md-2">
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>Number of transactions (build + update + both)</Tooltip>
            }
          >
            <div>
              <Widget
                src="lord1.near/widget/header-dynamic"
                props={total_trxs}
              />
            </div>
          </OverlayTrigger>
        </div>
        <div className="col-md-2">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip> Number of components created </Tooltip>}
          >
            <div>
              <Widget src="lord1.near/widget/header-dynamic" props={widget} />
            </div>
          </OverlayTrigger>
        </div>
        <div className="col-md-2">
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                Deposited volume in Near token for BOS development to
                (social.near) contract
              </Tooltip>
            }
          >
            <div>
              <Widget
                src="lord1.near/widget/header-dynamic"
                props={update_trxs}
              />
            </div>
          </OverlayTrigger>
        </div>
        <div className="col-md-2">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>How many fork done by users so far</Tooltip>}
          >
            <div>
              <Widget src="lord1.near/widget/header-dynamic" props={credits} />
            </div>
          </OverlayTrigger>
        </div>
        <div className="col-md-2">
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                The number of transactions resulting in component updates (
                {formatNumber(state.data?.hash9?.data[0].update_trxs)}) or
                build({formatNumber(state.data?.hash9?.data[0].build_trxs)}) or
                both ({formatNumber(state.data?.hash9?.data[0].both)})
              </Tooltip>
            }
          >
            <div>
              <Widget
                src="lord1.near/widget/header-dynamic"
                props={build_trxs}
              />
            </div>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  </div>
);
let zero = (
  <div
    className="my-4 shadow-sm pb-2 rounded-4"
    style={{ background: themeColor?.sbt_area?.section_bg }}
  >
    <Container>
      <ul className="tabContent">
        {Object.values(developmentTabs).map((tab) => (
          <li key={tab} className="tab-item">
            <button
              className={`${state.developmentTabs === tab ? "active" : ""}`}
              aria-current="page"
              onClick={() => setTab("developmentTabs", tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
    </Container>
    <div
      style={{
        display: state.developmentTabs === developmentTabs.weekly ? "" : "none",
      }}
      className="row w-100 pb-2 px-2 mx-0"
    >
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
                key: "forks",
                seriesName: "Forks",
                type: "column",
                id: 1,
              },

              {
                key: "widget",
                seriesName: "Widget",
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
        />
      </div>
      <div className="  col-md-6">
        <Widget
          src="lord1.near/widget/mix-chart"
          props={getMixProps(
            state.data?.hash10?.data,
            "date",
            [
              {
                key: "cum_widget",
                seriesName: "Total Widgets",
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
                key: "cum_forks",
                seriesName: "Total Forks",
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
        />
      </div>
    </div>

    <div
      style={{
        display:
          state.developmentTabs === developmentTabs.monthly ? "" : "none",
      }}
      className="row w-100 pb-2 px-2 mx-0"
    >
      <div className="col-md-6">
        <Widget
          src="lord1.near/widget/mix-chart"
          props={getMixProps(
            state.data?.hash15?.data,
            "date",
            [
              {
                key: "total_trxs",
                seriesName: "Total Trxs",
                type: "spline",
                id: 1,
              },
              {
                key: "forks",
                seriesName: "Forks",
                type: "column",
                id: 1,
              },

              {
                key: "widget",
                seriesName: "Widget",
                type: "column",
                id: 1,
              },
            ],
            themeColor.chartColor,
            {
              title: "Development Trend on monthly basis",
              subtitle: "",
              stacking: "normal",
            }
          )}
        />
      </div>
      <div className="  col-md-6">
        <Widget
          src="lord1.near/widget/mix-chart"
          props={getMixProps(
            state.data?.hash15?.data,
            "date",
            [
              {
                key: "cum_widget",
                seriesName: "Total Widgets",
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
                key: "cum_forks",
                seriesName: "Total Forks",
                type: "areaspline",
                id: 2,
              },
            ],
            themeColor.chartColor,
            {
              title: "Development Growth on monthly basis",
              subtitle: "",
              stacking: "normal",
            }
          )}
        />
      </div>
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
        <Container>
          <ul className="tabContent">
            {Object.values(devTabs).map((tab) => (
              <li key={tab} className="tab-item">
                <button
                  className={`${state.devTabs === tab ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setTab("devTabs", tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </Container>
        <div
          style={{ display: state.devTabs === devTabs.weekly ? "" : "none" }}
        >
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
                  seriesName: "Returned Dev",
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
          />
        </div>

        <div
          style={{ display: state.devTabs === devTabs.monthly ? "" : "none" }}
        >
          <Widget
            src="lord1.near/widget/mix-chart"
            props={getMixProps(
              state.data?.hash14?.data,
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
                  seriesName: "Returned Dev",
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
                title: "Number of monthly devs",
                subtitle: "",
                stacking: "normal",
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
        </div>
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
          <i> Number of Devs based on Near deposited </i>
        </h6>
        <Widget
          src="lord1.near/widget/Pie-chart"
          props={getPieProps(
            state.data?.hash1?.data,
            ["update", "singer"],
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
          <i> Number of Devs based on component number</i>
        </h6>
        <Widget
          src="lord1.near/widget/Pie-chart"
          props={getPieProps(
            state.data?.hash2?.data,
            ["update", "singer"],
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
            ["update", "singer"],
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
                key: "singer",
                link: "yes",
                beforehref: `https://near.social/mob.near/widget/ProfilePage?accountId=`,
                hyperlink: "yes",
              },
              {
                title: "Trxs",
                key: "total_trxs",
                description:
                  "Total transactions (Build + Update) related to widget development ",
              },
              {
                title: "Widget",
                key: "widget",
                colors: "#806ce1",
                description: "Total widgets created ",
              },
              {
                title: "First date",
                key: "min_date",
                description: "The first day of BOS development activity",
              },
              {
                title: "Active days",
                key: "active_date",
                description: "Number of days that developer has been active",
              },
              {
                title: "Near Deposited",
                key: "deposit",
                description:
                  "Deposited volume in Near token for BOS development to social.near contract",
              },
              {
                title: "Forks",
                key: "fork_of",
                description: "How many fork done by user so far ",
              },
              {
                title: "Update Trxs",
                key: "update_trxs",
                description:
                  "The number of transactions resulting in component updates ",
              },
              {
                title: "Build Trxs",
                key: "build_trxs",
                description:
                  "The number of transactions resulting in component builds",
              },
              {
                title: "Both",
                key: "both",
                description:
                  "The number of transactions resulting in component builds and updates together",
              },
              {
                title: "Trxs Rank",
                key: "trx_rank",
                colors: "#806ce1",
                description:
                  "Developer rank based on the number of transactions (the lower the better)",
              },
              {
                title: "Widget Rank",
                key: "widget_rank",
                colors: "#806ce1",
                description:
                  "Developer rank based on the number of widgets (the lower the better)",
              },
              {
                title: "Days Rank",
                key: "days_rank",
                colors: "#806ce1",
                description:
                  "The rank of developers based on the age of their activities. The less the better.",
              },
              {
                title: "Deposit Rank",
                key: "deposit_rank",
                colors: "#806ce1",
                description:
                  "The rank of developers based on the deposited volume (Near). The less the better.",
              },
              { title: "Stars Received", key: "stars_received" },
              { title: "Stars Sent", key: "stars_sent" },
              { title: "Unstars Received", key: "unstars_received" },
              { title: "Unstars Sent", key: "unstars_sent" },
            ],
          }}
        />
      </div>
    </div>
  </div>
);

let fourth = (
  <div
    style={{
      background: themeColor?.sbt_area?.section_bg,
      display: state.retentionTabs === retentionTabs.left ? "" : "none",
    }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div className="row w-100 pb-2 px-2 mx-0">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2 overflow-auto"
      >
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.data?.hash12?.data,
            rowsCount: 15,
            columns: [
              {
                title: "Earliest month",
                key: "earliest_date",
                description:
                  "The earliest month of developers' activity (BOS development).",
                colors: "#8b76f3",
              },

              {
                title: "New Devs",
                key: "new_users",
                round: "yes",

                description:
                  "The count of new developers who joined the BOS development in the specified month.",
                colors: "#8b76f3",
              },
              {
                title: "1 Month",
                key: "one_month_later",
                description:
                  "The retention percentage of developers who remained active one month after joining",
                colors: "#334a93",
              },
              {
                title: "2 Month",
                key: "two_month_later",
                description:
                  "The retention percentage of developers who remained active two month after joining",
                colors: "#334a93",
              },
              {
                title: "3 Month",
                key: "three_month_later",
                description:
                  "The retention percentage of developers who remained active three month after joining",
                colors: "#334a93",
              },
              {
                title: "4 Month",
                key: "four_month_later",
                description:
                  "The retention percentage of developers who remained active four month after joining",
                colors: "#334a93",
              },
              {
                title: "5 Month",
                key: "five_month_later",
                description:
                  "The retention percentage of developers who remained active five month after joining",
                colors: "#334a93",
              },
              {
                title: "6 Month",
                key: "six_month_later",
                description:
                  "The retention percentage of developers who remained active six month after joining",
                colors: "#334a93",
              },
              {
                title: "7 Month",
                key: "seven_month_later",
                description:
                  "The retention percentage of developers who remained active seven month after joining",
                colors: "#334a93",
              },
              {
                title: "8 Month",
                key: "eight_month_later",
                description:
                  "The retention percentage of developers who remained active eight month after joining",
                colors: "#334a93",
              },
              {
                title: "9 Month",
                key: "nine_month_later",
                description:
                  "The retention percentage of developers who remained active nine month after joining",
                colors: "#334a93",
              },
              {
                title: "10 Month",
                key: "ten_month_later",
                description:
                  "The retention percentage of developers who remained active ten month after joining",
                colors: "#334a93",
              },
              {
                title: "11 Month",
                key: "eleven_month_later",
                description:
                  "The retention percentage of developers who remained active eleven month after joining",
                colors: "#334a93",
              },
              {
                title: "12 Month",
                key: "twelve_month_later",
                description:
                  "The retention percentage of developers who remained active twelve month after joining",
                colors: "#334a93",
              },
              {
                title: "13 Month",
                key: "thirteen_month_later",
                description:
                  "The retention percentage of developers who remained active 13 month after joining",
                colors: "#334a93",
              },
              {
                title: "14 Month",
                key: "fourteen_month_later",
                description:
                  "The retention percentage of developers who remained active 14 month after joining",
                colors: "#334a93",
              },
              {
                title: "15 Month",
                key: "fifteen_month_later",
                description:
                  "The retention percentage of developers who remained active 15 month after joining",
                colors: "#334a93",
              },
              {
                title: "16 Month",
                key: "sixteen_month_later",
                description:
                  "The retention percentage of developers who remained active 16 month after joining",
                colors: "#334a93",
              },
            ],
          }}
        />
      </div>
    </div>
  </div>
);
let fifth = (
  <div
    style={{
      background: themeColor?.sbt_area?.section_bg,
      display: state.retentionTabs === retentionTabs.middle ? "" : "none",
    }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div className="row w-100 pb-2 px-2 mx-0">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2 overflow-auto"
      >
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.data?.hash13?.data,
            rowsCount: 6,
            columns: [
              {
                title: "Earliest year",
                key: "earliest_date",
                description:
                  "The earliest year of developers' activity (BOS development).",
                colors: "#8b76f3",
              },

              {
                title: "New Devs",
                key: "new_users",
                round: "yes",

                description:
                  "The count of new developers who joined the platform in the specified year.",
                colors: "#8b76f3",
              },
              {
                title: "1 year later",
                key: "one_year_later",
                description:
                  "The retention percentage of developers who remained active one year after joining",
              },
              {
                title: "2 year later",
                key: "two_year_later",
                description:
                  "The retention percentage of developers who remained active two year after joining",
              },
              {
                title: "3 year later",
                key: "three_year_later",
                description:
                  "The retention percentage of developers who remained active three year after joining",
              },
              {
                title: "4 year later",
                key: "four_year_later",
                description:
                  "The retention percentage of developers who remained active four year after joining",
              },
              {
                title: "5 year later",
                key: "five_year_later",
                description:
                  "The retention percentage of developers who remained active five year after joining",
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
      <Widget src="lord1.near/widget/header-dynamic" props={retention} />
      <div>
        <Container>
          <ul className="tabContent">
            {Object.values(retentionTabs).map((tab) => (
              <li key={tab} className="tab-item">
                <button
                  className={`${state.retentionTabs === tab ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setTab("retentionTabs", tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </Container>
        {fourth}
        {fifth}
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
