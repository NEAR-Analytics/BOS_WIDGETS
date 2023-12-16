const children = props.children;

const content = (
  <div
    style={{
      width: "408px",
    }}
    class="w-full flex flex-col justify-center items-center text-center border rounded-lg"
  >
    <img
      style={{
        height: "126px",
      }}
      class="w-full rounded-t-lg"
      src="https://img2.pic.in.th/pic/abaa2d53744d0806f6178a6033d6f366.png"
      alt="uploaded"
    />
    <p class="mt-4 text-xl font-semibold">{"Season of Savings"}</p>
    <p class="mt-1 font-light text-gray-400 px-8">
      {"https://docs.near.org/bos/components/ipfs"}
    </p>
    <div class="mt-4 flex flex-row">
      <div>
        <p>{"7973.87 USDT"}</p>
        <p>{"Staked"}</p>
      </div>
      <div>
        <p>{"7973.87 USDT"}</p>
        <p>{"Staked"}</p>
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
