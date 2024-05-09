const REF_CONTRACT_ID = "v2.ref-finance.near";
const CONTRACT_ID = "lock-lp.near";
const RPC_URL = "https://rpc.mainnet.near.org";
const BURN_ID = "0".repeat(64);

const poolId = parseInt(props.poolId);

const [isLocking, setLocking] = useState(false);

const [shareBalance, setShareBalance] = useState("0");
const [amount, setAmount] = useState(shareBalance ?? "0");
const [totalLockedBalance, setTotalLockedBalance] = useState("0");
const [burnedBalance, setBurnedBalance] = useState("0");
const [lockedBalance, setLockedBalance] = useState("0");
const [unlockTime, setUnlockTime] = useState(undefined);
const [poolRegistered, setPoolRegistered] = useState(undefined);
const [nearBalance, setNearBalance] = useState("0");
const [lockDurationNs, setLockDurationNs] = useState(
  1 * 365 * 24 * 60 * 60 * 1000 * 1_000_000
);
const [mftRegistered, setMftRegistered] = useState(undefined);
const [registerCost, setRegisterCost] = useState(undefined);
Near.asyncView(CONTRACT_ID, "get_register_cost", {}).then((cost) =>
  setRegisterCost(ethers.BigNumber.from(cost))
);

Near.asyncView(REF_CONTRACT_ID, "mft_balance_of", {
  token_id: ":" + poolId,
  account_id: context.accountId,
}).then((balance) => setShareBalance(balance));

function changeLockDurationDays(days) {
  if (days < 0.001) days = 0.001;
  setLockDurationNs(days * 24 * 60 * 60 * 1000 * 1_000_000);
}

asyncFetch(RPC_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id: "dontcare",
    method: "query",
    jsonrpc: "2.0",
    params: {
      request_type: "view_account",
      finality: "final",
      account_id: context.accountId,
    },
  }),
}).then((res) => {
  setNearBalance(res.body.result.amount);
});

function updateLockedBalance() {
  Near.asyncView(poolId + "." + CONTRACT_ID, "get_lockup", {
    account_id: context.accountId,
  })
    .then((res) => {
      if (res) {
        setLockedBalance(res.amount);
        setUnlockTime(parseInt(res.timestamp) + parseInt(res.duration_ns));
      }
      setPoolRegistered(true);
    })
    .catch((err) => {
      console.log(err);
      setPoolRegistered(false);
    });

  Near.asyncView(REF_CONTRACT_ID, "mft_balance_of", {
    account_id: poolId + "." + CONTRACT_ID,
    token_id: ":" + poolId,
  }).then((balance) => {
    setTotalLockedBalance(balance);
  });

  Near.asyncView(REF_CONTRACT_ID, "mft_balance_of", {
    account_id: "0".repeat(64),
    token_id: ":" + poolId,
  }).then((balance) => {
    setBurnedBalance(balance);
  });

  Near.asyncView(REF_CONTRACT_ID, "mft_has_registered", {
    token_id: ":" + poolId,
    account_id: poolId + "." + CONTRACT_ID,
  }).then((registered) => setMftRegistered(registered));
}

if (shareBalance === null) {
  Near.asyncView(REF_CONTRACT_ID, "mft_balance_of", {
    token_id: ":" + poolId,
    account_id: context.accountId,
  }).then((balance) => {
    shareBalance = balance;
    setAmount(shareBalance);
  });
}

const [poolInfo, setPoolInfo] = useState(undefined);
Near.asyncView(REF_CONTRACT_ID, "get_pool", {
  pool_id: poolId,
}).then((pool) => {
  pool.token0 = Near.view(pool.token_account_ids[0], "ft_metadata", {});
  pool.token1 = Near.view(pool.token_account_ids[1], "ft_metadata", {});
  setPoolInfo(pool);
});

updateLockedBalance();

function changeAmount(p) {
  if (p.length === 0) {
    p = "0";
  }
  while (p.startsWith("0") && p.length > 1) {
    p = p.substring(1);
  }
  if (!/^\d+$/.test(p)) setAmount(amount);
  else
    setAmount(
      ethers.BigNumber.from(p).gt(ethers.BigNumber.from(shareBalance))
        ? shareBalance
        : ethers.BigNumber.from(p).gt(ethers.BigNumber.from("0"))
        ? p
        : "0"
    );
}

