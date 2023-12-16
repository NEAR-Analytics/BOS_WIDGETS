State.init({
  hideLeanMore: false,
});

const hideLeanMore = () => {
  State.update({
    hideLeanMore: true,
  });
};

const leanMore = (
  <div className="brand-gradient-green text-white text-xs font-bold h-12 flex items-center justify-center ">
    <div className="flex justify-center gap-2 items-center">
      <p>Unlock the power of onchain data for Web3 Ads</p>
      <p className="bg-white green-text py-1 px-1.5 rounded-md">Lean more</p>
    </div>
    <div
      className="absolute top-3 right-6 border-2 boder-white p-1 rounded-md z-10 cursor-pointer"
      onClick={hideLeanMore}
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L9 9"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M9 1L1 9"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </div>
  </div>
);

const mainHeader = <div className="">{state.hideLeanMore ? "" : leanMore}</div>;

return (
  <Widget
    src="porx-dev.near/widget/billbos-css"
    props={{ children: mainHeader }}
  />
);
