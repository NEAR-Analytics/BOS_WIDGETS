State.init({
  chainId: undefined,
  walletAddress: null,
  viewOfMonth: 0,
  viewOfWalletAddress: 0,
  ratioOfWalletAddress: 0,
  totalEarningBalance: 0,
  totalStakedBalance: 0,
  monthCount: 0,
  earningBalance: undefined,
  stakedBalance: undefined,
  walletConnected: false,
  ads: [],
  adsUser: [],
  tabSelect: 0,
  chains: {
    25925: {
      id: 25925,
      billBOSCore: "0xD8D21C24F8513E35bdC26832aD366ac2F4EE0d7F",
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
      billBOSCore: "0x21559144afcD0C2E3Ba5D0A6e41c46276663983B",
      rpcUrl: "https://rpc.j2o.io",
      nativeCurrency: ETH_TOKEN,
      currencySymbol: "taro",
      image:
        "https://ipfs.near.social/ipfs/bafkreia4w3mcfsrvcoh3r44x5nxrmarrt5xr3nta7dnw7pjfufd3b3anki",
    },
  },
});

const [adsInfo, setAdsInfo] = useState({});
// const [earningBalance, setEarningBalance] = useState(0);
// const [stakedBalance, setStakedBalance] = useState(0);
const fE = ethers.utils.formatEther;
const mainWidget =
  "659f08890482b5a2270c0096ab85a8dd1d1e8f0fb656b4fa44e72049a81e0f43";

const BACKEND_API = "https://billbos-api.finstable.co.th";
const DEFAULT_CHAIN_ID = 25925;
const CHAIN_LIST = [25925, 35011];
const ETH_TOKEN = { name: "Ethereum", symbol: "ETH", decimals: 18 };

const BillBOSCoreABI = fetch(
  "https://gist.githubusercontent.com/Chayanonc/1c7b2cf1559ed20b342f76846966cb65/raw/fa27150e36d18d43d6298c8dd27f8c8e852dde23/billbos-core.json"
).body;

if (!BillBOSCoreABI) {
  return "Loading";
}

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

const handleRequest = async (query, viewCase) => {
  const e = BACKEND_API + query;
  switch (viewCase) {
    case "viewOfMonth":
      fetchApi(e, "GET").then((res) => {
        console.log({ viewOfMonth: res });
        if (res.ok) {
          State.update({ viewOfMonth: res.body.view });
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

function getViewAds(item, chainId) {
  const res = handleRequest(
    `/ads/ad-view-by-adId?adId=${parseInt(item[0])}&month=${Number(
      state.monthCount
    )}&chainId=${chainId}`,
    "ad-view-by-adId"
  );
  res.then((res) => {
    adsInfo[`${chainId}-${parseInt(item[0])}-adsView`] = res.ok
      ? res.body.view
      : "0";
  });
}

function formatAds(item, chainId) {
  getViewAds(item, chainId);
  adsInfo[`${chainId}-${parseInt(item[0])}-staked`] = item[2] || "0";

  return {
    adsId: "" + parseInt(item[0]),
    adsContent: {
      name: item[1][0],
      imageCID: item[1][1],
      newTabLink: item[1][2],
      widgetLink: item[1][3],
      isInteractive: item[1][4],
    },
    adsStakedBalance: fE(item[2]),
    chainId: "" + chainId,
  };
}

function getRewards() {
  const provider = Ethers.provider();
  const contract = new ethers.Contract(
    state.chains[state.chainId].billBOSCore,
    BillBOSCoreABI,
    provider
  );

  contract.getReward(state.walletAddress).then((res) => {
    adsInfo["0"] = fE(res[0]);
    adsInfo["1"] = fE(res[1]);
  });
}

function getTotalDashboard() {
  const chainId = state.chainId
    ? String(state.chainId)
    : String(DEFAULT_CHAIN_ID);

  const provider =
    Ethers.provider() ||
    new ethers.providers.JsonRpcProvider(state.chains[chainId].rpcUrl);
  const contract = new ethers.Contract(
    state.chains[chainId].billBOSCore,
    BillBOSCoreABI,
    provider
  );
  contract.totalStakedBalanceLast().then((res) => {
    console.log("setStakedBalance", fE(res));
    State.update({ stakedBalance: ethers.utils.formatEther(res) });
  });
  contract.totalEarningBalanceLast().then((res) => {
    console.log("setEarningBalance", fE(res));
    State.update({ earningBalance: fE(res) });
  });
  contract.count().then((res) => {
    State.update({ monthCount: fE(res) });
  });
  contract.getActiveAds().then(async (res) => {
    if (res && res.length > 0) {
      const activeAds = res.map((item, index) => {
        getViewAds(item, chainId);
        adsInfo[`${chainId}-${parseInt(item[0])}-staked`] = item[2] || "0";
        return {
          chainId: chainId,
          adsId: Number(item[0]),
          adsContent: {
            name: item[1][0],
            imageCID: item[1][1],
            newTabLink: item[1][2],
            widgetLink: item[1][3],
            isInteractive: item[1][4],
          },
          adsStakedBalance: item[2],
          adsViewed: res,
        };
      });
      State.update({ ads: activeAds });
    }
  });
}

getTotalDashboard();

function getAdsByAddress(walletAddress) {
  const chainId = state.chainId || DEFAULT_CHAIN_ID;
  const billbosCoreAddress = state.chains[chainId].billBOSCore;
  const provider =
    Ethers.provider() ||
    new ethers.providers.JsonRpcProvider(state.chains[chainId].rpcUrl);
  const contract = new ethers.Contract(
    billbosCoreAddress,
    BillBOSCoreABI,
    provider
  );
  contract.getAdsUser(walletAddress).then((res) => {
    const adsAll = res.map((item) => {
      return formatAds(item, chainId);
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

if (state.chainId) {
  getTotalDashboard();
}

if (state.earningBalance == undefined || state.stakedBalance == undefined) {
  return "";
}

const tabComponent = () => {
  if (state.tabSelect == 0) {
    return (
      <Widget
        src={`${mainWidget}/widget/billbos-dashboard`}
        props={{
          handleRequest: handleRequest,
          state: state,
          DEFAULT_CHAIN_ID: DEFAULT_CHAIN_ID,
          adsInfo: adsInfo,
          earningBalance: state.earningBalance,
          stakedBalance: state.stakedBalance,
        }}
      />
    );
  } else if (state.tabSelect == 1) {
    return (
      <Widget
        src={`${mainWidget}/widget/billbos-campaigns`}
        props={{
          state: state,
          adsInfo: adsInfo,
          coreContractAddress:
            state.chains[state.chainId || DEFAULT_CHAIN_ID].billBOSCore,
        }}
      />
    );
  } else if (state.tabSelect == 2) {
    return (
      <Widget
        src={`${mainWidget}/widget/billbos-reward`}
        props={{
          getRewards: getRewards,
          state: state,
          adsInfo: adsInfo,
          coreContractAddress:
            state.chains[state.chainId || DEFAULT_CHAIN_ID].billBOSCore,
          CHAIN_LIST: CHAIN_LIST,
          BACKEND_API: BACKEND_API,
        }}
      />
    );
  }
};

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
