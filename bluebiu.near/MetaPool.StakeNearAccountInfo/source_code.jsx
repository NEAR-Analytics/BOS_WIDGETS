const nearAccount = props.account;

if (!nearAccount) return "";

const { contractId, isUpdate, onLoad } = props;

if (!contractId || !isUpdate) return "";

const stakeBalance = Near.view(contractId, "ft_balance_of", {
  account_id: nearAccount,
});

if (stakeBalance) {
  const balance = ethers.utils.formatUnits(stakeBalance, 24);
  onLoad({
    stakedBalance: Big(balance).toFixed(4, 0),
    canWithdraw: true,
  });
}
return "";
