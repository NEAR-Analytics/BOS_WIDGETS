const children = props.children;

const content = (
  <div
    style={{
      width: "408px",
    }}
    class=" border rounded-xl pb-4 relative"
  >
    <img
      style={{
        height: "126px",
      }}
      class="w-full rounded-t-xl"
      src="https://img2.pic.in.th/pic/abaa2d53744d0806f6178a6033d6f366.png"
      alt="uploaded"
    />
    <div class="w-full flex flex-col justify-center items-center text-center px-8">
      <p class="mt-4 text-xl font-semibold">{"Season of Savings"}</p>
      <p class="mt-1 font-light text-gray-400">
        {"https://docs.near.org/bos/components/ipfs"}
      </p>
      <div class="mt-8 grid grid-cols-5">
        <div class="flex flex-col justify-center col-span-2">
          <p class="font-semibold">{"7,973.87 USDT"}</p>
          <p class="text-gray-400 text-sm">{"Staked"}</p>
        </div>
        <div class="flex justify-center">
          <div class="h-full border-l-2"></div>
        </div>
        <div class="flex flex-col justify-center col-span-2">
          <p class="font-semibold">{"$7,985"}</p>
          <p class="text-gray-400 text-sm">{"Balance"}</p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-12">
        <button class="px-8 py-2 text-white font-semibold brand-green rounded-lg">
          Stake Now
        </button>
        <button class="px-8 py-2 green-text font-semibold border-1 border-green-300 rounded-lg">
          Unstake
        </button>
      </div>
    </div>
    <div
      style={{ width: "135px", height: "44px" }}
      class="absolute top-0 right-0 bg-gray-900 text-white flex justify-center items-center rounded-tr-xl rounded-bl-xl"
    >
      <p>{"JFIN Chain"}</p>
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
