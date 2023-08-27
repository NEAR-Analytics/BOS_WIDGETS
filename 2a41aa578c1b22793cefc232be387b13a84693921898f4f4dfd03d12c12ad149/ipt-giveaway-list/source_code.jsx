const { contractAddress, walletAddress, apiUrl } = props;

if (!contractAddress || !walletAddress || !apiUrl) {
  return "Please return to dashboard to connect to BOS";
}

if (!Ethers.provider()) {
  return "Something went wrong!! Try refresh the page";
}

const giveAwayAbi = [
  {
    inputs: [
      {
        internalType: "uint32",
        name: "index",
        type: "uint32",
      },
    ],
    name: "claimReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint32",
        name: "startBlock",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "endBlock",
        type: "uint32",
      },
      {
        internalType: "uint8",
        name: "kycStatus",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "randomType",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "assetType",
        type: "uint8",
      },
      {
        internalType: "uint32",
        name: "assetId",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "maxJoin",
        type: "uint32",
      },
    ],
    name: "createGiveaway",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "index",
        type: "uint32",
      },
    ],
    name: "participate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

State.init({
  listData: [],
});

const fetchData = fetch(apiUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `{
        giveAwayCreateds(orderBy: index_DESC) {
          id
          timestamp
          name
          assetType
          token
          index
        }
      }`,
  }),
});

if (fetchData) {
  console.log("response", fetchData.body);
  State.update({
    listData: fetchData.body.data.giveAwayCreateds,
  });
}

const isAfter = (date, dateToCompare) => {
  const date1 = date.getTime();
  const date2 = dateToCompare.getTime();

  return date2 < date1;
};

const isBefore = (date, dateToCompare) => {
  const date1 = date.getTime();
  const date2 = dateToCompare.getTime();

  return date2 > date1;
};

const isEnded = (endTime) => {
  return isAfter(new Date(), new Date(endTime));
};

const isHappening = (startTime, endTime) => {
  return (
    isAfter(new Date(), new Date(startTime)) &&
    isBefore(new Date(), new Date(endTime))
  );
};

const isNotRunning = (startTime) => {
  return isBefore(new Date(), new Date(startTime));
};

const parseToken = (tokenStr) => {
  const token = JSON.parse(tokenStr);

  return ethers.utils.formatEther(token.amount);
};

const participate = (gaIndex) => {
  const giveaway = new ethers.Contract(
    contractAddress,
    giveAwayAbi,
    Ethers.provider().getSigner(walletAddress)
  );

  console.log("GA Contract", giveaway);

  giveaway.participate(gaIndex).then((transactionHash) => {
    console.log("transactionHash is " + transactionHash);
  });
};

const renderBadge = (startTime, endTime) => {
  let badgeLabel = "";
  let badgeColor = "";

  if (isHappening(startTime, endTime)) {
    badgeLabel = "GA is running";
    badgeColor = "text-bg-success";
  } else if (isNotRunning(startTime)) {
    badgeLabel = "GA not started";
    badgeColor = "text-bg-primary";
  } else if (isEnded(endTime)) {
    badgeLabel = "GA has ended";
    badgeColor = "text-bg-secondary";
  }

  return (
    <span class={`badge rounded-pill mt-3 ${badgeColor}`}>{badgeLabel}</span>
  );
};

const renderListItem = ({
  index,
  name,
  startTime,
  endTime,
  assetType,
  token,
  nftID,
}) => {
  return (
    <div class="card h-100">
      <div class="card-header">
        <h5 class="card-title mt-2 mb-3">{name}</h5>
        <h6 class="card-subtitle">
          <small>Reward type: {assetType}</small>
        </h6>
        {renderBadge(startTime, endTime)}
      </div>
      <div class="card-body">
        <div class="d-flex flex-column flex-md-row w-100 justify-content-between align-items-center">
          <div class="fw-semibold">
            <small>
              {assetType === "FungibleToken" ? "Reward Amount" : "NFT id"}
            </small>
          </div>
          <div class="text-end">
            <small>
              {assetType === "FungibleToken" ? parseToken(token) : nftID}
            </small>
          </div>
        </div>
        <hr class="my-2" />
        <div class="d-flex flex-column flex-md-row w-100 justify-content-between align-items-center card-text">
          <div class="fw-semibold">
            <small>Start time</small>
          </div>
          <div class="text-end">
            <small>
              {new Date(startTime).toLocaleDateString()}
              <br />
              {new Date(startTime).toLocaleTimeString()}
            </small>
          </div>
        </div>
        <hr class="my-2" />
        <div class="d-flex flex-column flex-md-row w-100 justify-content-between align-items-center card-text">
          <div class="fw-semibold">
            <small>End time</small>
          </div>
          <div class="text-end">
            <small>
              {new Date(endTime).toLocaleDateString()}
              <br />
              {new Date(endTime).toLocaleTimeString()}
            </small>
          </div>
        </div>
      </div>
      <div class="card-footer text-center">
        <button
          class={`btn btn-${isEnded(endTime) ? "secondary" : "success"} w-100`}
          disabled={isEnded(endTime)}
          onClick={() => participate(index)}
        >
          {isEnded(endTime) ? "Ended" : "Join Giveaway"}
        </button>
      </div>
    </div>
  );
};

return (
  <div class="container">
    <div class="row">
      {state.listData.map((item) => (
        <div key={item.id} class="col-xs-12 col-sm-6 col-md-4 mb-4">
          {renderListItem(item)}
        </div>
      ))}
    </div>
  </div>
);
