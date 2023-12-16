State.init({
  chainId: null,
  walletAddress: null,
  walletConnected: false,
  tabSelect: 0,
});

const DEFAULT_CHAIN_ID = 25925;
const CHAIN_LIST = [25925, 3501];

function switchEthereumChain(chainId) {
  const chainIdHex = `0x${chainId.toString(16)}`;
  const res = Ethers.send("wallet_switchEthereumChain", [
    { chainId: chainIdHex },
  ]);
}

function setTabSelect(index) {
  State.update({
    tabSelect: index,
  });
}

if (
  state.chainId === null &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((data) => {
      const chainId = data?.chainId;
      if (CHAIN_LIST.includes(chainId)) {
        State.update({ chainId: chainId });
      } else {
        State.update({ chainId: null });
        switchEthereumChain(DEFAULT_CHAIN_ID);
      }

      // const config = getNetworkConfig(chainId);
      // if (!config) {
      //   console.log(`Unsupport chain, chainId: ${chainId}`);
      //   State.update({ isChainSupported: false });
      //   switchEthereumChain(DEFAULT_CHAIN_ID);
      // } else {
      //   State.update({ chainId, isChainSupported: true });
      // }
    });
}

function checkProvider() {
  const provider = Ethers.provider();
  if (provider) {
    provider
      .getSigner()
      ?.getAddress()
      ?.then((address) => {
        State.update({ walletAddress: address });
      });
    State.update({ walletConnected: true });
  } else {
    State.update({ walletConnected: false });
  }
}
checkProvider();

function tabComponent() {
  if (state.tabSelect == 0) {
    return <div>0</div>;
  } else if (state.tabSelect == 1) {
    return <div>1</div>;
  } else if (state.tabSelect == 2) {
    return <div>2</div>;
  }
}

return (
  <div>
    {JSON.stringify(state)}
    <div>
      {state.walletConnected ? (
        <Widget
          src="porx-dev.near/widget/billbos-header"
          props={{
            walletAddress: state.walletAddress,
            chainId: state.chainId,
            setTabSelect: (index) => setTabSelect(index),
          }}
        />
      ) : (
        <Widget src="porx-dev.near/widget/billbos-authen" props={{}} />
      )}
    </div>
    <div className="container">{tabComponent()}</div>
  </div>
);
