const Wrap = styled.div`
  padding: 24px 15px;
  /* background: #0e0e26; */
  min-height: 100vh;
  color: white;
  font-family: Gantari;
`;

const FlexContainer = styled.div``;

const ChainsWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Yours = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 16px;
`;
const YoursTableWrapper = styled.div`
  background-color: rgba(53, 55, 73, 0.2);
  border-radius: 6px;
  width: 50%;
`;
const Title = styled.div`
  padding: 10px 20px 0;
  /* border-bottom: 1px solid #292c42; */
`;
const SubTitle = styled.div`
  display: flex;
  align-items: center;
`;
const Label = styled.div`
  color: #979abe;
  font-size: 16px;
  font-weight: 400;
  margin-right: 5px;
`;
const Value = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin-right: 15px;
`;

const ROUND_DOWN = 0;
const NATIVE_SYMBOL_ADDRESS_MAP_KEY = "0x0";
const ACTUAL_BORROW_AMOUNT_RATE = 0.99;

const account = Ethers.send("eth_requestAccounts", [])[0];
const {
  CHAIN_LIST,
  curChain,
  onSwitchChain,
  GAS_LIMIT_RECOMMENDATIONS,
  chainId,
  prices,
  multicallAddress,
  multicall,
  isChainSupported,
  switchingChain,
  dexConfig,
  theme,
  toast,
} = props;
const { CONTRACT_ABI } = dexConfig;
console.log("AAVE.V3: ", props);

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
function getConfig() {
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

  return {
    ...dexConfig.config,
    ...abis,
    ...constants,
  };
}

const config = getConfig();
// console.log("CONFIG: ", config);
const markets = dexConfig?.rawMarkets?.map((item) => ({
  ...item,
  marketReferencePriceInUsd: prices[item.symbol],
}));
const underlyingTokens = dexConfig?.rawMarkets?.map(
  (market) => market.underlyingAsset
);

function getLiquidity() {
  const aTokenAddresss = markets.map((item) => item.aTokenAddress);
  const variableDebtTokenAddresss = markets.map(
    (item) => item.variableDebtTokenAddress
  );

  const calls = aTokenAddresss
    .map((addr) => ({
      address: addr,
      name: "totalSupply",
    }))
    .concat(
      variableDebtTokenAddresss.map((addr) => ({
        address: addr,
        name: "totalSupply",
      }))
    );

  multicall({
    abi: [
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
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
      console.log("getLiquidity_res", res);
      const l = res.length;
      const aTokenTotal = res.slice(0, l / 2);
      const debtTotal = res.slice(l / 2);

      for (let i = 0; i < markets.length; i++) {
        const liquidityAmount = Big(aTokenTotal[i])
          .minus(Big(debtTotal[i]))
          .toFixed();
        markets[i].availableLiquidity = liquidityAmount;
        markets[i].availableLiquidityUSD = Big(
          ethers.utils.formatUnits(liquidityAmount, markets[i].decimals)
        )
          .mul(prices[markets[i].symbol])
          .toFixed();
      }
    })
    .catch((err) => {
      console.log("getLiquidity_err", err);
    });
}
getLiquidity();

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
  netWorthUSD: "",
  totalNetApy: "",
  healthFactor: "",
  assetsToBorrow: {
    availableBorrowsUSD: "",
    debts: markets,
    // netApy: "",
  },
  yourBorrows: {
    availableBorrowsUSD: "",
    debts: [],
    // netApy: '',
  },
  baseAssetBalance: undefined,
  selectTab: "MARKET", // MARKET | YOURS
  fresh: 0, // fresh rewards
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
    ? Big(availableBorrowsUSD || 0)
        .div(marketReferencePriceInUsd)
        .toFixed()
    : Number(0).toFixed();
}

function bigMin(_a, _b) {
  const a = Big(_a || 0);
  const b = Big(_b || 0);
  return a.gt(b) ? b : a;
}

