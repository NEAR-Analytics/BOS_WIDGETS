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

State.init({
  setSortConfig: { key: "", direction: "asc" },
  currentPage: 1,
});

function getNodesForCurrentPage(allNodes) {
  const startIndex = (state.currentPage - 1) * 20;
  const endIndex = startIndex + 20;
  return allNodes.slice(startIndex, endIndex);
}

function nextPage() {
  if (state.currentPage < Math.ceil(sortedNodes.length / 10)) {
    State.update({ currentPage: state.currentPage + 1 });
  }
}

function previousPage() {
  if (state.currentPage > 1) {
    State.update({ currentPage: state.currentPage - 1 });
  }
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
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap">
        Project Name
      </p>
    ),
    renderCell: (item) => formatCell(item["Project Name"]),
    sort: { sortKey: "Project Name" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        DAU
      </p>
    ),
    renderCell: (item) => formatNumber(item["DAU"]),
    sort: { sortKey: "DAU" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        MAU
      </p>
    ),
    renderCell: (item) => formatNumber(item["MAU"]),
    sort: { sortKey: "MAU" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        Accounts Created
      </p>
    ),
    renderCell: (item) => formatNumber(item["Accounts Created"]),
    sort: { sortKey: "Accounts Created" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        Accounts Created - Past 30 Days
      </p>
    ),
    renderCell: (item) => formatNumber(item["Accounts Created - 30d"]),
    sort: { sortKey: "Accounts Created - 30d" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        NFT Mints
      </p>
    ),
    renderCell: (item) => formatNumber(item["NFT Mints"]),
    sort: { sortKey: "NFT Mints" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        Unique Minters
      </p>
    ),
    renderCell: (item) => formatNumber(item["Unique Minters"]),
    sort: { sortKey: "Unique Minters" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        NFT Mints - Past 30 Days
      </p>
    ),
    renderCell: (item) => formatNumber(item["NFT Mints - 30d"]),
    sort: { sortKey: "NFT Mints - 30d" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        Unique Minters - Past 30 Days
      </p>
    ),
    renderCell: (item) => formatNumber(item["Unique Minters - 30d"]),
    sort: { sortKey: "Unique Minters - 30d" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        Transactions
      </p>
    ),
    renderCell: (item) => formatNumber(item["TXNS"]),
    sort: { sortKey: "TXNS" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        Transactions
      </p>
    ),
    renderCell: (item) => formatNumber(item["TXNS_30D"]),
    sort: { sortKey: "TXNS_30D" },
  },
];

function sort_update(sortKey, direction) {
  // Update the sort state
  State.update({
    setSortConfig: { key: sortKey, direction },
  });
}
function getSortedNodes() {
  // Get the current sort configuration from the state
  const sortConfig = state.setSortConfig;

  // Check if there's a sort key and direction
  if (sortConfig && sortConfig.key && sortConfig.direction) {
    const sortedNodes = [...(nodes || [])];

    sortedNodes.sort((a, b) => {
      // Check if the data type is string
      if (typeof a[sortConfig.key] === "string") {
        return sortConfig.direction === "asc"
          ? a[sortConfig.key].localeCompare(b[sortConfig.key])
          : b[sortConfig.key].localeCompare(a[sortConfig.key]);
      } else {
        // For other data types (numbers, dates, etc.)
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
      }
      return 0; // If values are equal
    });

    return sortedNodes;
  }

  // If no sort configuration, return original nodes
  return nodes;
}

// Function to get the top 100 sorted nodes based on TRANSFERS_3D
function getTop100SortedNodes() {
  // First, ensure nodes is defined and is an array
  if (!nodes || !Array.isArray(nodes)) {
    return [];
  }

  // Sort based on TRANSFERS_3D in descending order
  const sortedNodes = [...nodes].sort((a, b) => {
    return b["DAU"] - a["DAU"];
  });

  // Return top 100 items after sorting
  return sortedNodes.slice(0, 100);
}

const sortedNodes = getSortedNodes();
const nodesForRendering = getNodesForCurrentPage(sortedNodes);

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
              {COLUMNS.map((column) => (
                <th
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
            {nodesForRendering.map((row, rowIndex) => (
              <tr
                className={rowIndex % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}
              >
                {COLUMNS.map((column) => (
                  <td
                    className={`text-white text-center p-2 ${
                      column.sort.sortKey === "Project Name" ? "max-w-xs" : ""
                    }`}
                  >
                    {column.renderCell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-5 bg-gray-800 border-t flex flex-col xs:flex-row items-center xs:justify-between">
          <span className="text-xs xs:text-sm text-white">
            Showing {(state.currentPage - 1) * 10 + 1} to
            {Math.min(state.currentPage * 10, sortedNodes.length)} of{" "}
            {sortedNodes.length} Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={previousPage}
              className="text-sm bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-l"
            >
              Prev
            </button>
            <button
              onClick={nextPage}
              className="text-sm bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-r"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-white text-center p-4">Loading ...</div>
    )}
  </div>
);
