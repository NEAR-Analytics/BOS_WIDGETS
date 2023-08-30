let rawData = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/4ddb391f-b3ac-4243-ac35-5c0fc9a323a9/data/latest",
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
        "https://nearatlas.com/#/abhishekanirudhan.near/widget/NEAR.ATLAS.BDS_NFT_DETAILED_PROJECT_DASHBOARD?project_name=" +
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
    label: <p className="text-center text-white text-wrap">Project Name</p>,
    renderCell: (item) => formatCell(item["Project Name"]),
    sort: { sortKey: "Project Name" },
  },
  {
    label: <p className="text-center text-white text-wrap ">DAU</p>,
    renderCell: (item) => formatNumber(item["DAU"]),
    sort: { sortKey: "DAU" },
  },
  {
    label: <p className="text-center text-white text-wrap ">MAU</p>,
    renderCell: (item) => formatNumber(item["MAU"]),
    sort: { sortKey: "MAU" },
  },
  {
    label: (
      <p className="text-center text-white text-wrap ">Accounts Created</p>
    ),
    renderCell: (item) => formatNumber(item["Accounts Created"]),
    sort: { sortKey: "Accounts Created" },
  },
  {
    label: (
      <p className="text-center text-white text-wrap ">
        Accounts Created - Past 30 Days
      </p>
    ),
    renderCell: (item) => formatNumber(item["Accounts Created - 30d"]),
    sort: { sortKey: "Accounts Created - 30d" },
  },
  {
    label: <p className="text-center text-white text-wrap ">NFT Mints</p>,
    renderCell: (item) => formatNumber(item["NFT Mints"]),
    sort: { sortKey: "NFT Mints" },
  },
  {
    label: <p className="text-center text-white text-wrap ">Unique Minters</p>,
    renderCell: (item) => formatNumber(item["Unique Minters"]),
    sort: { sortKey: "Unique Minters" },
  },
  {
    label: (
      <p className="text-center text-white text-wrap ">
        NFT Mints - Past 30 Days
      </p>
    ),
    renderCell: (item) => formatNumber(item["NFT Mints - 30d"]),
    sort: { sortKey: "NFT Mints - 30d" },
  },
  {
    label: (
      <p className="text-center text-white text-wrap ">
        Unique Minters - Past 30 Days
      </p>
    ),
    renderCell: (item) => formatNumber(item["Unique Minters - 30d"]),
    sort: { sortKey: "Unique Minters - 30d" },
  },
  {
    label: <p className="text-center text-white text-wrap ">Transactions</p>,
    renderCell: (item) => formatNumber(item["TXNS"]),
    sort: { sortKey: "TXNS" },
  },
  {
    label: <p className="text-center text-white text-wrap ">Transactions</p>,
    renderCell: (item) => formatNumber(item["TXNS_30D"]),
    sort: { sortKey: "TXNS_30D" },
  },
];
const sortFns = {
  ContractAddress: (array) =>
    array.sort((a, b) => a["Project Name"].localeCompare(b["Project Name"])),
  DAU: (array) => array.sort((a, b) => a["DAU"] - b["DAU"]),
  MAU: (array) => array.sort((a, b) => a["MAU"] - b["MAU"]),
  "Accounts Created": (array) =>
    array.sort((a, b) => a["Accounts Created"] - b["Accounts Created"]),
  "Accounts Created - 30d": (array) =>
    array.sort(
      (a, b) => a["Accounts Created - 30d"] - b["Accounts Created - 30d"]
    ),
  "NFT Mints": (array) => array.sort((a, b) => a["NFT Mints"] - b["NFT Mints"]),
  "Unique Minters": (array) =>
    array.sort((a, b) => a["Unique Minters"] - b["Unique Minters"]),
  "NFT Mints - 30d": (array) =>
    array.sort((a, b) => a["NFT Mints - 30d"] - b["NFT Mints - 30d"]),
  "Unique Minters - 30d": (array) =>
    array.sort((a, b) => a["Unique Minters - 30d"] - b["Unique Minters - 30d"]),
  TXNS: (array) => array.sort((a, b) => a["TXNS"] - b["TXNS"]),
  TXNS_30d: (array) => array.sort((a, b) => a["TXNS_30d"] - b["TXNS_30d"]),
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
