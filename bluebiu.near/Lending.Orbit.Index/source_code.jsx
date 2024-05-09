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
const StyledRight = styled.div`
  display: flex;
  align-items: center;
  color: white;
  gap: 10px;
`;

State.init({
  tab: "market",
  chainId: -1,
  orbitTab: "ORBIT",
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
  { key: "market", label: "Market" },
  { key: "yours", label: "Yours" },
];

let orbitArray = [
  { key: "ORBIT", label: "ORBIT" },
  { key: "RENZO", label: "RENZO" },
  { key: "KELP", label: "KELP" },
];

const switchToMarkets = () => {
  State.update({
    tab: "market",
  });
};

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
      <StyledRight>
        Pool:
        <Widget
          src="bluebiu.near/widget/Lending.CardTabs"
          props={{
            tabs: orbitArray,
            active: state.orbitTab,
            onChange: (tab) => {
              State.update({
                orbitTab: tab.key,
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
      </StyledRight>
    </StyledHeader>
    <Widget
      src="bluebiu.near/widget/Lending.Orbit.Content"
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
        orbitTab: state.orbitTab,
        switchToMarkets,
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
