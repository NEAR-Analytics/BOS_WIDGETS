const themeColor = props.themeColor;
const firsttheme = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Comment Activity",
  fontsize: "50",
  fontweight: "20px",
  afterbrand: "🏦",
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

const secondtheme = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Vote Activity",
  fontsize: "50",
  fontweight: "25px",
  afterbrand: "👍",
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

const thirdtheme = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Nomination Activity",
  fontsize: "50",
  fontweight: "25px",
  afterbrand: "🏦",
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
  { id: 1, hash: "3ca36592-256e-4dda-97e3-de5f71baeba5" },
  { id: 2, hash: "2c93f2aa-7da5-4c42-acb5-0a09592a4e8d" },
  { id: 3, hash: "d4c425df-b98c-41c9-8fc5-d89ff7b6316e" },
];

State.init({
  light: true,
  data: [],
  isLoading: true,
  error: [],
  value: "acceleration",
  tab: "first",
});

// api code start
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
// api code finish

const tabs = {
  firstarea: "first",
  secondarea: "second",
  thirdarea: "third",
  fourtharea: "fourth",
  fiftharea: "fifth",
};

const setTab = (tab) => State.update({ tab });

const Container = styled.div`
  &&{text-align:center};
  .tabContent{
    display:inline-flex;
    align-items:center;
    background: rgba(26, 46, 51, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding:3px 4px;
    list-style-type:none;
    margin: 0 auto;
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
    height:40px;
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

let first = (
  <div
    style={{ background: themeColor?.sbt_area?.section_bg }}
    className="shadow-sm rounded-2 overflow-auto"
  >
    <Widget src="lord1.near/widget/header-dynamic" props={firsttheme} />
    <Widget
      src="lord1.near/widget/multiple-mix-chart"
      props={{
        data: state.data?.hash1?.data,
        charts: [
          {
            title: "Commentator Number",
            subtitle: "Number of Commentator or Remover",
            dateKey: "week",
            oppKey: "add_commentator",
            negKey: "removed_signer_id",
            oppTitle: "commentator",
            negTitle: "Remover",
            type: "spline",
          },
          {
            title: "Candidate Number",
            subtitle:
              "The number of candidates who received comments or were removed from comments",
            dateKey: "week",
            oppKey: "add_candidate",
            negKey: "removed_candidate",
            oppTitle: "candidate(added)",
            negTitle: "candidate(removed)",
            type: "areaspline",
          },
          {
            title: "Comment Number",
            subtitle: "Number of comments transactions(add or remove)",
            dateKey: "week",
            oppKey: "add_tx_hash",
            negKey: "removed_tx_hash",
            oppTitle: "Add Comment",
            negTitle: "Remove Comment",
            type: "column",
          },
        ],
        themeColor: { chart: themeColor.chart },
        colors: themeColor.chartColor,
        spinnerColors: themeColor?.spinnerColors,
      }}
    />
  </div>
);
let second = (
  <div
    style={{ background: themeColor?.sbt_area?.section_bg }}
    className="shadow-sm rounded-2 overflow-auto"
  >
    <Widget src="lord1.near/widget/header-dynamic" props={secondtheme} />
    <Widget
      src="lord1.near/widget/multiple-mix-chart"
      props={{
        data: state.data?.hash2?.data,
        charts: [
          {
            title: "UpVoters",
            subtitle: "Number of UpVoters and Removers",
            dateKey: "week",
            oppKey: "voter_vote",
            negKey: "voter_remove",
            oppTitle: "Upvote",
            negTitle: "Remove vote",
            type: "spline",
          },
          {
            title: "Candidate",
            subtitle:
              "The number of candidates who received votes or were excluded from the votes",
            dateKey: "week",
            oppKey: "candidate_vote",
            negKey: "candidate_remove",
            oppTitle: "Upvote",
            negTitle: "Remove vote",
            type: "spline",
          },
          {
            title: "Vote Actions",
            subtitle: "Number of Upvote and remove actions",
            dateKey: "week",
            oppKey: "hash_vote",
            negKey: "hash_remove",
            oppTitle: "Upvote",
            negTitle: "Remove vote",
            type: "spline",
          },
        ],
        themeColor: { chart: themeColor.chart },
        colors: themeColor.chartColor,
        spinnerColors: themeColor?.spinnerColors,
      }}
    />
  </div>
);
let third = (
  <div
    style={{ background: themeColor?.sbt_area?.section_bg }}
    className="shadow-sm rounded-2 overflow-auto"
  >
    <Widget src="lord1.near/widget/header-dynamic" props={thirdtheme} />
    <Widget
      src="lord1.near/widget/multiple-mix-chart"
      props={{
        data: state.data?.hash3?.data,
        charts: [
          {
            title: "Nominations",
            subtitle: "Number of nominations and revocations",
            dateKey: "week",
            oppKey: "add_tx_hash",
            negKey: "removed_tx_hash",
            oppTitle: "Nominations",
            negTitle: "Revocations",
            type: "column",
          },
          {
            title: "Nominees",
            subtitle: "Number of Nominees and Revokers",
            dateKey: "week",
            oppKey: "nominee",
            negKey: "SIGNER_ID",
            oppTitle: "Nominee",
            negTitle: "Revoker",
            type: "column",
          },
        ],
        themeColor: { chart: themeColor.chart },
        colors: themeColor.chartColor,
        spinnerColors: themeColor?.spinnerColors,
      }}
    />
  </div>
);

return (
  <div className="container-fluid py-2">
    <div className="pl-2">
      <div>
        <div>
          <Container>
            <ul className="tabContent">
              <li className="tab-item">
                <button
                  className={`${state.tab === tabs.firstarea ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setTab(tabs.firstarea)}
                >
                  Comment Trend
                </button>
              </li>
              <li className="tab-item">
                <button
                  className={`${state.tab === tabs.secondarea ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setTab(tabs.secondarea)}
                >
                  Vote Trend
                </button>
              </li>
              <li className="tab-item">
                <button
                  className={`${state.tab === tabs.thirdarea ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setTab(tabs.thirdarea)}
                >
                  Nomination Trend
                </button>
              </li>
            </ul>
          </Container>
        </div>
      </div>
      <div>
        <div className="content">
          {state.tab === "first" && first}
          {state.tab === "second" && second}
          {state.tab === "third" && third}
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
