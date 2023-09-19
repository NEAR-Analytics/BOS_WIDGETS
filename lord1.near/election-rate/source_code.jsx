const themeColor = props.themeColor;

const queryHashes = [{ id: 1, hash: "c178fbd9-697e-4e36-9770-8c6162fa0004" }];

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
  <div className="container-fluid py-2">
    <div>
      <div className="row md-12">
        <div calseeName="row col-md-12">
          <div className="col-12">
            <div
              style={{ backgroundColor: themeColor?.sbt_info?.card_bg }}
              className="shadow-sm rounded-4"
            >
              <Widget
                src="lord1.near/widget/mix-chart"
                props={getMixProps(
                  state.data?.hash1?.data,
                  "time",
                  [
                    {
                      key: "total_ballots_cum",
                      seriesName: "Max ballots",
                      type: "areaspline",
                      id: 2,
                    },
                    {
                      key: "total_vote_cum",
                      seriesName: "Cumulative vote",
                      type: "areaspline",
                      id: 2,
                    },

                    {
                      key: "singers",
                      seriesName: "Daily voter",
                      type: "column",
                      id: 1,
                    },
                  ],
                  themeColor.chartColor,
                  {
                    title: "Vote Status (Total)",
                    subtitle: "",
                    stacking: "normal",
                  }
                )}
              />
            </div>
          </div>
        </div>
        <div className="py-2"></div>

        <div className="col-lg-6">
          <div
            style={{ backgroundColor: themeColor?.sbt_info?.card_bg }}
            className="shadow-sm rounded-4"
          >
            <Widget
              src="lord1.near/widget/mix-chart"
              props={getMixProps(
                state.data?.hash1?.data,
                "time",
                [
                  {
                    key: "hom_rate_cum",
                    seriesName: "Max ballots",
                    type: "areaspline",
                    id: 2,
                  },
                  {
                    key: "hom_cum",
                    seriesName: "Cumulative vote",
                    type: "areaspline",
                    id: 2,
                  },
                  {
                    key: "hom",
                    seriesName: "Daily vote",
                    type: "column",
                    id: 1,
                  },
                ],
                themeColor.chartColor,
                {
                  title: "Vote Status (House of Merit)",
                  subtitle: "",
                  stacking: "normal",
                }
              )}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div
            style={{ backgroundColor: themeColor?.sbt_info?.card_bg }}
            className="shadow-sm rounded-4"
          >
            <Widget
              src="lord1.near/widget/mix-chart"
              props={getMixProps(
                state.data?.hash1?.data,
                "time",
                [
                  {
                    key: "coa_rate_cum",
                    seriesName: "Max ballots",
                    type: "areaspline",
                    id: 2,
                  },
                  {
                    key: "coa_cum",
                    seriesName: "Cumulative vote",
                    type: "areaspline",
                    id: 2,
                  },
                  {
                    key: "coa",
                    seriesName: "Daily vote",
                    type: "column",
                    id: 1,
                  },
                ],
                themeColor.chartColor,
                {
                  title: "Vote Status (Council Of Advisors)",
                  subtitle: "",
                  stacking: "normal",
                }
              )}
            />
          </div>
        </div>
      </div>
      <div className="py-2"></div>
      <div className="row md-12">
        <div className="col-lg-6">
          <div
            style={{ backgroundColor: themeColor?.sbt_info?.card_bg }}
            className="shadow-sm rounded-4"
          >
            <Widget
              src="lord1.near/widget/mix-chart"
              props={getMixProps(
                state.data?.hash1?.data,
                "time",
                [
                  {
                    key: "tc_rate_cum",
                    seriesName: "Max ballots",
                    type: "areaspline",
                    id: 2,
                  },
                  {
                    key: "tc_cum",
                    seriesName: "Cumulative vote",
                    type: "areaspline",
                    id: 2,
                  },
                  {
                    key: "tc",
                    seriesName: "Daily vote",
                    type: "column",
                    id: 1,
                  },
                ],
                themeColor.chartColor,
                {
                  title: "Vote Status (Transparency Commission)",
                  subtitle: "",
                  stacking: "normal",
                }
              )}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div
            style={{ backgroundColor: themeColor?.sbt_info?.card_bg }}
            className="shadow-sm rounded-4"
          >
            <Widget
              src="lord1.near/widget/mix-chart"
              props={getMixProps(
                state.data?.hash1?.data,
                "time",
                [
                  {
                    key: "bp_rate_cum",
                    seriesName: "Max ballots",
                    type: "areaspline",
                    id: 2,
                  },
                  {
                    key: "bp_cum",
                    seriesName: "Cumulative vote",
                    type: "areaspline",
                    id: 2,
                  },
                  {
                    key: "bp",
                    seriesName: "Daily vote",
                    type: "column",
                    id: 1,
                  },
                ],
                themeColor.chartColor,
                {
                  title: "Vote Status (Budget Package)",
                  subtitle: "",
                  stacking: "normal",
                }
              )}
            />
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
