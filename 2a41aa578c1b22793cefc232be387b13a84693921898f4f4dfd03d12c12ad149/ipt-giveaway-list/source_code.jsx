const { contractAddress, walletAddress, gqlUrl, userStatus } = props;

if (!contractAddress || !walletAddress || !gqlUrl) {
  return "Please return to dashboard to connect to BOS";
}

if (!userStatus || !Ethers.provider()) {
  return "Something went wrong!! Try refresh the page";
}

State.init({
  listData: [],
  fetchingData: true,
  currentBlock: undefined,
});

Ethers.provider()
  .getBlock("latest")
  .then((block) => {
    State.update({
      currentBlock: block.number,
    });
  });

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

const fetchData = fetch(gqlUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `{
        giveAwayCreateds(orderBy: index_DESC) {
          id
          name
          assetType
          token
          index
          start
          end
          maxJoin
          kyc
          giveAwayWinner {
            who
            requestId
            result
          }
          giveAwayParticipateds {
            who
          }
        }
      }`,
  }),
});

if (!!fetchData) {
  console.log("data", fetchData.body.data);
  State.update({
    listData: fetchData.body.data.giveAwayCreateds,
  });
}

if (!!state.currentBlock && state.listData.length) {
  State.update({
    fetchingData: false,
  });
}

const isAllowedToJoinGA = (kycTier) => {
  if (Number(userStatus) === 2) {
    return true;
  }

  return kycTier === "Tier0";
};

const isAfter = (currentBlock, blockToCompare) => {
  return currentBlock > blockToCompare;
};

const isBefore = (currentBlock, blockToCompare) => {
  return currentBlock < blockToCompare;
};

const isEnded = (endBlock) => {
  return isAfter(state.currentBlock, endBlock);
};

const isHappening = (startBlock, endBlock) => {
  return (
    isAfter(state.currentBlock, startBlock) &&
    isBefore(state.currentBlock, endBlock)
  );
};

const isNotRunning = (startBlock) => {
  return isBefore(state.currentBlock, startBlock);
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

  giveaway.participate(gaIndex).then((transactionHash) => {
    console.log("transactionHash is " + transactionHash);
  });
};

const renderBadge = (startBlock, endBlock) => {
  let badgeLabel = "";
  let badgeColor = "";

  if (isHappening(startBlock, endBlock)) {
    badgeLabel = "GA is running";
    badgeColor = "text-bg-success";
  } else if (isNotRunning(startBlock)) {
    badgeLabel = "GA not started";
    badgeColor = "text-bg-primary";
  } else if (isEnded(endBlock)) {
    badgeLabel = "GA has ended";
    badgeColor = "text-bg-secondary";
  }

  return (
    <span class={`badge rounded-pill mt-3 ${badgeColor}`}>{badgeLabel}</span>
  );
};

const renderTooltipText = () => {
  if (Number(userStatus) === 1) {
    return "Pending account cannot join GA with KYC level 1";
  }

  if (Number(userStatus) === 3) {
    return "Rejected account cannot join GA with KYC level 1";
  }

  if (Number(userStatus) === 2) {
    return "Verified account can join any GA";
  }
};

const renderIconWithTooltip = (children) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>{renderTooltipText()}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  );
};

const renderListItem = ({
  index,
  name,
  start,
  end,
  assetType,
  token,
  nftID,
  maxJoin,
  giveAwayWinner,
  giveAwayParticipateds,
  kyc,
}) => {
  const { who, requestId, result } = giveAwayWinner || {};

  const joinedNumber = giveAwayParticipateds.length;

  return (
    <div class="card h-100">
      <div class="card-header">
        <div class="d-flex justify-content-between">
          <h5 class="card-title mt-2 mb-3">{name}</h5>

          {isAllowedToJoinGA(kyc)
            ? renderIconWithTooltip(
                <i class="bi bi-person-fill-check fs-3 text-success" />
              )
            : renderIconWithTooltip(
                <i class="bi bi-person-fill-slash fs-3 text-warning" />
              )}
        </div>
        <h6 class="card-subtitle">
          <small>Reward type: {assetType}</small>
        </h6>
        {renderBadge(start, end)}
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
              {assetType === "FungibleToken"
                ? `${parseToken(token)} IPT`
                : nftID}
            </small>
          </div>
        </div>

        {!!who && (
          <>
            <hr class="my-2" />
            <div class="d-flex flex-column flex-md-row gap-3 w-100 justify-content-between align-items-center card-text">
              <div class="fw-semibold">
                <small>Winner</small>
              </div>
              <div class="text-end text-break">
                <small>{who}</small>
              </div>
            </div>
          </>
        )}

        {!!requestId && (
          <>
            <hr class="my-2" />
            <div class="d-flex flex-column flex-md-row gap-3 w-100 justify-content-between align-items-center card-text">
              <div class="fw-semibold">
                <small>Request ID</small>
              </div>
              <div class="text-end text-break">
                <small>{requestId}</small>
              </div>
            </div>
          </>
        )}

        {!!result && (
          <>
            <hr class="my-2" />
            <div class="d-flex flex-column flex-md-row gap-3 w-100 justify-content-between align-items-center card-text">
              <div class="fw-semibold">
                <small>Result</small>
              </div>
              <div class="text-end text-break">
                <small>{result}</small>
              </div>
            </div>
          </>
        )}

        {!!maxJoin && (
          <>
            <hr class="my-2" />
            <div class="d-flex flex-column flex-md-row w-100 gap-3 justify-content-between align-items-center card-text">
              <div class="fw-semibold">
                <small>Max participants</small>
              </div>
              <div class="text-end">{maxJoin}</div>
            </div>
          </>
        )}

        <hr class="my-2" />
        <div class="d-flex flex-column flex-md-row w-100 gap-3 justify-content-between align-items-center card-text">
          <div class="fw-semibold">
            <small>Total participated account</small>
          </div>
          <div class="text-end">{joinedNumber}</div>
        </div>

        <hr class="my-2" />
        <div class="d-flex flex-column flex-md-row w-100 gap-3 justify-content-between align-items-center card-text">
          <div class="fw-semibold">
            <small>KYC level</small>
          </div>
          <div class="text-end">{kyc.replace("Tier", "Level ")}</div>
        </div>
      </div>
      <div class="card-footer text-center">
        <button
          class={`btn btn-${isEnded(end) ? "secondary" : "success"} w-100`}
          disabled={
            !isAllowedToJoinGA(kyc)
              ? true
              : state.fetchingData || !isHappening(start, end)
          }
          onClick={() => participate(index)}
        >
          {isEnded(end)
            ? "Ended"
            : !isAllowedToJoinGA(kyc)
            ? "Not allowed"
            : "Join Giveaway"}
        </button>
      </div>
    </div>
  );
};

return (
  <div class="container">
    <div class="row">
      {state.fetchingData && (
        <div class="col-12">
          <div class="d-flex justify-content-center align-items-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}
      {!state.fetchingData &&
        state.listData.map((item) => (
          <div key={item.id} class="col-xs-12 col-sm-6 col-md-4 mb-4">
            {renderListItem(item)}
          </div>
        ))}
    </div>
  </div>
);