function lockLp() {
  if (mftRegistered === false) {
    Near.call(
      REF_CONTRACT_ID,
      "mft_register",
      {
        token_id: ":" + poolId,
        account_id: poolId + "." + CONTRACT_ID,
      },
      "300000000000000",
      "89000000000000000000000"
    );
  } else if (unlockTime === undefined) {
    Near.call(
      poolId + "." + CONTRACT_ID,
      "register_lockup",
      {},
      "300000000000000",
      "100000000000000000000000"
    );
  } else {
    Near.call(
      REF_CONTRACT_ID,
      "mft_transfer_call",
      {
        token_id: ":" + poolId,
        receiver_id: poolId + "." + CONTRACT_ID,
        amount: amount,
        msg: Math.floor(lockDurationNs).toString(),
      },
      "300000000000000",
      "1"
    ).then((res) => {
      setAmount("0");
      updateLockedBalance();
    });
  }
}

function unlockLp() {
  Near.call(
    poolId + "." + CONTRACT_ID,
    "withdraw",
    {},
    "300000000000000",
    "1"
  ).then(() => {
    updateLockedBalance();
  });
}

function registerPair() {
  Near.call(
    CONTRACT_ID,
    "register_pool",
    {
      pool_id: poolId.toString(),
      ref_address: REF_CONTRACT_ID,
    },
    "300000000000000",
    registerCost.toString()
  ).then(() => {
    updateLockedBalance();
  });
}

const HorizontalList = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

function toHumanTimeDiff(ns) {
  let ms = ns / 1_000_000;
  let d = Math.floor(ms / 1000 / 60 / 60 / 24);
  let h = Math.floor(ms / 1000 / 60 / 60) % 24;
  let m = Math.floor(ms / 1000 / 60) % 60;

  if (d === 0) {
    return `${h}h ${m}m`;
  } else {
    return `${d}d ${h}h`;
  }
}

console.log(poolId);

if (!poolId) {
  return (
    <>
      <h1>Lock LP tokens of your shitcoin</h1>
      <ul>
        <li>
          <a href="?poolId=4663">INTEL-wNEAR</a>
        </li>
        <li>
          <a href="?poolId=4769">TOUCH-wNEAR</a>
        </li>
        <li>
          <a href="?poolId=4875">wojak-wNEAR</a>
        </li>
      </ul>
      <h2>
        Product not audited, use at your own risk. Withdrawals are disabled
        until audited.
      </h2>
    </>
  );
}

