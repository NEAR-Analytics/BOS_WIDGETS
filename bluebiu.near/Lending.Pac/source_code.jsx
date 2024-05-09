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
  addAction,
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
function formatNumber(value, digits) {
  if (Big(value).eq(0)) return `$ 0`;
  return Big(value || 0).lt(0.01)
    ? "< $0.01"
    : `$ ${Number(value).toFixed(digits || 2)}`;
}

// App config
function getConfig() {
  const abis = {
    wrappedTokenGatewayV3ABI: fetch(CONTRACT_ABI.wrappedTokenGatewayV3ABI),
    erc20Abi: fetch(CONTRACT_ABI.erc20Abi),
    aavePoolV3ABI: fetch(CONTRACT_ABI.aavePoolV3ABI),
    variableDebtTokenABI: fetch(CONTRACT_ABI.variableDebtTokenABI),
    // walletBalanceProviderABI: fetch(CONTRACT_ABI.walletBalanceProviderABI),
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

function getPrice(symbol) {
  if (["fwWETH", "oETH"].includes(symbol)) {
    return prices["ETH"];
  }
  if (["oUSDB", "fwUSDB"].includes(symbol)) {
    return prices["USDB"];
  }
  return prices[symbol] || 0;
}

const markets = dexConfig?.rawMarkets?.map((item) => ({
  ...item,
  tokenPrice: getPrice(item.symbol),
  // tokenPrice: prices[item.symbol],
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

  selectTab: "MARKET", // MARKET | YOURS
  fresh: 0, // fresh rewards
  yourSupplyApy: 0,
  yourBorrowApy: 0,
  yourTotalCollateral: 0,

  BlastPoints: 0,
  BlastGold: 0,

  emissionPerSeconds: [],
  aTokenTotal: [],
  debtTotal: [],

  updater: 0,
});

useEffect(() => {
  State.update({
    assetsToSupply: markets,
  });
}, [markets]);

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
  try {
    if (hf === "∞") return hf;

    if (!hf || !isValid(hf)) return "-";

    if (Big(hf).gt(10000)) return "∞";
    if (Number(hf) === -1) return "∞";
    return Big(hf).toFixed(2, ROUND_DOWN);
  } catch (error) {
    console.log("CATCH_formatHealthFactor:", error);
  }
}

function calcHealthFactor(type, symbol, amount) {
  // console.log(
  //   "calcHealthFactor",
  //   type,
  //   symbol,
  //   amount,
  //   isValid(state.yourTotalCollateral),
  //   isValid(state.yourTotalBorrow),
  //   isValid(amount)
  // );
  if (
    // !isValid(state.yourTotalCollateral) ||
    // !isValid(state.yourTotalBorrow) ||
    isNaN(Number(state.yourTotalCollateral)) ||
    isNaN(Number(state.yourTotalBorrow)) ||
    !isValid(amount)
  )
    return "-";
  let newHealthFactor;
  let totalCollateral = Big(state.yourTotalCollateral);
  let totalBorrows = Big(state.yourTotalBorrow);

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
  if (totalBorrows.eq(0)) return "∞";
  newHealthFactor = totalCollateral
    .times(Big(state.threshold))
    .div(totalBorrows);

  console.log("calcHealthFactor--", newHealthFactor);
  return newHealthFactor.toFixed(2);
}

function batchBalanceOf(userAddress, tokenAddresses) {
  const balanceProvider = new ethers.Contract(
    config.balanceProviderAddress,
    [
      {
        inputs: [
          { internalType: "address[]", name: "users", type: "address[]" },
          { internalType: "address[]", name: "tokens", type: "address[]" },
        ],
        name: "batchBalanceOf",
        outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
        stateMutability: "view",
        type: "function",
      },
    ],
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
          // console.log(
          //   liquidityAmount,
          //   prices[_assetsToSupply[i].symbol],
          //   _assetsToSupply[i]
          // );
          _assetsToSupply[i].availableLiquidity = liquidityAmount;
          const _availableLiquidityUSD = Big(
            ethers.utils.formatUnits(
              liquidityAmount,
              _assetsToSupply[i].decimals
            )
          )
            .mul(Big(prices[_assetsToSupply[i].symbol] || 0))
            .toFixed();
          // console.log(_availableLiquidityUSD);
          _assetsToSupply[i].availableLiquidityUSD = _availableLiquidityUSD;

          const _availableBorrowsUSD = bigMin(
            state.availableBorrowsUSD,
            ethers.utils.formatUnits(
              liquidityAmount,
              _assetsToSupply[i].decimals
            )
          )
            .times(ACTUAL_BORROW_AMOUNT_RATE)
            .toFixed();
          // console.log(_availableBorrowsUSD);
          const availableBorrows = calcAvailableBorrows(
            _availableBorrowsUSD,
            _assetsToSupply[i].tokenPrice
          );
          // console.log(availableBorrows);
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

function getUserPoints() {
  const params = JSON.stringify({ address: account });
  asyncFetch(`/pac?path=blastpoint&params=${params}`)
    .then((res) => {
      if (res.status === 200) {
        const { blastGold, blastPoint, details } = res.body.data;

        const _assetsToSupply = [...state.assetsToSupply];
        for (let i = 0; i < details.length; i++) {
          let asset = _assetsToSupply.find(
            (item) =>
              item.symbol.toLowerCase() === details[i].token.toLowerCase()
          );

          asset.blastPoint = details[i].points;
          asset.blastGold = details[i].gold;
        }

        State.update({
          assetsToSupply: _assetsToSupply,
          BlastPoints: blastPoint,
          BlastGold: blastGold,
        });
      }
    })
    .catch((error) => {
      console.log("getUserPoints_error:", error);
    });
}

// update data in async manner
function getUserBalance() {
  // check abi loaded
  // if (
  //   Object.keys(CONTRACT_ABI)
  //     ?.map((key) => config[key])
  //     .filter((ele) => !!ele).length !== Object.keys(CONTRACT_ABI).length
  // ) {
  //   return;
  // }
  const provider = Ethers.provider();
  provider
    .getSigner()
    ?.getBalance()
    .then((balance) => {
      return balance;
    })
    .then((baseAssetBalance) => {
      // get user balances
      batchBalanceOf(
        account,
        markets?.map((market) => market.underlyingAsset)
      )
        .then((balances) => {
          return balances?.map((balance) => balance.toString());
        })
        .then((userBalances) => {
          console.log("getUserBalance--", userBalances);

          const _assetsToSupply = [...state.assetsToSupply];
          for (let index = 0; index < _assetsToSupply.length; index++) {
            const item = _assetsToSupply[index];
            const _bal =
              item.symbol === config.nativeCurrency.symbol
                ? baseAssetBalance
                : userBalances[index];
            const balanceRaw = Big(_bal || 0).div(Big(10).pow(item.decimals));
            const _balance = balanceRaw.toFixed(item.decimals, ROUND_DOWN);

            const _balanceInUSD = balanceRaw
              .times(Big(item.tokenPrice || 0))
              .toFixed();

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
    });
}

function onActionSuccess({ msg, callback }) {
  console.log("onActionSuccess--");
  // update data if action finishes
  getUserBalance();

  State.update({
    updater: state.updater + 1,
  });
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
  // console.log("getPoolDataProvider--", underlyingTokens);
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
      return res;
    })
    .then((poolData) => {
      console.log("CALC APY");
      if (!Array.isArray(poolData) || !poolData.length) return;

      const _assetsToSupply = [...state.assetsToSupply];

      for (let i = 0; i < poolData.length; i++) {
        if (poolData[i]) {
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
          ] = poolData[i];
          const RAY = Big(10).pow(27);
          const SECONDS_PER_YEAR = 31_536_000;
          const depositAPR = Big(liquidityRate).div(RAY || 1);
          const depositAPY0 = Big(1)
            .plus(depositAPR.div(Big(SECONDS_PER_YEAR)))
            .toNumber();

          const _supplyAPY = Big(
            Math.pow(depositAPY0, SECONDS_PER_YEAR) - 1
          ).toFixed();

          if (!_assetsToSupply[i]) return;
          const variableBorrowAPR = Big(variableBorrowRate).div(RAY || 1);

          const variableBorrowAPY0 = Big(1)
            .plus(Big(variableBorrowAPR).div(Big(SECONDS_PER_YEAR)))
            .toNumber();

          const _borrowAPY = Big(
            Math.pow(variableBorrowAPY0, SECONDS_PER_YEAR) - 1
          ).toFixed();
          console.log("APY--", _supplyAPY, _borrowAPY);

          let _utilized = Big(totalVariableDebt || 0)
            .div(Big(totalAToken || 1))
            .toFixed();

          _assetsToSupply[i].supplyAPY = _supplyAPY;
          _assetsToSupply[i].borrowAPY = _borrowAPY;
          _assetsToSupply[i].utilized = _utilized;
        }
      }
      State.update({
        assetsToSupply: _assetsToSupply,
      });
    })
    .catch((err) => {
      console.log("getPoolDataProvider_err", err);
    });
}

// Pool Liquidity
function getPoolDataProviderTotalSupply() {
  const prevAssetsToSupply = [...state.assetsToSupply];

  const underlyingTokens = dexConfig?.rawMarkets?.map(
    (market) => market.underlyingAsset
  );

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
        // prevAssetsToSupply[i].totalSupplyUSD = Big(_totalSupply || 0)
        //   .times(prices[prevAssetsToSupply[i].symbol])
        //   .toFixed();
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
  // console.log("getPoolDataProviderTotalDebt--", underlyingTokens);
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
  // console.log("getPoolDataProviderCaps--", underlyingTokens);
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

        prevAssetsToSupply[i].borrowCap = borrowCap ? borrowCap.toNumber() : 0;
        prevAssetsToSupply[i].borrowCapUSD = Big(borrowCap)
          .times(prices[prevAssetsToSupply[i].symbol])
          .toFixed();
        prevAssetsToSupply[i].supplyCap = supplyCap ? supplyCap.toNumber() : 0;
        prevAssetsToSupply[i].supplyCapUSD = Big(supplyCap)
          .times(prices[prevAssetsToSupply[i].symbol])
          .toFixed();
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
    [
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "getUserAccountData",
        outputs: [
          {
            internalType: "uint256",
            name: "totalCollateralBase",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalDebtBase",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "availableBorrowsBase",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentLiquidationThreshold",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ltv",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "healthFactor",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
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
        threshold,
        currentLiquidationThreshold,
        BorrowPowerUsed,
        healthFactor: !totalDebtBase.toNumber()
          ? formatHealthFactor("∞")
          : formatHealthFactor(ethers.utils.formatUnits(healthFactor)),

        availableBorrowsUSD: ethers.utils.formatUnits(availableBorrowsBase, 8),
      });
    })
    .then(() => {
      getLiquidity();
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

function getYourSupplies() {
  const aTokenAddresss = markets?.map((item) => item.aTokenAddress);

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
      console.log("getUsetDeposits_res", res);
      let userDeposits = [];
      for (let index = 0; index < res.length; index++) {
        if (res[index]) {
          // let underlyingBalance=
          let market = state.assetsToSupply.find(
            (item) => item.aTokenAddress === aTokenAddresss[index]
          );
          if (market) {
            let _bal = res[index]
              ? ethers.utils.formatUnits(res[index][0], market.decimals)
              : 0;

            market.underlyingBalance = _bal;
            const _balUSD = Big(_bal)
              .mul(prices[market.symbol] || 0)
              .toFixed();
            market.underlyingBalanceUSD = _balUSD;

            userDeposits.push(market);
          }
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
      // State.update({
      //   yourSupplies,
      // });
      return yourSupplies;
    })
    .then((_yourSupplies) => {
      if (!_yourSupplies || !_yourSupplies.length) return;
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
        abi: [
          {
            inputs: [
              {
                internalType: "address",
                name: "user",
                type: "address",
              },
            ],
            name: "getUserConfiguration",
            outputs: [
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "data",
                    type: "uint256",
                  },
                ],
                internalType: "struct DataTypes.UserConfigurationMap",
                name: "",
                type: "tuple",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getReservesList",
            outputs: [
              {
                internalType: "address[]",
                name: "",
                type: "address[]",
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
          console.log("getCollateralStatus-res:", res);
          const [[rawStatus], [addrs]] = res;
          if (rawStatus) {
            const _status = parseInt(rawStatus.toString())
              .toString(2)
              .split("");
            // console.log("_status--", _status);
            const _statusArray = chunk(_status, 2);
            // console.log("_status--", _statusArray, addrs, _yourSupplies);

            for (let i = 0; i < _yourSupplies.length; i++) {
              const item = _yourSupplies[i];

              const index = addrs.findIndex(
                (addr) =>
                  addr.toLowerCase() === item.underlyingAsset.toLowerCase()
              );

              _yourSupplies[i].isCollateraled = Number(_statusArray[index][0]);
            }

            let yourTotalCollateral = _yourSupplies
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
          } else {
            State.update((prev) => ({
              ...prev,
              yourSupplies: _yourSupplies,
            }));
          }
        })
        .catch((err) => {
          console.log("getCollateralStatus-error:", err);
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
          if (market) {
            let _debt = ethers.utils.formatUnits(
              res[index][0],
              market.decimals
            );

            market.debt = _debt;
            market.debtInUSD = Big(_debt || 0)
              .mul(prices[market.symbol] || 1)
              .toFixed();
            userDebs.push(market);
          }
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

useEffect(() => {
  if (!account || !isChainSupported) return;
  getUserPoints();
  getUserBalance();

  getUserAccountData();
  getPoolDataProvider();

  getPoolDataProviderTotalSupply();
  // if (dexConfig.name === "Seamless Protocol") {
  //   getPoolDataProviderTotalDebt();
  //   getPoolDataProviderCaps();
  // }

  getYourSupplies();
  getUserDebts();
}, [account, isChainSupported, updater]);

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
            .div(Number(supplyBal) || 1)
        )
        .toFixed(),
    0
  );
  const yourSupplyRewardAPY = state.yourSupplies.reduce((total, cur) => {
    return Big(total || 0)
      .plus(Big(cur.supplyRewardApy || 0))
      .toFixed();
  }, 0);

  console.log("weightedAverageSupplyAPY--", weightedAverageSupplyAPY);
  const weightedAverageBorrowsAPY = state.yourBorrows.reduce((total, cur) => {
    return Big(total || 0)
      .plus(
        Big(cur.debtInUSD)
          .times(Big(cur.borrowAPY || 1))
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
          BlastPoints: state.BlastPoints,
          BlastGold: state.BlastGold,
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
            formatUSD,
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
            addAction,
            dexConfig,
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
              {state.yourSupplies && state.yourSupplies.length ? (
                <SubTitle>
                  <Label>Balance:</Label>
                  <Value>$ {Number(state.yourTotalSupply).toFixed(2)}</Value>

                  <Label>APY:</Label>
                  <Value>
                    {Big(state.yourSupplyApy).times(100).toFixed(2)} %
                  </Value>

                  <Label>Collateral:</Label>
                  <Value>
                    $ {Number(state.yourTotalCollateral).toFixed(2)}
                  </Value>
                </SubTitle>
              ) : null}
            </Title>
            <Widget
              src={`${config.ownerId}/widget/AAVE.Card.YourSupplies`}
              props={{
                formatNumber,
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
                addAction,
                dexConfig,
                yourTotalCollateral: state.yourTotalCollateral,
                yourTotalBorrow: state.yourTotalBorrow,
                theme: dexConfig?.theme,
              }}
            />
          </YoursTableWrapper>
          <YoursTableWrapper>
            <Title>
              You Borrows
              {state.yourBorrows && state.yourBorrows.length ? (
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
              ) : null}
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
                addAction,
                dexConfig,
                healthFactor: formatHealthFactor(state.healthFactor),
                theme: dexConfig?.theme,
              }}
            />
          </YoursTableWrapper>
        </Yours>

        <Widget
          src={`${config.ownerId}/widget/AAVE.Card.PointsTable`}
          props={{
            account,
            config,
            data: state.assetsToSupply,
            dapps: dexConfig,
            onSuccess,
            markets,
            prices,
            toast,
            theme: dexConfig?.theme,
          }}
        />
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
