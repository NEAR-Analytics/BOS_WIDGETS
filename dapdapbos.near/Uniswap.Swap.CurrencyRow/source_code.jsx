const { currency, selectedTokenAddress, display, onClick, chainIdNotSupport } =
  props;
const CurrencyRow = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin: 10px 0px;
  border-radius: 16px;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &.active {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const checkIcon = (
  <svg
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 5L6 10L15 1"
      stroke="#E97EF8"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

const CurrencyLabel = styled.div`
  display: flex;
  align-items: center;
`;
const CurrencySymbol = styled.div`
  font-size: 18px;
  font-weight: 500px;
  color: #fff;
`;
const CurrencyName = styled.div`
  font-size: 14px;
  color: #fff;
  opacity: 0.5;
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
  color: #fff;
`;

State.init({
  balanceLoaded: false,
  balance: "0",
});

const account = Ethers.send("eth_requestAccounts", [])[0];

const utils = {
  balanceFormated: () => {
    if (!account) return "";

    if (!currency.address) return "-";
    if (!state.balanceLoaded) return "Loading";
    if (state.balance === "0" || Big(state.balance).eq(0)) return "0";
    if (Big(state.balance).lt(0.0001)) return "<0.0001";
    return Big(state.balance).toFixed(4);
  },
};

const isActive = currency.address === selectedTokenAddress;

return (
  <CurrencyRow className={isActive ? "active" : ""} onClick={onClick}>
    {display && !state.balanceLoaded && (
      <Widget
        src="dapdapbos.near/widget/Uniswap.Swap.CurrencyBalance"
        props={{
          address: currency.address,
          chainIdNotSupport,
          onLoad: (balance) => {
            State.update({
              balance: ethers.utils.formatUnits(balance, currency.decimals),
              balanceLoaded: true,
            });
          },
        }}
      />
    )}
    <CurrencyLabel>
      <CurrencyIcon src={currency.icon} />
      <div>
        <CurrencySymbol>{currency.symbol}</CurrencySymbol>
        <CurrencyName>{currency.name}</CurrencyName>
      </div>
    </CurrencyLabel>
    <CurrencyAmount>
      {!chainIdNotSupport ? utils.balanceFormated() : "-"}

      {isActive ? checkIcon : ""}
    </CurrencyAmount>
  </CurrencyRow>
);
