const accountId = "indonesiaguild.near";

if (!accountId) {
  return "";
}

// Retrieve followers
let followers = Social.keys(`*/graph/follow/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (followers === null) {
  return "Loading";
}

followers = Object.entries(followers || {});
followers.sort(
  (a, b) => b.graph.follow[accountId][1] - a.graph.follow[accountId][1]
);

// Total followers count
const totalFollowersCount = followers.length;

// Retrieve following
let following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (following === null) {
  return "Loading";
}

following = Object.entries(following[accountId].graph.follow || {});
following.sort((a, b) => b[1] - a[1]);

// Total following count
const totalFollowingCount = following.length;

const [mutualFollowers, setMutualFollowers] = useState([]);

const updateMutualFollowers = () => {
  const filteredFollowers = followers.filter(([followerId]) =>
    following.some(([followingId]) => followerId === followingId)
  );
  // Set the state with the filtered followers, avoiding duplicates
  setMutualFollowers((prevMutualFollowers) => {
    const uniqueFollowers = new Set([
      ...prevMutualFollowers.map(([prevFollowerId]) => prevFollowerId),
      ...filteredFollowers.map(([followerId]) => followerId),
    ]);
    return [...uniqueFollowers].map((followerId) =>
      filteredFollowers.find(([id]) => id === followerId)
    );
  });
};

useEffect(() => {
  updateMutualFollowers();
}, []);

// Total mutual followers count
const totalMutualFollowersCount = mutualFollowers.length;

const [responses, setResponses] = useState([]);

const [totalTxCount, setTotalTxCount] = useState(0);
const [totalBoughtNFT, setTotalBoughtNFT] = useState(0);
const [totalBoughtSold, setTotalBoughtSold] = useState(0);

const processData = (data) => {
  const accounts = Object.entries(data);

  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      return Object.entries(account[1].widget).map((kv) => ({
        accountId,
        widgetName: kv[0],
        blockHeight: kv[1],
      }));
    })
    .flat();

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  return allItems;
};

///widget data
const [walletDataWidget, setWalletDataWidget] = useState({});

const fetchPromisesAccount = [];

for (const [mutualAccountId] of mutualFollowers) {
  fetchPromisesAccount.push(mutualAccountId);
}

Promise.all(fetchPromisesAccount)
  .then((responses) => {})
  .then((data) => {
    // Handle the aggregated data if needed
  })
  .catch((error) => {
    // Handle errors
  });

// Check if mutualFollowers is an array
if (Array.isArray(mutualFollowers)) {
  const fetchPromises = fetchPromisesAccount.map((mutualAccountId) =>
    // const fetchPromises = mutualFollowers.map(([mutualAccountId]) =>
    asyncFetch(
      `https://magenta-syrniki-be7abd.netlify.app/.netlify/functions/api/users/search?accountid=${mutualAccountId}`,
      {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "json",
      }
    )
  );

  // Using Promise.all to wait for all requests to complete
  Promise.all(fetchPromises)
    .then((responses) => {
      //  console.log("After fetchPromises: test", mutualFollowers);

      const firstElements = responses.map((response) => {
        const element = response.body[0];

        // TOTAL DEVELOPMENT
        let keys = `${element.accountid ?? "*"}/widget/*`;

        if (tag) {
          const taggedWidgets = Social.keys(
            `${element.accountid ?? "*"}/widget/*/metadata/tags/${tag}`,
            "final"
          );

          if (taggedWidgets === null) {
            // return { status: 'load' };
          }

          keys = Object.entries(taggedWidgets)
            .map((kv) =>
              Object.keys(kv[1].widget).map((w) => `${kv[0]}/widget/${w}`)
            )
            .flat();

          if (!keys.length) {
            // return { status: 'no widget found' };
          }
        }

        const data = Social.keys(keys, "final", {
          return_type: "BlockHeight",
        });

        if (data === null) {
          return null;
        }

        // Process data
        const processedData = processData(data);
        const totalWidgetCount = processedData.length;

        const walletName = element.accountid;
        const totalCommit = 0;
        const last24HoursCommit = 0;
        const last7DaysCommit = 0;
        const last30DaysCommit = 0;

        // Loop melalui setiap item dalam processedData
        processedData.forEach((item) => {
          const path = `${element.accountid}/widget/${item.widgetName}`;

          if (typeof path !== "string") {
            return;
          }

          const historyBlocksRequest = Social.keys(path, "final", {
            return_type: "History",
          });

          if (historyBlocksRequest === null) {
            return;
          }

          const [widgetAccountId, _, widgetName] = path.split("/");

          let blocksChanges =
            historyBlocksRequest[widgetAccountId]?.["widget"]?.[widgetName];

          if (props.count) props.count(blocksChanges.length);

          if (blocksChanges) {
            blocksChanges = blocksChanges?.sort((a, b) => b - a);
          }

          // Filter blocksChanges for the last 24 hours
          const last24HoursBlocks = blocksChanges.filter((blockHeight) => {
            const blockDate = new Date(
              Near.block(blockHeight).header.timestamp_nanosec / 1e6
            );
            const currentDate = new Date();
            return currentDate - blockDate <= 24 * 60 * 60 * 1000;
          });

          // Filter blocksChanges for the last 7 days
          const last7DaysBlocks = blocksChanges.filter((blockHeight) => {
            const blockDate = new Date(
              Near.block(blockHeight).header.timestamp_nanosec / 1e6
            );
            const currentDate = new Date();
            return currentDate - blockDate <= 7 * 24 * 60 * 60 * 1000;
          });

          // Filter blocksChanges for the last 30 days
          const last30DaysBlocks = blocksChanges.filter((blockHeight) => {
            const blockDate = new Date(
              Near.block(blockHeight).header.timestamp_nanosec / 1e6
            );
            const currentDate = new Date();
            return currentDate - blockDate <= 30 * 24 * 60 * 60 * 1000;
          });

          // Akumulasi commit untuk setiap wallet
          totalCommit += blocksChanges.length;
          last24HoursCommit += last24HoursBlocks.length;
          last7DaysCommit += last7DaysBlocks.length;
          last30DaysCommit += last30DaysBlocks.length;
        });

        // Update walletData state
        setWalletDataWidget((prevWalletData) => {
          const updatedWalletData = { ...prevWalletData };

          if (!updatedWalletData[walletName]) {
            updatedWalletData[walletName] = {
              totalCommit: 0,
              last24HoursCommit: 0,
              last7DaysCommit: 0,
              last30DaysCommit: 0,
            };
          }

          updatedWalletData[walletName].totalCommit = totalCommit;
          updatedWalletData[walletName].last24HoursCommit = last24HoursCommit;
          updatedWalletData[walletName].last7DaysCommit = last7DaysCommit;
          updatedWalletData[walletName].last30DaysCommit = last30DaysCommit;

          return updatedWalletData;
        });

        // Add totalWidgetCount to the element
        return {
          ...element,
          totalWidgetCount: totalWidgetCount,
        };
      });

      const totalTxCount = firstElements.reduce((sum, element) => {
        if (element && typeof element.txCount !== "undefined") {
          return sum + element.txCount;
        }
        return sum;
      }, 0);

      const totalBoughtNFT = firstElements.reduce((sum, element) => {
        if (element && typeof element.bought_nft !== "undefined") {
          return sum + element.bought_nft;
        }
        return sum;
      }, 0);

      const totalBoughtSold = firstElements.reduce((sum, element) => {
        if (element && typeof element.sold_nft !== "undefined") {
          return sum + element.sold_nft;
        }
        return sum;
      }, 0);

      // Update totalTxCount state
      setTotalTxCount(totalTxCount);

      // Update totalBoughtNFT state
      setTotalBoughtNFT(totalBoughtNFT);

      // Update totalBoughtSold state
      setTotalBoughtSold(totalBoughtSold);

      // Update responses state
      setResponses(firstElements);
    })
    .catch((error) => {
      // console.error("Error fetching data:", error);
    });
} else {
  // console.error("mutualFollowers is not an array");
}

