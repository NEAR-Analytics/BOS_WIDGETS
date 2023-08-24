const useNetwork = (mainnet, testnet) => {
  return context.networkId === "mainnet" ? mainnet : testnet;
};

State.init({
  contractId: props.contractId,
  source: context.networkId,
});

return (
  <>
    <Widget
      src={`${state.config.ownerId}/widget/SourceScan.Layout.Navbar`}
      props={{
        app: state.config.app,
        theme: state.theme,
        switchTheme: switchTheme,
      }}
    />
  </>
);
