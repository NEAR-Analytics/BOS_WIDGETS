const { tokenImage, chainName, amount, tokenName } = props;

const main = (
  <div
    className=" bg-red-200 rounded-2xl"
    style={{ height: "406px", width: "302px" }}
  >
    <div className="flex justify-end flex-wrap">
      <div className="bg-black text-white w-32 rounded-tr-2xl rounded-bl-2xl h-11 flex justify-center items-center font-bold">
        <p className="">{chainName || "Test Chain"}</p>
      </div>
      <div className="w-full flex justify-center my-10">
        <img
          src="https://ipfs.near.social/ipfs/bafkreif5bafppbk7gtxgghyuetssfobb4z2czhuhh25ywxufdh6b6ngxf4"
          alt={tokenName || "USDT"}
        />
      </div>
      <div className="w-full flex justify-center">
        <p>{tokenName || "USDT"} Earned</p>
      </div>
    </div>
  </div>
);

return (
  <>
    <Widget src="porx-dev.near/widget/billbos-css" props={{ children: main }} />
  </>
);
