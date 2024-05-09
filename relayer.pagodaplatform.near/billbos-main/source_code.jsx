State.init({
  chainId: undefined,
  walletAddress: null,
  viewOfMonth: 0,
  viewOfWalletAddress: 0,
  ratioOfWalletAddress: 0,
  totalEarningBalance: 0,
  totalStakedBalance: 0,
  monthCount: 0,
  walletConnected: false,
  ads: [],
  adsUser: [],
  tabSelect: 0,
  chains: {
    25925: {
      id: 25925,
      billBOSCore: "0x8995e9741A2b9c7f1Bb982d08c360F2951a23c24",
      name: "Bitkub Chain",
      rpcUrl: "https://rpc-testnet.bitkubchain.io",
      currencySymbol: "tKUB",
      nativeCurrency: ETH_TOKEN,
      image:
        "https://ipfs.near.social/ipfs/bafkreicksbcmv5i7ezaw5b2424vliuegcbgfckjc4qt73eql67pdmrvvfu",
    },
    35011: {
      id: 35011,
      name: "J2O Taro",
      billBOSCore: "0x9d8b5e3C762167a409Db7f11a38b17dE9192E136",
      rpcUrl: "https://rpc.j2o.io",
      nativeCurrency: ETH_TOKEN,
      currencySymbol: "taro",
      image:
        "https://ipfs.near.social/ipfs/bafkreia4w3mcfsrvcoh3r44x5nxrmarrt5xr3nta7dnw7pjfufd3b3anki",
    },
  },
});

const [adsInfo, setAdsInfo] = useState({});
const fE = ethers.utils.formatEther;

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
  Ethers.send("wallet_switchEthereumChain", [{ chainId: chainIdHex }]);
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

const fetchApi = (queryURI, method) => {
  return asyncFetch(queryURI, {
    method: method,
  });
};

const handleRequest = (query, viewCase) => {
  const e = BACKEND_API + query;
  switch (viewCase) {
    case "viewOfMonth":
      fetchApi(e, "GET").then((res) => {
        if (res.ok) {
          State.update({ viewOfMonth: res.body.view });
        }
      });
      return;
    case "viewOfWalletAddress":
      fetchApi(e, "GET").then((res) => {
        if (res.ok) {
          State.update({ viewOfWalletAddress: res.body.view });
        }
      });
      return;
    case "ratioOfWalletAddress":
      fetchApi(e, "GET").then((res) => {
        if (res.ok) {
          State.update({ ratioOfWalletAddress: res.body.ration });
        }
      });
      return;
    case "ad-view-by-adId":
      return fetchApi(e, "GET").then((res) => {
        return res;
      });
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
    State.update({ walletConnected: true });
  } else {
    State.update({ walletConnected: false });
  }
}
checkProvider();

function getRpcProvider(chainId) {
  const chain = state.chains[chainId];
  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl, chain.id);
  return provider;
}

function formatAds(item, chainId) {
  const adsId = parseInt(item[0]);
  const res = handleRequest(
    `/ads/ad-view-by-adId?adId=${adsId}&month=${state.monthCount}&chainId=${chainId}`,
    "ad-view-by-adId"
  );
  res.then((res) => {
    adsInfo[`${chainId}-${adsId}-adsView`] = res.ok ? res.body.view : "0";
  });

  const adsStakedBalance = iface.encodeFunctionData("adsStakedBalance", [
    item[0],
  ]);
  Ethers.provider()
    .call({
      to: state.chains[chainId].billBOSCore,
      data: adsStakedBalance,
    })
    .then((raw) => {
      adsInfo[`${chainId}-${adsId}-staked`] = raw || "0";
    });

  return {
    adsId: "" + parseInt(item[0]),
    adsContent: {
      name: item[1][0],
      imageCID: item[1][1],
      newTabLink: item[1][2],
      widgetLink: item[1][3],
      isInteractive: item[1][4],
    },
    chainId: "" + chainId,
  };
}

