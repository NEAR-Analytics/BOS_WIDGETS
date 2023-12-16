State.init({
  chainId: null,
  walletAddress: null,
  balance: null,
  walletConnected: false,
  tabSelect: 0,
  chains: {
    25925: {
      name: "Bitkub Chain Testnet",
      id: 25925,
      image:
        "https://ipfs.near.social/ipfs/bafkreicksbcmv5i7ezaw5b2424vliuegcbgfckjc4qt73eql67pdmrvvfu",
    },
    96: {
      name: "Bitkub Chain Mainnet",
      id: 96,
    },
    3501: {
      name: "JFIN Chain",
      id: 3501,
      image:
        "https://ipfs.near.social/ipfs/bafkreia4w3mcfsrvcoh3r44x5nxrmarrt5xr3nta7dnw7pjfufd3b3anki",
    },
  },
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
    provider
      .getSigner()
      ?.getBalance()
      .then((balance) => State.update({ balance: balance }));
    State.update({ walletConnected: true });
  } else {
    State.update({ walletConnected: false, balance: null });
  }
}
checkProvider();

function tabComponent() {
  if (state.tabSelect == 0) {
    return <div>0</div>;
  } else if (state.tabSelect == 1) {
    return (
      <div className="grid grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <div key={index}>
              <Widget src="jimmy-ez.near/widget/billbos-ads-card" props={{}} />
            </div>
          );
        })}
      </div>
    );
  } else if (state.tabSelect == 2) {
    return <div>2</div>;
  }
}

const main = (
  <div className="relative gray-surface ">
    {JSON.stringify(state)}
    <div>
      {state.walletConnected ? (
        <div>
          <div className="sticky top-0 z-10 bg-white">
            <Widget
              src="porx-dev.near/widget/billbos-header"
              props={{
                walletAddress: state.walletAddress,
                chainId: state.chainId,
                setTabSelect: (index) => setTabSelect(index),
                chains: state.chains,
              }}
            />
          </div>
          <div className="container flex justify-between my-4">
            <div>
              <h2 className="font-semibold text-xl">Campaigns</h2>
              <p className="text-sm">
                Unlock the power of onchain data for Web3 Ads
              </p>
            </div>
            <div>
              <Widget
                src="jimmy-ez.near/widget/billbos-craete-ads"
                props={{}}
              />
            </div>
          </div>
          <div className="container min-h-screen w-full">
            <div>{tabComponent()}</div>
          </div>
        </div>
      ) : (
        <Widget src="porx-dev.near/widget/billbos-authen" props={{}} />
      )}
    </div>
  </div>
);

return (
  <>
    <Widget src="porx-dev.near/widget/billbos-css" props={{ children: main }} />
  </>
);
