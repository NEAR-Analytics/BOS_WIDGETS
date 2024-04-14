const Wrap = styled.div`
  padding-top: 18px;
`;

const {
  dexConfig,
  wethAddress,
  multicallAddress,
  chainIdNotSupport,
  multicall,
  prices,
  account,
  addAction,
  toast,
  chainId,
  nativeCurrency,
  tab,
} = props;

State.init({
  markets: dexConfig.rawMarkets,
  TOKENS: null,
  // tvl: "",
  // deposits: "",
  // tokenBal: "",
});

useEffect(() => {
  State.update({
    loading: !chainIdNotSupport,
  });
}, []);
console.log("PROPS:", props);
console.log("STATE:", state);
return (
  <Wrap>
    {tab === "BORROW" && (
      <Widget
        src="bluebiu.near/widget/Lending.Cog.Markets"
        props={{
          ...props,
          markets: state.markets,
          TOKENS: state.TOKENS,
          onSuccess: () => {
            State.update({
              loading: true,
            });
          },
        }}
      />
    )}
    {tab === "EARN" && (
      <Widget
        src="bluebiu.near/widget/Lending.Cog.Earn"
        props={{
          ...props,
          markets: state.markets,
          TOKENS: state.TOKENS,
          onSuccess: () => {
            State.update({
              loading: true,
            });
          },
        }}
      />
    )}

    <Widget
      src={dexConfig.data}
      props={{
        update: state.loading,
        ...props,
        onLoad: (data) => {
          State.update({
            loading: false,
            // timestamp: Date.now(),
            ...data,
          });
        },
      }}
    />
  </Wrap>
);
