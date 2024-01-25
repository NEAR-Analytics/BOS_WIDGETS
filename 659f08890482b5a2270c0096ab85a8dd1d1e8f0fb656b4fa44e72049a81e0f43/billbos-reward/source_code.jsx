const state = props.state;
const getRewards = props.getRewards ? props.getRewards : () => {};
const handleRequest = props.handleRequest ? props.handleRequest : () => {};
const CHAIN_LIST = props.CHAIN_LIST;

function tapRewards() {
  const walletAddress = state.walletAddress;
  const month = Number(state.monthCount);

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
                  {Number(state.totalEarningBalance).toFixed(6)}
                </p>
              </div>
            </div>
            <div className="p-3 bg-white rounded-xl">
              <div>
                <p className="text-xs secondary-text">My Total View</p>
                <p className="text-xl mt-1 font-medium">
                  {Number(state.viewOfWalletAddress).toFixed(6)}
                </p>
              </div>
            </div>
            <div className="p-3 bg-white rounded-xl">
              <div>
                <p className="text-xs secondary-text">My Total Earnings</p>
                <p className="text-xl mt-1 font-medium">
                  {Number(
                    state.ratioOfWalletAddress * state.viewOfWalletAddress
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
                        amount: adsInfo[`${i}`] || "0",
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
