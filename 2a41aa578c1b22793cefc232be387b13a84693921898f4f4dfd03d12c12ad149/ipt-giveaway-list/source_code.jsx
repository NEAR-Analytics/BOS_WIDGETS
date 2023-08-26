const mockData = [
  {
    id: "1",
    name: "Sunil Joshi",
    startTime: "Fri Aug 18 2023 17:47:18 GMT+0700 (Indochina Time)",
    endTime: "Fri Aug 18 2023 17:48:18 GMT+0700 (Indochina Time)",
    assetType: "TOKEN",
    rewardToken: "BTC",
    rewardTokenAmount: 1000,
  },
  {
    id: "2",
    name: "Sunil Joshi",
    startTime: "Fri Aug 18 2023 17:47:18 GMT+0700 (Indochina Time)",
    endTime: "Fri Aug 18 2023 17:48:18 GMT+0700 (Indochina Time)",
    assetType: "NFT",
    nftID: "2345",
  },
  {
    id: "3",
    name: "Sunil Joshi",
    startTime: "Fri Aug 18 2023 17:47:18 GMT+0700 (Indochina Time)",
    endTime: "Fri Aug 18 2023 17:48:18 GMT+0700 (Indochina Time)",
    assetType: "TOKEN",
    rewardToken: "ETH",
    rewardTokenAmount: 100000,
  },
  {
    id: "4",
    name: "Sunil Joshi",
    startTime: "Fri Aug 18 2023 17:47:18 GMT+0700 (Indochina Time)",
    endTime: "Fri Aug 18 2023 17:48:18 GMT+0700 (Indochina Time)",
    assetType: "TOKEN",
    rewardToken: "IPT",
    rewardTokenAmount: 1000000000,
  },
  {
    id: "5",
    name: "Sunil Joshi",
    startTime: "Mon Aug 28 2023 17:47:18 GMT+0700 (Indochina Time)",
    endTime: "Mon Aug 28 2023 17:48:18 GMT+0700 (Indochina Time)",
    assetType: "NFT",
    nftID: "12345235",
  },
];

State.init({
  listData: [],
});

State.update({
  ...state,
  listData: mockData,
});

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
  id,
  name,
  startTime,
  endTime,
  assetType,
  rewardToken,
  rewardTokenAmount,
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
            <small>{assetType === "TOKEN" ? "Reward Amount" : "NFT id"}</small>
          </div>
          <div class="text-end">
            <small>
              {assetType === "TOKEN"
                ? `${rewardTokenAmount} ${rewardToken}`
                : nftID}
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
