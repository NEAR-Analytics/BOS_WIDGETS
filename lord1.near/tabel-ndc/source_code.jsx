const themeColor = props.themeColor;
const firsttheme = {
  height: "110px",
  align: "center",
  description: "Tracking the activity of Soul Bound Token holders in voting.",
  brand: "NDC Tracker",
  fontsize: "100",
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

const secondtheme = {
  height: "110px",
  align: "center",
  description: "Tracking the activity of Soul Bound Token holders in voting.",
  brand: "NDC Tracker",
  fontsize: "100",
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

const thirdtheme = {
  height: "110px",
  align: "center",
  description: "Tracking the activity of Soul Bound Token holders in voting.",
  brand: "NDC Tracker",
  fontsize: "100",
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
const fourththeme = {
  height: "110px",
  align: "center",
  description: "Tracking the activity of Soul Bound Token holders in voting.",
  brand: "NDC Tracker",
  fontsize: "100",
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

const fifththeme = {
  height: "110px",
  align: "center",
  description: "Tracking the activity of Soul Bound Token holders in voting.",
  brand: "NDC Tracker",
  fontsize: "100",
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
  { id: 1, hash: "148bbf87-cccb-4eb0-8f48-9fe5ae090631" },
  { id: 2, hash: "d18e6a5c-0dae-43d0-a718-0cfc84f60961" },
  { id: 3, hash: "52275624-3e5b-4a92-bcf4-5d9cffeb95e8" },
  { id: 4, hash: "2d64082a-11c1-46df-a59d-586083139870" },
  { id: 5, hash: "64936084-6069-4a6e-ad74-9e80914bedde" },
];

State.init({
  light: true,
  data: [],
  isLoading: true,
  error: [],
  value: "acceleration",
  tab: "first",
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
    height:30px;
    padding:0 22px;
    border:none;

  }
`;

let first = (
  <div
    style={{ background: themeColor?.sbt_area?.card_bg }}
    className="shadow-sm rounded-2 overflow-auto"
  >
    <Widget src="lord1.near/widget/header-dynamic" props={firsttheme} />
    <Widget
      src="lord1.near/widget/table-pagination"
      props={{
        themeColor: { table_pagination: themeColor.table_pagination },
        data: state.data?.hash1?.data,
        columns: [
          {
            title: "Nominee",
            key: "nominee",
            description:
              "The Near address of top Nominee (based on number of Nomination)",
          },
          {
            title: "HOM",
            key: "hom",
            description: "House Of Merit Nomination",
          },
          {
            title: "TC",
            key: "tc",
            description: "Transparency Commission Nomination",
          },
          {
            title: "COA",
            key: "coa",
            description: "Council Of Advisors Nomination",
          },
          {
            title: "Total",
            key: "total",
            description: "Total Nomination",
          },
          {
            title: "Not Revoked",
            key: "not_revoked",
            description: "Nomination Not Revoked",
          },
          {
            title: "Revoked",
            key: "is_revoked",
            description: "Nomination Revoked",
          },
        ],
        rowsCount: 5,
      }}
    />
  </div>
);
let second = (
  <div
    style={{ background: themeColor?.sbt_area?.card_bg }}
    className="shadow-sm rounded-2 overflow-auto"
  >
    <Widget src="lord1.near/widget/header-dynamic" props={secondtheme} />
    <Widget
      src="lord1.near/widget/table-pagination"
      props={{
        themeColor: {
          table_pagination: themeColor.table_pagination,
        },
        data: state.data?.hash2?.data,
        columns: [
          {
            title: "Voter",
            key: "voter_vote",
            description: "Top Voters of NDC",
          },
          {
            title: "Candidate",
            key: "candidate_vote",
            description: "The voter voted to how many candidates",
          },
          {
            title: "Votes",
            key: "hash_vote",
            description: "Total Number of votes",
          },
          {
            title: "Removed Candidate",
            key: "candidate_remove",
            description: "Total Nomination",
          },
          {
            title: "Removed Votes",
            key: "hash_remove",
            description: "Total Number of removed votes",
          },
        ],
        rowsCount: 5,
      }}
    />
  </div>
);
let third = (
  <div
    style={{ background: themeColor?.sbt_area?.card_bg }}
    className="shadow-sm rounded-2 overflow-auto"
  >
    <Widget src="lord1.near/widget/header-dynamic" props={thirdtheme} />
    <Widget
      src="lord1.near/widget/table-pagination"
      props={{
        themeColor: { table_pagination: themeColor.table_pagination },
        data: state.data?.hash3?.data,

        columns: [
          {
            title: "Commentator",
            key: "commentator",
            description: "Top Commentators of NDC",
          },
          {
            title: "Candidates",
            key: "candidate_add",
            description: "The Commentator Commented for how many candidates",
          },
          {
            title: "Comments",
            key: "add_tx_hash",
            description: "Total Number of Comments",
          },
          {
            title: "Removed Candidate",
            key: "candidate_remove",
            description: "Top Commentators of NDC",
          },
          {
            title: "Removed Comment",
            key: "hash_remove",
            description: "Total Number of removed Comment",
          },
        ],
        rowsCount: 5,
      }}
    />
  </div>
);
let fourth = (
  <div
    style={{ background: themeColor?.sbt_area?.card_bg }}
    className="shadow-sm rounded-2 overflow-auto"
  >
    <Widget src="lord1.near/widget/header-dynamic" props={fourththeme} />
    <Widget
      src="lord1.near/widget/table-pagination"
      props={{
        themeColor: { table_pagination: themeColor.table_pagination },
        data: state.data?.hash4?.data,

        columns: [
          {
            title: "Candidates",
            key: "candidate_vote",
            description: "Top Candidates based on #votes in NDC",
          },
          {
            title: "Voters",
            key: "voter_vote",
            description: "Total Number of Voters voted to this candidate",
          },
          {
            title: "Votes",
            key: "hash_vote",
            description: "Total Number of votes",
          },
          {
            title: "Removed voter",
            key: "voter_remove",
            description:
              "Total Number of Voters removed their votes from this candidate",
          },
          {
            title: "Removed votes",
            key: "hash_remove",
            description: "Total Number of removed votes",
          },
        ],
        rowsCount: 5,
      }}
    />
  </div>
);

let fifth = (
  <div
    style={{ background: themeColor?.sbt_area?.card_bg }}
    className="shadow-sm rounded-2 overflow-auto"
  >
    <Widget src="lord1.near/widget/header-dynamic" props={fifththeme} />
    <Widget
      src="lord1.near/widget/table-pagination"
      props={{
        themeColor: { table_pagination: themeColor.table_pagination },
        data: state.data?.hash5?.data,

        columns: [
          {
            title: "Candidate",
            key: "candidate_add",
            description: "Total Number of comments for each candidate",
          },
          {
            title: "commentators",
            key: "commentator",
            description:
              "How many commentators left a comment for this candidate",
          },
          {
            title: "Comments",
            key: "add_tx_hash",
            description: "How many comments left for this candidate",
          },
          {
            title: "remover",
            key: "remover",
            description:
              "How many commentators removed the comment from this candidate",
          },
          {
            title: "removed comments",
            key: "hash_remove",
            description: "How many comments removed from this candidate",
          },
        ],
        rowsCount: 10,
      }}
    />
  </div>
);
return (
  <div className="container-fluid py-2">
    <div className="pl-2">
      <div style={{ marginLeft: "6rem" }}>
        <div>
          <Container>
            <ul className="tabContent">
              <li className="tab-item">
                <button
                  className={`${state.tab === tabs.firstarea ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setTab(tabs.firstarea)}
                >
                  first1
                </button>
              </li>
              <li className="tab-item">
                <button
                  className={`${state.tab === tabs.secondarea ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setTab(tabs.secondarea)}
                >
                  second2
                </button>
              </li>
              <li className="tab-item">
                <button
                  className={`${state.tab === tabs.thirdarea ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setTab(tabs.thirdarea)}
                >
                  third3
                </button>
              </li>
              <li className="tab-item">
                <button
                  className={`${state.tab === tabs.fourtharea ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setTab(tabs.fourtharea)}
                >
                  fourth4
                </button>
              </li>
              <li className="tab-item">
                <button
                  className={`${state.tab === tabs.fiftharea ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setTab(tabs.fiftharea)}
                >
                  fifth5
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
          {state.tab === "fourth" && fourth}
          {state.tab === "fifth" && fifth}
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
