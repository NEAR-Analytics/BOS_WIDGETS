const state = props.state;
const handleRequest = props.handleRequest ? props.handleRequest : () => {};
const BACKEND_API = props.BACKEND_API;
const coreContractAddress = props.coreContractAddress;
const CHAIN_LIST = [25925, 35011];

State.init({
  name: "",
});

const BillBOSCoreABI = fetch(
  "https://gist.githubusercontent.com/Chayanonc/1c7b2cf1559ed20b342f76846966cb65/raw/fa27150e36d18d43d6298c8dd27f8c8e852dde23/billbos-core.json"
).body;

if (!BillBOSCoreABI) {
  return "Loading";
}

const [totalView, setTotalView] = useState(0);
const [ratioOfWallet, setRatioOfWallet] = useState(0);
const [totalEarningPerUser, setTotalEarningPerUser] = useState(0);
const [currentEarning, setCurrentEarning] = useState(0);
const [claim, setClaim] = useState({});

function getReward() {
  CHAIN_LIST.map((item) => {
    const provider = new ethers.providers.JsonRpcProvider(
      state.chains[item].rpcUrl
    );
    const contract = new ethers.Contract(
      state.chains[item].billBOSCore,
      BillBOSCoreABI,
      provider
    );
    console.log("address", state.chains[item].billBOSCore);
    contract.getReward(state.walletAddress).then((res) => {
      console.log("get reward");
      console.log({ item, res });
      claim[`${item}`] = Number(ethers.utils.formatEther(res[0])).toFixed(6);
    });
  });
}

getReward();
function tapRewards() {
  const walletAddress = state.walletAddress;
  const month = Number(state.monthCount);

  const urlView =
    BACKEND_API +
    `/ads/total-webpageowner-view-by-owner-address?month=${month}&walletAddress=${walletAddress}`;
  asyncFetch(urlView, {
    method: "GET",
  }).then((res) => {
    console.log({ res });
    if (res.ok) {
      setTotalView(res.body.view);
    }
  });
  const urlRatio =
    BACKEND_API +
    `/ads/ratio-webpageOwnerview-by-allwebpageOwner?month=${month}&walletAddress=${walletAddress}`;
  asyncFetch(urlRatio, {
    method: "GET",
  }).then((res) => {
    if (res.ok) {
      setRatioOfWallet(Number(res.body.ratio));
    }
  });

  const signer = Ethers.provider().getSigner();
  const contract = new ethers.Contract(
    coreContractAddress,
    BillBOSCoreABI,
    signer
  );

  contract.getTotalEarningPerUser(state.walletAddress).then((res) => {
    setTotalEarningPerUser(Number(ethers.utils.formatEther(res)));
  });

  contract.getCurrentEarning().then((res) => {
    setCurrentEarning(Number(ethers.utils.formatEther(res)));
  });

  console.log({ claim });

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
                <p className="text-xs secondary-text">
                  This Month Total Earnings
                </p>
                <p className="text-xl mt-1 font-medium">
                  {Number(ratioOfWallet * currentEarning).toFixed(6)}
                </p>
              </div>
            </div>
            <div className="p-3 bg-white rounded-xl">
              <div>
                <p className="text-xs secondary-text">My Total View</p>
                <p className="text-xl mt-1 font-medium">{totalView}</p>
              </div>
            </div>
            <div className="p-3 bg-white rounded-xl">
              <div>
                <p className="text-xs secondary-text">My Total Earnings</p>
                <p className="text-xl mt-1 font-medium">
                  {Number(
                    ratioOfWallet * currentEarning + totalEarningPerUser
                  ).toFixed(6)}{" "}
                  USDT
                </p>
              </div>
            </div>
          </div>
          <div className="w-full my-4">
            <p className="text-sm font-medium">Reward</p>
          </div>
          <div className="flex gap-3">
            {CHAIN_LIST
              ? CHAIN_LIST.map((item, i) => {
                  return (
                    <Widget
                      src="porx-dev.near/widget/billbos-reward-card"
                      props={{
                        chainName: state.chains[item].name,
                        amount: claim[`${item}`] || "0.000000",
                        tokenName: "USDT",
                        onClaim: onClaim,
                      }}
                    />
                  );
                })
              : ""}
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

return (
  <>
    <Widget
      src="chayanonc-ph.near/widget/billbos-css"
      props={{ children: tapRewards() }}
    />
  </>
);
