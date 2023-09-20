const themeColor = props.themeColor;

const daotheme = {
  height: "100px",
  align: "left",
  description: "Explore the on-chain voting trend.",
  brand: "Vote",
  fontsize: "30px",
  fontweight: "30px",
  afterbrand: "Trend",
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
  { id: 1, hash: "2a947860-42d0-4023-9267-1a061690ebd7" },
  { id: 2, hash: "e5e0395c-9675-44a3-ad65-24f10bce2e74" },
  { id: 3, hash: "e0db7a2c-863d-42d5-84b6-cd8e5fff36f9" },
  { id: 4, hash: "d38bd751-5fbc-44fb-9b86-bc92362eceec" },
];

State.init({
  light: true,
  data: [],
  isLoading: true,
  error: [],
  tab: "fourth",
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
      tooltip: { split: false },
      legend: {
        enabled: false,
      },
      chart: {
        height: 500,
        backgroundColor: "transparent",
        zooming: {
          mouseWheel: false,
        },
      },
      yAxis: {
        title: { text: "votes" },
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
    themeColor: { chart: themeColor.chart },
    spinnerColors: themeColor.spinnerColors,
  };
  return props;
};

const convertData = (hash12Data) => {
  if (!hash12Data) return { converted: [], keys: [] };
  return hash12Data.reduce(
    (t, i) => {
      const row = t.converted.findIndex((r) => r.timestamp === i.timestamp);
      if (row === -1) {
        t.converted.push({ timestamp: i.timestamp, [i.singer]: i.voter });
      } else {
        t.converted[row][i.singer] = i.voter;
      }
      t.keys.add(i.singer);
      return t;
    },
    { converted: [], keys: new Set() }
  );
};
const createSerieses = (data) => {
  const { keys } = convertData(data);
  return [...keys].map((s) => {
    return { key: s, seriesName: s, type: "spline", id: 1 };
  });
};

const tabs = {
  firstTab: "first",
  secondTab: "second",
  thirdTab: "third",
  fourthTab: "fourth",
};

const setTab = (tab) => State.update({ tab });

const Container = styled.div`
  &&{text-align:left};
  .tabContent{
    display:inline-flex;
    align-items:center;
    background: rgba(26, 46, 51, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding:3px 4px;
    list-style-type:none;
    margin-left: 1%;
  }
  .tab-item .active{
    background: #304352;

  }
  .tab-item button{
    background-color:transparent;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    color:#fff;
    height:30px;
    padding:0 22px;
    border:none;

  }
`;

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
  <div className="container-fluid">
    <div className="pl-2">
      <div
        className="my-4 shadow-sm  rounded-4"
        style={{ background: themeColor?.sbt_area?.section_bg }}
      >
        <Widget src="lord1.near/widget/header-dynamic" props={daotheme} />
        <div>
          <div>
            <Container>
              <ul className="tabContent">
                <li className="tab-item">
                  <button
                    className={`${
                      state.tab === tabs.fourthTab ? "active" : ""
                    }`}
                    aria-current="page"
                    onClick={() => setTab(tabs.fourthTab)}
                  >
                    HOM
                  </button>
                </li>
                <li className="tab-item">
                  <button
                    className={`${state.tab === tabs.firstTab ? "active" : ""}`}
                    aria-current="page"
                    onClick={() => setTab(tabs.firstTab)}
                  >
                    COA
                  </button>
                </li>

                <li className="tab-item">
                  <button
                    className={`${state.tab === tabs.thirdTab ? "active" : ""}`}
                    aria-current="page"
                    onClick={() => setTab(tabs.thirdTab)}
                  >
                    TC
                  </button>
                </li>
                <li className="tab-item">
                  <button
                    className={`${
                      state.tab === tabs.secondTab ? "active" : ""
                    }`}
                    aria-current="page"
                    onClick={() => setTab(tabs.secondTab)}
                  >
                    BP
                  </button>
                </li>
              </ul>
            </Container>
          </div>
        </div>
        <div className="row w-100 pb-2 px-2 mx-0">
          <div
            style={{ background: themeColor?.sbt_area?.card_bg }}
            className="shadow-sm rounded-2 overflow-auto"
          >
            {state.tab === "first" && (
              <Widget
                src="lord1.near/widget/mix-chart"
                props={getMixProps(
                  convertData(state.data?.hash1?.data).converted,
                  "timestamp",
                  createSerieses(state.data?.hash1?.data),
                  themeColor.chartColor,
                  {
                    title: "COA",
                    subtitle: "Number of votes per candidate",
                    stacking: "normal",
                  }
                )}
              />
            )}

            {state.tab === "second" && (
              <Widget
                src="lord1.near/widget/mix-chart"
                props={getMixProps(
                  convertData(state.data?.hash2?.data).converted,
                  "timestamp",
                  createSerieses(state.data?.hash2?.data),
                  themeColor.chartColor,
                  {
                    title: "BP",
                    subtitle: "Number of votes per candidate",
                    stacking: "normal",
                  }
                )}
              />
            )}

            {state.tab === "third" && (
              <Widget
                src="lord1.near/widget/mix-chart"
                props={getMixProps(
                  convertData(state.data?.hash3?.data).converted,
                  "timestamp",
                  createSerieses(state.data?.hash3?.data),
                  themeColor.chartColor,
                  {
                    title: "TC",
                    subtitle: "Number of votes per candidate",
                    stacking: "normal",
                  }
                )}
              />
            )}
            {state.tab === "fourth" && (
              <Widget
                src="lord1.near/widget/mix-chart"
                props={getMixProps(
                  convertData(state.data?.hash4?.data).converted,
                  "timestamp",
                  createSerieses(state.data?.hash4?.data),
                  themeColor.chartColor,
                  {
                    title: "HOM",
                    subtitle: "Number of votes per candidate",
                    stacking: "normal",
                  }
                )}
              />
            )}
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
