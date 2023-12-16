const { tokenImage, chainName, amount, tokenName } = props;

const main = (
  <div
    className=" bg-red-200 rounded-2xl"
    style={{ height: "406px", width: "302px" }}
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
      <div className="w-full flex justify-center">
        <p className="text-xs">{tokenName || "USDT"} Earned</p>
      </div>
      <p className=" font-bold">
        {amount || "1250.13"} <span>{tokenName || "USDT"}</span>
      </p>
    </div>
  </div>
);

return (
  <>
    <Widget src="porx-dev.near/widget/billbos-css" props={{ children: main }} />
  </>
);
