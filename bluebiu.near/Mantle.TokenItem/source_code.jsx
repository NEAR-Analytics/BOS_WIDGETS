const { currency, selectedTokenAddress, onClick, config } = props;
const CurrencyRow = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin: 10px 0px;
  border-radius: 16px;
  color: white;

  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &.active {
    background-color: #00ffe0;
    pointer-events: none;
    color: black;
  }
`;
const CurrencyLabel = styled.div`
  display: flex;
  align-items: center;
`;
const CurrencySymbol = styled.div`
  font-size: 18px;
  font-weight: 500px;
`;
const CurrencyName = styled.div`
  font-size: 14px;
`;
const CurrencyIcon = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 20px;
`;
const CurrencyAmount = styled.div`
  font-size: 18px;
  font-weight: 500px;
`;

State.init({
  balanceLoaded: false,
  balance: "0",
});
const utils = {
  balanceFormated: () => {
    if (!currency.address) return "-";
    if (!state.balanceLoaded) return "Loading";
    if (state.balance === "0") return "0";
    const balance = Big(state.balance).div(Big(10).pow(currency.decimals));
    if (Big(balance).lt(0.0)) return "<0.0001";
    return Big(balance).toFixed(4);
  },
};

return (
  <>
    <Widget
      src="bluebiu.near/widget/Mantle.getBalance"
      props={{
        address: currency.address,
        isNative: currency.symbol === config.NATIVE_TOKEN_SYMBOL,
        onLoad: (data) => {
          console.log("data: ", data);
          const updatedData = {
            balanceLoaded: data.loaded,
            balance: data.balance,
          };
          State.update(updatedData);
        },
      }}
    />

    <CurrencyRow
      className={currency.address === selectedTokenAddress ? "active" : ""}
      onClick={onClick}
    >
      <CurrencyLabel>
        <CurrencyIcon src={currency.icon} />
        <div>
          <CurrencySymbol>{currency.symbol}</CurrencySymbol>
        </div>
      </CurrencyLabel>
      <CurrencyAmount>{utils.balanceFormated()}</CurrencyAmount>
    </CurrencyRow>
  </>
);
