const leanMore = (
  <div className="brand-gradient-green text-white text-xs font-bold h-12 flex items-center justify-center ">
    <div className="flex justify-center gap-2 items-center">
      <p>Unlock the power of onchain data for Web3 Ads</p>
      <p className="bg-white green-text py-1 px-1.5 rounded-md">Lean more</p>
    </div>
  </div>
);

const mainHeader = <div className="">{leanMore}</div>;

return (
  <Widget
    src="porx-dev.near/widget/billbos-css"
    props={{ children: mainHeader }}
  />
);
