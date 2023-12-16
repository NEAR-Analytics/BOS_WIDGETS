const { walletAddress, chainId, setTabSelect, chains } = props;

State.init({
  hideLeanMore: false,
  navItems: [
    {
      title: "Dashboard",
      isActive: false,
    },
    {
      title: "Campaigns",
      isActive: false,
    },
    {
      title: "Rewards",
      isActive: false,
    },
  ],
  tabIndex: 0,
});

const hideLeanMore = () => {
  State.update({
    hideLeanMore: true,
  });
};

const billbosLogo = (
  <svg
    width="114"
    height="42"
    viewBox="0 0 114 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M40.5521 20.5526C39.8466 21.3169 39.4938 22.2281 39.4938 23.2864C39.4938 24.3446 39.8466 25.2632 40.5521 26.0422C41.2576 26.8065 42.1468 27.1887 43.2197 27.1887C44.2927 27.1887 45.1819 26.8065 45.8874 26.0422C46.5929 25.2632 46.9456 24.3446 46.9456 23.2864C46.9456 22.2281 46.5929 21.3169 45.8874 20.5526C45.1819 19.7883 44.2927 19.4062 43.2197 19.4062C42.1468 19.4062 41.2576 19.7883 40.5521 20.5526ZM39.4938 27.806V29.6799H36.3632V13.1449H39.4938V18.7668H39.5379C40.6403 17.2823 42.0586 16.5401 43.793 16.5401C45.689 16.5401 47.2323 17.1794 48.4228 18.4581C49.6133 19.7222 50.2086 21.3316 50.2086 23.2864C50.2086 25.2412 49.6133 26.8579 48.4228 28.1367C47.2323 29.4154 45.689 30.0547 43.793 30.0547C42.0733 30.0547 40.655 29.3051 39.5379 27.806H39.4938ZM52.4031 16.9149H55.5337V29.6799H52.4031V16.9149ZM52.2267 14.4897C52.2267 14.0194 52.3957 13.6152 52.7338 13.2772C53.0865 12.9391 53.4981 12.7701 53.9684 12.7701C54.4387 12.7701 54.8429 12.9391 55.181 13.2772C55.5337 13.6152 55.7101 14.0194 55.7101 14.4897C55.7101 14.9748 55.5411 15.3863 55.203 15.7243C54.865 16.0477 54.4534 16.2094 53.9684 16.2094C53.4834 16.2094 53.0718 16.0477 52.7338 15.7243C52.3957 15.3863 52.2267 14.9748 52.2267 14.4897ZM58.1731 29.6799V13.1449H61.3038V29.6799H58.1731ZM63.9432 29.6799V13.1449H67.0738V29.6799H63.9432ZM73.9021 20.5526C73.1966 21.3169 72.8438 22.2281 72.8438 23.2864C72.8438 24.3446 73.1966 25.2632 73.9021 26.0422C74.6076 26.8065 75.4968 27.1887 76.5697 27.1887C77.6427 27.1887 78.5319 26.8065 79.2374 26.0422C79.9429 25.2632 80.2956 24.3446 80.2956 23.2864C80.2956 22.2281 79.9429 21.3169 79.2374 20.5526C78.5319 19.7883 77.6427 19.4062 76.5697 19.4062C75.4968 19.4062 74.6076 19.7883 73.9021 20.5526ZM72.8438 27.806V29.6799H69.7132V13.1449H72.8438V18.7668H72.8879C73.9903 17.2823 75.4086 16.5401 77.143 16.5401C79.039 16.5401 80.5822 17.1794 81.7728 18.4581C82.9633 19.7222 83.5586 21.3316 83.5586 23.2864C83.5586 25.2412 82.9633 26.8579 81.7728 28.1367C80.5822 29.4154 79.039 30.0547 77.143 30.0547C75.4233 30.0547 74.005 29.3051 72.8879 27.806H72.8438ZM96.0268 23.2864C96.0268 22.1252 95.6888 21.1772 95.0127 20.4423C94.3366 19.6928 93.4327 19.318 92.3009 19.318C91.1839 19.318 90.28 19.6928 89.5892 20.4423C88.9131 21.1919 88.575 22.1399 88.575 23.2864C88.575 24.4475 88.9131 25.4029 89.5892 26.1525C90.28 26.902 91.1839 27.2768 92.3009 27.2768C93.4327 27.2768 94.3366 26.9094 95.0127 26.1745C95.6888 25.4249 96.0268 24.4622 96.0268 23.2864ZM99.2898 23.2864C99.2898 25.2118 98.6137 26.8212 97.2615 28.1146C95.9093 29.408 94.2558 30.0547 92.3009 30.0547C90.3608 30.0547 88.7073 29.408 87.3404 28.1146C85.9882 26.8212 85.3121 25.2118 85.3121 23.2864C85.3121 21.3757 85.9882 19.7736 87.3404 18.4802C88.7073 17.1868 90.3608 16.5401 92.3009 16.5401C94.2558 16.5401 95.9093 17.1868 97.2615 18.4802C98.6137 19.7736 99.2898 21.3757 99.2898 23.2864ZM111.787 20.8612H108.789C108.789 20.288 108.583 19.8471 108.172 19.5384C107.76 19.2151 107.209 19.0534 106.518 19.0534C105.857 19.0534 105.357 19.1857 105.019 19.4502C104.696 19.7001 104.534 20.0308 104.534 20.4423C104.534 20.8686 104.725 21.1993 105.107 21.4345C105.489 21.6549 105.96 21.7945 106.518 21.8533C107.091 21.9121 107.709 22.015 108.37 22.162C109.031 22.2943 109.641 22.4633 110.2 22.6691C110.773 22.8748 111.251 23.2643 111.633 23.8375C112.015 24.4108 112.206 25.1457 112.206 26.0422C112.206 27.3797 111.677 28.3865 110.619 29.0626C109.575 29.724 108.208 30.0547 106.518 30.0547C104.857 30.0547 103.527 29.6652 102.528 28.8862C101.543 28.0926 101.051 27.0417 101.051 25.7336H104.071C104.071 26.2627 104.299 26.6963 104.754 27.0343C105.21 27.3577 105.798 27.5194 106.518 27.5194C107.268 27.5194 107.863 27.3944 108.304 27.1446C108.76 26.88 108.987 26.5126 108.987 26.0422C108.987 25.5866 108.796 25.2412 108.414 25.006C108.047 24.7709 107.576 24.6312 107.003 24.5871C106.445 24.5283 105.835 24.4402 105.173 24.3226C104.512 24.1903 103.895 24.0286 103.321 23.8375C102.763 23.6318 102.293 23.2423 101.91 22.6691C101.543 22.0959 101.359 21.3536 101.359 20.4423C101.359 19.1783 101.815 18.2156 102.726 17.5542C103.637 16.8781 104.901 16.5401 106.518 16.5401C108.164 16.5401 109.45 16.9222 110.376 17.6865C111.317 18.4361 111.787 19.4943 111.787 20.8612Z"
      fill="#001D32"
    />
    <path
      d="M11.3173 26.374L20.6798 16.6V14.4908L17.7991 10.8384H7.87068V32.5986H20.6798V26.374H26.0813V38H2.52068V5.43698H7.87068H20.4226L26.0813 12.6389V18.7606L18.7765 26.374H11.3173Z"
      fill="url(#paint0_linear_3672_1574)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3672_1574"
        x1="2.76634"
        y1="5.016"
        x2="14.2173"
        y2="41.0762"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00E3B4" />
        <stop offset="1" stop-color="#00C8A0" />
      </linearGradient>
    </defs>
  </svg>
);

