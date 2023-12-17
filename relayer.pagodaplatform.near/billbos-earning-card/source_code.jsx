const { usdt, thb, ipfsUrl, title, totalView } = props;

State.init({
  title: title ?? "Total Staked",
  amountUSDT: usdt ?? "10023.34",
  amountTHB: thb ?? "350023.34",
  imgIpfs:
    ipfsUrl ??
    "https://ipfs.near.social/ipfs/bafkreigb2h33nc6bpa2gcuvbs46eys4bbb6djibx76xknbrkswtqfqlyzm",
});

const content = (
  <div className="w-full relative bg-white shadow-md rounded-xl p-3">
    <div className="absolute top-4 right-4">
      <img src={state.imgIpfs} alt="logo" />
    </div>
    <div>
      <div className="text-sm secondary-text">
        <p>{state.title}</p>
      </div>
      {totalView ? (
        <>
          <div className="text-2xl font-semibold mt-1">
            <p>{totalView}</p>
          </div>
          <div className="text-xs tertiary-text mt-3">
            <p>View</p>
          </div>
        </>
      ) : (
        <>
          <div className="text-2xl font-semibold mt-1">
            <p>{state.amountUSDT} USDT</p>
          </div>
          <div className="text-xs tertiary-text mt-3">
            <p>฿{state.amountTHB}</p>
          </div>
        </>
      )}
    </div>
  </div>
);

return (
  <Widget
    src="porx-dev.near/widget/billbos-css"
    props={{ children: content }}
  />
);
