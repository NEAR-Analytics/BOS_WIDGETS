const StyledContainer = styled.div``;
const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const { dexConfig, CHAIN_LIST, curChain, onSwitchChain } = props;
console.log("CHAIN_LIST--", CHAIN_LIST);
let tabsArray = [
  { key: "LP", label: "LP" },
  { key: "MANAGED", label: "Managed" },
];
State.init({
  tab: "LP",
});
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
      src="bluebiu.near/widget/Staking.Teahouse.Content"
      props={{
        ...props,
        tab: state.tab,
      }}
    />
  </StyledContainer>
);