return poolInfo ? (
  <>
    Pool:{" "}
    <a href={`https://nearblocks.io/token/${poolInfo.token_account_ids[0]}`}>
      {poolInfo.token0.symbol}
    </a>
    -
    <a href={`https://nearblocks.io/token/${poolInfo.token_account_ids[1]}`}>
      {poolInfo.token1.symbol}
    </a>{" "}
    <a href={`https://app.ref.finance/pool/${poolId}`}>(#{poolId})</a>
    <br />
    Burned:{" "}
    {ethers.BigNumber.from(burnedBalance)
      .mul(ethers.BigNumber.from(100))
      .div(ethers.BigNumber.from(poolInfo.shares_total_supply))
      .toString()}
    % (
    {ethers.BigNumber.from(burnedBalance)
      .mul(ethers.BigNumber.from(poolInfo.amounts[0]))
      .div(ethers.BigNumber.from(poolInfo.shares_total_supply))
      .div(ethers.BigNumber.from(10).pow(poolInfo.token0.decimals))
      .toString()}{" "}
    {poolInfo.token0.symbol} &{" "}
    {ethers.BigNumber.from(burnedBalance)
      .mul(ethers.BigNumber.from(poolInfo.amounts[1]))
      .div(ethers.BigNumber.from(poolInfo.shares_total_supply))
      .div(ethers.BigNumber.from(10).pow(poolInfo.token1.decimals))
      .toString()}
    {poolInfo.token1.symbol}
    {isLocking && `, or ${burnedBalance} shares`})
    <br />
    Locked:{" "}
    {ethers.BigNumber.from(totalLockedBalance)
      .mul(ethers.BigNumber.from(100))
      .div(ethers.BigNumber.from(poolInfo.shares_total_supply))
      .toString()}
    % (
    {ethers.BigNumber.from(totalLockedBalance)
      .mul(ethers.BigNumber.from(poolInfo.amounts[0]))
      .div(ethers.BigNumber.from(poolInfo.shares_total_supply))
      .div(ethers.BigNumber.from(10).pow(poolInfo.token0.decimals))
      .toString()}{" "}
    {poolInfo.token0.symbol} &{" "}
    {ethers.BigNumber.from(totalLockedBalance)
      .mul(ethers.BigNumber.from(poolInfo.amounts[1]))
      .div(ethers.BigNumber.from(poolInfo.shares_total_supply))
      .div(ethers.BigNumber.from(10).pow(poolInfo.token1.decimals))
      .toString()}
    {poolInfo.token1.symbol}
    {isLocking && `, or ${totalLockedBalance} shares`})
    <br />
    <br />
    <button onClick={() => setLocking(!isLocking)}>Lock</button>
    {isLocking && (
      <>
        {poolRegistered && (
          <>
            <br />
            <br />
            <HorizontalList>
              Shares to lock:
              <input
                type="text"
                value={amount}
                onChange={(e) => changeAmount(e.target.value)}
              ></input>
              <button
                onClick={() => changeAmount(shareBalance)}
                disabled={amount === shareBalance}
              >
                Max
              </button>
            </HorizontalList>
            <br />
            <HorizontalList>
              Duration (days):
              <input
                type="number"
                value={(
                  lockDurationNs /
                  24 /
                  60 /
                  60 /
                  1000 /
                  1_000_000
                ).toFixed(3)}
                onChange={(e) => changeLockDurationDays(e.target.value)}
              ></input>
            </HorizontalList>
            <br />
            Your balance: {shareBalance} shares
            <br />
            Going to lock: {amount} shares (
            {ethers.BigNumber.from(amount)
              .mul(ethers.BigNumber.from(100))
              .div(ethers.BigNumber.from(poolInfo.shares_total_supply))
              .toString()}
            %,
            {ethers.BigNumber.from(amount)
              .mul(ethers.BigNumber.from(poolInfo.amounts[0]))
              .div(ethers.BigNumber.from(poolInfo.shares_total_supply))
              .div(ethers.BigNumber.from(10).pow(poolInfo.token0.decimals))
              .toString()}{" "}
            {poolInfo.token0.symbol} &{" "}
            {ethers.BigNumber.from(amount)
              .mul(ethers.BigNumber.from(poolInfo.amounts[1]))
              .div(ethers.BigNumber.from(poolInfo.shares_total_supply))
              .div(ethers.BigNumber.from(10).pow(poolInfo.token1.decimals))
              .toString()}{" "}
            {poolInfo.token1.symbol})
            <br />
            <button
              disabled={
                amount === "0" ||
                lockDurationNs === 0 ||
                Date.now() * 1_000_000 + lockDurationNs < unlockTime
              }
              onClick={() => lockLp()}
            >
              {mftRegistered === false
                ? "Register LP holder"
                : unlockTime === undefined
                ? "Create a lockup account"
                : "Lock LP"}
            </button>
            {Date.now() * 1_000_000 + lockDurationNs < unlockTime && (
              <>
                <br />
                You can't lock with unlock date earlier than your existing
                lockup
              </>
            )}
            {lockedBalance !== "0" && unlockTime !== undefined && (
              <>
                <br />
                <br />
                Can unlock in:{" "}
                {unlockTime > Date.now() * 1_000_000
                  ? toHumanTimeDiff(unlockTime - Date.now() * 1_000_000)
                  : "Now"}
                <br />
                <button
                  disabled={unlockTime > Date.now() * 1_000_000}
                  onClick={() => unlockLp()}
                >
                  Unlock LP
                </button>
              </>
            )}
          </>
        )}
        {poolRegistered === false && (
          <>
            <br />
            <br />
            <button
              disabled={ethers.BigNumber.from(nearBalance).lt(registerCost)}
              onClick={() => registerPair()}
            >
              Register this pair
            </button>
            <br />
            It costs{" "}
            {registerCost
              .div(ethers.BigNumber.from(10).pow(24))
              .toString()}{" "}
            NEAR
            {ethers.BigNumber.from(nearBalance).gte(registerCost)
              ? "(you have enough)"
              : `(you only have: ${ethers.BigNumber.from(nearBalance)
                  .div(ethers.BigNumber.from(10).pow(24))
                  .toString()}, this is not enough)`}
          </>
        )}
        <br />
        <br />
        <button onClick={() => updateLockedBalance()}>
          Update (click here after sending every transaction)
        </button>
      </>
    )}
    <br />
    <br />
    <h2>
      Product not audited, use at your own risk. Withdrawals are disabled until
      audited.
    </h2>
  </>
) : (
  "Loading ..."
);
