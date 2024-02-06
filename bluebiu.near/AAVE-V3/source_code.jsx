const Body = styled.div`
  padding: 24px 15px;
  /* background: #0e0e26; */
  min-height: 100vh;
  color: white;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ROUND_DOWN = 0;
const CONTRACT_ABI = {
  wrappedTokenGatewayV3ABI:
    "https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/WrappedTokenGatewayV3ABI.json",
  erc20Abi:
    "https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/ERC20Permit.json",
  aavePoolV3ABI:
    "https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/AAVEPoolV3.json",
  variableDebtTokenABI:
    "https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/VariableDebtToken.json",
  walletBalanceProviderABI:
    "https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/WalletBalanceProvider.json",
};
const DEFAULT_CHAIN_ID = 1;
const NATIVE_SYMBOL_ADDRESS_MAP_KEY = "0x0";
const ETH_TOKEN = { name: "Ethereum", symbol: "ETH", decimals: 18 };
const WETH_TOKEN = { name: "Wrapped Ether", symbol: "WETH", decimals: 18 };
const MATIC_TOKEN = { name: "Matic", symbol: "MATIC", decimals: 18 };
const WMATIC_TOKEN = { name: "Wrapped Matic", symbol: "WMATIC", decimals: 18 };
const ACTUAL_BORROW_AMOUNT_RATE = 0.99;

const account = Ethers.send("eth_requestAccounts", [])[0];
const {
  GAS_LIMIT_RECOMMENDATIONS,
  chainId,
  prices,
  multicallAddress,
  multicall,
  isChainSupported,
  curChain,
  onSwitchChain,
  switchingChain,
  dexConfig,
} = props;

// Get AAVE network config by chain id
function getNetworkConfig(chainId) {
  const abis = {
    wrappedTokenGatewayV3ABI: fetch(CONTRACT_ABI.wrappedTokenGatewayV3ABI),
    erc20Abi: fetch(CONTRACT_ABI.erc20Abi),
    aavePoolV3ABI: fetch(CONTRACT_ABI.aavePoolV3ABI),
    variableDebtTokenABI: fetch(CONTRACT_ABI.variableDebtTokenABI),
    walletBalanceProviderABI: fetch(CONTRACT_ABI.walletBalanceProviderABI),
  };

  const constants = {
    FIXED_LIQUIDATION_VALUE: "1.0",
    MAX_UINT_256:
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    AAVE_API_BASE_URL: "https://aave-data-service-7a85eea3aebe.herokuapp.com",
  };

  switch (chainId) {
    case 1: // ethereum mainnet
      return {
        chainName: "Ethereum Mainnet",
        nativeCurrency: ETH_TOKEN,
        nativeWrapCurrency: WETH_TOKEN,
        rpcUrl: "https://rpc.ankr.com/eth",
        aavePoolV3Address: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
        wrappedTokenGatewayV3Address:
          "0xD322A49006FC828F9B5B37Ab215F99B4E5caB19C",
        balanceProviderAddress: "0xC7be5307ba715ce89b152f3Df0658295b3dbA8E2",
        ...abis,
        ...constants,
      };
    case 42161: // arbitrum one
      return {
        chainName: "Arbitrum Mainnet",
        nativeCurrency: ETH_TOKEN,
        nativeWrapCurrency: WETH_TOKEN,
        rpcUrl: "https://arb1.arbitrum.io/rpc",
        aavePoolV3Address: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
        wrappedTokenGatewayV3Address:
          "0xB5Ee21786D28c5Ba61661550879475976B707099",
        balanceProviderAddress: "0xBc790382B3686abffE4be14A030A96aC6154023a",
        ...abis,
        ...constants,
      };
    case 137: // polygon mainnet
      return {
        chainName: "Polygon Mainnet",
        nativeCurrency: MATIC_TOKEN,
        nativeWrapCurrency: WMATIC_TOKEN,
        rpcUrl: "https://rpc.ankr.com/polygon",
        aavePoolV3Address: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
        wrappedTokenGatewayV3Address:
          "0x1e4b7A6b903680eab0c5dAbcb8fD429cD2a9598c",
        balanceProviderAddress: "0xBc790382B3686abffE4be14A030A96aC6154023a",
        ...abis,
        ...constants,
      };
    case 324: // zkSync
      return {
        chainName: "zkSync Mainnet",
        nativeCurrency: ETH_TOKEN,
        nativeWrapCurrency: WETH_TOKEN,
        rpcUrl: "https://1rpc.io/zksync2-era",
        aavePoolV3Address: "0x4d9429246EA989C9CeE203B43F6d1C7D83e3B8F8",
        PoolDataProvider: "0xB73550bC1393207960A385fC8b34790e5133175E",
        wrappedTokenGatewayV3Address:
          "0x767b4A087c11d7581Ac95eaFfc1FeBFA26bad3d2",
        balanceProviderAddress: "0xdeEa10da04D867e3303AB6E50FA26C2d8a5e9f70",
        incentivesProxy: "0x54AB34aB3C723bD2674c7082aA6fFcdfd3A5BEdc", //CLAIM
        ...abis,
        ...constants,
      };

      return {
        chainName: "Polygon zkEVM Testnet",
        nativeCurrency: ETH_TOKEN,
        nativeWrapCurrency: WETH_TOKEN,
        rpcUrl: "https://rpc.public.zkevm-test.net",
        aavePoolV3Address: "0x4412c92f6579D9FC542D108382c8D1d6D2Be63d9",
        wrappedTokenGatewayV3Address:
          "0xD82940E16D25aB1349914e1C369eF1b287d457BF",
        balanceProviderAddress: "0x0da6DCAd2bE4801b644AEE679e0AdE008bB4bc6b",
        ...abis,
        ...constants,
      };
    default:
      return {};
    // throw new Error("unknown chain id");
  }
}

function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

function getGasPrice() {
  return Ethers.provider().getGasPrice();
}

function gasEstimation(action) {
  const assetsToSupply = state.assetsToSupply;
  if (!assetsToSupply) {
    return "-";
  }
  const baseAsset = assetsToSupply.find(
    (asset) => asset.symbol === config.nativeCurrency.symbol
  );
  if (!baseAsset) {
    return "-";
  }

  const { marketReferencePriceInUsd, decimals } = baseAsset;
  return getGasPrice().then((gasPrice) => {
    const gasLimit = GAS_LIMIT_RECOMMENDATIONS[action].limit;

    return Big(gasPrice.toString())
      .mul(gasLimit)
      .div(Big(10).pow(decimals))
      .mul(marketReferencePriceInUsd)
      .toFixed(2);
  });
}

function depositETHGas() {
  return gasEstimation("deposit");
}

function depositERC20Gas() {
  return gasEstimation("supplyWithPermit");
}

function withdrawETHGas() {
  return gasEstimation("withdrawETH");
}

function withdrawERC20Gas() {
  return gasEstimation("withdraw");
}

function borrowETHGas() {
  return gasEstimation("borrowETH");
}

function borrowERC20Gas() {
  return gasEstimation("borrow");
}

function repayETHGas() {
  return gasEstimation("repay");
}

function repayERC20Gas() {
  return gasEstimation("repayWithPermit");
}

// App config
function getConfig(network) {
  switch (network) {
    case "mainnet":
      return {
        // ownerId: "aave-v3.near",
        ownerId: "bluebiu.near",
        nodeUrl: "https://rpc.mainnet.near.org",
        ipfsPrefix: "https://ipfs.near.social/ipfs",
        ...(chainId ? getNetworkConfig(chainId) : {}),
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
}

const config = getConfig(context.networkId);
// console.log("CONFIG: ", config);

const markets = [
  {
    aTokenAddress: "0x9002ecb8a06060e3b56669c6B8F18E1c3b119914",
    availableLiquidity: 0, //TODO
    availableLiquidityUSD: "",
    borrowingEnabled: true,
    decimals: 18,
    id: "",
    isIsolated: false,
    marketReferencePriceInUsd: prices["ETH"],
    name: "Ethereum",
    supplyAPY: "",
    supportPermit: true,
    symbol: "ETH",
    underlyingAsset: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",
    usageAsCollateralEnabled: true,
    variableBorrowAPY: "",
    variableDebtTokenAddress: "0x56f58d9BE10929CdA709c4134eF7343D73B080Cf",
    LTV: 0.8,
  },
  {
    id: "",
    underlyingAsset: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",
    name: "Wrapped Ether",
    symbol: "WETH",
    decimals: 18,
    supplyAPY: "",
    marketReferencePriceInUsd: prices["WETH"],
    usageAsCollateralEnabled: true,
    borrowingEnabled: true,
    aTokenAddress: "0x9002ecb8a06060e3b56669c6B8F18E1c3b119914",
    variableDebtTokenAddress: "0x56f58d9BE10929CdA709c4134eF7343D73B080Cf",
    isIsolated: false,
    availableLiquidity: 0,
    availableLiquidityUSD: "",
    variableBorrowAPY: "",
    supportPermit: false,
    LTV: 0.8,
  },
  {
    id: "",
    underlyingAsset: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    supplyAPY: "",
    marketReferencePriceInUsd: prices["USDC"],
    usageAsCollateralEnabled: true,
    borrowingEnabled: true,
    aTokenAddress: "0x016341e6Da8da66b33Fd32189328c102f32Da7CC",
    variableDebtTokenAddress: "0xE60E1953aF56Db378184997cab20731d17c65004",
    isIsolated: false,
    availableLiquidity: 0,
    availableLiquidityUSD: "",
    variableBorrowAPY: "",
    supportPermit: false,
    LTV: 0.8,
  },

  {
    id: "",
    underlyingAsset: "0x493257fd37edb34451f62edf8d2a0c418852ba4c",
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6,
    supplyAPY: "",
    marketReferencePriceInUsd: prices["USDT"],
    usageAsCollateralEnabled: true,
    borrowingEnabled: true,
    aTokenAddress: "0x9ca4806fa54984Bf5dA4E280b7AA8bB821D21505",
    variableDebtTokenAddress: "0xa333c6FF89525939271E796FbDe2a2D9A970F831",
    isIsolated: false,
    availableLiquidity: 0,
    availableLiquidityUSD: "",
    variableBorrowAPY: "",
    supportPermit: false,
    LTV: 0.97,
  },
  {
    id: "",
    underlyingAsset: "0x493257fd37edb34451f62edf8d2a0c418852ba4c",
    name: "Dai Stablecoin",
    symbol: "DAI",
    decimals: 18,
    supplyAPY: "",
    marketReferencePriceInUsd: prices["DAI"],
    usageAsCollateralEnabled: true,
    borrowingEnabled: true,
    aTokenAddress: "0x15b362768465F966F1E5983b7AE87f4C5Bf75C55",
    variableDebtTokenAddress: "0x0325F21eB0A16802E2bACD931964434929985548",
    isIsolated: false,
    availableLiquidity: 0,
    availableLiquidityUSD: "",
    variableBorrowAPY: "",
    supportPermit: false,
    LTV: 0.75,
  },
  {
    id: "",
    underlyingAsset: "0x503234F203fC7Eb888EEC8513210612a43Cf6115",
    decimals: 18,
    symbol: "LUSD",
    name: "LUSD Stablecoin",
    supplyAPY: "",
    marketReferencePriceInUsd: prices["LUSD"],
    usageAsCollateralEnabled: true,
    borrowingEnabled: true,
    aTokenAddress: "0xd97Ac0ce99329EE19b97d03E099eB42D7Aa19ddB",
    variableDebtTokenAddress: "0x41c618CCE58Fb27cAF4EEb1dd25de1d03A0DAAc6",
    isIsolated: false,
    availableLiquidity: 0,
    availableLiquidityUSD: "",
    variableBorrowAPY: "",
    supportPermit: false,
    LTV: 0.75,
  },
];

const marketsMapping = markets.reduce((prev, cur) => {
  prev[cur.underlyingAsset] = cur;
  return prev;
}, {});
// console.log("marketsMapping: ", marketsMapping);

// const nativeMarket = markets.find(
//   (market) => market.symbol === config.nativeWrapCurrency.symbol
// );
// markets.push({
//   ...nativeMarket,
//   ...{
//     ...config.nativeCurrency,
//     supportPermit: true,
//   },
// });
// console.log("full markerts:", markets);

// App states
State.init({
  imports: {},
  showWithdrawModal: false,
  showSupplyModal: false,
  showRepayModal: false,
  showBorrowModal: false,

  assetsToSupply: undefined, //[{markets}]
  yourSupplies: undefined, //[{markets}]
  assetsToBorrow: {
    availableBorrowsUSD: "",
    debts: markets, //TODO?
    healthFactor: "",
    netApy: "",
    netWorthUSD: "",
  },
  yourBorrows: {
    availableBorrowsUSD: "",
    debts: [],
    healthFactor: "",
    netAPY: 0.013302895831857352,
    netWorthUSD: "3.94563967927797537582010364",
  },
  baseAssetBalance: undefined,
  selectTab: "supply", // supply | borrow
});

const loading =
  !state.assetsToSupply || !state.yourSupplies || !state.assetsToBorrow;

// Import functions to state.imports
function importFunctions(imports) {
  if (loading) {
    State.update({
      imports,
    });
  }
}

// Define the modules you'd like to import
const modules = {
  number: `${config.ownerId}/widget/Utils.Number`,
  date: `${config.ownerId}/widget/Utils.Date`,
  data: `${config.ownerId}/widget/AAVE.Data`,
};
// Import functions
// const { formatAmount } = state.imports.number;
// const { formatDateTime } = state.imports.date;

function calculateAvailableBorrows({
  availableBorrowsUSD,
  marketReferencePriceInUsd,
}) {
  return isValid(availableBorrowsUSD) && isValid(marketReferencePriceInUsd)
    ? Big(availableBorrowsUSD).div(marketReferencePriceInUsd).toFixed()
    : Number(0).toFixed();
}

function bigMin(_a, _b) {
  const a = Big(_a);
  const b = Big(_b);
  return a.gt(b) ? b : a;
}

function formatHealthFactor(healthFactor) {
  // console.log("formatHealthFactor:", healthFactor);
  if (healthFactor === "∞") return healthFactor;
  if (!healthFactor || !isValid(healthFactor)) return "-";
  if (Number(healthFactor) === -1) return "∞";
  return Big(healthFactor).toFixed(2, ROUND_DOWN);
}

function batchBalanceOf(chainId, userAddress, tokenAddresses, abi) {
  const balanceProvider = new ethers.Contract(
    config.balanceProviderAddress,
    abi.body,
    Ethers.provider().getSigner()
  );

  return balanceProvider.batchBalanceOf([userAddress], tokenAddresses);
}

// update data in async manner
function updateData(refresh) {
  // check abi loaded
  if (
    Object.keys(CONTRACT_ABI)
      .map((key) => config[key])
      .filter((ele) => !!ele).length !== Object.keys(CONTRACT_ABI).length
  ) {
    return;
  }
  const provider = Ethers.provider();
  provider
    .getSigner()
    ?.getBalance()
    .then((balance) => State.update({ baseAssetBalance: balance }));
  if (!account || !state.baseAssetBalance) {
    return;
  }

  // get user balances
  batchBalanceOf(
    chainId,
    account,
    markets.map((market) => market.underlyingAsset),
    config.walletBalanceProviderABI
  )
    .then((balances) => {
      // console.log(
      //   "getBalance",
      //   balances,
      //   balances.map((balance) => balance.toString())
      // );
      return balances.map((balance) => balance.toString());
    })
    .then((userBalances) => {
      const assetsToSupply = markets
        .map((market, idx) => {
          const balanceRaw = Big(
            market.symbol === config.nativeCurrency.symbol
              ? state.baseAssetBalance
              : userBalances[idx]
          ).div(Big(10).pow(market.decimals));
          const balance = balanceRaw.toFixed(market.decimals, ROUND_DOWN);
          const balanceInUSD = balanceRaw
            .mul(market.marketReferencePriceInUsd)
            .toFixed(3, ROUND_DOWN);
          return {
            ...market,
            balance,
            balanceInUSD,
          };
        })
        .sort((asset1, asset2) => {
          const balanceInUSD1 = Number(asset1.balanceInUSD);
          const balanceInUSD2 = Number(asset2.balanceInUSD);
          if (balanceInUSD1 !== balanceInUSD2)
            return balanceInUSD2 - balanceInUSD1;
          return asset1.symbol.localeCompare(asset2.symbol);
        });

      State.update({
        assetsToSupply,
      });
      // get user borrow data
      // updateUserDebts(marketsMapping, assetsToSupply, refresh);
    })
    .catch((err) => {
      console.log("batchBalanceOfERROR:", err);
    });
  // get user supplies
  // updateUserSupplies(marketsMapping, refresh);
  // });
}

// function updateUserDebts(marketsMapping, assetsToSupply, refresh) {
//   if (!marketsMapping || !assetsToSupply) {
//     return;
//   }

//   const prevYourBorrows = state.yourBorrows;
//   // userDebts depends on the balance from assetsToSupply
//   const assetsToSupplyMap = assetsToSupply.reduce((prev, cur) => {
//     if (cur.symbol !== config.nativeCurrency.symbol) {
//       prev[cur.underlyingAsset] = cur;
//     } else {
//       prev[NATIVE_SYMBOL_ADDRESS_MAP_KEY] = cur;
//     }
//     return prev;
//   }, {});

//   const debts = debts
//     .map((userDebt) => {
//       const market = marketsMapping[userDebt.underlyingAsset];
//       if (!market) {
//         return;
//       }
//       const { availableLiquidityUSD } = market;
//       const availableBorrowsUSD = bigMin(
//         userDebts.availableBorrowsUSD,
//         availableLiquidityUSD
//       )
//         .times(ACTUAL_BORROW_AMOUNT_RATE)
//         .toFixed();
//       const assetsToSupplyMapKey =
//         market.symbol === config.nativeWrapCurrency.symbol
//           ? NATIVE_SYMBOL_ADDRESS_MAP_KEY
//           : userDebt.underlyingAsset;
//       return {
//         ...market,
//         ...userDebt,
//         ...(market.symbol === config.nativeWrapCurrency.symbol
//           ? {
//               ...config.nativeCurrency,
//               supportPermit: true,
//             }
//           : {}),
//         availableBorrows: calculateAvailableBorrows({
//           availableBorrowsUSD,
//           marketReferencePriceInUsd: market.marketReferencePriceInUsd,
//         }),
//         availableBorrowsUSD,
//         balance: assetsToSupplyMap[assetsToSupplyMapKey].balance,
//         balanceInUSD: assetsToSupplyMap[assetsToSupplyMapKey].balanceInUSD,
//       };
//     })
//     .filter((asset) => !!asset)
//     .sort((asset1, asset2) => {
//       const availableBorrowsUSD1 = Number(asset1.availableBorrowsUSD);
//       const availableBorrowsUSD2 = Number(asset2.availableBorrowsUSD);
//       if (availableBorrowsUSD1 !== availableBorrowsUSD2)
//         return availableBorrowsUSD2 - availableBorrowsUSD1;
//       return asset1.symbol.localeCompare(asset2.symbol);
//     })
//     .filter((asset) => {
//       return asset.borrowingEnabled;
//     });

//   const assetsToBorrow = {
//     // healthFactor: formatHealthFactor(userDebts.healthFactor),
//     debts,
//   };
//   const yourBorrows = {
//     ...assetsToBorrow,
//     debts: assetsToBorrow.debts.filter(
//       (row) =>
//         !isNaN(Number(row.variableBorrowsUSD)) &&
//         Number(row.variableBorrowsUSD) > 0
//     ),
//   };

//   State.update({
//     yourBorrows,
//     assetsToBorrow,
//   });

//   if (
//     refresh &&
//     JSON.stringify(prevYourBorrows) === JSON.stringify(yourBorrows)
//   ) {
//     console.log("refresh borrows again ...", prevYourBorrows, yourBorrows);
//     setTimeout(updateData, 500);
//   }
//   // });
// }

function onActionSuccess({ msg, callback }) {
  // update data if action finishes
  updateData(true);
  // update UI after data has almost loaded
  setTimeout(() => {
    if (callback) {
      callback();
    }
    if (msg) {
      State.update({ alertModalText: msg });
    }
  }, 5000);
}

if (chainId && isChainSupported && loading) {
  updateData();
}

function getPoolDataProvider() {
  if (!state.assetsToSupply) return;
  const prevAssetsToSupply = state.assetsToSupply;
  const prevAssetsToBorrow = state.assetsToBorrow;
  const underlyingTokens = prevAssetsToSupply.map(
    (item) => item.underlyingAsset
  );

  const calls = underlyingTokens.map((addr) => ({
    address: config.PoolDataProvider,
    name: "getReserveData",
    params: [addr],
  }));

  multicall({
    abi: [
      {
        inputs: [{ internalType: "address", name: "asset", type: "address" }],
        name: "getReserveData",
        outputs: [
          { internalType: "uint256", name: "unbacked", type: "uint256" },
          {
            internalType: "uint256",
            name: "accruedToTreasuryScaled",
            type: "uint256",
          },
          { internalType: "uint256", name: "totalAToken", type: "uint256" },
          {
            internalType: "uint256",
            name: "totalStableDebt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalVariableDebt",
            type: "uint256",
          },
          { internalType: "uint256", name: "liquidityRate", type: "uint256" },
          {
            internalType: "uint256",
            name: "variableBorrowRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "stableBorrowRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "averageStableBorrowRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "liquidityIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "variableBorrowIndex",
            type: "uint256",
          },
          {
            internalType: "uint40",
            name: "lastUpdateTimestamp",
            type: "uint40",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      console.log("getPoolDataProvider_res", res);

      for (let i = 0; i < res.length; i++) {
        if (res[i]) {
          const [
            unbacked,
            accruedToTreasuryScaled,
            totalAToken,
            totalStableDebt,
            totalVariableDebt,
            liquidityRate,
            variableBorrowRate,
            stableBorrowRate,
            averageStableBorrowRate,
            liquidityIndex,
            variableBorrowIndex,
            lastUpdateTimestamp,
          ] = res[i];
          const RAY = Big(10).pow(27);
          const SECONDS_PER_YEAR = 31_536_000;
          const depositAPR = Big(liquidityRate).div(RAY);
          const depositAPY0 = Big(1)
            .plus(depositAPR.div(Big(SECONDS_PER_YEAR)))
            .toNumber();
          const depositAPY = Big(
            Math.pow(depositAPY0, SECONDS_PER_YEAR) - 1
          ).toFixed();

          const variableBorrowAPR = Big(variableBorrowRate).div(RAY);

          const variableBorrowAPY0 = Big(1)
            .plus(Big(variableBorrowAPR).div(Big(SECONDS_PER_YEAR)))
            .toNumber();

          const variableBorrowAPYRaw = Big(
            100 * (Math.pow(variableBorrowAPY0, SECONDS_PER_YEAR) - 1)
          );

          const variableBorrowAPY = Big(
            Math.pow(variableBorrowAPY0, SECONDS_PER_YEAR) - 1
          ).toFixed();
          // const netApy = Big(depositAPY0).minus(variableBorrowAPYRaw).toFixed();
          prevAssetsToSupply[i].supplyAPY = depositAPY;
          prevAssetsToSupply[i].variableBorrowAPY = variableBorrowAPY;
          // prevAssetsToBorrow.netApy = netApy;
          // prevAssetsToBorrow.variableBorrowAPY = variableBorrowAPY;
        }
      }
      State.update({
        assetsToSupply: prevAssetsToSupply,
        assetsToBorrow: {
          ...state.assetsToBorrow,
          netApy,
          debts: prevAssetsToSupply,
        },
      });
    })
    .catch((err) => {
      console.log("getPoolDataProvider_err", err);
    });
}

// healthFactor
function fetchUserAccountData() {
  const contract = new ethers.Contract(
    config.aavePoolV3Address,
    config.aavePoolV3ABI.body,
    Ethers.provider()
  );
  contract
    .getUserAccountData(account)
    .then((res) => {
      console.log("getUserAccountData_res:", res);
      const [
        totalCollateralBase,
        totalDebtBase,
        availableBorrowsBase,
        currentLiquidationThreshold,
        ltv,
        healthFactor,
      ] = res;
      // onLoad({
      //   deposits: ethers.utils.formatUnits(res),
      // });
      State.update({
        assetsToBorrow: {
          ...state.assetsToBorrow,
          healthFactor: ethers.utils.formatUnits(healthFactor),
        },
      });
      // formatHealthFactor(healthFactor)
    })
    .catch((err) => {
      console.log("getUserAccountData_error", err);
    });
}

function getUserDeposits() {
  const aTokenAddresss = markets.map((item) => item.aTokenAddress);

  const calls = aTokenAddresss.map((addr) => ({
    address: addr,
    name: "balanceOf",
    params: [account],
  }));
  multicall({
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      console.log("getUsetDeposits_res", res);
      let userDeposits = [];
      for (let index = 0; index < res.length; index++) {
        if (res[index]) {
          // let underlyingBalance=
          let market = markets.find(
            (item) => item.aTokenAddress === aTokenAddresss[index]
          );

          let _bal = ethers.utils.formatUnits(res[index][0], market.decimals);
          market.underlyingBalance = _bal;
          market.underlyingBalanceUSD = Big(_bal)
            .mul(prices[market.symbol])
            .toFixed();
          userDeposits.push(market);
        }
      }

      const yourSupplies = userDeposits.map((userDeposit) => {
        const market = marketsMapping[userDeposit.underlyingAsset];
        return {
          ...market,
          ...userDeposit,
          ...(market.symbol === config.nativeWrapCurrency.symbol
            ? {
                ...config.nativeCurrency,
                supportPermit: true,
              }
            : {}),
        };
      });
      console.log("yourSupplies:", yourSupplies);
      State.update({
        yourSupplies,
      });
    })
    .catch((err) => {
      console.log("getUsetDeposits_err", err);
    })
    .finally(() => {
      getUserDebts();
    });
}

function getUserDebts() {
  const variableDebtTokenAddresss = markets.map(
    (item) => item.variableDebtTokenAddress
  );

  const calls = variableDebtTokenAddresss.map((addr) => ({
    address: addr,
    name: "balanceOf",
    params: [account],
  }));

  multicall({
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      console.log("getUserDebts_res", res);
      let userDebs = [];
      for (let index = 0; index < res.length; index++) {
        if (res[index]) {
          let market = markets.find(
            (item) =>
              item.variableDebtTokenAddress === variableDebtTokenAddresss[index]
          );

          let _bal = ethers.utils.formatUnits(res[index][0], market.decimals);
          market.balance = _bal;
          market.balanceInUSD = Big(_bal).mul(prices[market.symbol]).toFixed();
          userDebs.push(market);
        }
      }
      // const yourBorrows = userDebs.map((userDebt) => {
      //   const market = marketsMapping[userDebt.underlyingAsset];
      //   return {
      //     ...market,
      //     ...userDebt,
      //     ...(market.symbol === config.nativeWrapCurrency.symbol
      //       ? {
      //           ...config.nativeCurrency,
      //           supportPermit: true,
      //         }
      //       : {}),
      //   };
      // });
      console.log("yourBorrows:", state.yourBorrows);
      State.update({
        yourBorrows: {
          ...state.yourBorrows,
          debts: userDebs,
        },
      });
    })
    .catch((err) => {
      console.log("getUserDebts_err", err);
    });
}

useEffect(() => {
  if (isChainSupported) {
    fetchUserAccountData();
    getUserDeposits();
  }
}, []);
useEffect(() => {
  if (isChainSupported) {
    getPoolDataProvider();
  }
}, [state.assetsToSupply]);

function calcNetWorth() {
  if (!state.yourSupplies || !state.yourBorrows) return;

  const supplyBal = state.yourSupplies.reduce(
    (total, cur) => Big(total).plus(cur.underlyingBalanceUSD).toFixed(),
    0
  );
  const debtsBal = state.yourBorrows.debts.reduce(
    (total, cur) => Big(total).plus(cur.balanceInUSD).toFixed(),
    0
  );
  const netWorth = Big(supplyBal).minus(debtsBal).toFixed(2, ROUND_DOWN);
  State.update({
    assetsToBorrow: {
      ...state.assetsToBorrow,
      netWorthUSD: netWorth,
    },
  });
}

//calc net worth
useEffect(() => {
  if (!state.yourSupplies || !state.yourBorrows) return;

  const supplyBal = state.yourSupplies.reduce(
    (total, cur) => Big(total).plus(cur.underlyingBalanceUSD).toFixed(),
    0
  );
  const debtsBal = state.yourBorrows.debts.reduce(
    (total, cur) => Big(total).plus(cur.balanceInUSD).toFixed(),
    0
  );
  const netWorth = Big(supplyBal).minus(debtsBal).toFixed(2, ROUND_DOWN);
  State.update({
    assetsToBorrow: {
      ...state.assetsToBorrow,
      netWorthUSD: netWorth,
    },
  });
}, [state.yourSupplies, state.yourBorrows]);

console.log("STATE: ", state);

const body = isChainSupported ? (
  <Body>
    <FlexContainer>
      <Widget
        src={`${config.ownerId}/widget/AAVE.HeroData`}
        props={{
          config,
          netWorth: `$ ${
            state.assetsToBorrow?.netWorthUSD
              ? Big(state.assetsToBorrow.netWorthUSD).toFixed(2)
              : "-"
          }`,
          netApy: `${
            state.assetsToBorrow?.netAPY
              ? Number(
                  Big(state.assetsToBorrow.netAPY).times(100).toFixed(2)
                ) === 0
                ? "0.00"
                : Big(state.assetsToBorrow.netAPY).times(100).toFixed(2)
              : "-"
          }%`,
          healthFactor: formatHealthFactor(state.assetsToBorrow.healthFactor),
          //TODO
          // showHealthFactor:
          //   state.yourBorrows &&
          //   state.yourBorrows.debts &&
          //   state.yourBorrows.debts.length > 0,
          showHealthFactor: true,
        }}
      />
    </FlexContainer>
    <Widget
      src={`${config.ownerId}/widget/AAVE.TabSwitcher`}
      props={{
        config,
        select: state.selectTab,
        setSelect: (tabName) => State.update({ selectTab: tabName }),
      }}
    />
    {state.selectTab === "supply" && (
      <>
        <Widget
          src={`${config.ownerId}/widget/AAVE.Card.YourSupplies`}
          props={{
            config,
            chainId: chainId,
            yourSupplies: state.yourSupplies,
            showWithdrawModal: state.showWithdrawModal,
            setShowWithdrawModal: (isShow) =>
              State.update({ showWithdrawModal: isShow }),
            onActionSuccess,
            healthFactor: formatHealthFactor(state.assetsToBorrow.healthFactor),
            formatHealthFactor,
            withdrawETHGas,
            withdrawERC20Gas,
          }}
        />
        <Widget
          src={`${config.ownerId}/widget/AAVE.Card.AssetsToSupply`}
          props={{
            config,
            chainId: chainId,
            assetsToSupply: state.assetsToSupply,
            showSupplyModal: state.showSupplyModal,
            setShowSupplyModal: (isShow) =>
              State.update({ showSupplyModal: isShow }),
            onActionSuccess,
            healthFactor: formatHealthFactor(state.assetsToBorrow.healthFactor),
            formatHealthFactor,
            depositETHGas,
            depositERC20Gas,
          }}
        />
      </>
    )}
    {state.selectTab === "borrow" && (
      <>
        <Widget
          src={`${config.ownerId}/widget/AAVE.Card.YourBorrows`}
          props={{
            config,
            chainId: chainId,
            yourBorrows: state.yourBorrows,
            showRepayModal: state.showRepayModal,
            setShowRepayModal: (isShow) =>
              State.update({ showRepayModal: isShow }),
            showBorrowModal: state.showBorrowModal,
            setShowBorrowModal: (isShow) =>
              State.update({ showBorrowModal: isShow }),
            formatHealthFactor,
            onActionSuccess,
            repayETHGas,
            repayERC20Gas,
            borrowETHGas,
            borrowERC20Gas,
          }}
        />
        <Widget
          src={`${config.ownerId}/widget/AAVE.Card.AssetsToBorrow`}
          props={{
            config,
            chainId: chainId,
            assetsToBorrow: state.assetsToBorrow,
            showBorrowModal: state.showBorrowModal,
            yourSupplies: state.yourSupplies,
            setShowBorrowModal: (isShow) =>
              State.update({ showBorrowModal: isShow }),
            formatHealthFactor,
            onActionSuccess,
            borrowETHGas,
            borrowERC20Gas,
          }}
        />
      </>
    )}
    {state.alertModalText && (
      <Widget
        src={`${config.ownerId}/widget/AAVE.Modal.AlertModal`}
        props={{
          config,
          title: "All done!",
          description: state.alertModalText,
          onRequestClose: () => State.update({ alertModalText: false }),
        }}
      />
    )}
  </Body>
) : (
  <Widget
    src="bluebiu.near/widget/Swap.ChainWarnigBox"
    props={{
      chain: curChain,
      onSwitchChain: onSwitchChain,
      switchingChain: switchingChain,
      theme: dexConfig.theme,
    }}
  />
);
// );

return (
  <div>
    {/* Component Head */}
    <Widget
      src={`${config.ownerId}/widget/Utils.Import`}
      props={{ modules, onLoad: importFunctions }}
    />

    {body}
  </div>
);