const [displayCount, setDisplayCount] = useState(5);

const displayedFollowers = responses.slice(0, displayCount);

const handleShowMore = () => {
  setDisplayCount(displayCount + 5);
};

// useEffect(() => {
// //   console.log("Updated Responses:", responses); a
// }, [responses]);

/////////// WIDGET  COUNT
const [totalWidgetCount, setTotalWidgetCount] = useState(0);

if (Array.isArray(mutualFollowers)) {
  const fetchPromises2 = mutualFollowers.map(([mutualAccountIdWidget]) => {
    let keys = `${mutualAccountIdWidget ?? "*"}/widget/*`;

    if (tag) {
      const taggedWidgets = Social.keys(
        `${mutualAccountIdWidget ?? "*"}/widget/*/metadata/tags/${tag}`,
        "final"
      );

      if (taggedWidgets === null) {
        return Promise.resolve({ status: "load" });
      }

      keys = Object.entries(taggedWidgets)
        .map((kv) =>
          Object.keys(kv[1].widget).map((w) => `${kv[0]}/widget/${w}`)
        )
        .flat();

      if (!keys.length) {
        return Promise.resolve({ status: "no widget found" });
      }
    }

    const data = Social.keys(keys, "final", {
      return_type: "BlockHeight",
    });

    if (data === null) {
      return Promise.resolve(null);
    }

    // Process data
    const processedData = processData(data);
    const totalWidgetCount = processedData.length;
    // console.log(`Total Widget Count for ${mutualAccountId}:`, totalWidgetCount);

    return Promise.resolve({ status: "success", count: totalWidgetCount });
  });

  // Using Promise.all to wait for all requests to complete
  Promise.all(fetchPromises2)
    .then((results) => {
      const validWidgetCounts = results
        .filter((result) => result.status === "success")
        .map((result) => result.count);

      const totalWidgetCount = validWidgetCounts.reduce(
        (acc, count) => acc + count,
        0
      );
      setTotalWidgetCount(totalWidgetCount);
      // console.log("Total Widget Counts:", totalWidgetCount);
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  // console.error("mutualFollowers is not an array");
}

const code = `
  <html>
    <head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css">
  <!-- Data Table CSS -->
  <link rel='stylesheet' href='https://cdn.datatables.net/1.13.5/css/dataTables.bootstrap5.min.css'>
  <!-- Font Awesome CSS -->
  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css'>
    
    </head>
    <body>
  
        <!-- jQuery -->
  <script src='https://code.jquery.com/jquery-3.7.0.js'></script>
  <!-- Data Table JS -->
  <script src='https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js'></script>
  <script src='https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.min.js'></script>
  <script src='https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap5.min.js'></script>
  
  <script>
    async function fetchData(url) {
      let response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      });
      return await response.json();
    }
  
  
    async function displayData(apiUrl, tableId, title) {
      let data = await fetchData(apiUrl);
  
      // Add an h1 element above the table
      let h1Element = document.createElement('h1');
      h1Element.innerHTML = 'Table: ' + title;
      document.body.appendChild(h1Element);
  
      // Create a container div for the table
      let tableContainer = document.createElement('div');
      tableContainer.id = tableId + '-container';
      document.body.appendChild(tableContainer);
  
      // Generate HTML table
      let tableHtml = "<table class='table table-striped table-bordered' id='" + tableId + "'><thead><tr>";
      Object.keys(data[0]).forEach(key => {
        tableHtml += "<th>" + key + "</th>";
      });
      tableHtml += "</tr></thead><tbody>";
      data.forEach(row => {
        tableHtml += "<tr>";
        Object.values(row).forEach(value => {
          tableHtml += "<td>" + value + "</td>";
        });
        tableHtml += "</tr>";
      });
      tableHtml += "</tbody><tfoot><tr>";
      Object.keys(data[0]).forEach(key => {
        tableHtml += "<th>" + key + "</th>";
      });
      tableHtml += "</tr></tfoot></table>";
  
      // Append table to the container
      tableContainer.innerHTML = tableHtml;
  
      // Initialize DataTables with pagination
      $(document).ready(function () {
        $('#' + tableId).DataTable({
          // disable sorting on last column
          "columnDefs": [
            { "orderable": false, "targets": Object.keys(data[0]).length - 1 }
          ],
          language: {
            // customize pagination prev and next buttons: use arrows instead of words
            'paginate': {
              'previous': '<span class="fa fa-chevron-left"></span>',
              'next': '<span class="fa fa-chevron-right"></span>'
            },
            // customize number of elements to be displayed
            "lengthMenu": 'Display <select class="form-control input-sm">' +
              '<option value="10">10</option>' +
              '<option value="20">20</option>' +
              '<option value="30">30</option>' +
              '<option value="40">40</option>' +
              '<option value="50">50</option>' +
              '<option value="-1">All</option>' +
              '</select> results'
          }
        });
      });
    }
  
    displayData("https://api.flipsidecrypto.com/api/v2/queries/84e3bf99-a78b-4a0e-97af-e9af193ce868/data/latest", "tabel", "Daily Commit Stats");
    displayData("https://api.flipsidecrypto.com/api/v2/queries/9af0e6b4-e764-460b-a0af-a36a920c76df/data/latest", "tabel2","Daily Dev Stats");
    displayData("https://api.flipsidecrypto.com/api/v2/queries/557a8f29-833f-45ae-bcae-89f251698b8f/data/latest", "tabel3","Monthly Commit Stats");
    displayData("https://api.flipsidecrypto.com/api/v2/queries/551b5ea9-a7ab-4d55-abbc-7cacf806387e/data/latest", "tabel4","Monthly Dev Stats");
    displayData("https://api.flipsidecrypto.com/api/v2/queries/4af27116-754d-4f99-a9ea-cea237969bad/data/latest", "tabel5","Activity Transactions Global");
    displayData("https://api.flipsidecrypto.com/api/v2/queries/210578f5-8691-443c-80bf-3513b016cf47/data/latest", "tabel6","Activity Transactions Near Social");
    displayData("https://api.flipsidecrypto.com/api/v2/queries/ab7beb14-e49a-41fc-bcae-5f9e7ecce91f/data/latest", "tabel7","Github Account");
  
  </script>
  
      
    </body>
  </html>
  `;

return (
  <>
    <div className="mb-3">Total Followers: {totalFollowersCount}</div>
    <div className="mb-3">Total Following: {totalFollowingCount}</div>
    <div className="mb-3">Total Wallet: {totalMutualFollowersCount}</div>
    <div className="mb-3">Total Transaction: {totalTxCount}</div>
    <div className="mb-3">Total Development: {totalWidgetCount}</div>
    <div className="mb-3">Total Bought NFT: {totalBoughtNFT}</div>
    <div className="mb-3">Total Sold NFT: {totalBoughtSold}</div>

    {displayedFollowers.map((response, i) => (
      <div key={i} className="d-flex justify-content-between mb-3">
        <div className="me-4">{response && response.accountid}</div>
        <div>
          {/* Display txCount here */}
          {response && typeof response.txCount !== "undefined" && (
            <div>Transaction: {response.txCount}</div>
          )}
          {response && typeof response.transaction_1_days !== "undefined" && (
            <div>Transaction 1 Days: {response.transaction_1_days}</div>
          )}
          {response && typeof response.transaction_7_days !== "undefined" && (
            <div>Transaction 7 Days: {response.transaction_7_days}</div>
          )}
          {response && typeof response.transaction_30_days !== "undefined" && (
            <div>Transaction 1 Month: {response.transaction_30_days}</div>
          )}
          {response && typeof response.bought_nft !== "undefined" && (
            <div>Bought: {response.bought_nft}</div>
          )}
          {response && typeof response.sold_nft !== "undefined" && (
            <div>Sold: {response.sold_nft}</div>
          )}
          {response && typeof response.holdings_count_nft !== "undefined" && (
            <div>Total NFT: {response.holdings_count_nft}</div>
          )}
          {response && typeof response.totalWidgetCount !== "undefined" && (
            <div>Total Development: {response.totalWidgetCount}</div>
          )}
        </div>
      </div>
    ))}

    {mutualFollowers.length > displayCount && (
      <button
        className="list-group-item active"
        type="button"
        onClick={handleShowMore}
      >
        Show more ({mutualFollowers.length - displayCount} more)
      </button>
    )}

    <div>
      <h2>Analytic Development</h2>
      <table>
        <thead>
          <tr>
            <th>Wallet Name</th>
            <th>Total Commit</th>
            <th>Last 24 Hours Commit</th>
            <th>Last 7 Days Commit</th>
            <th>Last 30 Days Commit</th>
          </tr>
        </thead>
        <tbody>
          {/* Tampilkan data wallet */}
          {Object.entries(walletDataWidget).map(([walletName, commitData]) => (
            <tr key={walletName}>
              <td>{walletName}</td>
              <td>{commitData.totalCommit}</td>
              <td>{commitData.last24HoursCommit}</td>
              <td>{commitData.last7DaysCommit}</td>
              <td>{commitData.last30DaysCommit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div>
      <iframe
        srcDoc={code}
        title="Embedded Script"
        style={{ width: "100%", height: "600px" }}
      />
    </div>
  </>
);
