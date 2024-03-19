initState({
  amount: "1",
  poolId: "nearuaguild.poolv1.near",
});

const onStakeClick = () => {
  const teraGas = 1000000000000;
  const gas = 300 * teraGas;
  // TODO: doesn't support floats right now due to limitation of JS integers
  const deposit = parseInt(state.amount) + "000000000000000000000000";
  console.log("gas: ", gas, "deposit: ", deposit);
  Near.call(state.poolId, "deposit_and_stake", {}, gas, deposit);
};

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.$primary ? "#BF4F74" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#BF4F74")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #BF4F74;
  border-radius: 3px;
`;

const accountId = props.wallet_id || context.accountId;
const totalStakedBalance =
  Near.view("nearuaguild.poolv1.near", "get_total_staked_balance", {}) / 1e24;

const yourStakedBalance =
  Near.view("nearuaguild.poolv1.near", "get_account_staked_balance", {
    account_id: accountId,
  }) / 1e24;

const res = fetch(
  `https://api.nearblocks.io/v1/account/${props.wallet_id || context.accountId}`
);
const yourAccountBalance = res.body.account[0].amount / 1e24;
return (
  <div>
    <h1>Stake NEAR</h1>
    <p>Pool: <input value={state.poolId}/></p>
    <p>Amount: <input type="number" value={state.amount}/></p>
    <Button onClick={onStakeClick}>Stake</Button>
    <p>Total staked balance in validator is: {totalStakedBalance} Near</p>
    <p>Your staked balance in validator is: {yourStakedBalance} Near</p>
    <p>Your balance is: {yourAccountBalance} Near</p>
  </div>
);
