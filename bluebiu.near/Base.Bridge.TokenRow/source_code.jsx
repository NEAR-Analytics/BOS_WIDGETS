const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: var(--token-list-hover-color);
  }
  &.disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;
const TokenWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
const TokenImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
const TokenName = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: var(--chain-name-color);
`;
const CheckIcon = styled.div`
  color: var(--button-color);
`;
const Balance = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
`;

const { display, currency, selectedTokenAddress, onSelect } = props;

const utils = {
  balanceFormated: (currency) => {
    if (!currency.address) return "-";
    if (state.loading)
      return <Widget src="bluebiu.near/widget/0vix.LendingLoadingIcon" />;
    if (state.balance === "0" || Big(state.balance || 0).eq(0)) return "0";
    if (Big(state.balance).lt(0.01)) return "<0.01";
    return Big(state.balance).toFixed(2);
  },
};

useEffect(() => {
  if (display === undefined) return;
  State.update({
    loading: display,
  });
}, [display]);

return (
  <Item
    onClick={() => {
      if (
        Big(state.balance || 0).gt(0) ||
        currency.address === selectedTokenAddress
      )
        onSelect(currency);
    }}
    className={`${!Big(state.balance || 0).gt(0) && "disabled"}`}
  >
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.CurrencyBalance"
      props={{
        updateTokenBalance: display,
        address: currency.isNative ? "native" : currency.address,
        onLoad: (balance) => {
          State.update({
            balance: ethers.utils.formatUnits(balance, currency.decimals),
            loading: false,
          });
        },
      }}
    />
    <TokenWrapper>
      <TokenImg src={currency.icon} />
      <TokenName>{currency.name}</TokenName>
      {selectedTokenAddress === currency.address && (
        <CheckIcon>
          <Widget src="bluebiu.near/widget/Base.Bridge.CheckedIcon" />
        </CheckIcon>
      )}
    </TokenWrapper>
    <Balance>{utils.balanceFormated(currency)}</Balance>
  </Item>
);
