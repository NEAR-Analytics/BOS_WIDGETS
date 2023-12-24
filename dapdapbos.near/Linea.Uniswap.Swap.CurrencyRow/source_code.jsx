const { currency, selectedTokenAddress, display, chainId, onClick } = props;
const CurrencyRow = styled.div`
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
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
      stroke="#55EEEE"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

const CurrencyLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
    {display && !state.balanceLoaded && chainId === currency.chainId && (
      <Widget
        src="dapdapbos.near/widget/Uniswap.Swap.CurrencyBalance"
        props={{
          address: currency.address,
          chainIdNotSupport: false,
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
      <Widget
        src="dapdapbos.near/widget/Linea.Uniswap.Swap.TokenIcon"
        props={{ size: 36, token: currency }}
      />
      <div>
        <CurrencySymbol>{currency.symbol}</CurrencySymbol>
        <CurrencyName>{currency.name}</CurrencyName>
      </div>
    </CurrencyLabel>
    <CurrencyAmount>
      {utils.balanceFormated()}
      {isActive ? checkIcon : ""}
    </CurrencyAmount>
  </CurrencyRow>
);
