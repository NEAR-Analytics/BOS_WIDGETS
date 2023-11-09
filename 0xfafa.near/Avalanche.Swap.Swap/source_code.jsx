Storage.privateSet("tokens", [
  {
    chainId: 43114,
    address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    decimals: 18,
    symbol: "WAVAX",
    name: "Wrapped AVAX",
    icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/avalanchec/assets/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png",
  },
  {
    chainId: 43114,
    address: "native",
    decimals: 18,
    symbol: "AVAX",
    name: "Avalanche",
    icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/avalanchec/assets/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png",
  },
  {
    chainId: 43114,
    address: "0xfaB550568C688d5D8A52C7d794cb93Edc26eC0eC",
    decimals: 6,
    symbol: "axlUSDC",
    name: "Axelar Wrapped USDC",
    icon: "https://ethereum-optimism.github.io/data/USDC/logo.png",
  },
]);

return (
  <Widget
    src="0xfafa.near/widget/Avalanche.Swap.SwapV2"
    props={{
      factoryAddress: "0x8e42f2F4101563bF679975178e880FD87d3eFd4e",
      routerAddress: "0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30",
      quoterAddress: "0xd76019A16606FDa4651f636D9751f500Ed776250",
      title: "TraderJoe",
      defaultCurrencies: {
        input: {
          chainId: 43114,
          address: "native",
          decimals: 18,
          symbol: "AVAX",
          name: "Avalanche",
          icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/avalanchec/assets/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png",
        },
        output: {
          chainId: 43114,
          address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
          decimals: 18,
          symbol: "WAVAX",
          name: "Wrapped AVAX",
          icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/avalanchec/assets/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png",
        },
      },
    }}
  />
);