function onClaim() {
  const signer = Ethers.provider().getSigner();
  const contract = new ethers.Contract(
    state.chains[state.chainId].billBOSCore,
    BillBOSCoreABI,
    signer
  );
  contract.claimReward();
}

function getRewards() {
  const signer = Ethers.provider().getSigner();
  const contract = new ethers.Contract(
    state.chains[state.chainId].billBOSCore,
    BillBOSCoreABI,
    signer
  );

  contract.getReward(state.walletAddress).then((res) => {
    adsInfo["0"] = fE(res[0]);
    adsInfo["1"] = fE(res[1]);
  });
}

function getTotalDashboard() {
  const promiseList = [];
  const chainId = state.chainId;
  const provider = getRpcProvider(chainId);
  const contract = new ethers.Contract(
    state.chains[chainId].billBOSCore,
    BillBOSCoreABI,
    provider
  );
  promiseList.push(contract.totalStakedBalanceLast());
  promiseList.push(contract.totalEarningBalanceLast());
  promiseList.push(contract.monthCount());
  promiseList.push(contract.getAds());

  Promise.all(promiseList).then((values) => {
    const adsAll = values[3].map((item) => {
      return formatAds(item, state.chainId);
    });
    State.update({
      totalStakedBalance: fE(values[0]),
      totalEarningBalance: fE(values[1]),
      monthCount: parseInt(values[2]),
      ads: adsAll,
    });
  });
}

function getAdsByAddress(walletAddress) {
  const billbosCoreAddress = state.chains[state.chainId].billBOSCore;
  const getAdsUserData = iface.encodeFunctionData("getAdsUser", [
    walletAddress,
  ]);
  const raw = Ethers.provider()
    .call({
      to: billbosCoreAddress,
      data: getAdsUserData,
    })
    .then((raw) => {
      return new Promise((resolve, reject) => {
        const result = iface.decodeFunctionResult("getAdsUser", raw);
        resolve(result);
      });
    });

  raw.then((res) => {
    const adsAll = res[0].map((item) => {
      return formatAds(item, state.chainId);
    });
    State.update({
      adsUser: adsAll || [],
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
            <div className="grid grid-cols-3 gap-3 z-20">
              {state.adsUser.map((item, index) => {
                return (
                  <div key={index}>
                    <Widget
                      src="jimmy-ez.near/widget/billbos-ads-card"
                      props={{
                        ...item,
                        adsStakedBalance:
                          adsInfo[`${item.chainId}-${item.adsId}-staked`] ||
                          "10000000",
                        adsViewed:
                          adsInfo[`${item.chainId}-${item.adsId}-adsView`],
                        isShowAction: true,
                        coreContractAddress:
                          state.chains[state.chainId].billbosCoreAddress,
                      }}
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

  getRewards();
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
              <h2 className="font-semibold text-xl ">Overview</h2>
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
                <p className="text-xl mt-1 font-medium">
                  {state.totalEarningBalance}
                </p>
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
              return (
                <Widget
                  src="porx-dev.near/widget/billbos-reward-card"
                  props={{
                    chainName: state.chains[item].name,
                    amount: adsInfo[`${i}`],
                    tokenName: "USDT",
                    onClaim: onClaim,
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
if (state.chainId) {
  getTotalDashboard();
}

function tapDashboard() {
  // get total view ads
  handleRequest("/ads/total-ad-view?month=1", "viewOfMonth");

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
                    totalView: i == 2 ? "" + state.viewOfMonth : "",
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
                  props={{
                    ...item,
                    adsStakedBalance:
                      adsInfo[`${item.chainId}-${item.adsId}-staked`] ||
                      "10000000",
                    adsViewed: adsInfo[`${item.chainId}-${item.adsId}-adsView`],
                  }}
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
  <div
    style={{ height: "400vh" }}
    className="relative gray-surface  overflow-y-scroll"
  >
    <div>
      <div className="h-screen ">
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
          <div className=" w-full">
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
