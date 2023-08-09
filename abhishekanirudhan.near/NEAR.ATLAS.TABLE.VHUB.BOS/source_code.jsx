// Monthly Active Accounts Example
let rawData = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/81c96beb-74ec-4886-a15a-050836ca21b8/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

let Style = styled.div`

          `;

let nodes = rawData.body || [];

function formatPercentNew(text) {
  let number = parseFloat(text);
  return <span className="text-white">{number}%</span>;
}

function formatNumber(num) {
  return (
    <span className="text-white">
      {num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
    </span>
  );
}

function formatNumberDecimal(text) {
  let number = parseInt(text);
  return (
    <span className="text-white">
      {number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
    </span>
  );
}

function formatCell(text) {
  return (
    <a
      href={
        "https://nearatlas.com/#/abhishekanirudhan.near/widget/NEART.ATLAS.BDS_DETAILED_PROJECT_DASHBOARD?project_name=" +
        text
      }
      className="text-warning text-wrap "
    >
      {text}
    </a>
  );
}

function formatText(text) {
  let number = parseFloat(text);
  if (number < 0) {
    return <span className="text-danger">{number}%</span>;
  } else if (number > 0) {
    return <span className="text-success">{number}%</span>;
  } else {
    return <span className="text-warning">{number}%</span>;
  }
}

const data = {
  nodes: nodes,
};

const COLUMNS = [
  {
    label: <p className="text-center text-white text-wrap">Developer</p>,
    renderCell: (item) => formatCell(item["Developer Account"]),
    sort: { sortKey: "Developer Account" },
  },
  {
    label: (
      <p className="text-center text-white text-wrap ">Widgets Deployed</p>
    ),
    renderCell: (item) => formatNumber(item["Widgets"]),
    sort: { sortKey: "Widgets" },
  },
  {
    label: <p className="text-center text-white text-wrap ">Total Commits</p>,
    renderCell: (item) => formatNumber(item["Commits"]),
    sort: { sortKey: "Commits" },
  },
  {
    label: (
      <p className="text-center text-white text-wrap ">
        Widgets - Past 30 Days
      </p>
    ),
    renderCell: (item) => formatText(item["Widgets - Past 30d"]),
    sort: { sortKey: "Widgets - Past 30d" },
  },
  {
    label: (
      <p className="text-center text-white text-wrap ">
        Commits - Past 30 Days
      </p>
    ),
    renderCell: (item) => formatNumber(item["Commits - Past 30d"]),
    sort: { sortKey: "Commits - Past 30d" },
  },
];
const sortFns = {
  ContractAddress: (array) =>
    array.sort((a, b) =>
      a["Developer Account"].localeCompare(b["Developer Account"])
    ),
  Widgets: (array) => array.sort((a, b) => a["Widgets"] - b["Widgets"]),
  Commits: (array) => array.sort((a, b) => a["Commits"] - b["Commits"]),
  "Widgets - Past 30d": (array) =>
    array.sort((a, b) => a["Widgets - Past 30d"] - b["Widgets - Past 30d"]),
  "Commits - Past 30d": (array) =>
    array.sort((a, b) => a["Commits - Past 30d"] - b["Commits - Past 30d"]),
};

return (
  <div className="text-bg-dark rounded-4 mb-12">
    {data !== null ? (
      <div Style={{ "min-width": "780px" }} className="bg-dark">
        <BasicTable columns={COLUMNS} data={data} sortFns={sortFns} />
      </div>
    ) : (
      <div>Loading ...</div>
    )}
  </div>
);
