const themeColor = props.themeColor;
const generaltheme = {
  height: "110px",
  align: "center",
  description: "Tracking the activity of Candidates in Election.",
  brand: "Candidates Tracker",
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

const projecttheme = {
  height: "90px",
  align: "left",
  description: "Details of Proposal's information",
  brand: "Proposal",
  fontsize: "30px",
  fontweight: "25px",
  afterbrand: "Informations",
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
  { id: 1, hash: "5f749570-d323-4db6-b3e9-f70c570493a4" },
  { id: 2, hash: "90b33488-6c0f-4434-af92-12758d29db39" },
  { id: 3, hash: "ebf3af30-d81d-4110-896a-46d538741e05" },
  { id: 4, hash: "b3fd2f7e-ecfd-4bfa-a184-f68a7d52c5ca" },
  { id: 5, hash: "e413b3cb-5c79-48f3-a6de-cc5cd4267dfc" },
  { id: 6, hash: "74368607-8996-45c0-8c61-4cce414b027d" },
  { id: 7, hash: "885e31c5-3910-46a7-a5d4-e4cb33251b53" },
  { id: 8, hash: "13a28c3b-2cf9-4dcb-aed5-7d4fa94af36a" },
  { id: 9, hash: "17a1eb50-5b71-47e5-b570-4c7a40678e01" },
  { id: 10, hash: "1a3d189f-9717-4a84-ba97-f9be3a3ed0d5" },
  { id: 11, hash: "4b1691db-4073-4d1d-84f8-caac41a66feb" },
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
const Right = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  background: #f8f8f9;
  border-radius: 8px;
`;
const H5 = styled.h5`
  margin-bottom: 20px;
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
  <div className="container-fluid py-2">
    <div className="pl-2">
      <div
        className="my-4 shadow-sm pb-2 rounded-4"
        style={{ background: themeColor?.sbt_area?.section_bg }}
      >
        <Widget src="lord1.near/widget/header-dynamic" props={generaltheme} />
        <div style={{ marginLeft: "1rem" }}>
          <Widget
            src="lord1.near/widget/tab-election-infos"
            props={{
              backgroundColor: themeColor?.tab_sbt?.backgroundColor,
              textColor: themeColor?.tab_sbt?.textColor,
              headerColor: themeColor?.tab_sbt?.headerColor,
              numberColor: themeColor?.tab_sbt?.numberColor,
            }}
          />
        </div>
      </div>

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
              <i> Bond amount distributions</i>
            </h6>
            <Widget
              src="lord1.near/widget/Pie-chart"
              props={getPieProps(
                state.data?.hash2?.data,
                ["bond_amount", "bonder"],
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
              <i> Distribution of #votes among voters.</i>
            </h6>
            <Widget
              src="lord1.near/widget/Pie-chart"
              props={getPieProps(
                state.data?.hash3?.data,
                ["trxs", "voter"],
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
                  data: state.data?.hash5?.data,
                  columns: [
                    { title: "Timestamp", key: "timestamp" },
                    { title: "Seat", key: "seat" },
                    { title: "Type", key: "type" },
                    { title: "Candidates", key: "sbt", explain: "yes" },
                    { title: "Start", key: "start_date" },
                    { title: "End", key: "end_date" },
                    { title: "Cooldown", key: "cooldown" },
                    { title: "Finish", key: "finish_date" },
                    { title: "Quorum", key: "quorum" },
                    {
                      title: "Hash",
                      key: "trxs",
                      link: "yes",
                      beforehref: "https://nearblocks.io/txns/",
                      afterhref: "",
                    },
                  ],
                  rowsCount: 5,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Widget
        src="lord1.near/widget/candidate-info-election"
        props={{ themeColor: themeColor }}
      />
      <Widget
        src="lord1.near/widget/candidate-vote-info-election"
        props={{ themeColor: themeColor }}
      />
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
