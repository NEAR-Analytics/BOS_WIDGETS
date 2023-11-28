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

// Find mutual followers
const mutualFollowers = followers.filter(([followerId]) =>
  following.some(([followingId]) => followerId === followingId)
);

// Total mutual followers count
const totalMutualFollowersCount = mutualFollowers.length;

const [responses, setResponses] = useState([]);

const [totalTxCount, setTotalTxCount] = useState(0);

// Check if mutualFollowers is an array
if (Array.isArray(mutualFollowers)) {
  const fetchPromises = mutualFollowers.map(([mutualAccountId]) =>
    asyncFetch(
      `https://magenta-syrniki-be7abd.netlify.app/.netlify/functions/api/users/search?accountid=${mutualAccountId}`,
      {
        method: "GET",
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
      // console.log("After fetchPromises:", mutualFollowers);

      // Extracting only the first element of each response body and update responses state
      const firstElements = responses.map((response) => response.body[0]);
      // console.log(firstElements);
      // Summing up all txCount values
      const totalTxCount = firstElements.reduce((sum, element) => {
        if (element && typeof element.txCount !== "undefined") {
          return sum + element.txCount;
        }
        return sum;
      }, 0);

      // Update totalTxCount state
      setTotalTxCount(totalTxCount);

      // Update responses state
      setResponses(firstElements);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
} else {
  console.error("mutualFollowers is not an array");
}

// Check if mutualFollowers is an array
if (Array.isArray(mutualFollowers)) {
  const fetchPromisesDays = mutualFollowers.map(([mutualAccountIds]) =>
    asyncFetch(
      `https://magenta-syrniki-be7abd.netlify.app/.netlify/functions/api/transactions/account/tx/days?accountid=${mutualAccountIds}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "json",
      }
    )
  );

  // Using Promise.all to wait for all requests to complete
  Promise.all(fetchPromisesDays)
    .then((responsesDays) => {
      responsesDays.forEach((response, index) => {
        if (
          response &&
          response.ok &&
          response.body &&
          response.body.success &&
          typeof response.body.totalCount === "number"
        ) {
          const mutualAccountIds = mutualFollowers[index][0];
          console.log(`Total Count: ${response.body.totalCount}`);
        } else {
          // Log a warning if the response does not have valid totalCount in the body
          console.warn(
            `Response ${index + 1} does not have valid totalCount in the body`,
            response
          );
        }
      });
    })
    .catch((error) => {
      // console.error("Error fetching data:", error);
    });
} else {
  console.error("mutualFollowers is not an array");
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
      // console.error("Error fetching data:", error);
    });
} else {
  // console.error("mutualFollowers is not aan array");
}

//CSSS

return (
  <>
    <div className="mb-3">Total Followers: {totalFollowersCount}</div>
    <div className="mb-3">Total Following: {totalFollowingCount}</div>
    <div className="mb-3">Total Wallet: {totalMutualFollowersCount}</div>
    <div className="mb-3">Total Transaction: {totalTxCount}</div>
    <div className="mb-3">Total Development: {totalWidgetCount}</div>

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
  </>
);
