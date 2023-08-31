let rawData = props.rawData;

// data.body = data.body.sort((a, b) => new Date(a.MONTH) - new Date(b.MONTH));

State.init({
  setSortConfig: { key: "", direction: "asc" },
  currentPage: 1,
  NAME_COL: props.NAME_COL || "",
  SORT_COL: props.SORT_COL || "",
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
    <a className="text-red-50 whitespace-normal break-words block max-w-xs">
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

const COLUMNS = props.COLS || [];

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
    return b[state.SORT_COL] - a[state.SORT_COL];
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
                      column.sort.sortKey === state.NAME_COL ? "max-w-xs" : ""
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
