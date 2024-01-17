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
  tab: "market",
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
} = props;

const account = Ethers.send("eth_requestAccounts", [])[0];

return (
  <StyledContainer style={dexConfig.theme}>
    <StyledHeader>
      <Widget
        src="bluebiu.near/widget/Lending.CardTabs"
        props={{
          tabs: [
            { key: "market", label: "Market" },
            { key: "yours", label: "Yours" },
          ],
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
      src="bluebiu.near/widget/Lending.Content"
      props={{
        dexConfig,
        wethAddress,
        multicallAddress,
        multicall,
        prices,
        chainIdNotSupport: !isChainSupported,
        account,
        addAction,
        toast,
        chainId,
        nativeCurrency,
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
    <Widget src="dapdapbos.near/widget/Linea.Uniswap.Swap.TokensPrice" />
  </StyledContainer>
);
