const tokenContract = "token.v2.ref-finance.near";
const userTokenBalance = Near.view(tokenContract, "ft_balance_of", {
  account_id: "ace.tkn.near",
});
