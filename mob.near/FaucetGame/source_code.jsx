const rootContractId = "alpha.moretps.near";
const contracts = ["0", "b", "h", "m", "z"].map(
  (s) => `${s}.${rootContractId}`
);
let yourContractId = contracts[0];
const [currentTime, setCurrentTime] = useState(new Date().getTime());
const [claimTimes, setClaimTimes] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentTime(new Date().getTime());
  }, 1000);
  return () => {
    clearInterval(interval);
  };
}, []);

if (context.accountId) {
  const yourGroupId = Near.view(yourContractId, "get_account_group", {
    account_id: context.accountId,
  });
  if (yourGroupId === null) {
    return "";
  }
  yourContractId = contracts[yourGroupId];
}

const claimAmount =
  Big(Near.view(yourContractId, "get_transfer_amount") || "0")
    .div(Big(10).pow(24))
    .toFixed(2) + " NEAR";

const startBlockTimeMs = Near.view(yourContractId, "get_start_time_ms") || 0;
const timeRemaining = startBlockTimeMs - currentTime;

const canClaim = context.accountId
  ? Near.view(yourContractId, "can_claim", {
      account_id: context.accountId,
      _nonce: claimTimes,
    })
  : false;

const hasClaimed = context.accountId
  ? Near.view(yourContractId, "has_claimed", {
      account_id: context.accountId,
      _nonce: timeRemaining <= 0,
    })
  : false;

const claim = () => {
  Near.call(yourContractId, "claim", {});
  setTimeout(() => {
    setClaimTimes((t) => t + 1);
  }, 5000);
};

const remainingTimeToString = (timeRemaining) => {
  let x = (timeRemaining / 1000) | 0;
  const sec = x % 60;
  x -= sec;
  x /= 60;
  const min = x % 60;
  x -= min;
  x /= 60;
  const hours = x % 24;
  x -= hours;
  x /= 24;
  return `${x}d ${hours}h ${min}m ${sec}s`;
};

const numClaims = Near.view(yourContractId, "get_num_claims") || 0;

return (
  <div>
    <div>Contract ID: {yourContractId}</div>
    <div>Start time: {new Date(startBlockTimeMs).toLocaleString()}</div>
    <div>Current time: {new Date(currentTime).toLocaleString()}</div>
    <div>Claim amount: {claimAmount}</div>
    <div>
      Claims Progress: {numClaims} /
      {(Near.view(yourContractId, "get_number_of_possible_claims") || 0) +
        numClaims}
    </div>
    <div>
      <b>
        {timeRemaining <= 0 ? (
          "CLAIM STARTED"
        ) : (
          <span>Claim starts in: {remainingTimeToString(timeRemaining)}</span>
        )}
      </b>
    </div>
    <hr />
    <div>
      {hasClaimed ? (
        <b className="text-success">ALREADY CLAIMED</b>
      ) : (
        <span>
          Can claim: {canClaim ? <b>YES</b> : <b className="text-danger">NO</b>}
        </span>
      )}
    </div>
    <div className="mt-2">
      {context.accountId ? (
        <button
          className={`btn btn-lg ${
            canClaim ? "btn-success" : "btn-outline-warning"
          }`}
          onClick={claim}
        >
          {canClaim ? `CLAIM ${claimAmount}` : "Try claiming anyway"}
        </button>
      ) : (
        "Sign in to claim!"
      )}
    </div>
  </div>
);
