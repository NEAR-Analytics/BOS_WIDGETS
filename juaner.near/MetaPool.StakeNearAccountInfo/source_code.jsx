const nearAccount = props.account;

if (!nearAccount) return "";

const { contractId, isUpdate, onLoad } = props;

if (!contractId || !isUpdate) return "";

const accountInfo = Near.view(contractId, "get_account", {
  account_id: nearAccount,
});
if (accountInfo) {
  const balance = ethers.utils.formatUnits(accountInfo.staked_balance, 24);
  onLoad({
    stakedBalance: Big(balance).toFixed(4, 0),
    canWithdraw: accountInfo.can_withdraw,
  });
}
return "";
