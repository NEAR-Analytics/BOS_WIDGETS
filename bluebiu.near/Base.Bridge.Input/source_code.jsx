// styled area
const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 5px 0px;
`;
const InputField = styled.div`
  margin-right: 8px;
  flex-grow: 1;
  @media (max-width: 768px) {
    width: calc(100% - 115px);
  }
`;
const InputWarpper = styled.div`
  height: 46px;
  border-bottom: 1px solid #373a53;
  padding: 10px 0px;
  @media (max-width: 900px) {
    height: 40px;
  }
`;
const Input = styled.input`
  font-size: 26px;
  color: #fff;
  font-weight: 500;
  background-color: transparent;
  outline: none;
  border: none;
  height: 40px;
  vertical-align: bottom;
  @media (max-width: 900px) {
    font-size: 20px;
    height: 34px;
  }
`;
const Value = styled.div`
  padding-top: 10px;
  color: var(--thirdary-text-color);
  font-size: 14px;
  line-height: 16px;
`;
const CurrencyField = styled.div`
  min-width: 160px;
  flex-shrink: 0;
  @media (max-width: 768px) {
    min-width: 115px;
  }
`;
const CurrencySelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #373a53;
  border-radius: 24px;
  padding: 6px 12px 6px 6px;
  cursor: pointer;
  background-color: var(--input-select-bg-color);
  svg {
    color: var(--arrow-color);
  }
  @media (max-width: 768px) {
    svg {
      width: 12px !important;
    }
    padding: 0px 12px 0px 6px;
  }
`;
const CurrencyWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  @media (max-width: 768px) {
    width: calc(100% - 12px);
  }
`;
const CurrencyIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
  }
`;
const CurrencySymbol = styled.div`
  font-size: 18px;
  color: #fff;
  margin-left: 7px;
  white-space: nowrap;
  .fz-14 {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    width: calc(100% - 30px);
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    .fz-14 {
      font-size: 12px;
    }
  }
`;
const Amount = styled.div`
  padding-top: 10px;
  color: var(--thirdary-text-color);
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
`;
// styled area end

State.init({
  balance: "0",
  loading: false,
});

const utils = {
  balanceFormated: () => {
    if (!props.currency?.address) return "-";
    if (state.balance === "0" || Big(state.balance).eq(0)) return "0";
    if (Big(state.balance).lt(0.0001)) return "<0.0001";
    return Big(state.balance).toFixed(4, 0);
  },
};

const handlers = {
  handleDisplayCurrencySelect: () => {
    props?.onCurrencySelectOpen();
  },
  handleInputChange: (ev) => {
    if (isNaN(Number(ev.target.value))) return;
    props.onAmountChange?.(ev.target.value.replace(/\s+/g, ""));
  },
};

useEffect(() => {
  if (props.updateTokenBalance === undefined) return;
  State.update({
    loading: props.updateTokenBalance,
  });
}, [props.updateTokenBalance]);

return (
  <Wrapper>
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.CurrencyBalance"
      props={{
        address: props.currency?.isNative ? "native" : props.currency?.address,
        updateTokenBalance: props.updateTokenBalance,
        account: props.account,
        onLoad: (balance) => {
          State.update({
            balance: ethers.utils.formatUnits(balance, props.currency.decimals),
            loading: false,
          });
          props?.onUpdateCurrencyBalance(balance);
        },
      }}
    />
    <InputField>
      <InputWarpper>
        <Input
          value={props.amount}
          disabled={props.disabled}
          onChange={handlers.handleInputChange}
        />
      </InputWarpper>
      <Value>
        ≈ $
        <Widget
          src="bluebiu.near/widget/Base.Bridge.Value"
          props={{
            price: props.price,
            amount: props.amount,
          }}
        />
      </Value>
    </InputField>
    <CurrencyField>
      <CurrencySelect onClick={handlers.handleDisplayCurrencySelect}>
        <CurrencyWrapper>
          {props.currency?.icon && <CurrencyIcon src={props.currency.icon} />}
          <CurrencySymbol>
            {props.currency.symbol || (
              <span className="fz-14">Select a token</span>
            )}
          </CurrencySymbol>
        </CurrencyWrapper>
        <Widget src="bluebiu.near/widget/Arbitrum.Swap.ArrowIcon" />
      </CurrencySelect>
      <Amount
        onClick={() => {
          const formatedBalance = utils.balanceFormated();
          if (!["-", "Loading", "0"].includes(formatedBalance))
            props.onAmountChange?.(state.balance);
        }}
      >
        Balance:{" "}
        {state.loading ? (
          <div style={{ width: "18px" }}>
            <Widget src="bluebiu.near/widget/0vix.LendingLoadingIcon" />
          </div>
        ) : (
          <span
            style={{
              textDecoration: props.disabled ? "none" : "underline",
            }}
          >
            {utils.balanceFormated()}
          </span>
        )}
      </Amount>
    </CurrencyField>
  </Wrapper>
);
