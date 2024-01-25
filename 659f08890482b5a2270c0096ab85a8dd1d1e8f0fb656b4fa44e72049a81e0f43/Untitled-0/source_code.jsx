const handleRequest = props.handleRequest ? props.handleRequest : () => {};
const state = props.state;
const adsInfo = props.adsInfo;
const earningBalance = props.earningBalance;
const stakedBalance = props.stakedBalance;

function tapDashboard() {
  // get total view ads
  handleRequest(`/ads/total-ad-view?month=${state.monthCount}`, "viewOfMonth");

  const earningCards = [
    {
      title: "Total Staked",
      ipfsUrl: "bafkreigb2h33nc6bpa2gcuvbs46eys4bbb6djibx76xknbrkswtqfqlyzm",
      usdt: stakedBalance,
      thb: parseFloat(stakedBalance) * 35,
    },
    {
      title: "Total Earnings",
      ipfsUrl: "bafkreievjy5wntddg6augnywctekhic3dttnf57h4dhjkypyx5mhjci2ou",
      usdt: earningBalance,
      thb: parseFloat(earningBalance) * 35,
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
                    usdt: Number(item.usdt).toFixed(6),
                    thb: Number(item.thb).toFixed(2),
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
          {state.ads
            ? state.ads.map((item, index) => {
                console.log({ ads: item });
                return (
                  <div key={index}>
                    <Widget
                      src="659f08890482b5a2270c0096ab85a8dd1d1e8f0fb656b4fa44e72049a81e0f43/widget/billbos-ads-card"
                      props={{
                        ...item,
                        adsStakedBalance: item.adsStakedBalance || "0",
                        adsViewed:
                          adsInfo[`${item.chainId}-${item.adsId}-adsView`] ||
                          "0",
                      }}
                    />
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

return (
  <>
    <Widget
      src="chayanonc-ph.near/widget/billbos-css"
      props={{ children: tapDashboard() }}
    />
  </>
);
