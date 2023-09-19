const themeColor = props.themeColor;

const daotheme = {
  height: "100px",
  align: "left",
  description: "How many votes has each candidate received from each group?",
  brand: "Candidate",
  fontsize: "30px",
  fontweight: "30px",
  afterbrand: "Vote Status",
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
  { id: 1, hash: "9a9cc2c9-0573-4241-bf81-d45963f82e87" },
  { id: 2, hash: "b3fd2f7e-ecfd-4bfa-a184-f68a7d52c5ca" },
  { id: 3, hash: "8e1c20ea-d11f-4a83-98b6-5d5a95bf2c28" },
  { id: 4, hash: "429c2240-4388-4eb2-aa70-0f8aa2dc384b" },
];

State.init({
  light: true,
  data: [],
  isLoading: true,
  error: [],
  tab: "second",
});

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
                      state.tab === tabs.secondTab ? "active" : ""
                    }`}
                    aria-current="page"
                    onClick={() => setTab(tabs.secondTab)}
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
                    TA
                  </button>
                </li>
                <li className="tab-item">
                  <button
                    className={`${
                      state.tab === tabs.fourthTab ? "active" : ""
                    }`}
                    aria-current="page"
                    onClick={() => setTab(tabs.fourthTab)}
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
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: { table_pagination: themeColor.table_pagination },
                  data: state.data?.hash1?.data,
                  columns: [
                    {
                      title: "Rank",
                      key: "rank",
                      colors: "#806ce1",
                    },
                    {
                      title: "Candidate",
                      key: "target",
                      description: "Top Candidate in Election",
                      link: "yes",
                      hyperlink: "yes",
                      beforehref:
                        "https://near.social/mob.near/widget/ProfilePage?accountId=",
                    },
                    {
                      title: "Vote",
                      key: "SINGERs",
                      description: "Number of Votes",
                    },
                    {
                      title: "OG",
                      key: "og",
                      progress: "yes",
                      percent: "hidden",
                      description: "How many OGs voted for this candidate",
                    },
                    {
                      title: "Vibes",
                      key: "vibes",
                      progress: "yes",
                      percent: "hidden",
                      description: "How many Vibes voted for this candidate",
                    },
                    {
                      title: "Fractal",
                      key: "fractal",
                      progress: "yes",
                      percent: "hidden",
                      description: "How many Fractal voted for this candidate",
                    },
                    {
                      title: "Regens",
                      key: "regens",
                      progress: "yes",
                      percent: "hidden",
                      description: "How many Regens voted for this candidate",
                    },
                    {
                      title: "House",
                      key: "HOUSE",
                    },
                  ],
                }}
              />
            )}

            {state.tab === "second" && (
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: { table_pagination: themeColor.table_pagination },
                  data: state.data?.hash2?.data,
                  columns: [
                    {
                      title: "Rank",
                      key: "rank",
                      colors: "#806ce1",
                    },
                    {
                      title: "Candidate",
                      key: "target",
                      description: "Top Candidate in Election",
                      link: "yes",
                      hyperlink: "yes",
                      beforehref:
                        "https://near.social/mob.near/widget/ProfilePage?accountId=",
                    },
                    {
                      title: "Vote",
                      key: "SINGERs",
                      description: "Number of Votes",
                    },
                    {
                      title: "OG",
                      key: "og",
                      progress: "yes",
                      percent: "hidden",
                      description: "How many OGs voted for this candidate",
                    },
                    {
                      title: "Vibes",
                      key: "vibes",
                      progress: "yes",
                      percent: "hidden",
                      description: "How many Vibes voted for this candidate",
                    },
                    {
                      title: "Fractal",
                      key: "fractal",
                      progress: "yes",
                      percent: "hidden",
                      description: "How many Fractal voted for this candidate",
                    },
                    {
                      title: "Regens",
                      key: "regens",
                      progress: "yes",
                      percent: "hidden",
                      description: "How many Regens voted for this candidate",
                    },
                    {
                      title: "House",
                      key: "HOUSE",
                    },
                  ],
                }}
              />
            )}

            {state.tab === "third" && (
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: { table_pagination: themeColor.table_pagination },
                  data: state.data?.hash3?.data,
                  columns: [
                    {
                      title: "Rank",
                      key: "rank",
                      colors: "#806ce1",
                    },
                    {
                      title: "Candidate",
                      key: "target",
                      description: "Top Candidate in Election",
                      link: "yes",
                      hyperlink: "yes",
                      beforehref:
                        "https://near.social/mob.near/widget/ProfilePage?accountId=",
                    },
                    {
                      title: "Vote",
                      key: "SINGERs",
                      description: "Number of Votes",
                    },
                    {
                      title: "OG",
                      key: "og",
                      progress: "yes",
                      percent: "hidden",
                      description: "How many OGs voted for this candidate",
                    },
                    {
                      title: "Vibes",
                      key: "vibes",
                      progress: "yes",
                      percent: "hidden",
                      description: "How many Vibes voted for this candidate",
                    },
                    {
                      title: "Fractal",
                      key: "fractal",
                      progress: "yes",
                      percent: "hidden",
                      description: "How many Fractal voted for this candidate",
                    },
                    {
                      title: "Regens",
                      key: "regens",
                      progress: "yes",
                      percent: "hidden",
                      description: "How many Regens voted for this candidate",
                    },
                    {
                      title: "House",
                      key: "HOUSE",
                    },
                  ],
                }}
              />
            )}
            {state.tab === "fourth" && (
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: { table_pagination: themeColor.table_pagination },
                  data: state.data?.hash4?.data,
                  columns: [
                    {
                      title: "Rank",
                      key: "rank",
                      colors: "#806ce1",
                    },
                    {
                      title: "Candidate",
                      key: "target",
                      description: "Top Candidate in Election",
                      link: "yes",
                      hyperlink: "yes",
                      beforehref:
                        "https://near.social/mob.near/widget/ProfilePage?accountId=",
                    },
                    {
                      title: "Vote",
                      key: "SINGERs",
                      description: "Number of Votes",
                    },
                    {
                      title: "OG",
                      key: "og",
                      progress: "yes",
                      percent: "hidden",
                      description: "How many OGs voted for this candidate",
                    },
                    {
                      title: "Vibes",
                      key: "vibes",
                      progress: "yes",
                      percent: "hidden",
                      description: "How many Vibes voted for this candidate",
                    },
                    {
                      title: "Fractal",
                      key: "fractal",
                      progress: "yes",
                      percent: "hidden",
                      description: "How many Fractal voted for this candidate",
                    },
                    {
                      title: "Regens",
                      key: "regens",
                      progress: "yes",
                      percent: "hidden",
                      description: "How many Regens voted for this candidate",
                    },
                    {
                      title: "House",
                      key: "HOUSE",
                    },
                  ],
                }}
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
