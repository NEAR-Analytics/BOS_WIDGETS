const {
  currentChainId,
  chainId,
  chainName,
  connectProps,
  defaultDapp,
  addAction,
  toast,
  multicall,
  multicallAddress,
  wethAddress,
  prices,
  account,
} = props;

const dapps = props.dapps || {};

if (!account) {
  return (
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
      props={{
        ...connectProps,
        account,
        isWrongNetwork: false,
      }}
    />
  );
}

useEffect(() => {
  State.update({
    updateData: defaultDapp || "All",
    showDialog: false,
    tableButtonClickData: null,
    currentTab: "Market",
    currentDapp: defaultDapp || "All",
    dapps: {},
  });
}, []);

if (currentChainId !== chainId) {
  return (
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
      props={{
        ...connectProps,
        account,
        isWrongNetwork: true,
      }}
    />
  );
}
const Container = styled.div`
  padding-bottom: 20px;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

const handleTableButtonClick = (address, actionText) => {
  const market = state.markets[address];
  const dapp = state.dapps[market.dapp];
  const dappConfig = dapps[market.dapp];
  State.update({
    tableButtonClickData: {
      ...dapp,
      ...market,
      config: { ...dappConfig, wethAddress },
      actionText,
    },
    showDialog: true,
  });
};
return (
  <Container>
    {state.updateData && (
      <>
        {(state.updateData === "All" || !state.dapps[state.updateData]) && (
          <Widget src="bluebiu.near/widget/0vix.LendingSpinner" />
        )}
        <Widget
          src="bluebiu.near/widget/Avalanche.Lending.Data"
          props={{
            update: state.updateData,
            dapps: dapps,
            chainId,
            multicall,
            multicallAddress,
            wethAddress,
            prices,
            account,
            onLoad: (data) => {
              const { markets, dapp } = data;
              const dapps = state.dapps;
              dapps[dapp.dappName] = dapp;
              const _markets = { ...state.markets, ...markets };
              State.update({
                markets: _markets,
                dapps,
                updateData:
                  state.updateData === "All" && !data.allLoaded ? "All" : "",
                timestamp: Date.now(),
              });
            },
          }}
        />
      </>
    )}
    <Widget
      src="bluebiu.near/widget/Avalanche.Lending.Tabs"
      props={{
        currentTab: state.currentTab,
        onChange: (tab) => {
          State.update({
            currentTab: tab,
            timestamp: Date.now(),
          });
        },
      }}
    />
    <Widget
      src="bluebiu.near/widget/Avalanche.Lending.Dapps"
      props={{
        dapps: Object.values(dapps) || [],
        currentDapp: state.currentDapp,
        onChange: (dapp) => {
          let _updateDapp = "";
          if (dapp == "All") {
            _updateDapp =
              Object.values(dapps).length === Object.values(state.dapps).length
                ? ""
                : "All";
          } else {
            _updateDapp = !state.dapps[dapp] ? dapp : "";
          }
          State.update({
            currentDapp: dapp,
            updateData: _updateDapp,
            timestamp: Date.now(),
          });
        },
      }}
    />
    {state.currentTab === "Market" && (
      <Widget
        src="bluebiu.near/widget/Avalanche.Lending.Market"
        props={{
          currentDapp: state.currentDapp,
          markets: state.markets,
          dapps: state.dapps,
          timestamp: state.timestamp,
          onButtonClick: handleTableButtonClick,
          account,
        }}
      />
    )}
    {state.currentTab === "Yours" && (
      <Widget
        src="bluebiu.near/widget/Avalanche.Lending.Yours"
        props={{
          currentDapp: state.currentDapp,
          markets: state.markets,
          timestamp: state.timestamp,
          dapps: state.dapps,
          dappsConfig: dapps,
          toast,
          account,
          onButtonClick: handleTableButtonClick,
          onSuccess: (dapp) => {
            State.update({
              updateData: dapp,
            });
          },
        }}
      />
    )}
    <Widget
      src="bluebiu.near/widget/Avalanche.Lending.Dialog"
      props={{
        display: state.showDialog,
        data: state.tableButtonClickData,
        chainId,
        addAction,
        toast,
        account,
        onClose: () => {
          State.update({
            showDialog: false,
          });
        },
        onSuccess: () => {
          State.update({
            updateData: state.tableButtonClickData.dappName,
          });
        },
      }}
    />
  </Container>
);
