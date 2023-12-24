// let rawData = fetch(
//   "https://api.flipsidecrypto.com/api/v2/queries/2122b458-2138-4d4b-b030-efa784fc04d3/data/latest",
//   {
//     subscribe: true,
//     method: "GET",
//     headers: {
//       Accept: "*/*",
//     },
//   }
// );
let static_file_param = "atlas_top_projects.csv";

let rawData = fetch(
  "https://github-near-data-api.vercel.app/api/static_file_param?filename=" +
    static_file_param,
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

State.init({
  setSortConfig: { key: null, direction: "asc" },
  currentPage: 1,
  rowsPerPage: 10, // You can change this as needed.
});

function getPaginatedData(data) {
  const startIndex = (state.currentPage - 1) * state.rowsPerPage;
  const endIndex = startIndex + state.rowsPerPage;
  return data.slice(startIndex, endIndex);
}

let Style = styled.div`
  .table-header {
    background-color: #000000; /* Set this to the desired dark color for the header */
    color: #ffffff;
    text-align: center;
    font-weight: 600;
  }
`;
let nodes = rawData.body || [];

console.log(nodes);

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
  let number = parseFloat(parseFloat(text).toFixed(2));
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
        "https://nearatlas.com/#/y3k.near/widget/near_atlas.components.relay.detail_chart?project_name=" +
        text
      }
      className="text-red-50 text-wrap "
    >
      {text}
    </a>
  );
}

function formatText(text) {
  let number = parseFloat(parseFloat(text).toFixed(2));
  if (number < 0) {
    return <span className="text-red-600">{number}%</span>; // Red color for negative numbers
  } else if (number > 0) {
    return <span className="text-green-600">{number}%</span>; // Green color for positive numbers
  } else {
    return <span className="text-yellow-600">{number}%</span>; // Yellow color for zero
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
    renderCell: (item) => formatCell(item["ContractAddress"]),
    sort: { sortKey: "ContractAddress" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        Past 30 Days
      </p>
    ),
    renderCell: (item) => formatNumber(item["Past30Days"]),
    sort: { sortKey: "Past30Days" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        Last Month
      </p>
    ),
    renderCell: (item) => formatNumber(item["30-60DaysAgo"]),
    sort: { sortKey: "30-60DaysAgo" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        M/M
      </p>
    ),
    renderCell: (item) => formatText(item["MoM"]),
    sort: { sortKey: "MoM" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        New MAAs
      </p>
    ),
    renderCell: (item) => formatNumber(item["NewMAAs"]),
    sort: { sortKey: "NewMAAs" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        M2 Retention
      </p>
    ),
    renderCell: (item) => formatNumberDecimal(item["M2Retention"]),
    sort: { sortKey: "M2Retention" },
  },

  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        Average DAU
      </p>
    ),
    renderCell: (item) => formatNumberDecimal(item["DailyAverage"]),
    sort: { sortKey: "DailyAverage" },
  },

  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        Stickiness
      </p>
    ),
    renderCell: (item) => formatNumberDecimal(item["DAUMAU"]),
    sort: { sortKey: "DAUMAU" },
  },

  {
    label: (
      <p className="text-center text-white text-wrap ">Total Transactions</p>
    ),
    renderCell: (item) => formatNumber(item["TotalTransactions"]),
    sort: { sortKey: "TotalTransactions" },
  },
  {
    label: (
      <p className="text-center text-white text-wrap ">
        Transactions - 30 Days
      </p>
    ),
    renderCell: (item) => formatNumber(item["Transactions-30Days"]),
    sort: { sortKey: "Transactions-30Days" },
  },
  {
    label: <p className="text-center text-white text-wrap ">Avg Txn per MAU</p>,
    renderCell: (item) => formatNumberDecimal(item["AvgTxnperMAU"]),
    sort: { sortKey: "AvgTxnperMAU" },
  },
];

function sort_update(sortKey, direction) {
  // Update the sort state
  State.update({
    setSortConfig: { key: sortKey, direction },
  });
}

// Function to get the sorted nodes
function getSortedNodes() {
  // Get the current sort configuration from the state
  const sortConfig = state.setSortConfig;

  // Apply sorting if there's a sort key and direction
  if (sortConfig && sortConfig.key && sortConfig.direction) {
    const sortedNodes = [...nodes];
    sortedNodes.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortedNodes;
  }
  return nodes; // Return original nodes if no sorting
}

return (
  <div className="bg-dark rounded-lg mb-12 overflow-hidden w-full">
    {data !== null ? (
      <div
        style={{ "min-width": "780px" }}
        className="bg-dark w-full overflow-x-auto overflow-y-auto"
      >
        <table className="table-auto w-full overflow-scroll">
          <thead className="bg-gray-700">
            <tr>
              {COLUMNS.map((column, index) => (
                <th
                  key={index}
                  className="text-white text-center font-semibold p-2 border-b border-gray-300 cursor-pointer"
                  onClick={() => {
                    const direction =
                      state.setSortConfig.direction === "asc" ? "desc" : "asc";
                    sort_update(column.sort.sortKey, direction);
                  }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getPaginatedData(getSortedNodes()).map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={` ${
                  rowIndex % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                }`}
              >
                {COLUMNS.map((column, colIndex) => (
                  <td key={colIndex} className="text-center p-2 ">
                    {column.renderCell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center mt-4 bg-gray-800 p-4 rounded">
          <button
            onClick={() => {
              if (state.currentPage > 1) {
                State.update({ currentPage: state.currentPage - 1 });
              }
            }}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 active:bg-gray-500"
          >
            Previous
          </button>
          <span className="mx-2 text-white">
            Page {state.currentPage} of{" "}
            {Math.ceil(nodes.length / state.rowsPerPage)}
          </span>
          <button
            onClick={() => {
              if (
                state.currentPage < Math.ceil(nodes.length / state.rowsPerPage)
              ) {
                State.update({ currentPage: state.currentPage + 1 });
              }
            }}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 active:bg-gray-500"
          >
            Next
          </button>
        </div>
      </div>
    ) : (
      <div className="text-white text-center p-4">Loading ...</div>
    )}
  </div>
);
