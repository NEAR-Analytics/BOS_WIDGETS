const children = props.children;

const content = (
  <div
    style={{
      width: "408px",
    }}
    class=" border rounded-lg pb-4"
  >
    <img
      style={{
        height: "126px",
      }}
      class="w-full rounded-t-lg"
      src="https://img2.pic.in.th/pic/abaa2d53744d0806f6178a6033d6f366.png"
      alt="uploaded"
    />
    <div class="w-full flex flex-col justify-center items-center text-center px-8">
      <p class="mt-4 text-xl font-semibold">{"Season of Savings"}</p>
      <p class="mt-1 font-light text-gray-400">
        {"https://docs.near.org/bos/components/ipfs"}
      </p>
      <div class="mt-4 flex flex-row justify-between">
        <div>
          <p class="font-semibold">{"7,973.87 USDT"}</p>
          <p class="text-gray-400 text-sm">{"Staked"}</p>
        </div>
        <div class="border-l-2"></div>
        <div>
          <p class="font-semibold">{"$7,985"}</p>
          <p class="text-gray-400 text-sm">{"Balance"}</p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <button class="px-4 py-2 text-white font-semibold brand-green rounded-lg">
          Stake Now
        </button>
        <button class="px-4 py-2 text-white font-semibold brand-green rounded-lg">
          Unstake
        </button>
      </div>
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
