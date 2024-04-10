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
console.log("PROPS: ", props);

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

  const { tokenPrice, decimals } = baseAsset;
  return getGasPrice()
    .then((gasPrice) => {
      const gasLimit = GAS_LIMIT_RECOMMENDATIONS[action].limit;
      // console.log("gasPrice--", gasPrice);
      return Big(gasPrice.toString())
        .mul(gasLimit)
        .div(Big(10).pow(decimals))
        .mul(tokenPrice)
        .toFixed(2);
    })
    .catch((err) => {
      console.log("gasEstimation error");
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
  tokenPrice: prices[item.symbol],
}));
const underlyingTokens = dexConfig?.rawMarkets?.map(
  (market) => market.underlyingAsset
);

// App states
State.init({
  imports: {},

  showWithdrawModal: false,
  showSupplyModal: false,
  showRepayModal: false,
  showBorrowModal: false,

  threshold: 1,
  assetsToSupply: markets,
  yourSupplies: undefined,
  yourBorrows: undefined,
  netWorthUSD: "",
  netAPY: "",
  healthFactor: "",
  availableBorrowsUSD: "",

  baseAssetBalance: undefined,
  selectTab: "MARKET", // MARKET | YOURS
  fresh: 0, // fresh rewards
  yourSupplyApy: 0,
  yourBorrowApy: 0,
  yourTotalCollateral: 0,

  emissionPerSeconds: [],
  aTokenTotal: [],
  debtTotal: [],
  poolData: [],

  step1: false,
  step2: false,
});

function calcAvailableBorrows(availableBorrowsUSD, tokenPrice) {
  let r =
    isValid(availableBorrowsUSD) && isValid(tokenPrice)
      ? Big(availableBorrowsUSD || 0)
          .div(tokenPrice)
          .toFixed()
      : Number(0).toFixed();

  return r;
}

function bigMin(_a, _b) {
  const a = Big(_a || 0);
  const b = Big(_b || 0);
  return a.gt(b) ? b : a;
}

function formatHealthFactor(hf) {
  if (hf === "∞") return hf;

  if (!hf || !isValid(hf)) return "-";

  if (Big(hf).gt(1000)) return "∞";
  if (Number(hf) === -1) return "∞";
  return Big(hf).toFixed(2, ROUND_DOWN);
}

function calcHealthFactor(type, symbol, amount) {
  if (
    !isValid(state.yourTotalCollateral) ||
    !isValid(state.yourTotalBorrow) ||
    !isValid(amount)
  )
    return "-";
  let newHealthFactor;
  let totalCollateral = Big(state.yourTotalCollateral);
  let totalBorrows = Big(state.yourTotalBorrow);
  console.log(
    "calcHealthFactor1--",
    totalCollateral.toString(),
    totalBorrows.toString(),
    type,
    symbol,
    amount,
    prices[symbol],
    prices
  );

  const assetsUSD = Big(prices[symbol]).times(Big(amount));
  if (type === "SUPPLY") {
    totalCollateral = Big(state.yourTotalCollateral).plus(assetsUSD);
  }
  if (type === "INC_COLLATERAL") {
    totalCollateral = Big(state.yourTotalCollateral).plus(assetsUSD);
  }
  if (type === "WITHDRAW") {
    totalCollateral = Big(state.yourTotalCollateral).minus(assetsUSD);
  }
  if (type === "DEC_COLLATERAL") {
    totalCollateral = Big(state.yourTotalCollateral).minus(assetsUSD);
  }
  if (type === "BORROW") {
    totalBorrows = Big(state.yourTotalBorrow).plus(assetsUSD);
  }
  if (type === "REPAY") {
    totalBorrows = Big(state.yourTotalBorrow).minus(assetsUSD);
  }
  newHealthFactor = totalCollateral
    .times(Big(state.threshold))
    .div(totalBorrows);

  console.log("calcHealthFactor--", newHealthFactor);
  return newHealthFactor.toFixed(2);
}

