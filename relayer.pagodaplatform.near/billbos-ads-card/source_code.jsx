const isShowAction = props.isShowAction;
const adsId = props.adsId;
const adsContent = props.adsContent;
const adsStakedBalance = props.adsStakedBalance;
const adsViewed = props.adsViewed;
const chainId = props.chainId;

const chainName = () => {
  if (chainId == "25925") {
    return "Bitkub Chain";
  }
  if (chainId == "35011") {
    return "J2O Chain";
  }
  return "Network Error";
};

const content = (
  <div class="w-full border rounded-xl pb-4 relative bg-white">
    <img
      style={{
        height: "126px",
      }}
      class="w-full rounded-t-xl"
      src={`https://ipfs.near.social/ipfs/${
        adsContent?.imageCID ??
        "bafkreihtf7uoqlzugb347zlo24s5l5zdgj7kbdbltepgekutnnv43zgfze"
      }`}
      alt="uploaded"
    />
    <div class="w-full flex flex-col justify-center items-center text-center px-8">
      <p class="mt-4 text-xl font-semibold">{adsContent?.name ?? ""}</p>
      <p class="mt-1 font-light text-gray-400">
        {adsContent?.newTabLink ?? ""}
      </p>
      <div class="mt-8 grid grid-cols-5">
        <div class="flex flex-col justify-center col-span-2">
          <p class="font-semibold">{`${
            ethers.utils.formatEther(adsStakedBalance) ?? ""
          } USDT`}</p>
          <p class="text-gray-400 text-sm">{"Staked"}</p>
        </div>
        <div class="flex justify-center">
          <div class="h-full border-l-2"></div>
        </div>
        <div class="flex flex-col justify-center col-span-2">
          <p class="font-semibold">{adsViewed}</p>
          <p class="text-gray-400 text-sm">{"Viewed"}</p>
        </div>
      </div>
      {isShowAction && (
        <div class="w-full grid grid-cols-2 gap-2 mt-12">
          <button class="w-full py-2 text-white font-semibold brand-green rounded-lg">
            Stake Now
          </button>
          <button class="w-full py-2 green-text font-semibold border-1 border-green-300 rounded-lg">
            Unstake
          </button>
        </div>
      )}
    </div>
    <div
      style={{ width: "135px", height: "44px" }}
      class={`
      absolute 
      top-0 
      right-0 
      bg-gray-900 
      text-white 
      flex 
      justify-center 
      items-center
      rounded-tr-xl
      rounded-bl-xl
      `}
    >
      <p>{chainName()}</p>
    </div>
  </div>
);

return (
  <Widget
    src="porx-dev.near/widget/billbos-css"
    props={{
      children: content,
    }}
  />
);
