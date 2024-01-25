const state = props.state;
const adsInfo = props.adsInfo;
const coreContractAddress = props.coreContractAddress;

function tapCampaigns() {
  if (!Ethers.provider()) {
  }

  return (
    <div className="container">
      <div className="w-full">
        {state.walletConnected && Ethers.provider() ? (
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
                  src="ribbinpo.near/widget/billbos-craete-ads-test"
                  props={{}}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 z-20">
              {state.adsUser
                ? state.adsUser.map((item, index) => {
                    return (
                      <div key={index}>
                        <Widget
                          src="659f08890482b5a2270c0096ab85a8dd1d1e8f0fb656b4fa44e72049a81e0f43/widget/billbos-ads-card"
                          props={{
                            ...item,
                            adsStakedBalance:
                              adsInfo[`${item.chainId}-${item.adsId}-staked`] ||
                              "0",
                            adsViewed:
                              adsInfo[
                                `${item.chainId}-${item.adsId}-adsView`
                              ] || "0",
                            isShowAction: true,
                            coreContractAddress: coreContractAddress,
                          }}
                        />
                      </div>
                    );
                  })
                : ""}
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

return (
  <>
    <Widget
      src="chayanonc-ph.near/widget/billbos-css"
      props={{ children: tapCampaigns() }}
    />
  </>
);
