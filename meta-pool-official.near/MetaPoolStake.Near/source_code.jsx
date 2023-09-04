const accountId = context.accountId;
const authorId = "meta-pool-official.near";
const isSignedIn = !!accountId;
const tokenDecimals = 24;
const BIG_ROUND_DOWN = 0;
const MIN_BALANCE_CHANGE = 0.5;
const contractId = "meta-pool.near";
const GAS = "200000000000000";
const ONE_NEAR = new BN("1" + "0".repeat(24));

State.init({
  openModal: false,
  validation: "",
  nearUsdPrice: null,
  nearUsdPriceIsFetched: false,
  metrics: null,
  metricsIsFetched: false,
  nearBalance: null,
  nearBalanceIsFetched: false,
  stNearBalance: null,
  stNearBalanceIsFetched: false,
  dataIntervalStarted: false,
  action: props.action || "stake",
});

function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

const fetchMetrics = () => {
  asyncFetch("https://validators.narwallets.com/metrics_json").then((resp) => {
    if (resp) {
      console.log("@metrics", resp?.body);
      State.update({ metrics: resp?.body ?? "...", metricsIsFetched: true });
    }
  });
};

const fetchNearPrice = () => {
  asyncFetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd"
  ).then((resp) => {
    const nearUsdPrice = resp?.body?.near.usd;
    if (nearUsdPrice && !isNaN(nearUsdPrice)) {
      console.log("@nearPrice", nearUsdPrice);
      State.update({
        nearUsdPrice: Number(nearUsdPrice),
        nearUsdPriceIsFetched: true,
      });
    }
  });
};

function getStNearBalance(subscribe) {
  Near.asyncView(
    contractId,
    "ft_balance_of",
    {
      account_id: accountId,
    },
    undefined,
    subscribe
  ).then((stNearBalanceRaw) => {
    if (!stNearBalanceRaw) return "-";
    const balance = Big(stNearBalanceRaw).div(Big(10).pow(tokenDecimals));
    console.log("@stNEAR balance", balance.lt(0) ? "0" : balance.toFixed());
    State.update({
      stNearBalance: balance.lt(0) ? "0" : balance.toFixed(),
      stNearBalanceIsFetched: true,
    });
  });
}

function getNearBalance(onInvalidate) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      },
    }),
  };
  asyncFetch("https://rpc.mainnet.near.org", options).then((res) => {
    console.log("@rpc view account", res);
    const { amount, storage_usage } = res?.body?.result;
    const COMMON_MIN_BALANCE = 0.05;

    let newBalance = "-";
    if (amount) {
      const availableBalance = Big(amount || 0).minus(
        Big(storage_usage).mul(Big(10).pow(19))
      );
      const balance = availableBalance
        .div(Big(10).pow(tokenDecimals))
        .minus(COMMON_MIN_BALANCE);
      newBalance = balance.lt(0) ? "0" : balance.toFixed(5, BIG_ROUND_DOWN);
    }
    console.log("@near balance", newBalance);
    State.update({
      nearBalance: newBalance,
      nearBalanceIsFetched: true,
    });
    if (onInvalidate) {
      onInvalidate(nearBalance, newBalance);
    }
  });
}
const update = (state) => State.update(state);

const handleInputNear = (value) => {
  if (
    (parseFloat(value) < 1 && parseFloat(value) > 0) ||
    parseFloat(value) < 0
  ) {
    State.update({
      validation: "The minimum amount is 1 NEAR.",
    });
  } else if (parseFloat(value) > parseFloat(state.nearBalance)) {
    State.update({
      validation: "You don't have enough NEAR.",
    });
  } else {
    State.update({
      validation: "",
    });
  }
  State.update({ value });
};

const handleInputStNear = (value) => {
  if (
    (parseFloat(value) < 1 && parseFloat(value) > 0) ||
    parseFloat(value) < 0
  ) {
    State.update({
      validation: "The minimum amount is 1 stNEAR.",
    });
  } else if (parseFloat(value) > parseFloat(state.stNearBalance)) {
    State.update({
      validation: "You don't have enough stNEAR.",
    });
  } else {
    State.update({
      validation: "",
    });
  }
  State.update({ value });
};

const getUserAddress = () => {
  if (!accountId) return "";
  return accountId.length > 20
    ? accountId.substring(0, 8) +
        "..." +
        accountId.substring(accountId.length - 6, accountId.length)
    : accountId;
};

const onClickMaxNear = () => {
  const value =
    state.nearBalance > 0.1
      ? (parseFloat(state.nearBalance) - 0.1).toFixed(2)
      : "0";
  handleInputNear(value);
};

const onClickMaxstNear = () => {
  const value =
    state.stNearBalance > 0.1
      ? (parseFloat(state.stNearBalance) - 0.1).toFixed(2)
      : "0";
  handleInputStNear(value);
};

// UPDATE DATA

const updateData = () => {
  fetchNearPrice();
  fetchMetrics();
  getNearBalance();
  getStNearBalance();
};

if (!state.dataIntervalStarted) {
  State.update({ dataIntervalStarted: true });

  setInterval(() => {
    updateData();
  }, 20000);
}

const render = {
  stake: (
    <Widget
      src={`${authorId}/widget/MetaPoolStake.Near.Stake`}
      props={{
        update,
        state,
        isSignedIn,
        handleInputNear,
        onClickMaxNear,
      }}
    />
  ),
  fast: (
    <Widget
      src={`${authorId}/widget/MetaPoolStake.Near.FastUnstake`}
      props={{
        update,
        state,
        isSignedIn,
        handleInputStNear,
        onClickMaxstNear,
      }}
    />
  ),
  delayed: (
    <Widget
      src={`${authorId}/widget/MetaPoolStake.Near.DelayUnstake`}
      props={{
        update,
        state,
        isSignedIn,
        handleInputStNear,
        onClickMaxstNear,
      }}
    />
  ),
}[props.action];

return <>{render}</>;
