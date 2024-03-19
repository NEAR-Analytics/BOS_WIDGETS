initState({
  amount: "1",
  vaidator: "nearuaguild.poolv1.near",
});
const accountId = props.wallet_id || context.accountId;
const decimals = props.decimal_places ?? 1;

const onStakeClick = () => {
  const gas = 300 * 10e11; // 300 TGas
  // TODO: doesn't support floats right now due to limitation of JS integers
  const deposit = parseInt(state.amount) + "000000000000000000000000";
  console.log("gas: ", gas, "deposit: ", deposit);
  Near.call(state.vaidator, "deposit_and_stake", {}, gas, deposit);
};

const onAmountInputChange = ({ target }) => {
  State.update({amount: target.value});
}

const onPoolInputChange = ({ target }) => {
  State.update({vaidator: target.value});
}

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

const totalStakedBalance = (
  Near.view(state.vaidator, "get_total_staked_balance", {}) / 1e24
).toFixed(decimals);

const yourStakedBalance = (
    Near.view(state.vaidator, "get_account_staked_balance", {
    account_id: accountId,
  }) / 1e24
).toFixed(decimals);

const res = fetch(`https://api.nearblocks.io/v1/account/${accountId}`);
const yourAccountBalance = (res.body.account[0].amount / 1e24).toFixed(
  decimals
);

return (
  <div>
    <h1>Stake NEAR</h1>
    <p>
      Validator: <input value={state.vaidator} onChange={onPoolInputChange}/>
    </p>
    <p>
      Amount: <input type="number" value={state.amount} onChange={onAmountInputChange} />
    </p>
    <Button onClick={onStakeClick}>Stake</Button>
    <p>Total staked balance in validator is: {totalStakedBalance} Near</p>
    <p>Your staked balance in validator is: {yourStakedBalance} Near</p>
    <p>Your balance is: {yourAccountBalance} Near</p>
  </div>
);
