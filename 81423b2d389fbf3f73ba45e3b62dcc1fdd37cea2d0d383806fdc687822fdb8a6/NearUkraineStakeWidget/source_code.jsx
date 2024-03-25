const Background = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

const OuterWrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-family: 'Kodchasan', sans-serif;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center content horizontally */

  @media (max-width: 600px) {
    flex-direction: column; /* Switch to column layout if width is less than 600px */
    align-items: center; /* Center items horizontally in column layout */
  }
`;

const Social = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const AmountButton = styled.button`
  background: white;
  color: blue;
  font-size: 1em;
  margin: 10px;
  padding: 0.25em 1em;
  border: 2px solid blue;
  border-radius: 3px;
`;

const StakeButton = styled.button`
  background: white;
  color: green;
  font-size: 1em;
  margin: 10px;
  padding: 0.25em 1em;
  border: 2px solid green;
  border-radius: 3px;
`;

initState({ amount: "1" });
const accountId = props.wallet_id || context.accountId;
const decimals = props.decimal_places ?? 1;

const onStakeClick = () => {
  const gas = 300 * 10e11; // 300 TGas
  // TODO: doesn't support floats right now due to limitation of JS integers
  const exactDeposit = parseInt(state.amount) + "000000000000000000000000";
  const deposit = (exactDeposit / 10e23).toFixed(decimals);
  console.log(`gas: 300 TGas, deposit: ${deposit} Near`);
  Near.call(
    "nearuaguild.poolv1.near",
    "deposit_and_stake",
    {},
    gas,
    exactDeposit
  );
};

const onAmountInputChange = ({ target }) => {
  let nearAmount;
  if (target.value === "") {
    // If input is empty
    nearAmount = ""; // Allow empty input
  } else if (parseInt(target.value) < 1) {
    // If input is less than 1
    nearAmount = 1; // Set it to 1
  } else {
    nearAmount = target.value; // Otherwise, keep the entered value
  }
  State.update({ amount: nearAmount });
};

const onPresetButtonClick = ({ target }) => {
  State.update({ amount: target.value });
};

const totalStakedBalance = (
  Near.view("nearuaguild.poolv1.near", "get_total_staked_balance", {}) / 1e24
).toFixed(decimals);

const yourStakedBalance = (
  Near.view("nearuaguild.poolv1.near", "get_account_staked_balance", {
    account_id: accountId,
  }) / 1e24
).toFixed(decimals);

const res = fetch(`https://api.nearblocks.io/v1/account/${accountId}`);
const yourAccountBalance = (res.body.account[0].amount / 1e24).toFixed(
  decimals
);

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* Вирівнює кнопки по центру по горизонталі */
  width: 100%; /* Розтягує контейнер на всю ширину */
`;

return (
  <Background>
    <Widget src="nearukraineguild.near/widget/MysteryBox.Manage.Components.MenuHeader" />
    <Widget src="nearukraineguild.near/widget/MysteryBox.Components.BackgroundStars" />
    <OuterWrapper>
      <h1>Stake NEAR in NearUkraine</h1>
      <p>
        Total staked balance in validator is: {totalStakedBalance} Near <br />
        Your staked balance in validator is: {yourStakedBalance} Near <br />
        Your balance is: {yourAccountBalance} Near
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
      <ButtonWrapper>
        <AmountButton onClick={onPresetButtonClick} value="5">
          5
        </AmountButton>
        <AmountButton onClick={onPresetButtonClick} value="25">
          25
        </AmountButton>
        <AmountButton onClick={onPresetButtonClick} value="50">
          50
        </AmountButton>
        <AmountButton
          onClick={onPresetButtonClick}
          value={yourAccountBalance - 0.05}
        >
          Max
        </AmountButton>
        <StakeButton onClick={onStakeClick}>Stake</StakeButton>
      </ButtonWrapper>
      <Social>
        <Widget src="nearukraineguild.near/widget/MysteryBox.Manage.Components.Socials" />
      </Social>
    </OuterWrapper>
  </Background>
);
