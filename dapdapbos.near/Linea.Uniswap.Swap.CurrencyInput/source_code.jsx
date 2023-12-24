// styled area

const account = Ethers.send("eth_requestAccounts", [])[0];

const Wrapper = styled.div`
  border-radius: 16px;
  padding: 20px;
  background: #1b1b1b;
`;
const InputField = styled.div`
  margin-right: 8px;
  width: calc(100% - 165px);
`;
const InputWarpper = styled.div`
  height: 46px;
  padding: 10px 0px;
  @media (max-width: 768px) {
    height: 40px;
  }
`;
const Input = styled.input`
  font-size: 32px;
  color: #fff;
  font-weight: 500;
  background-color: transparent;
  outline: none;
  border: none;
  height: 40px;
  vertical-align: bottom;
  width: 100%;
  @media (max-width: 768px) {
    font-size: 32px;
    line-height: normal;
  }
`;
const Value = styled.div`
  padding-top: 10px;
  color: #8e8e8e;
  font-size: 14px;
  line-height: 16px;
`;
const CurrencyField = styled.div`
  flex-shrink: 0;
  --button-color: #fff;
`;

const CurrencySelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #242424;
  border-radius: 24px;
  padding: 3px 10px 3px 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  background: linear-gradient(0deg, #131313, #131313),
    linear-gradient(0deg, #242424, #242424);

  svg {
    color: var(--button-color);
  }
  @media (max-width: 768px) {
    svg {
      width: 12px !important;
    }
    padding: 0px 12px 0px 6px;
  }
`;

const CurrencySelectNoToken = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #242424;
  border-radius: 24px;
  padding: 6px 10px 6px 10px;
  background: #5ee0ff;
  color: #000;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  svg {
    color: #000;
  }
  @media (max-width: 768px) {
    svg {
      width: 12px !important;
    }
    padding: 4px 14px 4px 17px;
  }
  &.disabled {
    opacity: 0.3;
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
  color: #8e8e8e;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  cursor: pointer;
`;
const InputLabel = styled.div`
  color: #8e8e8e;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
`;
const Main = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
`;
// styled area end

State.init({
  balanceLoaded: false,
  balance: "0",
});

const utils = {
  balanceFormated: () => {
    if (!props.currency?.address || !props.isCorrectNetwork) return "-";
    if (!state.balanceLoaded) return "Loading";
    if (state.balance === "0" || Big(state.balance).eq(0)) return "0";
    if (Big(state.balance).lt(0.0001)) return "<0.0001";
    return Big(state.balance).toFixed(4, 0);
  },
};

const handlers = {
  handleDisplayCurrencySelect: () => {
    State.update({
      balanceLoaded: false,
    });
    props?.onCurrencySelectOpen();
  },
  handleInputChange: (ev) => {
    if (isNaN(Number(ev.target.value))) return;
    props.onAmountChange?.(ev.target.value);
  },
};

return (
  <Wrapper>
    <Widget
      src="dapdapbos.near/widget/Uniswap.Swap.CurrencyBalance"
      props={{
        address: props.currency?.address,
        chainIdNotSupport: !props.isCorrectNetwork,
        onLoad: (balance) => {
          State.update({
            balance: ethers.utils.formatUnits(balance, props.currency.decimals),
            balanceLoaded: true,
          });
          props?.onUpdateCurrencyBalance(balance);
        },
      }}
    />
    <InputLabel>{props.labelText}</InputLabel>
    <Main>
      <InputField>
        <InputWarpper>
          <Input
            value={props.amount}
            readOnly={props.disabled}
            onChange={handlers.handleInputChange}
            placeholder="0"
          />
        </InputWarpper>
        <Value>
          ≈{" "}
          <Widget
            src="dapdapbos.near/widget/Linea.Uniswap.Swap.FormatValue"
            props={{
              symbol: props.currency.symbol,
              amount: props.amount,
              prev: "$",
            }}
          />
        </Value>
      </InputField>
      <CurrencyField>
        {props.currency.symbol ? (
          <CurrencySelect onClick={handlers.handleDisplayCurrencySelect}>
            <CurrencyWrapper>
              {props.currency && (
                <Widget
                  src="dapdapbos.near/widget/Linea.Uniswap.Swap.TokenIcon"
                  props={{
                    size: 22,
                    token: props.currency,
                  }}
                />
              )}
              <CurrencySymbol>{props.currency.symbol}</CurrencySymbol>
            </CurrencyWrapper>
            <Widget src="dapdapbos.near/widget/Uniswap.Swap.ArrowIcon" />
          </CurrencySelect>
        ) : (
          <CurrencySelectNoToken
            onClick={handlers.handleDisplayCurrencySelect}
            className={`${
              account ? !props.isCorrectNetwork && "disabled" : ""
            }`}
          >
            <span
              className="fz-14"
              style={{
                whiteSpace: "nowrap",
              }}
            >
              Select token
            </span>

            <Widget src="dapdapbos.near/widget/Uniswap.Swap.ArrowIcon" />
          </CurrencySelectNoToken>
        )}
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
              color: "#fff",
            }}
          >
            {utils.balanceFormated()}
          </span>
        </Amount>
      </CurrencyField>
    </Main>
  </Wrapper>
);
