// switch begin
const SwitchRoot = styled("Switch.Root")`
  all: unset;
  display: block;
  width: 42px;
  height: 24px;
  background-color: #232534;
  border-radius: 9999px;
  position: relative;
  box-shadow: 0 2px 10px #232534;
  border: 1px solid #373a53;
  &[data-state="checked"] {
    background-color: #783ae3;
  }
`;

const SwitchThumb = styled("Switch.Thumb")`
  all: unset;
  display: block;
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 2px 2px var(--blackA7);
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;
  border: 1px solid #373a53;
  &[data-state="checked"] {
    transform: translateX(19px);
  }
`;
// switch end
const StakePanel = styled.div`
  width: 510px;
  margin: 0 auto;
  /* reset input */
  .bos-input-number {
    background-color: var(--dark);
    color: var(--white);
  }
`;

const AmountList = styled.div`
  display: flex;
  font-size: var(--fz12);
  color: var(--purple);
  justify-content: space-between;
  padding: 10px 0 16px;
  .amount-left {
  }
  .amount-right {
  }
  .amount-white {
    color: var(--white);
  }
`;
const StakeBtnWrap = styled.div`
  display: flex;
  column-gap: 14px;
`;
const UnStakeBtnWrap = styled.div`
  display: flex;
  column-gap: 22px;
  align-items: center;
  .switch-wrap {
    display: flex;
    align-items: center;
    column-gap: 8px;
    color: var(--purple);
  }
`;

const ChainBtnWrap = styled.div`
  margin-top: 16px;
  display: flex;
`;

const { data, chainId, account } = props;
const {
  poolName,
  stakedAmount,
  reward,
  Rewards_contract_address,
  Rewards_depositor_contract_address,
  LP_token_address,
} = data;
State.init({
  isClaimRewards: false,
  inputValue: "",
});

const handleSwitch = (isChecked) => {
  State.update({
    isClaimRewards: isChecked,
  });
};

const RewardPoolDepositWrapper = "0x0Fec3d212BcC29eF3E505B555D7a7343DF0B7F76";
const CHAIN_ID = 100;

const handleInputChange = (e) => {
  console.log(e.target.value, e);
  State.update({
    inputValue: e.target.value,
  });
};

const switchChain = () => {
  Ethers.send("wallet_switchEthereumChain", [
    { chainId: `0x${Number(CHAIN_ID).toString(16)}` },
  ]);
};
const renderExtra = () => {
  if (chainId !== CHAIN_ID) {
    return (
      <ChainBtnWrap>
        <Widget
          src="dapdapbos.near/widget/UI.Button"
          props={{
            text: "Switch to Gnosis",
            type: "primary",
            style: { flex: 1 },
            onClick: switchChain,
          }}
        />
      </ChainBtnWrap>
    );
  }

  return (
    <>
      <AmountList>
        <span>${stakedAmount}</span>
        <span>
          You Staked: <span className="amount-white">{stakedAmount}</span> BPT
        </span>
      </AmountList>
      <UnStakeBtnWrap>
        <div className="switch-wrap">
          <SwitchRoot
            checked={state.isClaimRewards}
            onCheckedChange={handleSwitch}
          >
            <SwitchThumb />
          </SwitchRoot>
          <span>Claim Rewards</span>
        </div>
        <Widget
          src="dapdapbos.near/widget/UI.Button"
          props={{
            text: "Unstake",
            type: "primary",
            style: { flex: 1 },
            disabled: true,
            onClick: () => {
              console.log("click btn2");
            },
          }}
        />
      </UnStakeBtnWrap>
    </>
  );
};

return (
  <StakePanel>
    <div className="input-group">
      <input
        value={state.inputValue}
        type="number"
        className="form-control bos-input-number"
        placeholder="0.0"
        onChange={handleInputChange}
      />
      <div className="input-group-append">BPT</div>
    </div>
    {renderExtra()}
  </StakePanel>
);
