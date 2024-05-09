const { tokenImage, chainName, amount, tokenName, onClaim } = props;

const main = (
  <div
    className="shadow-sm rounded-2xl pb-4 bg-white"
    style={{ width: "302px", paddingButton: "" }}
  // style={{ height: "406px", width: "302px" }}
  >
    <div className="flex justify-center flex-wrap">
      <div className="w-full flex justify-end flex-wrap">
        <div className="bg-black text-white w-32 rounded-tr-2xl rounded-bl-2xl h-11 flex justify-center items-center font-bold">
          <p className="">{chainName || "Test Chain"}</p>
        </div>
      </div>
      <div className=" my-10">
        <img
          src="https://ipfs.near.social/ipfs/bafkreif5bafppbk7gtxgghyuetssfobb4z2czhuhh25ywxufdh6b6ngxf4"
          alt={tokenName || "USDT"}
        />
      </div>
      <div className="w-full flex justify-center secondary-text">
        <p className="text-xs">{tokenName || "USDT"} Earned</p>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold">
          {amount || "1250.13"}{" "}
          <span className="text-lg font-medium">{tokenName || "USDT"}</span>
        </p>
      </div>
      <div className="text-xs tertiary-text mt-5">
        <p>Total Rewards received : {amount || "12033.00"} USDT</p>
      </div>
      <div className="w-full flex justify-center mt-4">
        <div
          style={{ width: "242px" }}
          className="px-6 py-2 brand-green cursor-pointer rounded-xl text-center text-white font-semibold text-sm"
          onClick={() => {
            onClaim()
          }}
        >
          Claim Rewards
        </div>
      </div>
    </div>
  </div>
);

return (
  <>
    <Widget src="porx-dev.near/widget/billbos-css" props={{ children: main }} />
  </>
);
