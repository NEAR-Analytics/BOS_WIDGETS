State.init({
  chainId: undefined,
  walletAddress: null,
  balance: null,
  walletConnected: false,
  tabSelect: 0,
  chains: {
    25925: {
      id: 25925,
      name: "Bitkub Chain Testnet",
      rpcUrl: "https://rpc-testnet.bitkubchain.io",
      currencySymbol: "tKUB",
      nativeCurrency: ETH_TOKEN,
      image:
        "https://ipfs.near.social/ipfs/bafkreicksbcmv5i7ezaw5b2424vliuegcbgfckjc4qt73eql67pdmrvvfu",
    },
    96: {
      id: 96,
      name: "Bitkub Chain",
      name: "Bitkub Chain Testnet",
      rpcUrl: "https://rpc.bitkubchain.io",
      currencySymbol: "KUB",
      nativeCurrency: ETH_TOKEN,
      image:
        "https://ipfs.near.social/ipfs/bafkreicksbcmv5i7ezaw5b2424vliuegcbgfckjc4qt73eql67pdmrvvfu",
    },
    3501: {
      id: 3501,
      name: "JFIN Chain",
      rpcUrl: "https://rpc.jfinchain.com",
      currencySymbol: "jfin",
      nativeCurrency: ETH_TOKEN,
      image:
        "https://ipfs.near.social/ipfs/bafkreia4w3mcfsrvcoh3r44x5nxrmarrt5xr3nta7dnw7pjfufd3b3anki",
    },
    35011: {
      id: 35011,
      name: "J2O Taro",
      rpcUrl: "https://rpc.j2o.io",
      nativeCurrency: ETH_TOKEN,
      currencySymbol: "taro",
      image:
        "https://ipfs.near.social/ipfs/bafkreia4w3mcfsrvcoh3r44x5nxrmarrt5xr3nta7dnw7pjfufd3b3anki",
    },
  },
  adsContent:
    '<Widget src="jimmy-ez.near/widget/billbos-craete-ads" props={{}} />',
});

const DEFAULT_CHAIN_ID = 25925;
const CHAIN_LIST = [25925, 3501, 35011, 96];
const ETH_TOKEN = { name: "Ethereum", symbol: "ETH", decimals: 18 };

function switchEthereumChain(chainId) {
  const chainIdHex = `0x${chainId.toString(16)}`;
  const res = Ethers.send("wallet_switchEthereumChain", [
    { chainId: chainIdHex },
  ]);

  //   if (res === undefined) {
  //     console.log(
  //       `Failed to switch chain to ${chainId}. Add the chain to wallet`
  //     );
  //     Ethers.send("wallet_addEthereumChain", [
  //       {
  //         chainId: chainIdHex,
  //         chainName: state.chains[chainId].name,
  //         nativeCurrency: state.chains[chainId].nativeCurrency,
  //         rpcUrls: [state.chains[chainId].rpcUrl],
  //       },
  //     ]);
  //   }
}

function setTabSelect(index) {
  State.update({
    tabSelect: index,
  });
}

