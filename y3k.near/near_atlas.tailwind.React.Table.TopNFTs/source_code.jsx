// Monthly Active Accounts Example
let rawData = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/9bfa85f4-7b2d-4219-b6b6-a08f5ed2880b/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

// data.body = data.body.sort((a, b) => new Date(a.MONTH) - new Date(b.MONTH));

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
  if (state.currentPage < Math.ceil(nodesTop100.length / 10)) {
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
      // href={
      //   "https://beta.nearatlas.com/#/y3k.near/widget/near_atlas.components.detail_chart?project_name=" +
      //   text
      // }
      className="text-red-50 text-wrap break-words"
    >
      {text}
    </a>
  );
}

function formatText(text) {
  let number = parseFloat(text);
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
      <p className="text-white text-sm font-semibold p-2 text-wrap ">
        RECEIVER_ID
      </p>
    ),
    renderCell: (item) => formatCell(item["RECEIVER_ID"]),
    sort: { sortKey: "RECEIVER_ID" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        TRANSFERS_LAST_3_DAYS
      </p>
    ),
    renderCell: (item) => formatNumber(item["TRANSFERS_LAST_3_DAYS"]),
    sort: { sortKey: "TRANSFERS_LAST_3_DAYS" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        TRANSFERS_LAST_24_HOURS
      </p>
    ),
    renderCell: (item) => formatNumber(item["TRANSFERS_LAST_24_HOURS"]),
    sort: { sortKey: "TRANSFERS_LAST_24_HOURS" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        TOTAL_TRANSFERS
      </p>
    ),
    renderCell: (item) => formatNumber(item["TOTAL_TRANSFERS"]),
    sort: { sortKey: "TOTAL_TRANSFERS" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        TOTAL_DEPOSIT
      </p>
    ),
    renderCell: (item) => formatNumberDecimal(item["TOTAL_DEPOSIT"]),
    sort: { sortKey: "TOTAL_DEPOSIT" },
  },
  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        TOTAL_GAS_USED
      </p>
    ),
    renderCell: (item) => formatNumberDecimal(item["TOTAL_GAS_USED"]),
    sort: { sortKey: "TOTAL_GAS_USED" },
  },

  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        HOLDERS_COUNT
      </p>
    ),
    renderCell: (item) => formatNumber(item["HOLDERS_COUNT"]),
    sort: { sortKey: "HOLDERS_COUNT" },
  },

  {
    label: (
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap ">
        TOKEN_COUNT
      </p>
    ),
    renderCell: (item) => formatNumber(item["TOKEN_COUNT"]),
    sort: { sortKey: "TOKEN_COUNT" },
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

// Function to get the top 100 sorted nodes based on TRANSFERS_LAST_3_DAYS
function getTop100SortedNodes() {
  // First, ensure nodes is defined and is an array
  if (!nodes || !Array.isArray(nodes)) {
    return [];
  }

  // Sort based on TRANSFERS_LAST_3_DAYS in descending order
  const sortedNodes = [...nodes].sort((a, b) => {
    return b["TRANSFERS_LAST_3_DAYS"] - a["TRANSFERS_LAST_3_DAYS"];
  });

  // Return top 100 items after sorting
  return sortedNodes.slice(0, 100);
}
const sortedNodes = getSortedNodes();
const nodesForRendering = getNodesForCurrentPage(sortedNodes);

return (
  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto bg-dark">
    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th
                className="px-5 py-3 border-b-2 border-gray-700 bg-gray-900 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer"
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
            <tr className={rowIndex % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}>
              {COLUMNS.map((column) => (
                <td className="px-5 py-5 border-b border-gray-700 text-sm">
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
          {Math.min(state.currentPage * 10, nodesTop100.length)} of{" "}
          {nodesTop100.length} Entries
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
  </div>
);