const leanMore = (
  <div className="brand-gradient-green text-white text-xs font-bold h-12 flex items-center justify-center relative">
    <div className="flex justify-center gap-2 items-center">
      <p>Unlock the power of onchain data for Web3 Ads</p>
      <p className="bg-white green-text py-1 px-1.5 rounded-md">Lean more</p>
    </div>
    <div
      className="absolute top-3 right-6 border-2 boder-white p-1 rounded-md z-10 cursor-pointer"
      onClick={() => hideLeanMore()}
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

const formatWalletAddres = (wallet) => {
  return `${
    wallet.substring(0, 6) + "..." + wallet.substring(wallet.length - 4)
  }`.toLowerCase();
};

const chainsFormat = (val) => {
  const { name, id, image } = chains[val];

  return (
    <div className="flex justify-center items-center gap-2">
      <div>
        <img src={image} alt={name} className="w-6 h-6" />
      </div>
      <div>{name}</div>
    </div>
  );
};

const navbar = (
  //container
  <div className="container flex items-center justify-between h-20 font-medium">
    <div className="flex gap-4 items-center ">
      <div>{billbosLogo}</div>
      {state.navItems
        ? state.navItems.map((item, index) => {
            return (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => (setTabSelect ? setTabSelect(index) : "")}
              >
                <p>{item.title}</p>
              </div>
            );
          })
        : ""}
    </div>
    <div className="flex text-sm gap-2 ">
      <div className="border border-gray-200 px-2 py-1 rounded-xl flex items-center">
        {chainsFormat(chainId || 3501)}
      </div>
      <div className="border border-gray-400 w-52 grid grid-cols-5 rounded-xl gray-surface ">
        <div className="p-2 items-center flex col-span-2">
          <span>0.000</span>
        </div>
        <div className="border-l border-gray-200 rounded-xl p-2 text-center col-span-3 bg-white">
          <span>{formatWalletAddres(walletAddress)}</span>
        </div>
      </div>
    </div>
  </div>
);

const mainHeader = (
  <div className="">
    <div>{state.hideLeanMore ? "" : leanMore}</div>
    <div className="">{navbar}</div>
  </div>
);

return (
  <Widget
    src="porx-dev.near/widget/billbos-css"
    props={{ children: mainHeader }}
  />
);
