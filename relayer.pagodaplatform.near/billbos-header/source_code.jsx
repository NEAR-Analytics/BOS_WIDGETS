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
    width="125"
    height="45"
    viewBox="0 0 127 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M53.696 26.696C53.696 28.2 53.136 29.464 52.016 30.488C50.896 31.496 49.536 32 47.936 32H39.44V14H47.528C49.016 14 50.28 14.464 51.32 15.392C52.36 16.32 52.88 17.488 52.88 18.896C52.88 20.4 52.128 21.56 50.624 22.376C51.456 22.696 52.176 23.224 52.784 23.96C53.392 24.696 53.696 25.608 53.696 26.696ZM49.496 28.064C49.928 27.6 50.144 27.056 50.144 26.432C50.144 25.808 49.928 25.272 49.496 24.824C49.08 24.376 48.56 24.152 47.936 24.152H42.848V28.736H47.936C48.56 28.736 49.08 28.512 49.496 28.064ZM42.848 17.264V21.08H47.528C48.024 21.08 48.448 20.896 48.8 20.528C49.152 20.144 49.328 19.696 49.328 19.184C49.328 18.656 49.152 18.208 48.8 17.84C48.448 17.456 48.024 17.264 47.528 17.264H42.848ZM56.1041 18.104H59.5121V32H56.1041V18.104ZM55.9121 15.464C55.9121 14.952 56.0961 14.512 56.4641 14.144C56.8481 13.776 57.2961 13.592 57.8081 13.592C58.3201 13.592 58.7601 13.776 59.1281 14.144C59.5121 14.512 59.7041 14.952 59.7041 15.464C59.7041 15.992 59.5201 16.44 59.1521 16.808C58.7841 17.16 58.3361 17.336 57.8081 17.336C57.2801 17.336 56.8321 17.16 56.4641 16.808C56.0961 16.44 55.9121 15.992 55.9121 15.464ZM62.3853 32V14H65.7933V32H62.3853ZM68.6666 32V14H72.0746V32H68.6666ZM89.2038 26.696C89.2038 28.2 88.6438 29.464 87.5238 30.488C86.4038 31.496 85.0438 32 83.4438 32H74.9478V14H83.0358C84.5238 14 85.7878 14.464 86.8278 15.392C87.8678 16.32 88.3878 17.488 88.3878 18.896C88.3878 20.4 87.6358 21.56 86.1318 22.376C86.9638 22.696 87.6838 23.224 88.2918 23.96C88.8998 24.696 89.2038 25.608 89.2038 26.696ZM85.0038 28.064C85.4358 27.6 85.6518 27.056 85.6518 26.432C85.6518 25.808 85.4358 25.272 85.0038 24.824C84.5878 24.376 84.0678 24.152 83.4438 24.152H78.3558V28.736H83.4438C84.0678 28.736 84.5878 28.512 85.0038 28.064ZM78.3558 17.264V21.08H83.0358C83.5318 21.08 83.9558 20.896 84.3078 20.528C84.6598 20.144 84.8358 19.696 84.8358 19.184C84.8358 18.656 84.6598 18.208 84.3078 17.84C83.9558 17.456 83.5318 17.264 83.0358 17.264H78.3558ZM106.756 23C106.756 21.304 106.164 19.848 104.98 18.632C103.796 17.416 102.356 16.808 100.66 16.808C98.9799 16.808 97.5399 17.416 96.3399 18.632C95.1559 19.848 94.5639 21.304 94.5639 23C94.5639 24.712 95.1559 26.176 96.3399 27.392C97.5239 28.592 98.9639 29.192 100.66 29.192C102.356 29.192 103.796 28.592 104.98 27.392C106.164 26.176 106.756 24.712 106.756 23ZM107.476 16.304C109.364 18.112 110.308 20.344 110.308 23C110.308 25.656 109.364 27.888 107.476 29.696C105.604 31.504 103.332 32.408 100.66 32.408C97.9719 32.408 95.6919 31.504 93.8199 29.696C91.9479 27.888 91.0119 25.656 91.0119 23C91.0119 20.344 91.9479 18.112 93.8199 16.304C95.6919 14.496 97.9719 13.592 100.66 13.592C103.332 13.592 105.604 14.496 107.476 16.304ZM125.14 19.016H121.78C121.78 18.312 121.484 17.728 120.892 17.264C120.316 16.784 119.604 16.544 118.756 16.544C117.876 16.544 117.188 16.736 116.692 17.12C116.212 17.504 115.972 18.024 115.972 18.68C115.972 19.24 116.148 19.696 116.5 20.048C116.852 20.4 117.308 20.664 117.868 20.84C118.444 21 119.068 21.144 119.74 21.272C120.428 21.4 121.108 21.576 121.78 21.8C122.468 22.008 123.092 22.288 123.652 22.64C124.228 22.992 124.692 23.52 125.044 24.224C125.396 24.928 125.572 25.784 125.572 26.792C125.572 28.52 124.932 29.888 123.652 30.896C122.388 31.904 120.756 32.408 118.756 32.408C116.772 32.408 115.164 31.888 113.932 30.848C112.716 29.792 112.108 28.368 112.108 26.576H115.468C115.468 27.392 115.772 28.08 116.38 28.64C117.004 29.184 117.796 29.456 118.756 29.456C119.732 29.456 120.516 29.208 121.108 28.712C121.716 28.216 122.02 27.576 122.02 26.792C122.02 26.216 121.844 25.744 121.492 25.376C121.14 25.008 120.676 24.744 120.1 24.584C119.54 24.408 118.916 24.256 118.228 24.128C117.556 24 116.876 23.832 116.188 23.624C115.516 23.416 114.892 23.144 114.316 22.808C113.756 22.456 113.3 21.936 112.948 21.248C112.596 20.544 112.42 19.688 112.42 18.68C112.42 17.096 113.012 15.856 114.196 14.96C115.396 14.048 116.916 13.592 118.756 13.592C120.628 13.592 122.156 14.072 123.34 15.032C124.54 15.992 125.14 17.32 125.14 19.016Z"
      fill="#001D32"
    />
    <path
      d="M12.32 28.344L22.512 17.704V15.408L19.376 11.432H8.568V35.12H22.512V28.344H28.392V41H2.744V5.552H8.568H22.232L28.392 13.392V20.056L20.44 28.344H12.32Z"
      fill="url(#paint0_linear_3882_401)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3882_401"
        x1="3"
        y1="5.5"
        x2="15.6693"
        y2="44.9591"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00E3B4" />
        <stop offset="1" stop-color="#00C8A0" />
      </linearGradient>
    </defs>
  </svg>
);

