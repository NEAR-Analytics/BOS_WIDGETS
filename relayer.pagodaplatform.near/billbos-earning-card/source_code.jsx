const { usdt, thb, ipfsUrl } = props;

State.init({
  amountUSDT: usdt || "10023.34",
  amountTHB: thb || "350023.34",
  imgIpfs:
    ipfsUrl ??
    "https://ipfs.near.social/ipfs/bafkreigb2h33nc6bpa2gcuvbs46eys4bbb6djibx76xknbrkswtqfqlyzm",
});

const content = (
  <div className="w-full bg-white relative">
    <div className="absolute top-2 right-2">
      <img src={state.imgIpfs} alt="logo" />
    </div>
    <div>
      <div>
        <p></p>
      </div>
      <div>
        <p></p>
      </div>
      <div>
        <p></p>
      </div>
    </div>
  </div>
);

return (
  <Widget
    src="porx-dev.near/widget/billbos-css"
    props={{ children: content }}
  />
);
