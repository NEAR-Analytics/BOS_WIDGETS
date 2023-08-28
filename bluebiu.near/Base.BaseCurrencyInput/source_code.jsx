// styled area
const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 5px 0px;
`;
const InputField = styled.div`
  flex-grow: 1;
  margin-right: 8px;
`;
const InputWarpper = styled.div`
  height: 46px;
  border-bottom: 1px solid #332c4b;
  padding: 10px 0px;
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
`;
const Value = styled.div`
  padding-top: 10px;
  color: #4f5375;
  font-size: 14px;
  line-height: 16px;
`;
const CurrencyField = styled.div`
  width: 160px;
`;
const CurrencySelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #332c4b;
  border-radius: 24px;
  padding: 6px 12px 6px 6px;
  cursor: pointer;
  svg {
    color: #82a7ff;
  }
`;
const CurrencyWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
`;
const CurrencyIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
const CurrencySymbol = styled.div`
  font-size: 18px;
  color: #fff;
  margin-left: 7px;
  .fz-14 {
    font-size: 14px;
  }
`;
const Amount = styled.div`
  padding-top: 10px;
  color: #4f5375;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  text-decoration: underline;
  cursor: pointer;
`;
// styled area end

State.init({
  balanceLoaded: false,
  balance: "0",
});

const utils = {
  balanceFormated: () => {
    if (!props.currency?.address) return "-";
    if (!state.balanceLoaded) return "Loading";
    if (state.balance === "0") return "0";
    if (Big(state.balance).lt(0.0001)) return Big(state.balance).toPrecision(1);
    return Big(state.balance).toFixed(4, 0);
  },
  valueFormated: (amount) => {
    const prices = Storage.privateGet("tokensPrice");
    const price = prices[props.currency?.address]?.price;
    if (!price) return "-";
    const value = Big(price).mul(amount || 0);
    if (value.lt(0.01)) return value.toPrecision(1);
    return value.toFixed(2);
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

const DELAY = 1000 * 60 * 5;
const timer = Storage.privateGet("priceTimer");
function getPrice() {
  asyncFetch("https://mainnet-indexer.ref-finance.com/list-base-token-price")
    .then((res) => {
      const data = JSON.parse(res.body);
      data.native = data.aurora;
      delete data.aurora;
      Storage.privateSet("tokensPrice", data);
      clearTimeout(timer);
      let timerNo = setTimeout(getPrice, DELAY);
      Storage.privateSet("priceTimer", timerNo);
    })
    .catch((err) => {
      clearTimeout(timer);
      let timerNo = setTimeout(getPrice, DELAY);
      Storage.privateSet("priceTimer", timerNo);
    });
}

if (!Storage.privateGet("priceTimer")) {
  getPrice();
}

return (
  <Wrapper>
    {(props.updateTokenBalance || !state.balanceLoaded) && (
      <Widget
        src="bluebiu.near/widget/Base.BaseCurrencyBalance"
        props={{
          address: props.currency?.address,
          onLoad: (balance) => {
            State.update({
              balance: ethers.utils.formatUnits(
                balance,
                props.currency.decimals
              ),
              balanceLoaded: true,
            });
            props?.onUpdateCurrencyBalance(balance);
          },
        }}
      />
    )}
    <InputField>
      <InputWarpper>
        <Input
          value={props.amount}
          disabled={props.disabled}
          onChange={handlers.handleInputChange}
        />
      </InputWarpper>
      <Value>≈ ${utils.valueFormated(props.amount)}</Value>
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
        <Widget src="bluebiu.near/widget/Base.BaseArrowIcon" />
      </CurrencySelect>
      <Amount
        onClick={() => {
          const formatedBalance = utils.balanceFormated();
          if (!["-", "Loading", "0"].includes(formatedBalance))
            props.onAmountChange?.(formatedBalance);
        }}
      >
        Balance: {utils.balanceFormated()}
      </Amount>
    </CurrencyField>
  </Wrapper>
);
