const { tokenImage, chainName, amount } = props;

const main = (
  <div
    className=" bg-red-200 rounded-2xl"
    style={{ height: "406px", width: "302px" }}
  >
    <div className="flex justify-end rounded-2xl">
      <div className="bg-black text-white w-32">
        <p className="">{chainName || "Test Chain"}</p>
      </div>
    </div>
  </div>
);

return (
  <>
    <Widget src="porx-dev.near/widget/billbos-css" props={{ children: main }} />
  </>
);
