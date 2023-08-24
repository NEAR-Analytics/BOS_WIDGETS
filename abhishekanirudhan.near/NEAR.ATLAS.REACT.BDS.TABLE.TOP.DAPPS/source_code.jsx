// Monthly Active Accounts Example
let rawData = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/fc7361ab-5b57-445d-b4b9-e5bccd8a5699/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

// data.body = data.body.sort((a, b) => new Date(a.MONTH) - new Date(b.MONTH));

let Style = styled.div`

          `;

let nodes = rawData.body || [];

//const sub_widget_map = {
//  "Play Ember": "https://nearatlas.com/#/y3k.near/widget/WAU_PlayEmber",
//};

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
    label: <p className="text-center text-white text-wrap">Project</p>,
    renderCell: (item) => formatCell(item["Contract Address"]),
    sort: { sortKey: "ContractAddress" },
  },
  {
    label: <p className="text-center text-white text-wrap ">Past 30 Days</p>,
    renderCell: (item) => formatNumber(item["Past 30 Days"]),
    sort: { sortKey: "Past 30 Days" },
  },
  {
    label: <p className="text-center text-white text-wrap ">Last Month</p>,
    renderCell: (item) => formatNumber(item["30-60 Days Ago"]),
    sort: { sortKey: "30-60 Days Ago" },
  },
  {
    label: <p className="text-center text-white text-wrap ">M/M</p>,
    renderCell: (item) => formatText(item["M/M"]),
    sort: { sortKey: "M/M" },
  },
  {
    label: <p className="text-center text-white text-wrap ">New MAAs</p>,
    renderCell: (item) => formatNumber(item["New MAAs"]),
    sort: { sortKey: "New MAAs" },
  },
  {
    label: <p className="text-center text-white text-wrap ">M2 Retention</p>,
    renderCell: (item) => formatPercentNew(item["M2 Retention"]),
    sort: { sortKey: "M2 Retention" },
  },
  {
    label: <p className="text-center text-white text-wrap ">Average DAU</p>,
    renderCell: (item) => formatNumberDecimal(item["Daily Average"]),
    sort: { sortKey: "Daily Average" },
  },

  {
    label: <p className="text-center text-white text-wrap ">Stickiness</p>,
    renderCell: (item) => formatPercentNew(item["DAU / MAU"]),
    sort: { sortKey: "DAU / MAU" },
  },
  {
    label: (
      <p className="text-center text-white text-wrap ">Transactions (30d)</p>
    ),
    renderCell: (item) => formatPercentNew(item["Txns 30 Days"]),
    sort: { sortKey: "Txns 30 Days" },
  },
  {
    label: <p className="text-center text-white text-wrap ">Avg Tx per MAU</p>,
    renderCell: (item) => formatNumberDecimal(item["Avg Tx per MAU"]),
    sort: { sortKey: "Avg Tx per MAU" },
  },
  {
    label: (
      <p className="text-center text-white text-wrap ">Total Transactions</p>
    ),
    renderCell: (item) => formatNumber(item["Total Txns"]),
    sort: { sortKey: "Total Txns" },
  },
  {
    label: (
      <p className="text-center text-white text-wrap ">Total Fee Generated</p>
    ),
    renderCell: (item) => formatNumber(item["Total Fee Generated"]),
    sort: { sortKey: "Total Fee Generated" },
  },
  {
    label: (
      <p className="text-center text-white text-wrap ">Total Gas Consumed</p>
    ),
    renderCell: (item) => formatPercentNew(item["Gas Consumed"]),
    sort: { sortKey: "Gas Consumed" },
  },
];
const sortFns = {
  ContractAddress: (array) =>
    array.sort((a, b) =>
      a["Contract Address"].localeCompare(b["Contract Address"])
    ),
  "Past 30 Days": (array) =>
    array.sort((a, b) => a["Past 30 Days"] - b["Past 30 Days"]),
  "30-60 Days Ago": (array) =>
    array.sort((a, b) => a["30-60 Days Ago"] - b["30-60 Days Ago"]),
  "M/M": (array) => array.sort((a, b) => a["M/M"] - b["M/M"]),
  "New MAAs": (array) => array.sort((a, b) => a["New MAAs"] - b["New MAAs"]),
  "M2 Retention": (array) =>
    array.sort((a, b) => a["M2 Retention"] - b["M2 Retention"]),
  "Daily Average": (array) =>
    array.sort((a, b) => a["Daily Average"] - b["Daily Average"]),
  "Txns 30 Days": (array) =>
    array.sort((a, b) => a["Txns 30 Days"] - b["Txns 30 Days"]),
  "Avg Tx per MAU": (array) =>
    array.sort((a, b) => a["Avg Tx per MAU"] - b["Avg Tx per MAU"]),
  "Total Txns": (array) =>
    array.sort((a, b) => a["Total Txns"] - b["Total Txns"]),
  "Total Fee Generated": (array) =>
    array.sort((a, b) => a["Total Fee Generated"] - b["Total Fee Generated"]),
  "Gas Consumed": (array) =>
    array.sort((a, b) => a["Gas Consumed"] - b["Gas Consumed"]),
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
