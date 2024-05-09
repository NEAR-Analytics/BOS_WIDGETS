Storage.privateSet("tokens", [
  {
    chainId: 8453,
    address: "0x6653dD4B92a0e5Bf8ae570A98906d9D6fD2eEc09",
    decimals: 18,
    symbol: "RCKT",
    name: "RocketSwap",
    icon: "https://app.rocketswap.cc/_next/image?url=https%3A%2F%2Ftoken.g34gsgv.top%2Flogo.png&w=256&q=75",
  },
  {
    chainId: 8453,
    address: "0x4200000000000000000000000000000000000006",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://ethereum-optimism.github.io/data/WETH/logo.png",
  },
  {
    chainId: 8453,
    address: "native",
    decimals: 18,
    symbol: "ETH",
    name: "Ether",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  {
    chainId: 8453,
    address: "0x27D2DECb4bFC9C76F0309b8E88dec3a601Fe25a8",
    decimals: 18,
    symbol: "BALD",
    name: "Bald",
    icon: "https://app.rocketswap.cc/_next/image?url=https%3A%2F%2Fcdn-45.rocketswap.cc%2Fassets%2FBASE%2F0x27D2DECb4bFC9C76F0309b8E88dec3a601Fe25a8%2Flogo.png%3F&w=64&q=50",
  },
  {
    chainId: 8453,
    address: "0xd07379a755A8f11B57610154861D694b2A0f615a",
    decimals: 18,
    symbol: "BASE",
    name: "BASE Token",
    icon: "https://swapbased.finance/static/media/0xd07379a755a8f11b57610154861d694b2a0f615a.8e4c7d33.png",
  },
  {
    chainId: 8453,
    address: "0xEB466342C4d449BC9f53A865D5Cb90586f405215",
    decimals: 6,
    symbol: "axlUSDC",
    name: "Axelar Wrapped USDC",
    icon: "https://ethereum-optimism.github.io/data/USDC/logo.png",
  },
]);

return (
  <Widget
    src="bluebiu.near/widget/Base.BaseSwapV2"
    props={{
      factoryAddress: "0x1B8128c3A1B7D20053D10763ff02466ca7FF99FC",
      routerAddress: "0x4cf76043B3f97ba06917cBd90F9e3A2AAC1B306e",
      wethAddress: "0x4200000000000000000000000000000000000006",
      title: "RocketSwap",
      defaultCurrencies: {
        input: {
          chainId: 8453,
          address: "native",
          decimals: 18,
          symbol: "ETH",
          name: "Ether",
          icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
        },
      },
    }}
  />
);