const leanMore = (
  <div className="bg-black text-white text-xs font-bold h-12 flex items-center justify-center relative">
    <div className="flex justify-center gap-2 items-center">
      <p>Unlock the power of onchain data for Web3 Ads</p>
      <p className="bg-white text-black py-1 px-1.5 rounded-md">Lean more</p>
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

const setActive = (key) => {
  State.update({
    tabIndex: key,
  });
};

setTabSelect && setTabSelect(state.tabIndex);

const navbar = (
  //container
  <div className="container flex items-center justify-between h-20 font-medium">
    <div className="flex gap-4 items-center ">
      <div>{billbosLogo}</div>
      <div className="flex h-20 gap-4">
        {state.navItems
          ? state.navItems.map((item, index) => {
              return (
                <div
                  style={{
                    borderColor: index == state.tabIndex ? "#00E3B4" : "#FFF",
                  }}
                  key={index}
                  className={`cursor-pointer flex justify-center items-center border-b-4`}
                  onClick={() => {
                    setActive(index);
                  }}
                >
                  <p>{item.title}</p>
                </div>
              );
            })
          : ""}
      </div>
    </div>
    {walletAddress ? (
      <div className="flex text-sm gap-2 ">
        <div className="border border-gray-200 px-2 py-1 rounded-xl flex items-center">
          {chainsFormat(chainId || 3501)}
        </div>

        <div className="border border-gray-200 rounded-xl p-2 text-center col-span-3 bg-white">
          <span>{formatWalletAddres(walletAddress || "")}</span>
        </div>
      </div>
    ) : (
      <div>
        <Web3Connect
          className="web3-connect w-full p-2 border border-gray-400"
          connectLabel="Connect Wallet"
        />
      </div>
    )}
  </div>
);

const mainHeader = (
  <div className="shadow-sm">
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