function batchBalanceOf(chainId, userAddress, tokenAddresses, abi) {
  const balanceProvider = new ethers.Contract(
    config.balanceProviderAddress,
    abi.body,
    Ethers.provider().getSigner()
  );

  return balanceProvider.batchBalanceOf([userAddress], tokenAddresses);
}

function getLiquidity() {
  const aTokenAddresss = markets?.map((item) => item.aTokenAddress);
  const variableDebtTokenAddresss = markets?.map(
    (item) => item.variableDebtTokenAddress
  );

  const calls = aTokenAddresss
    .map((addr) => ({
      address: addr,
      name: "totalSupply",
    }))
    .concat(
      variableDebtTokenAddresss?.map((addr) => ({
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
      try {
        console.log("getLiquidity_res", res);
        const l = res.length;
        const aTokenTotal = res.slice(0, l / 2);
        const debtTotal = res.slice(l / 2);

        const _assetsToSupply = [...state.assetsToSupply];
        for (let i = 0; i < _assetsToSupply.length; i++) {
          const liquidityAmount = Big(aTokenTotal[i] || 0)
            .minus(Big(debtTotal[i] || 0))
            .toFixed();

          _assetsToSupply[i].availableLiquidity = liquidityAmount;
          _assetsToSupply[i].availableLiquidityUSD = Big(
            ethers.utils.formatUnits(
              liquidityAmount,
              _assetsToSupply[i].decimals
            )
          )
            .mul(Big(prices[_assetsToSupply[i].symbol]) || 0)
            .toFixed();

          const _availableBorrowsUSD = bigMin(
            state.availableBorrowsUSD,
            ethers.utils.formatUnits(
              liquidityAmount,
              _assetsToSupply[i].decimals
            )
          )
            .times(ACTUAL_BORROW_AMOUNT_RATE)
            .toFixed();

          const availableBorrows = calcAvailableBorrows(
            _availableBorrowsUSD,
            _assetsToSupply[i].tokenPrice
          );

          _assetsToSupply[i].availableBorrowsUSD = _availableBorrowsUSD;
          _assetsToSupply[i].availableBorrows = availableBorrows;
        }
        State.update({
          assetsToSupply: _assetsToSupply,
          aTokenTotal,
          debtTotal,
        });
      } catch (error) {
        console.log("catch getLiquidity", error);
      }
    })
    .catch((err) => {
      console.log("getLiquidity_err", err);
    });
}
// update data in async manner
function getUserBalance() {
  // check abi loaded
  if (
    Object.keys(CONTRACT_ABI)
      ?.map((key) => config[key])
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
    markets?.map((market) => market.underlyingAsset),
    config.walletBalanceProviderABI
  )
    .then((balances) => {
      return balances?.map((balance) => balance.toString());
    })
    .then((userBalances) => {
      const _assetsToSupply = [...state.assetsToSupply];
      for (let index = 0; index < _assetsToSupply.length; index++) {
        const item = _assetsToSupply[index];
        const _bal =
          item.symbol === config.nativeCurrency.symbol
            ? state.baseAssetBalance
            : userBalances[index];
        const balanceRaw = Big(_bal || 0).div(Big(10).pow(item.decimals));
        const _balance = balanceRaw.toFixed(item.decimals, ROUND_DOWN);

        const _balanceInUSD = balanceRaw
          .mul(item.tokenPrice || 0)
          .toFixed(3, ROUND_DOWN);
        item.aaaa = "aaa";
        item.balance = _balance;
        item.balanceInUSD = _balanceInUSD;
      }

      State.update({
        assetsToSupply: _assetsToSupply,
      });
    })
    .catch((err) => {
      console.log("batchBalanceOfERROR:", err);
    });
}

function onActionSuccess({ msg, callback }) {
  // update data if action finishes
  getUserBalance();
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

function getPoolDataProvider() {
  const underlyingTokens = dexConfig?.rawMarkets?.map(
    (market) => market.underlyingAsset
  );
  console.log("getPoolDataProvider--", underlyingTokens);
  const calls = underlyingTokens?.map((addr) => ({
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

      State.update({
        poolData: res,
      });
    })
    .catch((err) => {
      console.log("getPoolDataProvider_err", err);
    });
}
// seamless use
function getPoolDataProviderTotalSupply() {
  const prevAssetsToSupply = [...state.assetsToSupply];

  const underlyingTokens = dexConfig?.rawMarkets?.map(
    (market) => market.underlyingAsset
  );
  console.log("getPoolDataProviderTotalSupply--", underlyingTokens);
  const calls = underlyingTokens?.map((addr) => ({
    address: config.PoolDataProvider,
    name: "getATokenTotalSupply",
    params: [addr],
  }));

  multicall({
    abi: [
      {
        inputs: [{ internalType: "address", name: "asset", type: "address" }],
        name: "getATokenTotalSupply",
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
      console.log("getPoolDataProviderTotal_res", res);

      for (let i = 0; i < res.length; i++) {
        const _totalSupply = ethers.utils.formatUnits(
          res[i][0],
          prevAssetsToSupply[i].decimals
        );
        prevAssetsToSupply[i].totalSupply = _totalSupply;
        // console.log(
        //   "_totalSupply--",
        //   _totalSupply,
        //   prevAssetsToSupply[i].symbol,
        //   prices[prevAssetsToSupply[i].symbol]
        // );
        prevAssetsToSupply[i].totalSupplyUSD = Big(_totalSupply || 0)
          .times(prices[prevAssetsToSupply[i].symbol])
          .toFixed();
      }
      State.update({
        assetsToSupply: prevAssetsToSupply,
      });
    })
    .catch((err) => {
      console.log("getPoolDataProviderTotal_err", err);
    });
}
// seamless use
function getPoolDataProviderTotalDebt() {
  const prevAssetsToSupply = [...state.assetsToSupply];

  const underlyingTokens = dexConfig?.rawMarkets?.map(
    (market) => market.underlyingAsset
  );
  console.log("getPoolDataProviderTotalDebt--", underlyingTokens);
  const calls = underlyingTokens?.map((addr) => ({
    address: config.PoolDataProvider,
    name: "getTotalDebt",
    params: [addr],
  }));

  multicall({
    abi: [
      {
        inputs: [{ internalType: "address", name: "asset", type: "address" }],
        name: "getTotalDebt",
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
      console.log("getPoolDataProviderTotal_res", res);

      for (let i = 0; i < res.length; i++) {
        const _totalDebts = ethers.utils.formatUnits(
          res[i][0],
          prevAssetsToSupply[i].decimals
        );
        prevAssetsToSupply[i].totalDebts = _totalDebts;
        prevAssetsToSupply[i].totalDebtsUSD = Big(_totalDebts)
          .times(prices[prevAssetsToSupply[i].symbol])
          .toFixed();
      }
      State.update({
        assetsToSupply: prevAssetsToSupply,
      });
    })
    .catch((err) => {
      console.log("getPoolDataProviderTotal_err", err);
    });
}
function getPoolDataProviderCaps() {
  const prevAssetsToSupply = [...state.assetsToSupply];

  const underlyingTokens = dexConfig?.rawMarkets?.map(
    (market) => market.underlyingAsset
  );
  console.log("getPoolDataProviderCaps--", underlyingTokens);
  const calls = underlyingTokens?.map((addr) => ({
    address: config.PoolDataProvider,
    name: "getReserveCaps",
    params: [addr],
  }));

  multicall({
    abi: [
      {
        inputs: [{ internalType: "address", name: "asset", type: "address" }],
        name: "getReserveCaps",
        outputs: [
          { internalType: "uint256", name: "borrowCap", type: "uint256" },
          { internalType: "uint256", name: "supplyCap", type: "uint256" },
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
      console.log("getPoolDataProviderCaps_res", res);

      for (let i = 0; i < res.length; i++) {
        const [borrowCap, supplyCap] = res[i];
        prevAssetsToSupply[i].borrowCap = borrowCap.toNumber();
        prevAssetsToSupply[i].supplyCap = supplyCap.toNumber();
      }
      State.update({
        assetsToSupply: prevAssetsToSupply,
      });
    })
    .catch((err) => {
      console.log("getPoolDataProviderCaps_err", err);
    });
}

function getUserAccountData() {
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

      const totalDebtBaseUSD = ethers.utils.formatUnits(
        totalDebtBase.toString(),
        8
      );

      const totalCollateralBaseUSD = ethers.utils.formatUnits(
        totalCollateralBase.toString(),
        8
      );
      const threshold = ethers.utils.formatUnits(
        currentLiquidationThreshold.toString(),
        4
      );

      const _totalCollateralBaseUSD = Big(totalCollateralBaseUSD).times(
        Big(threshold)
      );
      const BorrowPowerUsed = Big(totalDebtBaseUSD || 0)
        .div(_totalCollateralBaseUSD.eq(0) ? 1 : _totalCollateralBaseUSD)
        .times(100)
        .toFixed();
      // console.log(
      //   "HF--",
      //   ethers.utils.formatUnits(healthFactor),
      //   formatHealthFactor(ethers.utils.formatUnits(healthFactor))
      // );
      State.update({
        step2: true,
        threshold,
        currentLiquidationThreshold,
        BorrowPowerUsed,
        healthFactor: !totalCollateralBase.toNumber()
          ? formatHealthFactor(0)
          : formatHealthFactor(ethers.utils.formatUnits(healthFactor)),

        availableBorrowsUSD: ethers.utils.formatUnits(availableBorrowsBase, 8),
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
    .div(borrowBalanceMarketReferenceCurrency || 1);
}

function getUserDeposits() {
  const aTokenAddresss = markets?.map((item) => item.aTokenAddress);
  console.log("getUserDeposits--", markets);

  const calls = aTokenAddresss?.map((addr) => ({
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
      console.log("=========", state.assetsToSupply);
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
      const _yourSupplies = userDeposits?.map((userDeposit) => {
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
    });
}

function getUserDebts() {
  const variableDebtTokenAddresss = markets?.map(
    (item) => item.variableDebtTokenAddress
  );

  const calls = variableDebtTokenAddresss?.map((addr) => ({
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
      const _assetsToSupply = [...state.assetsToSupply];
      for (let index = 0; index < res.length; index++) {
        if (res[index]) {
          let market = _assetsToSupply.find(
            (item) =>
              item.variableDebtTokenAddress === variableDebtTokenAddresss[index]
          );

          let _debt = ethers.utils.formatUnits(res[index][0], market.decimals);

          market.debt = _debt;
          market.debtInUSD = Big(_debt || 0)
            .mul(prices[market.symbol] || 1)
            .toFixed();
          userDebs.push(market);
        }
      }
      let hash = {};
      let _yourBorrows = userDebs.reduce((accum, item) => {
        hash[item["aTokenAddress"]]
          ? ""
          : (hash[item["aTokenAddress"]] = true && accum.push(item));
        return accum;
      }, []);

      console.log("yourBorrows--", _yourBorrows);
      State.update({
        yourBorrows: _yourBorrows,
      });
    })
    .catch((err) => {
      console.log("getUserDebts_err", err);
    });
}

function fetchRewardsData() {
  const _assetsToSupply = [...state.assetsToSupply];
  const aTokenAddresss = _assetsToSupply?.map((item) => item.aTokenAddress);

  const calls = aTokenAddresss?.map((addr) => ({
    address: config.incentivesProxy,
    name: "getRewardsData",
    params: [addr, config.rewardAddress],
  }));

  multicall({
    abi: [
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "address", name: "reward", type: "address" },
        ],
        name: "getRewardsData",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" },
          { internalType: "uint256", name: "", type: "uint256" },
          { internalType: "uint256", name: "", type: "uint256" },
          { internalType: "uint256", name: "", type: "uint256" },
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
      console.log("--------------------fetchRewardsData_res", res);

      State.update({
        emissionPerSeconds: res,
      });
    })
    .catch((err) => {
      console.log("fetchRewardsData_err", err);
    });
}

function getAllUserRewards() {
  console.log("getAllUserRewards--", markets);
  const arr = markets
    ?.map((item) => [
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
      try {
        console.log(
          "getAllUserRewards_res:",
          res,
          ethers.utils.formatUnits(res[1][1])
        );
        const _amount = ethers.utils.formatUnits(res[1][1]);
        State.update({
          rewardsAmount: _amount,
        });
      } catch (error) {
        console.log("catch_getAllUserRewards_error", error);
      }
    })
    .catch((err) => {
      console.log("getAllUserRewards_error:", err);
    });
}

function chunk(arr, size) {
  let result = [];

  let temp = [];
  for (let i = arr.length - 1; i > -1; i--) {
    temp.unshift(arr[i]);
    if (temp.length === size) {
      result.push(temp);

      temp = [];
    }
  }
  if (temp.length !== 0) result.push(temp);
  return result;
}

// to get collateral status
function getCollateralStatus() {
  const calls = [
    {
      address: config.aavePoolV3Address,
      name: "getUserConfiguration",
      params: [account],
    },
    {
      address: config.aavePoolV3Address,
      name: "getReservesList",
    },
  ];

  multicall({
    abi: config.aavePoolV3ABI.body,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      console.log("getCollateralStatus-res:", res);
      const [[rawStatus], [addrs]] = res;
      const _status = parseInt(rawStatus.toString()).toString(2).split("");
      console.log("_status--", _status);
      const _statusArray = chunk(_status, 2);
      console.log("_status--", _statusArray, addrs);
      const _yourSupplies = [...state.yourSupplies];
      for (let i = 0; i < _yourSupplies.length; i++) {
        const item = _yourSupplies[i];
        const index = addrs.findIndex((addr) => addr === item.underlyingAsset);

        _yourSupplies[i].isCollateraled = Number(_statusArray[index][0]);
      }

      const yourTotalCollateral = _yourSupplies
        .filter((item) => item.isCollateraled === 1)
        .reduce(
          (prev, curr) =>
            Big(prev)
              .plus(Big(curr.underlyingBalanceUSD || 0))
              .toFixed(),
          0
        );

      State.update((prev) => ({
        ...prev,
        yourSupplies: _yourSupplies,
        yourTotalCollateral,
      }));
    })
    .catch((err) => {
      console.log("getCollateralStatus-error:", err);
    });
}

useEffect(() => {
  if (!account || !isChainSupported) return;
  getUserBalance();
  getUserAccountData();

  getPoolDataProvider();
  if (dexConfig.name === "Seamless Protocol") {
    getPoolDataProviderTotalSupply();
    getPoolDataProviderTotalDebt();
    getPoolDataProviderCaps();
  }
  if (state.step1) {
    getUserDeposits();
    getUserDebts();
  }
}, [account, isChainSupported, state.step1]);

useEffect(() => {
  if (state.step2) {
    getLiquidity();
  }
}, [state.step2]);

useEffect(() => {
  console.log("CALC APY");
  if (!Array.isArray(state.poolData) || !state.poolData.length) return;

  const _assetsToSupply = [...state.assetsToSupply];

  for (let i = 0; i < state.poolData.length; i++) {
    if (state.poolData[i]) {
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
      ] = state.poolData[i];
      const RAY = Big(10).pow(27);
      const SECONDS_PER_YEAR = 31_536_000;
      const depositAPR = Big(liquidityRate).div(RAY || 1);
      const depositAPY0 = Big(1)
        .plus(depositAPR.div(Big(SECONDS_PER_YEAR)))
        .toNumber();

      const _supplyAPY = Big(
        Math.pow(depositAPY0, SECONDS_PER_YEAR) - 1
      ).toFixed();
      console.log(
        "_supplyAPY--",
        _supplyAPY,
        _assetsToSupply,
        i,
        _assetsToSupply[i]
      );

      const variableBorrowAPR = Big(variableBorrowRate).div(RAY || 1);

      const variableBorrowAPY0 = Big(1)
        .plus(Big(variableBorrowAPR).div(Big(SECONDS_PER_YEAR)))
        .toNumber();

      const _borrowAPY = Big(
        Math.pow(variableBorrowAPY0, SECONDS_PER_YEAR) - 1
      ).toFixed();

      _assetsToSupply[i].supplyAPY = _supplyAPY;
      _assetsToSupply[i].borrowAPY = _borrowAPY;
    }
  }
  State.update({
    assetsToSupply: _assetsToSupply,
    step1: true,
  });
}, [state.poolData]);

useEffect(() => {
  if (!account || !isChainSupported) return;
  if (dexConfig.name !== "Seamless Protocol") return;
  if (!Array.isArray(state.assetsToSupply)) return;
  console.log("calc totalMarketSize");
  const totalMarketSize = state.assetsToSupply.reduce((prev, curr) => {
    return Big(prev).plus(Big(curr.totalSupplyUSD)).toFixed();
  }, 0);
  const totalBorrows = state.assetsToSupply.reduce((prev, curr) => {
    return Big(prev).plus(Big(curr.totalDebtsUSD)).toFixed();
  }, 0);
  const totalAvailable = Big(totalMarketSize)
    .minus(Big(totalBorrows))
    .toFixed();
  State.update({
    totalMarketSize,
    totalAvailable,
    totalBorrows,
  });
}, [account, isChainSupported, state.assetsToSupply]);

useEffect(() => {
  if (!account || !isChainSupported) return;

  // console.log("dexConfig--", dexConfig);
  if (dexConfig.rewardToken) {
    getAllUserRewards();
    fetchRewardsData();
  }
}, [account, isChainSupported, fresh]);

useEffect(() => {
  console.log(
    "calc reward apy",
    state.emissionPerSeconds,
    state.aTokenTotal,
    state.debtTotal
  );
  if (
    !state.emissionPerSeconds.length ||
    !state.aTokenTotal.length ||
    !state.debtTotal.length
  )
    return;
  const RWARD_TOKEN_DECIMALS = Math.pow(10, 18);
  const SECONDS_PER_YEAR = 31536000;
  const rewardTokenPrice = 0.00025055;

  try {
    const _assetsToSupply = [...state.assetsToSupply];
    for (let i = 0; i < _assetsToSupply.length; i++) {
      let tokenTotalSupplyNormalized = ethers.utils.formatUnits(
        state.aTokenTotal[i].toString(),
        _assetsToSupply[i].decimals
      );
      let tokenTotalBorrowNormalized = ethers.utils.formatUnits(
        state.debtTotal[i].toString(),
        _assetsToSupply[i].decimals
      );
      let normalizedEmissionPerSecond = Big(state.emissionPerSeconds[i][1]).div(
        Big(RWARD_TOKEN_DECIMALS)
      );

      let normalizedTotalTokenSupply = Big(tokenTotalSupplyNormalized).times(
        Big(_assetsToSupply[i].tokenPrice)
      );
      let normalizedTotalTokenBorrow = Big(tokenTotalBorrowNormalized).times(
        Big(_assetsToSupply[i].tokenPrice)
      );

      let supplyRewardApy = normalizedEmissionPerSecond
        .times(Big(rewardTokenPrice))
        .times(SECONDS_PER_YEAR)
        .div(normalizedTotalTokenSupply)
        .toFixed();
      let borrowRewardApy = normalizedEmissionPerSecond
        .times(Big(rewardTokenPrice))
        .times(SECONDS_PER_YEAR)
        .div(normalizedTotalTokenBorrow)
        .toFixed();
      _assetsToSupply[i].supplyRewardApy = supplyRewardApy;
      _assetsToSupply[i].borrowRewardApy = borrowRewardApy;

      State.update({
        assetsToSupply: _assetsToSupply,
      });
    }
  } catch (error) {
    console.log("CATCH:", error);
  }
}, [state.emissionPerSeconds, state.aTokenTotal, state.debtTotal]);
useEffect(() => {
  if (state.selectTab === "YOURS") {
    getCollateralStatus();
  }
}, [state.selectTab]);

useEffect(() => {
  if (!state.step1) return;
  if (!["zerolend", "AAVE V3"].includes(dexConfig.name)) return;

  if (!state.yourSupplies || !state.yourBorrows) return;
  console.log("calc net apy", state.yourSupplies, state.yourBorrows);
  //calc net worth
  const supplyBal = state.yourSupplies.reduce(
    (total, cur) =>
      Big(total || 0)
        .plus(cur.underlyingBalanceUSD)
        .toFixed(),
    0
  );
  console.log("supplyBal--", supplyBal);
  const debtsBal = state.yourBorrows.reduce(
    (total, cur) =>
      Big(total || 0)
        .plus(cur.debtInUSD)
        .toFixed(),
    0
  );
  console.log("debtsBal--", debtsBal, supplyBal);
  const netWorth = Big(supplyBal || 0)
    .minus(debtsBal)
    .toFixed(2, ROUND_DOWN);
  console.log("netWorth--", netWorth, state.yourSupplies);
  if (!Number(netWorth)) return;

  //calc net apy

  const weightedAverageSupplyAPY = state.yourSupplies.reduce(
    (total, cur) =>
      Big(total || 0)
        .plus(
          Big(cur.underlyingBalanceUSD || 0)
            .times(Big(cur.supplyAPY || 0))
            .div(supplyBal || 1)
        )
        .toFixed(),
    0
  );
  const yourSupplyRewardAPY = state.yourSupplies.reduce(
    (total, cur) =>
      Big(total || 0)
        .plus(Big(cur.supplyRewardApy || 0))
        .toFixed(),
    0
  );

  console.log("weightedAverageSupplyAPY--", weightedAverageSupplyAPY);
  const weightedAverageBorrowsAPY = state.yourBorrows.reduce((total, cur) => {
    return Big(total || 0)
      .plus(
        Big(cur.debtInUSD)
          .times(Big(cur.borrowAPY))
          .div(debtsBal || 1)
      )
      .toFixed();
  }, 0);
  console.log("weightedAverageBorrowsAPY--", weightedAverageBorrowsAPY);

  const a = Big(weightedAverageSupplyAPY || 0)
    .times(supplyBal)
    .div(netWorth || 1)
    .toFixed();
  console.log("a--", a);
  const b = Big(weightedAverageBorrowsAPY || 0)
    .times(debtsBal)
    .div(netWorth || 1)
    .toFixed();
  console.log("b--", b);
  const netAPY = Big(a).minus(Big(b)).toFixed();
  console.log("netAPY--", netAPY);
  const yourTotalSupply = state.yourSupplies.reduce(
    (prev, curr) =>
      Big(prev)
        .plus(Big(curr.underlyingBalanceUSD || 0))
        .toFixed(),
    0
  );
  console.log("yourTotalSupply--", yourTotalSupply);

  const yourTotalBorrow = state.yourBorrows.reduce(
    (prev, curr) =>
      Big(prev)
        .plus(Big(curr.debtInUSD || 0))
        .toFixed(),
    0
  );
  console.log("yourTotalBorrow--", yourTotalBorrow);

  State.update((prev) => ({
    ...prev,
    netAPY,
    netWorthUSD: netWorth,
    yourTotalSupply,
    yourTotalBorrow,
    yourSupplyApy: Big(weightedAverageSupplyAPY)
      .plus(yourSupplyRewardAPY)
      .toFixed(),
    yourBorrowApy: weightedAverageBorrowsAPY,
  }));
}, [state.yourSupplies, state.yourBorrows, state.step1]);

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
            state.netWorthUSD ? Big(state.netWorthUSD || 0).toFixed(2) : "-"
          }`,
          netAPY: `${
            state.netAPY
              ? Number(
                  Big(state.netAPY || 0)
                    .times(100)
                    .toFixed(2)
                )
              : "-"
          }%`,
          healthFactor: formatHealthFactor(state.healthFactor),
          totalMarketSize: state.totalMarketSize,
          totalAvailable: state.totalAvailable,
          totalBorrows: state.totalBorrows,
          theme: dexConfig?.theme,
          yourBorrows: state.yourBorrows,
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
          src={`${config.ownerId}/widget/AAVE.Card.Markets`}
          props={{
            config,
            dexConfig,
            chainId: chainId,
            assetsToSupply: state.assetsToSupply,
            showSupplyModal: state.showSupplyModal,
            setShowSupplyModal: (isShow) =>
              State.update({ showSupplyModal: isShow }),
            onActionSuccess,
            healthFactor: formatHealthFactor(state.healthFactor),
            formatHealthFactor,
            calcHealthFactor,
            depositETHGas,
            depositERC20Gas,
            borrowETHGas,
            borrowERC20Gas,
            yourSupplies: state.yourSupplies,
            yourTotalSupply: state.yourTotalSupply,
            theme: dexConfig?.theme,
          }}
        />
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
                <Value>
                  {Big(state.yourSupplyApy).times(100).toFixed(2)} %
                </Value>

                <Label>Collateral:</Label>
                <Value>$ {Number(state.yourTotalCollateral).toFixed(2)}</Value>
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
                calcHealthFactor,
                withdrawETHGas,
                withdrawERC20Gas,
                account,
                prices,
                threshold: state.threshold,

                yourTotalCollateral: state.yourTotalCollateral,
                yourTotalBorrow: state.yourTotalBorrow,
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
                <Value>
                  {Big(state.yourBorrowApy).times(100).toFixed(2)} %
                </Value>

                <Label>Borrow power used:</Label>
                <Value>{Number(state.BorrowPowerUsed).toFixed(2)}%</Value>
              </SubTitle>
            </Title>
            <Widget
              src={`${config.ownerId}/widget/AAVE.Card.YourBorrows`}
              props={{
                config,
                chainId: chainId,
                assetsToSupply: state.assetsToSupply,
                yourBorrows: state.yourBorrows,
                showRepayModal: state.showRepayModal,
                setShowRepayModal: (isShow) =>
                  State.update({ showRepayModal: isShow }),
                showBorrowModal: state.showBorrowModal,
                setShowBorrowModal: (isShow) =>
                  State.update({ showBorrowModal: isShow }),
                formatHealthFactor,
                calcHealthFactor,
                onActionSuccess,
                repayETHGas,
                repayERC20Gas,
                borrowETHGas,
                borrowERC20Gas,
                healthFactor: formatHealthFactor(state.healthFactor),
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
              theme: dexConfig?.theme,
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
  <>
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
      src="bluebiu.near/widget/Swap.ChainWarnigBox"
      props={{
        chain: curChain,
        onSwitchChain: onSwitchChain,
        switchingChain: switchingChain,
        theme: dexConfig.theme,
      }}
    />
  </>
);
// );

return (
  <div>
    {/* Component Head */}
    {/* <Widget
      src={`${config.ownerId}/widget/Utils.Import`}
      props={{ modules, onLoad: importFunctions }}
    /> */}

    {body}
  </div>
);
