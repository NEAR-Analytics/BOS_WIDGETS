const StyledContainer = styled.div`
  padding-top: 34px;
  width: 1244px;
  margin: 0 auto;
`;
const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

State.init({
  tab: "BORROW",
  chainId: -1,
});

const {
  CHAIN_LIST,
  curChain,
  dexConfig,
  wethAddress,
  multicallAddress,
  multicall,
  prices,
  onSwitchChain,
  switchingChain,
  addAction,
  toast,
  chainId,
  nativeCurrency,
  isChainSupported,
  account,
} = props;

let tabsArray = [
  { key: "BORROW", label: "Borrow" },
  { key: "EARN", label: "Earn" },
];

return (
  <StyledContainer style={dexConfig.theme}>
    <StyledHeader>
      <Widget
        src="bluebiu.near/widget/Lending.CardTabs"
        props={{
          tabs: tabsArray,
          active: state.tab,
          onChange: (tab) => {
            State.update({
              tab: tab.key,
            });
          },
        }}
      />
      <Widget
        src="bluebiu.near/widget/Lending.Chains"
        props={{
          chains: CHAIN_LIST,
          curChain,
          onSwitchChain,
          onChange: (tab) => {
            State.update({
              tab: tab.key,
            });
          },
        }}
      />
    </StyledHeader>

    <Widget
      src="bluebiu.near/widget/Lending.Sturdy.Content"
      props={{
        ...props,
        tab: state.tab,
      }}
    />

    {!isChainSupported && (
      <Widget
        src="bluebiu.near/widget/Swap.ChainWarnigBox"
        props={{
          chain: curChain,
          onSwitchChain: onSwitchChain,
          switchingChain: switchingChain,
          theme: dexConfig.theme?.button,
        }}
      />
    )}
  </StyledContainer>
);
