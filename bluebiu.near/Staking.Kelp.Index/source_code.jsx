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
  tab: "Stake",
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
const { type } = dexConfig;
const SUPPOR_CHAINS = [...CHAIN_LIST?.map((item) => item.chain_id), 1];

State.init({
  isSupport: true,
});
useEffect(() => {
  Ethers.provider()
    .getNetwork()
    .then((res) => {
      State.update({
        isSupport: SUPPOR_CHAINS.includes(res.chainId),
      });
    })
    .catch((err) => {
      console.log("catch-getNetwork-error--", err);
    });
}, []);

const tabsArray = [
  { key: "Stake", label: "Stake" },
  { key: "Unstake", label: "Unstake" },
  { key: "Withdraw", label: "Withdraw" },
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
      src="bluebiu.near/widget/Staking.Kelp.Content"
      props={{
        ...props,
        tab: state.tab,
      }}
    />

    {!state.isSupport && (
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
