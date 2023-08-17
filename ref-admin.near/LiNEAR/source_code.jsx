/** common lib start */
const accountId = props.accountId || context.accountId;
const isSignedIn = !!accountId;
const NEAR_DECIMALS = 24;
const LiNEAR_DECIMALS = 24;
const BIG_ROUND_DOWN = 0;
const MIN_BALANCE_CHANGE = 0.5;

function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}
/** common lib end */
function getConfig() {
  return {
    ownerId: "ref-admin.near",
    contractId: "linear-protocol.near",
    nodeUrl: "https://rpc.mainnet.near.org",
    appUrl: "https://app.linearprotocol.org",
  };
}
const config = getConfig(context.networkId);
const { tabName } = state;
State.init({
  tabName: "stake", // stake | unstake,
  nearBalance: "",
});
// Account balances

function updateNearBalance(account, onInvalidate) {
  const { amount, storage_usage } = account.body.result;
  const COMMON_MIN_BALANCE = 0.05;

  let newBalance = "-";
  if (amount) {
    const availableBalance = Big(amount || 0).minus(
      Big(storage_usage).mul(Big(10).pow(19))
    );
    const balance = availableBalance
      .div(Big(10).pow(NEAR_DECIMALS))
      .minus(COMMON_MIN_BALANCE);
    newBalance = balance.lt(0) ? "0" : balance.toFixed(5, BIG_ROUND_DOWN);
  }
  State.update({
    nearBalance: newBalance,
  });
  if (onInvalidate) {
    onInvalidate(nearBalance, newBalance);
  }
}

function getNearBalance(accountId, onInvalidate) {
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
  asyncFetch(config.nodeUrl, options).then((account) =>
    updateNearBalance(account, onInvalidate)
  );
}

function getLinearBalance(accountId, subscribe) {
  const linearBalanceRaw = Near.view(
    config.contractId,
    "ft_balance_of",
    {
      account_id: accountId,
    },
    undefined,
    subscribe
  );
  if (!linearBalanceRaw) return "-";
  const balance = Big(linearBalanceRaw).div(Big(10).pow(LiNEAR_DECIMALS));
  return balance.lt(0) ? "0" : balance.toFixed();
}

const nearBalance = state.nearBalance;
// Initial fetch of account NEAR balance
if (accountId && !isValid(nearBalance)) {
  getNearBalance(accountId);
}
const linearBalance = accountId ? getLinearBalance(accountId) : "-";

function updateAccountInfo(callback) {
  const interval = setInterval(() => {
    getNearBalance(accountId, (oldBalance, newBalance) => {
      if (
        newBalance !== "-" &&
        oldBalance !== "-" &&
        Big(newBalance).sub(oldBalance).abs().gt(MIN_BALANCE_CHANGE)
      ) {
        // now update LiNEAR balance after NEAR balance has been updated
        getLinearBalance(accountId, true);
        // stop polling and invoke callback functions if any
        clearInterval(interval);
        if (callback) callback();
      }
    });
  }, 500);
}
const Main = styled.div`
  width:500px;
  position: relative;
`;

const updateTabName = (tabName) =>
  State.update({
    tabName,
  });
return (
  <Main>
    {props.tabName === "stake" && (
      <Widget
        src={`${config.ownerId}/widget/LiNEAR.Stake`}
        props={{
          config,
          updateTabName,
          nearBalance,
          linearBalance,
          updateAccountInfo,
        }}
      />
    )}
    {props.tabName === "unstake" && (
      <Widget
        src={`${config.ownerId}/widget/LiNEAR.Unstake`}
        props={{ config, updateTabName, linearBalance, updateAccountInfo }}
      />
    )}
  </Main>
);
