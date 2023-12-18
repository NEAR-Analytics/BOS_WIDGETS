State.init({
  chainId: undefined,
  walletAddress: null,
  balance: null,
  test: null,
  viewOfMonth: 0,
  viewOfWalletAddress: 0,
  ratioOfWalletAddress: 0,
  totalEarningBalance: 0,
  totalStakedBalance: 0,
  monthCount: 0,
  walletConnected: false,
  response: null,
  ads: [],
  adsUser: [],
  tabSelect: 0,
  contract: {
    35011: {
      mockERC20: "0xb74094e9f7B64CcF2C094d2A00347Dd5F5cf771d",
      mockCompound: "0xfe30dDb8030B6683B5d39Faf8B04CB152bAd5880",
      billBOSCore: "0x64ADc655a088ea04a9B1929e9930c4e9E49D962e",
      bBCompoundAdapter: "0x52221240b10635F6E63f20e1bEA6Bda3C15fa5F6",
    },
    25925: {
      mockERC20: "0x90430340366FA3557BD7A5c919f2C41975eDb6B2",
      mockCompound: "0xA5B3D12f82597065A40026F7A787427Ca264A192",
      billBOSCore: "0x8995e9741A2b9c7f1Bb982d08c360F2951a23c24",
      bBCompoundAdapter: "0xBD3a0fe0ac7161bFb12094AAaED64F3A4259075c",
    },
  },
  chains: {
    25925: {
      id: 25925,
      name: "Bitkub Chain",
      rpcUrl: "https://rpc-testnet.bitkubchain.io",
      currencySymbol: "tKUB",
      nativeCurrency: ETH_TOKEN,
      image:
        "https://ipfs.near.social/ipfs/bafkreicksbcmv5i7ezaw5b2424vliuegcbgfckjc4qt73eql67pdmrvvfu",
    },
    96: {
      id: 96,
      name: "Bitkub Chain",
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

const BACKEND_API = "https://api-billbos.0xnutx.space";
const DEFAULT_CHAIN_ID = 25925;
const CHAIN_LIST = [25925, 35011];
const ETH_TOKEN = { name: "Ethereum", symbol: "ETH", decimals: 18 };

const BillBOSCoreABI = fetch(
  "https://gist.githubusercontent.com/jimmy-ez/0344bb9cce14ced6c6e7f89d7d1654ce/raw/e7dd9962a90819f71de155b1f68f276eed07790a/BillBOSCoreABIV3.json"
).body;

if (!BillBOSCoreABI) {
  return "Loading";
}

const iface = new ethers.utils.Interface(BillBOSCoreABI);

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

const fetchApi = (queryURI, method, data) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) options[body] = JSON.stringify(data);
  return asyncFetch(queryURI, options);
};

const handleRequest = (query, viewCase) => {
  const endpoint = BACKEND_API + query;
  switch (viewCase) {
    case "viewOfMonth":
      fetchApi(endpoint, "GET", "").then((res) => {
        State.update({
          response: res,
        });
        if (res.ok) {
          State.update({ viewOfMonth: res.body.view });
        }
      });
      return;
    case "viewOfWalletAddress":
      fetchApi(endpoint, "GET", "").then((res) => {
        if (res.ok) {
          State.update({ viewOfWalletAddress: res.body.view });
        }
      });
      return;
    case "ratioOfWalletAddress":
      fetchApi(endpoint, "GET", "").then((res) => {
        if (res.ok) {
          State.update({ ratioOfWalletAddress: res.body.ration });
        }
      });
      return;
    default:
      break;
  }
};

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

function getRpcProvider(chainId) {
  const chain = state.chains[chainId];
  const rpc = chain.rpcUrl;
  const provider = new ethers.providers.JsonRpcProvider(rpc, chain.id);
  return provider;
}

function formatAds(item, chainId) {
  console.log({ item });
  return {
    adsId: "" + parseInt(item[0]),
    adsContent: {
      name: item[1][0],
      imageCID: item[1][1],
      newTabLink: item[1][2],
      widgetLink: item[1][3],
      isInteractive: item[1][4],
    },
    adsStakedBalance: "10000000",
    adsViewed: "7235",
    chainId: chainId.toString(),
  };
}

function getTotalDashboard() {
  const chainsDefault = [25925];

  const promiseList = [];

  for (let i = 0; i < chainsDefault.length; i++) {
    const chainId = chainsDefault[i];
    const provider = getRpcProvider(chainId);
    const contract = new ethers.Contract(
      state.contract[chainId].billBOSCore,
      BillBOSCoreABI,
      provider
    );

    const staked = contract.totalStakedBalanceLast();
    promiseList.push(staked);

    const earning = contract.totalEarningBalanceLast();
    promiseList.push(earning);

    const month = contract.monthCount();
    promiseList.push(month);

    const adsAll = contract.getAds();
    promiseList.push(adsAll);
  }

  Promise.all(promiseList).then((values) => {
    console.log("values", values);

    const adsAll = values[3].map((item) => {
      return formatAds(item, state.chainId);
    });

    State.update({
      totalStakedBalance: ethers.utils.formatEther(values[0]),
      totalEarningBalance: ethers.utils.formatEther(values[1]),
      monthCount: ethers.utils.formatEther(values[2]),
      ads: adsAll,
    });
  });
}

function getAdsByAddress(walletAddress) {
  const billbosCoreAddress = state.contract[state.chainId].billBOSCore;
  const getAdsUserData = iface.encodeFunctionData("getAdsUser", [
    walletAddress,
  ]);

  const raw = Ethers.provider()
    .call({
      to: billbosCoreAddress,
      data: getAdsUserData,
    })
    .then((raw) => {
      // decode the result
      return new Promise((resolve, reject) => {
        const result = iface.decodeFunctionResult("getAdsUser", raw);
        resolve(result);
      });
    });

  raw.then((res) => {
    console.log(res[0]);
    const adsAll = res[0].map((item) => {
      return formatAds(item, state.chainId);
    });
    console.log({ adsAll, ads: state.ads });
    State.update({
      adsUser: adsAll,
    });
  });
}

if (state.tabSelect != 1) {
  State.update({
    adsUser: [],
  });
}

if (state.tabSelect == 1 && state.adsUser.length == 0) {
  getAdsByAddress(state.walletAddress);
}

function tapCampaigns() {
  return (
    <div className="container">
      <div className="w-full">
        {state.walletConnected ? (
          <>
            <div className="flex justify-between py-8 items-center">
              <div>
                <h2 className="font-semibold text-xl ">Campaigns</h2>
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
            <div className="grid grid-cols-3 gap-3">
              {state.adsUser.map((item, index) => {
                return (
                  <div key={index}>
                    <Widget
                      src="jimmy-ez.near/widget/billbos-ads-card"
                      props={{ ...item, isShowAction: true }}
                    />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className=" flex justify-center">
            <div className="w-1/2">
              <Widget
                src="chayanonc-ph.near/widget/billbos-authen"
                props={{}}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function tapRewards() {
  // get view of page owner
  const walletAddress = state.walletAddress;
  const month = state.monthCount;

  handleRequest(
    `/ads/total-webpageowner-view-by-owner-address?month=${month}&walletAddress=${walletAddress}`,
    "viewOfWalletAddress"
  );

  handleRequest(
    `/ads/ratio-webpageOwnerview-by-allwebpageOwner?month=${month}&walletAddress=${walletAddress}`,
    "ratioOfWalletAddress"
  );

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
      {state.walletConnected ? (
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
                  body: "",
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
                <p className="text-xl mt-1 font-medium">
                  {state.viewOfWalletAddress}
                </p>
              </div>
            </div>
            <div className="p-3 bg-white rounded-xl">
              <div>
                <p className="text-xs secondary-text">My Total Earnings</p>
                <p className="text-xl mt-1 font-medium">
                  {state.ratioOfWalletAddress * state.viewOfWalletAddress} USDT
                </p>
              </div>
            </div>
          </div>
          <div className="w-full my-4">
            <p className="text-sm font-medium">Reward</p>
          </div>
          <div className="flex gap-3">
            {CHAIN_LIST.map((item, i) => {
              const chainConfig = state.chains[item];

              return (
                <Widget
                  src="porx-dev.near/widget/billbos-reward-card"
                  props={{
                    chainName: chainConfig.name,
                    amount: "1000.20",
                    tokenName: "USDT",
                    onClaim: () => {},
                  }}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div
            style={{ marginTop: "-50px" }}
            className="container rounded-t-3xl gray-surface min-h-screen"
          >
            <div className=" flex justify-center">
              <div className="w-1/2">
                <Widget
                  src="chayanonc-ph.near/widget/billbos-authen"
                  props={{}}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

getTotalDashboard();

function tapDashboard() {
  // get total view ads
  handleRequest("/ads/total-ad-view?month=1", "viewOfMonth");
  console.log("state.totalStaked", state.totalStaked);
  const earningCards = [
    {
      title: "Total Staked",
      ipfsUrl: "bafkreigb2h33nc6bpa2gcuvbs46eys4bbb6djibx76xknbrkswtqfqlyzm",
      usdt: state.totalStakedBalance,
      thb: parseFloat(state.totalStakedBalance) * 35,
    },
    {
      title: "Total Earnings",
      ipfsUrl: "bafkreievjy5wntddg6augnywctekhic3dttnf57h4dhjkypyx5mhjci2ou",
      usdt: state.totalEarningBalance,
      thb: parseFloat(state.totalEarningBalance) * 35,
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
                    usdt: item.usdt,
                    thb: item.thb,
                    totalView: i == 2 ? state.viewOfMonth.toString() : "",
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
        <div className="grid grid-cols-3 gap-3">
          {state.ads.map((item, index) => {
            return (
              <div key={index}>
                <Widget
                  src="jimmy-ez.near/widget/billbos-ads-card"
                  props={{ ...item }}
                />
              </div>
            );
          })}
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
  <div className="relative gray-surface min-h-screen">
    <div>
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
        {state.chainId !== undefined && !CHAIN_LIST.includes(state.chainId) ? (
          <div className="w-full">Chain not support </div>
        ) : (
          <div className=" min-h-screen w-full">
            <div>{tabComponent()}</div>
          </div>
        )}
      </div>
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