if (
  state.chainId === undefined &&
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

const earningCard = (title, amount) => {
  return (
    <div>
      <div>
        <p className="text-xs secondary-text">{title}</p>
        <p className="text-2xl">{amount} USDT</p>
      </div>
    </div>
  );
};

const fectEarning = () => {
  const mockEaningData = [{}];
};

function tapCampaigns() {
  return (
    <div className="container">
      <div className="flex justify-between py-8 items-center">
        <div>
          <h2 className="font-semibold text-xl ">Campaigns</h2>
          <p className="text-sm">
            Unlock the power of onchain data for Web3 Ads
          </p>
        </div>
        <div>
          <Widget src="jimmy-ez.near/widget/billbos-craete-ads" props={{}} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <div key={index}>
              <Widget src="jimmy-ez.near/widget/billbos-ads-card" props={{}} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function tapRewards() {
  return (
    <div>
      <div
        style={{ height: "430px" }}
        className="bg-black container flex items-center"
      >
        <div className="w-96 text-white">
          <h2 className="text-4xl font-semibold">
            Generate Ads ID. Earn Crypto Together
          </h2>
          <p className="mt-2">Earn up to 20% commission on every view</p>
        </div>
      </div>
      <div
        style={{ marginTop: "-50px" }}
        className="container rounded-t-3xl gray-surface min-h-screen"
      >
        <div className="flex justify-between py-8 items-center ">
          <div>
            <h2 className="font-semibold text-xl ">Campaigns</h2>
            <p className="text-sm">
              Unlock the power of onchain data for Web3 Ads
            </p>
          </div>
          <div>
            <Widget
              src="chayanonc-ph.near/widget/billbos-ads"
              props={{
                btnName: "Get my ads component",
                btnClass:
                  "brand-green px-2.5 py-2 rounded-xl text-white text-sm font-semibold",
                height: "467px",
                width: "550px",
                isOpenDefault: false,
                body: (
                  <div className="flex flex-wrap justify-center w-full ">
                    <div style={{ width: "482px" }}>
                      <div>
                        <p className="font-semibold text-lg">
                          Get my Ads Component
                        </p>
                        <p className="tertiary-text text-sm">
                          Give your teammates access to this presets and start
                          collaborating in real time.
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-px bg-gray-200 my-4 "></div>
                    <div
                      style={{ width: "482px", height: "280px" }}
                      className="text-sm p-3 bg-gray-100 rounded-xl mt-2 relative"
                    >
                      <div
                        className="absolute top-3 right-3 cursor-pointer z-10"
                        onClick={() => {
                          copyContent(state.adsContent);
                        }}
                      >
                        <Widget
                          src="mob.near/widget/CopyButton"
                          props={{
                            className: "bg-gray-100",
                            text: state.adsContent,
                            clipboardIcon: (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_3757_2743)">
                                  <path
                                    d="M10.6654 0.666687H2.66536C1.93203 0.666687 1.33203 1.26669 1.33203 2.00002V11.3334H2.66536V2.00002H10.6654V0.666687ZM12.6654 3.33335H5.33203C4.5987 3.33335 3.9987 3.93335 3.9987 4.66669V14C3.9987 14.7334 4.5987 15.3334 5.33203 15.3334H12.6654C13.3987 15.3334 13.9987 14.7334 13.9987 14V4.66669C13.9987 3.93335 13.3987 3.33335 12.6654 3.33335ZM12.6654 14H5.33203V4.66669H12.6654V14Z"
                                    fill="#C3C5C7"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3757_2743">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            ),
                          }}
                        />
                      </div>
                      <div className="w-96">{state.adsContent}</div>
                    </div>
                  </div>
                ),
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="p-3 bg-white rounded-xl ">
            <div>
              <p className="text-xs secondary-text">Total Earnings</p>
              <p className="text-xl mt-1 font-medium">100.20 USDT</p>
            </div>
          </div>
          <div className="p-3 bg-white rounded-xl">
            <div>
              <p className="text-xs secondary-text">My Total View</p>
              <p className="text-xl mt-1 font-medium">100.20 USDT</p>
            </div>
          </div>
          <div className="p-3 bg-white rounded-xl">
            <div>
              <p className="text-xs secondary-text">My Total Earnings</p>
              <p className="text-xl mt-1 font-medium">100.20 USDT</p>
            </div>
          </div>
        </div>
        <div className="w-full my-4">
          <p className="text-sm font-medium">Reward</p>
        </div>
        <div className="flex gap-3">
          {Array.from({ length: 2 }).map((_, i) => {
            return (
              <Widget
                src="porx-dev.near/widget/billbos-reward-card"
                props={{}}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function tapDashboard() {
  const earningCards = [
    {
      title: "Total Staked",
      ipfsUrl: "bafkreigb2h33nc6bpa2gcuvbs46eys4bbb6djibx76xknbrkswtqfqlyzm",
    },
    {
      title: "Total Earnings",
      ipfsUrl: "bafkreievjy5wntddg6augnywctekhic3dttnf57h4dhjkypyx5mhjci2ou",
    },
    {
      title: "Total View Ads",
      ipfsUrl: "bafkreid32njwsekcwj3uvbfrz7upc6iqpz5tzxbymw5jb7kye5axdgnmri",
    },
  ];

  return (
    <div
      style={{
        height: "221px",
      }}
      className="brand-gradient-green-radial w-full "
    >
      <div className="container">
        <div className="text-white pt-10">
          <p className="font-semibold text-xl">BillBos Dashboard</p>
          <p className="text-sm font-medium">
            Unlock the power of onchain data for Web3 Ads
          </p>
        </div>
        <div className="w-full grid grid-cols-3 gap-4 mt-16 pt-2 ">
          {earningCards.map((item, i) => {
            return (
              <div key={i} className="h-full">
                <Widget
                  src="chayanonc-ph.near/widget/billbos-earning-card"
                  props={{
                    title: item.title,
                    amountUSDT: item.usdt,
                    amountTHB: item.thb,
                    totalView: i == 2 ? "19,002" : "",
                    ipfsUrl: `https://ipfs.near.social/ipfs/${item.ipfsUrl}`,
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="my-10">
          <p className="font-semibold ">Top Ads</p>
        </div>
      </div>
    </div>
  );
}

function tabComponent() {
  if (state.tabSelect == 0) {
    return tapDashboard();
  } else if (state.tabSelect == 1) {
    return tapCampaigns();
  } else if (state.tabSelect == 2) {
    return tapRewards();
  }
}

const main = (
  <div className="relative gray-surface ">
    <div>
      {state.walletConnected ? (
        <div>
          <div className="sticky top-0 z-10 bg-white">
            <Widget
              src="chayanonc-ph.near/widget/billbos-header"
              props={{
                walletAddress: state.walletAddress,
                chainId: state.chainId,
                setTabSelect: (index) => setTabSelect(index),
                chains: state.chains,
              }}
            />
          </div>
          {state.chainId !== undefined &&
          !CHAIN_LIST.includes(state.chainId) ? (
            <div className="w-full">Chain not support </div>
          ) : (
            <div className=" min-h-screen w-full">
              <div>{tabComponent()}</div>
            </div>
          )}
        </div>
      ) : (
        <Widget src="porx-dev.near/widget/billbos-authen" props={{}} />
      )}
    </div>
  </div>
);

return (
  <>
    <Widget
      src="chayanonc-ph.near/widget/billbos-css"
      props={{ children: main }}
    />
  </>
);
