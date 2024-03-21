const OuterWrapper = styled.div`
  position: absolute;
  top: 0;
  color: white;
`;

const SOuterWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
`;

initState({
  amount: "1",
  validator: "nearuaguild.poolv1.near",
});
const accountId = props.wallet_id || context.accountId;
const decimals = props.decimal_places ?? 1;

const onStakeClick = () => {
  const gas = 300 * 10e11; // 300 TGas
  // TODO: doesn't support floats right now due to limitation of JS integers
  const exactDeposit = parseInt(state.amount) + "000000000000000000000000";
  const deposit = (exactDeposit / 10e23).toFixed(decimals);
  console.log(`gas: 300 TGas, deposit: ${deposit} Near`);
  Near.call(state.validator, "deposit_and_stake", {}, gas, exactDeposit);
};

const onAmountInputChange = ({ target }) => {
  let nearAmount;
  if (target.value < 1) {
    nearAmount = 1;
  } else {
    nearAmount = target.value;
  }
  State.update({ amount: nearAmount });
};

const onValidatorInputChange = ({ target }) => {
  State.update({ validator: target.value });
};

const onPresetButtonClick = ({ target }) => {
  State.update({ amount: target.value });
};

const StakeButton = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.$primary ? "green" : "white")};
  color: ${(props) => (props.$primary ? "white" : "green")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid green;
  border-radius: 3px;
`;

const AmountButton = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.$primary ? "blue" : "white")};
  color: ${(props) => (props.$primary ? "white" : "blue")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid blue;
  border-radius: 3px;
`;

const totalStakedBalance = (
  Near.view(state.validator, "get_total_staked_balance", {}) / 1e24
).toFixed(decimals);

const yourStakedBalance = (
  Near.view(state.validator, "get_account_staked_balance", {
    account_id: accountId,
  }) / 1e24
).toFixed(decimals);

const res = fetch(`https://api.nearblocks.io/v1/account/${accountId}`);
const yourAccountBalance = (res.body.account[0].amount / 1e24).toFixed(
  decimals
);

return (
  <SOuterWrapper>
    <Widget src="nearukraineguild.near/widget/MysteryBox.Components.BackgroundStars" />
    <OuterWrapper>
      <h1>Stake NEAR</h1>
      <p>
        Validator:{" "}
        <input value={state.validator} onChange={onValidatorInputChange} />
      </p>
      <p>
        Amount:
        <input
          type="number"
          min="1"
          value={state.amount}
          onChange={onAmountInputChange}
        />
      </p>
      <AmountButton onClick={onPresetButtonClick} value="5">
        5
      </AmountButton>
      <AmountButton onClick={onPresetButtonClick} value="10">
        10
      </AmountButton>
      <AmountButton onClick={onPresetButtonClick} value="25">
        25
      </AmountButton>
      <AmountButton onClick={onPresetButtonClick} value="50">
        50
      </AmountButton>
      <AmountButton onClick={onPresetButtonClick} value="100">
        100
      </AmountButton>
      <AmountButton
        onClick={onPresetButtonClick}
        value={yourAccountBalance - 0.05}
      >
        Max
      </AmountButton>
      <br></br>
      <StakeButton onClick={onStakeClick}>Stake</StakeButton>
      <p>Total staked balance in validator is: {totalStakedBalance} Near</p>
      <p>Your staked balance in validator is: {yourStakedBalance} Near</p>
      <p>Your balance is: {yourAccountBalance} Near</p>
      <Widget src="nearukraineguild.near/widget/MysteryBox.Manage.Components.Socials" />
    </OuterWrapper>
  </SOuterWrapper>
);
