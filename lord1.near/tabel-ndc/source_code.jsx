const themeColor = props.themeColor;
const firsttheme = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Nominations Status",
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

const secondtheme = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Voter Status",
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

const thirdtheme = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Commentator Status",
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
const fourththeme = {
  height: "90px",
  align: "center",
  description: "Based on number of votes received",
  brand: "Candidate Status",
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

const fifththeme = {
  height: "90px",
  align: "center",
  description: "Based on number of comments received",
  brand: "Candidate Status",
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
              "The Near address of top Nominees (based on number of Nomination)",
            link: "yes",
            beforehref:
              "https://near.social/mob.near/widget/ProfilePage?accountId=",
            hyperlink: "yes",
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
            link: "yes",
            beforehref:
              "https://near.social/mob.near/widget/ProfilePage?accountId=",
            hyperlink: "yes",
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
            description:
              "The voter removed their vote from how many candidates",
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
            link: "yes",
            beforehref:
              "https://near.social/mob.near/widget/ProfilePage?accountId=",
            hyperlink: "yes",
          },
          {
            title: "Candidates",
            key: "candidate_add",
            description: "The commentator commented for how many candidates?",
          },
          {
            title: "Comments",
            key: "add_tx_hash",
            description: "Total Number of Comments",
          },
          {
            title: "Removed Candidate",
            key: "candidate_remove",
            description: "How many candidates did the commentator remove?",
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
            description:
              "Top Candidates based on number of votes received in NDC",
            link: "yes",
            beforehref:
              "https://near.social/mob.near/widget/ProfilePage?accountId=",
            hyperlink: "yes",
          },
          {
            title: "Voters",
            key: "voter_vote",
            description: "Total number of voters voted for this candidate",
          },
          {
            title: "Votes",
            key: "hash_vote",
            description: "Total Number of votes",
          },
          {
            title: "Voter Removed",
            key: "voter_remove",
            description:
              "Total number of voters removed their votes from this candidate",
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
            description:
              "Top Candidates based on number of comments received in NDC",
            link: "yes",
            beforehref:
              "https://near.social/mob.near/widget/ProfilePage?accountId=",
            hyperlink: "yes",
          },
          {
            title: "Commentators",
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
            title: "Remover",
            key: "remover",
            description:
              "How many commentators removed the comment from this candidate",
          },
          {
            title: "Removed comments",
            key: "hash_remove",
            description: "How many comments removed from this candidate",
          },
        ],
        rowsCount: 5,
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
                  Nominations
                </button>
              </li>
              <li className="tab-item">
                <button
                  className={`${state.tab === tabs.secondarea ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setTab(tabs.secondarea)}
                >
                  Votes cast
                </button>
              </li>
              <li className="tab-item">
                <button
                  className={`${state.tab === tabs.thirdarea ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setTab(tabs.thirdarea)}
                >
                  Comments Sent
                </button>
              </li>
              <li className="tab-item">
                <button
                  className={`${state.tab === tabs.fourtharea ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setTab(tabs.fourtharea)}
                >
                  Votes Rx
                </button>
              </li>
              <li className="tab-item">
                <button
                  className={`${state.tab === tabs.fiftharea ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setTab(tabs.fiftharea)}
                >
                  Comments Rx
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
