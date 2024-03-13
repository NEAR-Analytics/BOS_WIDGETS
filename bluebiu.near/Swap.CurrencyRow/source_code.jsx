const {
  currency,
  selectedTokenAddress,
  display,
  onClick,
  chainIdNotSupport,
  account,
} = props;
const CurrencyRow = styled.div`
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: rgba(151, 154, 190, 0.1);
  }

  &.active {
    background-color: var(--dex-hover-bg-color);
    pointer-events: none;
    opacity: 0.8;
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
      stroke="currentColor"
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
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`;
const CurrencyName = styled.div`
  font-size: 14px;
  color: #fff;
`;
const CurrencyIcon = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  margin-right: 8px;
`;
const CurrencyAmount = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #fff;
`;

State.init({
  balanceLoaded: false,
  balance: "0",
});

const utils = {
  balanceFormated: () => {
    if (!currency.address) return "-";
    if (!state.balanceLoaded) return "Loading";
    if (state.balance === "0" || Big(state.balance).eq(0)) return "0";
    if (Big(state.balance).lt(0.0001)) return "<0.0001";
    return Big(state.balance).toFixed(4);
  },
};

const isActive = currency.address === selectedTokenAddress;

return (
  <CurrencyRow
    className={currency.address === selectedTokenAddress ? "active" : ""}
    onClick={onClick}
  >
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.CurrencyBalance"
      props={{
        address: currency.address,
        account,
        chainIdNotSupport,
        updateTokenBalance: display,
        onLoad: (balance) => {
          State.update({
            balance: ethers.utils.formatUnits(balance, currency.decimals),
            balanceLoaded: true,
          });
        },
      }}
    />
    <CurrencyLabel>
      <CurrencyIcon src={currency.icon} />
      <div>
        <CurrencySymbol>{currency.symbol}</CurrencySymbol>
        {/* <CurrencyName>{currency.name}</CurrencyName> */}
      </div>
    </CurrencyLabel>
    <CurrencyAmount>
      {!chainIdNotSupport ? utils.balanceFormated() : "-"}

      {isActive ? checkIcon : ""}
    </CurrencyAmount>
  </CurrencyRow>
);
