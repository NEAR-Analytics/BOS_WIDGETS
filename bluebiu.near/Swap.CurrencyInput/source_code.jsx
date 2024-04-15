// styled area

const Wrapper = styled.div`
  padding: 16px 16px 14px;
  border-radius: 12px;
  border: 1px solid #373a53;
  transition: 0.3s;
`;
const InputBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  gap: 8px;
`;
const InputField = styled.div`
  flex-shrink: 1;
  flex-grow: 1;
`;
const InputWarpper = styled.div`
  height: 46px;
  padding: 10px 0px;
  @media (max-width: 900px) {
    height: 40px;
  }
`;
const Input = styled.input`
  font-size: 32px;
  width: 100%;
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
  color: #979abe;
  font-size: 14px;
  line-height: 16px;
`;
const CurrencyField = styled.div``;

const CurrencySelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 8px;
  border: 1px solid #373a53;
  background: #2e3142;
  padding: 3px 10px 3px 8px;

  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  svg {
    color: #979abe;
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
`;
const CurrencyIcon = styled.img`
  width: 22px;
  height: 22px;
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
  padding-top: 18px;
  color: #979abe;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  cursor: pointer;
`;
const Label = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

// styled area end

State.init({
  balance: "0",
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

const tokenPrice =
  props.prices[props.currency.priceKey || props.currency.symbol];

return (
  <Wrapper style={{ background: !state.focus ? "#2e3142" : "#1B1E27" }}>
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.CurrencyBalance"
      props={{
        address: props.currency?.address,
        updateTokenBalance: props.updateTokenBalance,
        account: props.account,
        onLoad: (balance) => {
          State.update({
            balance: ethers.utils.formatUnits(balance, props.currency.decimals),
          });
          props?.onUpdateCurrencyBalance(balance);
        },
      }}
    />
    <Label>{props.type === "in" ? "You pay" : "You receive"}</Label>
    <InputBox>
      {" "}
      <InputField>
        <InputWarpper>
          <Input
            value={props.amount}
            disabled={props.disabled}
            onChange={handlers.handleInputChange}
            onFocus={() => {
              State.update({
                focus: true,
              });
            }}
            onBlur={() => {
              State.update({
                focus: false,
              });
            }}
            placeholder="0"
          />
        </InputWarpper>
        <Value>
          ≈{" "}
          {tokenPrice && props.amount
            ? `$${Big(props.amount || 0)
                .mul(tokenPrice)
                .toFixed(2)}`
            : "-"}
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
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </CurrencySelect>
        {props.account && !props.chainIdNotSupport && (
          <Amount
            onClick={() => {
              const formatedBalance = utils.balanceFormated();
              if (!["-", "Loading", "0"].includes(formatedBalance))
                props.onAmountChange?.(state.balance);
            }}
          >
            Balance:{" "}
            <span
              style={{
                textDecoration: props.disabled ? "none" : "underline",
              }}
            >
              {utils.balanceFormated()}
            </span>
          </Amount>
        )}
      </CurrencyField>
    </InputBox>
  </Wrapper>
);
