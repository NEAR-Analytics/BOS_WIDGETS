// Monthly Active Accounts Example
let rawData = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/2122b458-2138-4d4b-b030-efa784fc04d3/data/latest",
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
  .table-header {
    background-color: #000000; /* Set this to the desired dark color for the header */
    color: #ffffff;
    text-align: center;
    font-weight: 600;
  }
`;
let nodes = rawData.body || [];

const sub_widget_map = {
  "Play Ember": "https://nearatlas.com/#/y3k.near/widget/WAU_PlayEmber",
};

function formatPercentNew(text) {
  let number = parseFloat(text);
  return <span className="text-white">{number}%</span>;
}

function formatNumber(num) {
  return (
    <span className="text-white text-sm p-2">
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
        "https://nearatlas.com/#/y3k.near/widget/NEART.ATLAS.DETAILED_PROJECT_DASHBOARD?project_name=" +
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
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap">
        Project
      </p>
    ),
    renderCell: (item) => formatCell(item["Contract Address"]),
    sort: { sortKey: "ContractAddress" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        Past 30 Days
      </p>
    ),
    renderCell: (item) => formatNumber(item["Past 30 Days"]),
    sort: { sortKey: "Past 30 Days" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        Last Month
      </p>
    ),
    renderCell: (item) => formatNumber(item["30-60 Days Ago"]),
    sort: { sortKey: "30-60 Days Ago" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        M/M
      </p>
    ),
    renderCell: (item) => formatText(item["M/M"]),
    sort: { sortKey: "M/M" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        New MAAs
      </p>
    ),
    renderCell: (item) => formatNumber(item["New MAAs"]),
    sort: { sortKey: "New MAAs" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        M2 Retention
      </p>
    ),
    renderCell: (item) => formatPercentNew(item["M2 Retention"]),
    sort: { sortKey: "M2 Retention" },
  },

  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        Average DAU
      </p>
    ),
    renderCell: (item) => formatNumberDecimal(item["Daily Average"]),
    sort: { sortKey: "Daily Average" },
  },

  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        Stickiness
      </p>
    ),
    renderCell: (item) => formatPercentNew(item["DAU / MAU"]),
    sort: { sortKey: "DAU / MAU" },
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
  "DAU / MAU": (array) => array.sort((a, b) => a["DAU / MAU"] - b["DAU / MAU"]),
};

return (
  <div className="bg-dark rounded-lg mb-12 overflow-hidden w-full">
    {data !== null ? (
      <div style={{ "min-width": "780px" }} className="bg-dark w-full">
        <table className="table-auto w-full">
          <thead className="bg-gray-700">
            <tr>
              {COLUMNS.map((column, index) => (
                <th
                  key={index}
                  className="text-white text-center font-semibold p-2 border-b border-gray-300"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {nodes.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}
              >
                {COLUMNS.map((column, colIndex) => (
                  <td key={colIndex} className="text-white text-center p-2">
                    {column.renderCell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="text-white text-center p-4">Loading ...</div>
    )}
  </div>
);
