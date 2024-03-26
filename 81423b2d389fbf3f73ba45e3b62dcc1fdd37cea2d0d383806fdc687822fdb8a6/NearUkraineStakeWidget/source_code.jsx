const font = fetch(
  "https://fonts.googleapis.com/css2?family=Kodchasan:wght@700&display=swap"
).body;

if (!font) {
  return <></>;
}

const Background = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  ${font}
`;

const Text = styled.p`font-family: 'Kodchasan', sans-serif;`;

const ButtonText = styled.p`
  font-family: 'Kodchasan', sans-serif;
  margin: 0;
`;

const HeaderText = styled.h1`font-family: 'Kodchasan', sans-serif;`;

const OuterWrapper = styled.div`
  position: absolute;
  max-height: 70%;
  height: 100%;
  top: 10%;
  left: 50%;
  width: 100%;
  max-width: 80%;
  transform: translateX(-50%);
  color: white;
  font-family: 'Kodchasan', sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 20px 0;
  & button {
    padding: 0 20px;
    margin-right: 10px;
    
    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 440px) {
    justify-content: space-between;
    & button {
      margin-right: 0;
    }
  }
`;

const StakeButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
  & button {
    padding: 0 20px;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const Social = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SocialText = styled.p`
  font-family: 'Kodchasan', sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  text-transform: uppercase;
  color: white;
  margin: 0;
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
    nearAmount = "";
  } else if (parseInt(target.value) < 1) {
    nearAmount = 1;
  } else {
    nearAmount = target.value;
  }
  State.update({ amount: nearAmount });
};

const onPresetButtonClick = (value) => {
  State.update({ amount: value });
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
      <HeaderText>Stake NEAR with Near Ukraine 🇺🇦</HeaderText>

      <Text>
        <b>Total staked:</b> {totalStakedBalance} Near <br />
        <b>Your staked balance:</b> {yourStakedBalance} Near <br />
        <b>Your balance is:</b> {yourAccountBalance} Near
      </Text>
      <div>
        <Text>Amount:</Text>
        <input
          type="number"
          min="1"
          value={state.amount}
          onChange={onAmountInputChange}
        />
        <ButtonWrapper>
          <Widget
            src="nearukraineguild.near/widget/MysteryBox.Manage.Components.SubmitButton"
            props={{
              onClick: () => onPresetButtonClick(5),
              text: "5",
            }}
          />

          <Widget
            src="nearukraineguild.near/widget/MysteryBox.Manage.Components.SubmitButton"
            props={{
              onClick: () => onPresetButtonClick(25),
              text: "25",
            }}
          />

          <Widget
            src="nearukraineguild.near/widget/MysteryBox.Manage.Components.SubmitButton"
            props={{
              onClick: () => onPresetButtonClick(50),
              text: "50",
            }}
          />

          <Widget
            src="nearukraineguild.near/widget/MysteryBox.Manage.Components.SubmitButton"
            props={{
              onClick: () => onPresetButtonClick(yourAccountBalance - 0.05),
              text: "Max",
            }}
          />
        </ButtonWrapper>
        <StakeButtonWrapper>
          <Widget
            src="nearukraineguild.near/widget/MysteryBox.Manage.Components.SubmitButton"
            props={{
              onClick: onStakeClick,
              text: "Stake",
            }}
          />
        </StakeButtonWrapper>
      </div>
      <Social>
        <SocialText>Follow us</SocialText>
        <Widget src="nearukraineguild.near/widget/MysteryBox.Manage.Components.Socials" />
      </Social>
    </OuterWrapper>
  </Background>
);
