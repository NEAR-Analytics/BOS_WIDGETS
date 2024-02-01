const StyledContainer = styled.div`
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

const { markets, VesselManagerOperations } = dexConfig;

State.init({
  newMarkets: "",
  tvl: "",
  deposits: "",
  tokenBal: "",
});

useEffect(() => {
  State.update({
    loading: !chainIdNotSupport,
  });
}, []);

return (
  <StyledContainer>
    {tab === "market" && (
      <Widget
        src="bluebiu.near/widget/Lending.LiquityMarkets"
        props={{
          addAction,
          toast,
          chainId,
          nativeCurrency,
          dexConfig: {
            ...dexConfig,
            markets: state.newMarkets,
          },
          tokenBal: state.tokenBal,
          deposits: state.deposits,
          account,
          prices,
          onSuccess: () => {
            State.update({
              loading: true,
            });
          },
        }}
      />
    )}
    {tab === "yours" && (
      <Widget
        src="bluebiu.near/widget/Lending.LiquityYours"
        props={{
          ...props,
          tvl: state.tvl,
          deposits: state.deposits,
          tokenBal: state.tokenBal,
          dexConfig: {
            ...dexConfig,
            markets: state.newMarkets,
          },
          onSuccess: () => {
            // fresh balance..
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
            timestamp: Date.now(),
            ...data,
          });
        },
      }}
    />
    {/* <Widget
      src="bluebiu.near/widget/Avalanche.Lending.Dialog"
      props={{
        display: state.showDialog,
        data: state.tableButtonClickData,
        chainId,
        addAction,
        toast,
        source: "dapp",
        onClose: () => {
          State.update({
            showDialog: false,
          });
        },
        onSuccess: () => {
          State.update({
            loading: true,
          });
        },
      }}
    /> */}
  </StyledContainer>
);
