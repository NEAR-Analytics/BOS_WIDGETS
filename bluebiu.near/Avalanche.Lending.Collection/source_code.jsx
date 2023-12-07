const {
  chainId,
  chainName,
  connectProps,
  dapps,
  defaultDapp,
  multicallv2,
  addAction,
} = props;

const account = Ethers.send("eth_requestAccounts", [])[0];
if (!account) {
  return (
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
      props={{
        ...connectProps,
        isWrongNetwork: false,
      }}
    />
  );
}

State.init({
  chainId: -1,
  updateData: defaultDapp || "All",
  showDialog: false,
  tableButtonClickData: null,
  currentTab: "Market",
  currentDapp: defaultDapp || "All",
  dapps: {},
});

Ethers.provider()
  .getNetwork()
  .then(({ chainId }) => {
    State.update({ chainId });
  })
  .catch(() => {});

if (state.chainId !== chainId) {
  return (
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
      props={{
        ...connectProps,
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
`;

const handleTableButtonClick = (address, actionText) => {
  const market = state.markets[address];
  const dapp = state.dapps[market.dapp];
  const dappConfig = dapps[market.dapp];
  State.update({
    tableButtonClickData: {
      ...dapp,
      ...market,
      config: dappConfig,
      actionText,
    },
    showDialog: true,
  });
};

return (
  <>
    {state.updateData && (
      <>
        {(state.updateData === "All" || !state.dapps[state.updateData]) && (
          <Widget src="bluebiu.near/widget/0vix.LendingSpinner" />
        )}
        <Widget
          src="bluebiu.near/widget/Avalanche.Lending.Data"
          props={{
            multicallv2,
            update: state.updateData,
            dapps: dapps,
            chainId,
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
    <Container>
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
                Object.values(dapps).length ===
                Object.values(state.dapps).length
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
          addAction,
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
          onMessage: (params) => {
            State.update({
              message: params,
            });
          },
        }}
      />
    </Container>
    {state.message?.open && (
      <Widget
        src="bluebiu.near/widget/0vix.LendingMessage"
        props={{
          status: state.message.status,
          text: state.message.text,
          onClose: () => {
            State.update({
              message: { open: false },
            });
          },
        }}
      />
    )}
  </>
);