function formatHealthFactor(healthFactor) {
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
      const assetsToSupply = markets.map((market, idx) => {
        const _bal =
          market.symbol === config.nativeCurrency.symbol
            ? state.baseAssetBalance
            : userBalances[idx];
        const balanceRaw = Big(_bal || 0).div(Big(10).pow(market.decimals));

        const balance = balanceRaw.toFixed(market.decimals, ROUND_DOWN);

        const balanceInUSD = balanceRaw
          .mul(market.marketReferencePriceInUsd || 0)
          .toFixed(3, ROUND_DOWN);

        const availableBorrowsUSD = bigMin(
          state.assetsToBorrow.availableBorrowsUSD,
          market.availableLiquidityUSD
        )
          .times(ACTUAL_BORROW_AMOUNT_RATE)
          .toFixed();

        const availableBorrows = calculateAvailableBorrows({
          availableBorrowsUSD,
          marketReferencePriceInUsd: market.marketReferencePriceInUsd,
        });
        // console.log(44444, availableBorrows);
        // item.availableBorrows = availableBorrows;

        return {
          ...market,
          availableBorrowsUSD,
          availableBorrows,
          balance,
          balanceInUSD,
        };
      });
      // .sort((asset1, asset2) => {
      //   const balanceInUSD1 = Number(asset1.balanceInUSD);
      //   const balanceInUSD2 = Number(asset2.balanceInUSD);
      //   if (balanceInUSD1 !== balanceInUSD2)
      //     return balanceInUSD2 - balanceInUSD1;
      //   return asset1.symbol.localeCompare(asset2.symbol);
      // });

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

function updateUserDebts(marketsMapping, assetsToSupply, refresh) {
  if (!marketsMapping || !assetsToSupply) {
    return;
  }

  const _assetsToSupply = [...state.assetsToSupply];

  _assetsToSupply.forEach((item) => {
    const availableBorrowsUSD = bigMin(
      state.assetsToBorrow.availableBorrowsUSD,
      item.availableLiquidityUSD
    )
      .times(ACTUAL_BORROW_AMOUNT_RATE)
      .toFixed();
    console.log(33333, availableBorrowsUSD);
    item.availableBorrowsUSD = availableBorrowsUSD;
    const availableBorrows = calculateAvailableBorrows({
      availableBorrowsUSD,
      marketReferencePriceInUsd: item.marketReferencePriceInUsd,
    });
    console.log(44444, availableBorrows);
    item.availableBorrows = availableBorrows;
    item.abcd = 1234;
  });
  console.log(222222, _assetsToSupply);
  State.update({
    assetsToSupply: _assetsToSupply,
  });
  return;
  const prevYourBorrows = { ...state.yourBorrows };

  // userDebts depends on the balance from assetsToSupply
  const assetsToSupplyMap = assetsToSupply.reduce((prev, cur) => {
    if (cur.symbol !== config.nativeCurrency.symbol) {
      prev[cur.underlyingAsset] = cur;
    } else {
      prev[NATIVE_SYMBOL_ADDRESS_MAP_KEY] = cur;
    }
    return prev;
  }, {});
  console.log(111111, markets, assetsToSupplyMap);
  const debts = markets
    .map((userDebt) => {
      const market = assetsToSupplyMap[userDebt.underlyingAsset];

      if (!market) {
        return;
      }
      const { availableLiquidityUSD } = market;
      const availableBorrowsUSD = bigMin(
        state.assetsToBorrow.availableBorrowsUSD,
        availableLiquidityUSD
      )
        .times(ACTUAL_BORROW_AMOUNT_RATE)
        .toFixed();

      const assetsToSupplyMapKey =
        market.symbol === config.nativeWrapCurrency.symbol
          ? NATIVE_SYMBOL_ADDRESS_MAP_KEY
          : userDebt.underlyingAsset;
      return {
        ...market,
        ...userDebt,
        ...(market.symbol === config.nativeWrapCurrency.symbol
          ? {
              ...config.nativeCurrency,
              supportPermit: true,
            }
          : {}),
        availableBorrows: calculateAvailableBorrows({
          availableBorrowsUSD,
          marketReferencePriceInUsd: market.marketReferencePriceInUsd,
        }),
        availableBorrowsUSD,
        balance: assetsToSupplyMap[assetsToSupplyMapKey].balance,
        balanceInUSD: assetsToSupplyMap[assetsToSupplyMapKey].balanceInUSD,
      };
    })
    // .filter((asset) => !!asset)
    // .sort((asset1, asset2) => {
    //   const availableBorrowsUSD1 = Number(asset1.availableBorrowsUSD);
    //   const availableBorrowsUSD2 = Number(asset2.availableBorrowsUSD);
    //   if (availableBorrowsUSD1 !== availableBorrowsUSD2)
    //     return availableBorrowsUSD2 - availableBorrowsUSD1;
    //   return asset1.symbol.localeCompare(asset2.symbol);
    // })
    .filter((asset) => {
      return asset.borrowingEnabled;
    });

  const assetsToBorrow = {
    ...state.assetsToBorrow,
    debts,
  };

  const yourBorrows = {
    ...assetsToBorrow,
    debts: assetsToBorrow.debts.filter(
      (row) =>
        !isNaN(Number(row.variableBorrowsUSD)) &&
        Number(row.variableBorrowsUSD) > 0
    ),
  };

  State.update({
    yourBorrows,
    assetsToBorrow,
  });

  if (
    refresh &&
    JSON.stringify(prevYourBorrows) === JSON.stringify(yourBorrows)
  ) {
    console.log("refresh borrows again ...", prevYourBorrows, yourBorrows);
    setTimeout(updateData, 500);
  }
  // });
}

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
  const _debts = [...state.assetsToBorrow.debts];
  const prevAssetsToSupply = [...state.assetsToSupply];
  const prevAssetsToBorrow = { ...state.assetsToBorrow };
  // const underlyingTokens = prevAssetsToSupply.map(
  //   (item) => item.underlyingAsset
  // );
  const underlyingTokens = dexConfig?.rawMarkets?.map(
    (market) => market.underlyingAsset
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
          const netApy = Big(depositAPY0).minus(variableBorrowAPYRaw).toFixed();
          prevAssetsToSupply[i].supplyAPY = depositAPY;
          prevAssetsToSupply[i].variableBorrowAPY = variableBorrowAPY;
          _debts[i].supplyAPY = depositAPY;
          _debts[i].variableBorrowAPY = variableBorrowAPY;

          // prevAssetsToBorrow.netApy = netApy;
          prevAssetsToBorrow.variableBorrowAPY = variableBorrowAPY;
        }
      }
      State.update({
        assetsToSupply: prevAssetsToSupply,
        assetsToBorrow: {
          ...state.assetsToBorrow,
          // netApy,
          debts: _debts,
        },
      });
    })
    .catch((err) => {
      console.log("getPoolDataProvider_err", err);
    });
}

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
        currentLiquidationThreshold,
        healthFactor: formatHealthFactor(
          ethers.utils.formatUnits(healthFactor)
        ),
        assetsToBorrow: {
          ...state.assetsToBorrow,
          availableBorrowsUSD: ethers.utils.formatUnits(
            availableBorrowsBase,
            8
          ),
        },
      });
    })
    .catch((err) => {
      console.log("getUserAccountData_error", err);
    });
}
function valueToBigNumber(amount) {
  if (amount instanceof BigNumber) {
    return amount;
  }

  return new BigNumber(amount);
}
const LTV_PRECISION = 4;
// return  HealthFactorFromBalanceRequest): BigNumber
function calculateHealthFactorFromBalances({
  borrowBalanceMarketReferenceCurrency,
  collateralBalanceMarketReferenceCurrency,
  currentLiquidationThreshold,
}) {
  if (valueToBigNumber(borrowBalanceMarketReferenceCurrency).eq(0)) {
    return valueToBigNumber("-1"); // Invalid number
  }

  return valueToBigNumber(collateralBalanceMarketReferenceCurrency)
    .multipliedBy(currentLiquidationThreshold)
    .shiftedBy(LTV_PRECISION * -1)
    .div(borrowBalanceMarketReferenceCurrency);
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
          let market = state.assetsToSupply.find(
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
      const mm = state.assetsToSupply.reduce((prev, cur) => {
        prev[cur.underlyingAsset] = cur;
        return prev;
      }, {});
      const _yourSupplies = userDeposits.map((userDeposit) => {
        const market = mm[userDeposit.underlyingAsset];

        return {
          ...market,
          ...userDeposit,
          ...(market.symbol === config.nativeCurrency.symbol
            ? {
                ...config.nativeCurrency,
                supportPermit: true,
              }
            : {}),
        };
      });
      let obj = {};
      const yourSupplies = _yourSupplies.reduce((prev, cur) => {
        obj[cur.aTokenAddress]
          ? ""
          : (obj[cur.aTokenAddress] = true && prev.push(cur));
        return prev;
      }, []);
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
      const _debts = [...state.assetsToBorrow.debts];
      for (let index = 0; index < res.length; index++) {
        if (res[index]) {
          let market = _debts.find(
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
      console.log("userDebs:", userDebs);
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

function getAllUserRewards() {
  const arr = markets
    .map((item) => [
      item.aTokenAddress,
      // item.stableDebtTokenAddress,
      item.variableDebtTokenAddress,
    ])
    .flat();
  const addrs = [...new Set(arr)];

  const rewardsProvider = new ethers.Contract(
    config.incentivesProxy,
    [
      {
        inputs: [
          { internalType: "address[]", name: "assets", type: "address[]" },
          { internalType: "address", name: "user", type: "address" },
        ],
        name: "getAllUserRewards",
        outputs: [
          {
            internalType: "address[]",
            name: "rewardsList",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "unclaimedAmounts",
            type: "uint256[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );

  rewardsProvider
    .getAllUserRewards(addrs, account)
    .then((res) => {
      console.log(
        "getAllUserRewards_res:",
        res,
        ethers.utils.formatUnits(res[1][1])
      );
      const _amount = ethers.utils.formatUnits(res[1][1]);
      State.update({
        rewardsAmount: _amount,
      });
    })
    .catch((err) => {
      console.log("getAllUserRewards_error:", err);
    });
}

useEffect(() => {
  if (!isChainSupported) return;

  fetchUserAccountData();
}, [isChainSupported]);

useEffect(() => {
  if (!account) return;

  if (dexConfig.rewardToken) {
    getAllUserRewards();
  }
}, [dexConfig, fresh]);

useEffect(() => {
  if (!isChainSupported || !state.assetsToSupply) return;

  getPoolDataProvider();
  getUserDeposits();
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
    netWorthUSD: netWorth,
  });
}

useEffect(() => {
  if (!["zerolend", "AAVE V3"].includes(dexConfig.name)) return;

  if (!state.yourSupplies || !state.yourBorrows) return;

  //calc net worth
  const supplyBal = state.yourSupplies.reduce(
    (total, cur) => Big(total).plus(cur.underlyingBalanceUSD).toFixed(),
    0
  );
  const debtsBal = state.yourBorrows.debts.reduce(
    (total, cur) => Big(total).plus(cur.balanceInUSD).toFixed(),
    0
  );
  const netWorth = Big(supplyBal).minus(debtsBal).toFixed(2, ROUND_DOWN);

  //calc net apy

  const weightedAverageSupplyAPY = state.yourSupplies.reduce(
    (total, cur) =>
      Big(total)
        .plus(
          Big(cur.underlyingBalanceUSD).times(Big(cur.supplyAPY)).div(supplyBal)
        )
        .toFixed(),
    0
  );
  const weightedAverageBorrowsAPY = state.yourBorrows.debts.reduce(
    (total, cur) =>
      Big(total)
        .plus(
          Big(cur.balanceInUSD).times(Big(cur.variableBorrowAPY)).div(debtsBal)
        )
        .toFixed(),
    0
  );

  const a = Big(weightedAverageSupplyAPY)
    .times(supplyBal)
    .div(netWorth)
    .toFixed();
  const b = Big(weightedAverageBorrowsAPY)
    .times(debtsBal)
    .div(netWorth)
    .toFixed();
  const totalNetApy = Big(a).minus(Big(b)).toFixed();

  const yourTotalSupply = state.yourSupplies.reduce(
    (prev, curr) =>
      Big(prev)
        .plus(Big(curr.underlyingBalanceUSD || 0))
        .toFixed(),
    0
  );
  const yourTotalBorrow = state.yourBorrows.debts.reduce(
    (prev, curr) =>
      Big(prev)
        .plus(Big(curr.balanceInUSD || 0))
        .toFixed(),
    0
  );

  State.update({
    totalNetApy,
    netWorthUSD: netWorth,
    yourTotalSupply,
    yourTotalBorrow,
  });
}, [state.yourSupplies, state.yourBorrows]);

function onSuccess() {
  State.update({
    ...state,
    fresh: state.fresh + 1,
  });
}

console.log("STATE: ", state);

const body = isChainSupported ? (
  <Wrap>
    <FlexContainer>
      <ChainsWrap>
        <Widget
          src="bluebiu.near/widget/Lending.Chains"
          props={{
            chains: CHAIN_LIST,
            curChain,
            onSwitchChain,
            // onChange: (tab) => {
            //   State.update({
            //     tab: tab.key,
            //   });
            // },
          }}
        />
      </ChainsWrap>
      <Widget
        src={`${config.ownerId}/widget/AAVE.HeroData`}
        props={{
          config,
          netWorth: `$ ${
            state.netWorthUSD ? Big(state.netWorthUSD).toFixed(2) : "-"
          }`,
          netApy: `${
            state.totalNetApy
              ? Number(Big(state.totalNetApy).times(100).toFixed(2))
              : "-"
          }%`,
          healthFactor: formatHealthFactor(state.healthFactor),
          theme: dexConfig?.theme,
        }}
      />
    </FlexContainer>
    <Widget
      src={`${config.ownerId}/widget/AAVE.TabSwitcher`}
      props={{
        config,
        theme: dexConfig?.theme,
        select: state.selectTab,
        setSelect: (tabName) => State.update({ selectTab: tabName }),
      }}
    />
    {state.selectTab === "MARKET" && (
      <>
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
            healthFactor: formatHealthFactor(state.healthFactor),
            formatHealthFactor,
            depositETHGas,
            depositERC20Gas,
            borrowETHGas,
            borrowERC20Gas,
            yourSupplies: state.yourSupplies,
            theme: dexConfig?.theme,
          }}
        />
        {/* <Widget
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
            theme: dexConfig?.theme,
          }}
        /> */}
      </>
    )}
    {state.selectTab === "YOURS" && (
      <>
        <Yours>
          <YoursTableWrapper>
            <Title>
              You Supplies
              <SubTitle>
                <Label>Balance:</Label>
                <Value>$ {Number(state.yourTotalSupply).toFixed(2)}</Value>

                <Label>APY:</Label>
                <Value> %</Value>

                <Label>Collateral:</Label>
                <Value>$ </Value>
              </SubTitle>
            </Title>
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
                healthFactor: formatHealthFactor(state.healthFactor),
                formatHealthFactor,
                withdrawETHGas,
                withdrawERC20Gas,
                account,
                theme: dexConfig?.theme,
              }}
            />
          </YoursTableWrapper>
          <YoursTableWrapper>
            <Title>
              You Borrows
              <SubTitle>
                <Label>Balance:</Label>
                <Value>$ {Number(state.yourTotalBorrow).toFixed(2)}</Value>

                <Label>APY:</Label>
                <Value> %</Value>

                <Label>Borrow power used:</Label>
                <Value>$ </Value>
              </SubTitle>
            </Title>
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
                theme: dexConfig?.theme,
              }}
            />
          </YoursTableWrapper>
        </Yours>
        {dexConfig.rewardToken ? (
          <Widget
            src={`${config.ownerId}/widget/AAVE.Card.RewardsTable`}
            props={{
              account,
              config,
              data: [].concat({
                ...dexConfig.rewardToken,
                unclaimed: state.rewardsAmount,
              }),
              dapps: dexConfig,
              onSuccess,
              markets,
              rewardAddress: config.incentivesProxy,
              toast,
            }}
          />
        ) : null}
      </>
    )}
    {state.alertModalText && (
      <Widget
        src={`${config.ownerId}/widget/AAVE.Modal.AlertModal`}
        props={{
          config,
          theme: dexConfig?.theme,
          title: "All done!",
          description: state.alertModalText,
          onRequestClose: () => State.update({ alertModalText: false }),
        }}
      />
    )}
  </Wrap>
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
