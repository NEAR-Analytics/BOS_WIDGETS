Storage.privateSet("tokens", [
  {
    chainId: 8453,
    address: "0xbd2DBb8eceA9743CA5B16423b4eAa26bDcfE5eD2",
    decimals: 18,
    symbol: "SYNTH",
    name: "Synth Token",
    icon: "https://www.synthswap.io/_next/image?url=%2Fimages%2Ftokens%2Fsynth.png&w=64&q=100",
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
    address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    decimals: 18,
    symbol: "DAI",
    name: "Dai Stablecoin",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
  },
  {
    chainId: 8453,
    address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
    decimals: 6,
    symbol: "USDbC",
    name: "USD Base Coin",
    icon: "https://ethereum-optimism.github.io/data/USDC/logo.png",
  },
]);

return (
  <Widget
    src="bluebiu.near/widget/Base.BaseSwapV2"
    props={{
      factoryAddress: "0x4bd16d59A5E1E0DB903F724aa9d721a31d7D720D",
      routerAddress: "0x8734B3264Dbd22F899BCeF4E92D442d538aBefF0",
      wethAddress: "0x4200000000000000000000000000000000000006",
      title: "Synthswap",
      defaultCurrencies: {
        input: {
          chainId: 8453,
          address: "native",
          decimals: 18,
          symbol: "ETH",
          name: "Ether",
          icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
        },
        output: {
          chainId: 8453,
          address: "0xbd2DBb8eceA9743CA5B16423b4eAa26bDcfE5eD2",
          decimals: 18,
          symbol: "SYNTH",
          name: "Synth Token",
          icon: "https://www.synthswap.io/_next/image?url=%2Fimages%2Ftokens%2Fsynth.png&w=64&q=100",
        },
      },
    }}
  />
);
