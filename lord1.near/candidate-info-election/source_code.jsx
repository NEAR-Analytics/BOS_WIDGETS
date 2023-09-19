const themeColor = props.themeColor;

const daotheme = {
  height: "90px",
  align: "left",
  description: "Election Participants activity per DAO",
  brand: "DAO",
  fontsize: "20px",
  fontweight: "30px",
  afterbrand: "activity",
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
  { id: 1, hash: "fa5ab0ec-d69f-4167-95b3-f0d88effe0dc" },
  { id: 2, hash: "4b1691db-4073-4d1d-84f8-caac41a66feb" },
  { id: 3, hash: "c182b428-e513-41c8-9a79-651fb2ea5ad0" },
];

State.init({
  light: true,
  data: [],
  isLoading: true,
  error: [],
  tab: "first",
});

const tabs = {
  firstTab: "first",
  secondTab: "second",
  thirdTab: "third",
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
  <div className="container-fluid py-2">
    <div>
      <div className="py-4">
        <Container>
          <ul className="tabContent">
            <li className="tab-item">
              <button
                className={`${state.tab === tabs.firstTab ? "active" : ""}`}
                aria-current="page"
                onClick={() => setTab(tabs.firstTab)}
              >
                first tab
              </button>
            </li>
            <li className="tab-item">
              <button
                className={`${state.tab === tabs.secondTab ? "active" : ""}`}
                aria-current="page"
                onClick={() => setTab(tabs.secondTab)}
              >
                second tab
              </button>
            </li>
            <li className="tab-item">
              <button
                className={`${state.tab === tabs.thirdTab ? "active" : ""}`}
                aria-current="page"
                onClick={() => setTab(tabs.thirdTab)}
              >
                third tab
              </button>
            </li>
          </ul>
        </Container>
      </div>
    </div>

    <div className="pl-2">
      <div
        className="my-4 shadow-sm  rounded-4"
        style={{ background: themeColor?.sbt_area?.section_bg }}
      >
        <Widget src="lord1.near/widget/header-dynamic" props={daotheme} />
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
                      title: "Candidate",
                      key: "SINGER",
                      description: "Top Candidate in Election",
                      link: "yes",
                      hyperlink: "yes",
                      beforehref:
                        "https://near.social/mob.near/widget/ProfilePage?accountId=",
                    },

                    {
                      title: "Votes",
                      key: "VOTES",
                      description: "Total Number of Votes",
                    },
                    {
                      title: "OG",
                      key: "og",
                      description: "Does it have OG or not?",
                    },
                    {
                      title: "Vibes",
                      key: "vibes",
                      description: "Does it have Vibes or not?",
                    },
                    {
                      title: "GD",
                      key: "gooddollar",
                      description: "Does it have Gooddollar or not?",
                    },
                    {
                      title: "Fractal",
                      key: "fractal",
                      description: "Does it have Fractal or not?",
                    },
                    {
                      title: "Regens",
                      key: "regens",
                      description: "Does it have Regens or not? ",
                    },
                    {
                      title: "First Date",
                      key: "first",
                      description: "First day of candidate's activity",
                    },
                    {
                      title: "Trxs",
                      key: "transactions",
                      description: "Total Number of candidate's transactions",
                    },
                    {
                      title: "Age",
                      key: "age",
                      description: "Age  of candidate's wallet",
                    },
                    {
                      title: "Active Days",
                      key: "Dates",
                      description:
                        "How many days has the candidate been active on the Near network ?",
                    },
                    {
                      title: "Fee",
                      key: "fee_usd",
                      description:
                        "Total fee volume of Candidate's transactions (Near)",
                    },
                    {
                      title: "Volume",
                      key: "amount_near",
                      description:
                        "Total volume of Candidate's transactions (Near)",
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
                      title: "Candidate",
                      key: "SINGER",
                      description: "Top Candidate in Election",
                      link: "yes",
                      hyperlink: "yes",
                      beforehref:
                        "https://near.social/mob.near/widget/ProfilePage?accountId=",
                    },

                    {
                      title: "Votes",
                      key: "VOTES",
                      description: "Total Number of Votes",
                    },
                    {
                      title: "OG",
                      key: "og",
                      description: "Does it have OG or not?",
                    },
                    {
                      title: "Vibes",
                      key: "vibes",
                      description: "Does it have Vibes or not?",
                    },
                    {
                      title: "GD",
                      key: "gooddollar",
                      description: "Does it have Gooddollar or not?",
                    },
                    {
                      title: "Fractal",
                      key: "fractal",
                      description: "Does it have Fractal or not?",
                    },
                    {
                      title: "Regens",
                      key: "regens",
                      description: "Does it have Regens or not? ",
                    },
                    {
                      title: "First Date",
                      key: "first",
                      description: "First day of candidate's activity",
                    },
                    {
                      title: "Trxs",
                      key: "transactions",
                      description: "Total Number of candidate's transactions",
                    },
                    {
                      title: "Age",
                      key: "age",
                      description: "Age  of candidate's wallet",
                    },
                    {
                      title: "Active Days",
                      key: "Dates",
                      description:
                        "How many days has the candidate been active on the Near network ?",
                    },
                    {
                      title: "Fee",
                      key: "fee_usd",
                      description:
                        "Total fee volume of Candidate's transactions (Near)",
                    },
                    {
                      title: "Volume",
                      key: "amount_near",
                      description:
                        "Total volume of Candidate's transactions (Near)",
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
                      title: "Candidate",
                      key: "SINGER",
                      description: "Top Candidate in Election",
                      link: "yes",
                      hyperlink: "yes",
                      beforehref:
                        "https://near.social/mob.near/widget/ProfilePage?accountId=",
                    },

                    {
                      title: "Votes",
                      key: "VOTES",
                      description: "Total Number of Votes",
                    },
                    {
                      title: "OG",
                      key: "og",
                      description: "Does it have OG or not?",
                    },
                    {
                      title: "Vibes",
                      key: "vibes",
                      description: "Does it have Vibes or not?",
                    },
                    {
                      title: "GD",
                      key: "gooddollar",
                      description: "Does it have Gooddollar or not?",
                    },
                    {
                      title: "Fractal",
                      key: "fractal",
                      description: "Does it have Fractal or not?",
                    },
                    {
                      title: "Regens",
                      key: "regens",
                      description: "Does it have Regens or not? ",
                    },
                    {
                      title: "First Date",
                      key: "first",
                      description: "First day of candidate's activity",
                    },
                    {
                      title: "Trxs",
                      key: "transactions",
                      description: "Total Number of candidate's transactions",
                    },
                    {
                      title: "Age",
                      key: "age",
                      description: "Age  of candidate's wallet",
                    },
                    {
                      title: "Active Days",
                      key: "Dates",
                      description:
                        "How many days has the candidate been active on the Near network ?",
                    },
                    {
                      title: "Fee",
                      key: "fee_usd",
                      description:
                        "Total fee volume of Candidate's transactions (Near)",
                    },
                    {
                      title: "Volume",
                      key: "amount_near",
                      description:
                        "Total volume of Candidate's transactions (Near)",
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
