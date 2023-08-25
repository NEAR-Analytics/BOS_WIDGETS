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

State.init({ setSortConfig: { key: "RECEIVER_ID", direction: "asc" } });

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
      className="text-red-50 text-wrap "
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
      <p className="text-center text-white text-sm font-semibold p-2 text-wrap">
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

// Function to get the sorted nodes
function getSortedNodes() {
  // Get the current sort configuration from the state
  const sortConfig = state.setSortConfig;

  //   console.log(sortConfig.key);

  // Apply sorting if there's a sort key and direction
  if (sortConfig && sortConfig.key && sortConfig.direction) {
    const sortedNodes = [...(nodes || [])];
    sortedNodes.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    console.log(sortedNodes);

    return sortedNodes;
  }

  //   //
  //   if (!sortedNodes || sortedNodes.length === 0) {
  //     return [];
  //   }
  //   console.log("state:", state); // Check if state is defined and has the expected structure
  //   console.log("nodes:", nodes); // Check if nodes is defined and has the expected structure
  //   console.log("sortedNodes:", sortedNodes); // Check if state is defined and has the expected structure

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
            {nodes.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
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
      </div>
    ) : (
      <div className="text-white text-center p-4">Loading ...</div>
    )}
  </div>
);
