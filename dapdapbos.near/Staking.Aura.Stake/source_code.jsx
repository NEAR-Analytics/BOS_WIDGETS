// select begin
const SelectContent = styled("Select.Content")`
  z-index: 1;
  border-radius: 6px;
  padding: 11px 0;
  min-width: 148px;
  border: 1px solid #373a53;
  background: #262836;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
`;
const SelectTrigger = styled.div`
  width: 138px;
  height: 34px;
  background-color: #373a53;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
`;

const SelectItem = styled("Select.Item")`
  all: "unset";
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  user-select: none;
  &:hover {
    background: #979abe;
  }
  /* &[data-disabled]: {
      color: red;
      
    } */

  /* &[data-highlighted]: {
      backgroundColor: violet.violet9,
      color: violet.violet1,
    } */
`;

const SelectValue = styled.div``;
// select end

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

const ArrowSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="7"
    viewBox="0 0 12 7"
    fill="none"
  >
    <path
      d="M1 1L6 5L11 1"
      stroke="#979ABE"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);
const ChevronDownIcon = styled.div``;

// type: STAKE | UN_STAKE
const { type } = props;
State.init({
  isClaimRewards: false,
  selectValue: selectData[0].value,
});

const selectData = [
  { value: "usdt+usdc", label: "USDT USDC" },
  { value: "usdt", label: "USDT" },
  { value: "usdc", label: "USDC" },
];
const handleSwitch = (isChecked) => {
  State.update({
    isClaimRewards: isChecked,
  });
};

const handleSelect = (value) => {
  State.update({
    selectValue: value,
  });
};

const renderExtra = () => {
  switch (type) {
    case "STAKE":
      return (
        <>
          <AmountList>
            <span>$0.00</span>
            <span>
              Balance: <span className="amount-white">123.35</span> BPT
            </span>
          </AmountList>
          <StakeBtnWrap>
            <Widget
              src="dapdapbos.near/widget/Staking.Aura.Button"
              props={{
                text: "Approve",
                type: "primary",
                style: { flex: 1 },
                loading: true,
                onClick: () => {
                  console.log("click btn");
                },
              }}
            />
            <Widget
              src="dapdapbos.near/widget/Staking.Aura.Button"
              props={{
                text: "Stake",
                type: "primary",
                style: { flex: 1 },
                disabled: true,
                onClick: () => {
                  console.log("click btn2");
                },
              }}
            />
          </StakeBtnWrap>
        </>
      );
    case "UN_STAKE":
      return (
        <>
          <AmountList>
            <span>$0.00</span>
            <span>
              You Staked: <span className="amount-white">123.35</span> BPT
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
              src="dapdapbos.near/widget/Staking.Aura.Button"
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
  }
};

return (
  <StakePanel>
    <div className="input-group">
      <input
        type="number"
        className="form-control bos-input-number"
        placeholder="0.0"
      />
      <div className="input-group-append">
        <Select.Root value={state.selectValue} onValueChange={handleSelect}>
          <Select.Trigger asChild>
            <SelectTrigger>
              <Select.Value asChild>
                <SelectValue>
                  {
                    selectData.find((item) => item.value === state.selectValue)
                      ?.label
                  }
                </SelectValue>
              </Select.Value>
              <Select.Icon>
                <ChevronDownIcon>{ArrowSvg}</ChevronDownIcon>
              </Select.Icon>
            </SelectTrigger>
          </Select.Trigger>

          <SelectContent>
            <Select.Viewport>
              <Select.Group>
                {selectData?.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select.Group>
            </Select.Viewport>
          </SelectContent>
        </Select.Root>
      </div>
    </div>
    {renderExtra()}
  </StakePanel>
);
