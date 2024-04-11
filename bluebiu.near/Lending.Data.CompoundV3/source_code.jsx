const COMET_ABI = [
  {
    inputs: [{ internalType: "address", name: "priceFeed", type: "address" }],
    name: "getPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalsCollateral",
    outputs: [
      {
        internalType: "uint128",
        name: "totalSupplyAsset",
        type: "uint128",
      },
      { internalType: "uint128", name: "_reserved", type: "uint128" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalBorrow",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseTrackingBorrowSpeed",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseTrackingSupplySpeed",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "trackingIndexScale",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUtilization",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "utilization", type: "uint256" }],
    name: "getSupplyRate",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "utilization", type: "uint256" }],
    name: "getBorrowRate",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "borrowBalanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "userCollateral",
    outputs: [
      { internalType: "uint128", name: "balance", type: "uint128" },
      { internalType: "uint128", name: "_reserved", type: "uint128" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getReserves",
    outputs: [{ internalType: "int256", name: "", type: "int256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const { comets, multicall, multicallAddress, compPriceFeed, account, onLoad } =
  props;

let count = 0;
let compPrice = 0;
const rewardData = {};
const secondsPerDay = 60 * 60 * 24;
const secondsPerYear = 60 * 60 * 24 * 365;

const getCometInfo = (len) => {
  const comet = comets[len - 1];
  const calls = [
    {
      address: comet.address,
      name: "totalBorrow",
    },
    {
      address: comet.address,
      name: "baseTrackingBorrowSpeed",
    },
    {
      address: comet.address,
      name: "baseTrackingSupplySpeed",
    },
    {
      address: comet.address,
      name: "trackingIndexScale",
    },
    { address: comet.address, name: "getUtilization" },
    { address: comet.address, name: "totalSupply" },
    { address: comet.address, name: "getReserves" },
  ];
  multicall({
    abi: COMET_ABI,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      const baseTrackingSupplySpeed = res[2] ? Big(res[2][0]) : Big(0);
      const baseTrackingBorrowSpeed = res[1] ? Big(res[1][0]) : Big(0);
      rewardData[comet.address] = {
        baseTrackingSupplySpeed,
        baseTrackingBorrowSpeed,
        trackingIndexScale: res[3][0],
      };
      comet.totalBorrow = res[0]
        ? ethers.utils.formatUnits(
            res[0][0]?._hex || 0,
            comet.baseToken.decimals
          )
        : "0";
      comet.totalEarning = res[5][0]
        ? ethers.utils.formatUnits(
            res[5][0]?._hex || 0,
            comet.baseToken.decimals
          )
        : "0";
      comet.utilization = res[4][0]
        ? ethers.utils.formatUnits(res[4][0]?._hex || 0, 16)
        : "0";
      const reverses = res[6][0]
        ? ethers.utils.formatUnits(
            res[6][0]?._hex || 0,
            comet.baseToken.decimals
          )
        : "0";
      comet.liquidity = Big(comet.totalEarning)
        .minus(comet.totalBorrow)
        .add(reverses)
        .toString();
      getCometRate(res[4][0], len);
    })
    .catch((err) => {
      console.log(`get comet info error ${comet.address}`, err);
    });
};

const getCometRate = (utilization, len) => {
  const comet = comets[len - 1];
  const calls = [
    {
      address: comet.address,
      name: "getSupplyRate",
      params: [utilization],
    },
    {
      address: comet.address,
      name: "getBorrowRate",
      params: [utilization],
    },
  ];

  multicall({
    abi: COMET_ABI,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      const supplyApr = Big(res[0] || 0)
        .div(1e18)
        .mul(secondsPerYear);
      const borrowApr = Big(res[1] || 0)
        .div(1e18)
        .mul(secondsPerYear);
      comet.supplyApr = supplyApr.toString();
      comet.borrowApr = borrowApr.toString();
      len--;
      if (len > 0) {
        getCometInfo(len);
      } else {
        count++;
        formate("get comets");
      }
    })
    .catch((err) => {
      console.log(`get comets error ${comet.address}`, err);
    });
};

const getCometCollaterals = (len) => {
  const comet = comets[len - 1];
  const calls = comet.collateralAssets.map((asset) => ({
    address: comet.address,
    name: "totalsCollateral",
    params: [asset.address],
  }));

  multicall({
    abi: COMET_ABI,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      res.forEach((item, i) => {
        const amount = item[0]
          ? ethers.utils.formatUnits(
              item[0]?._hex || 0,
              comet.collateralAssets[i].decimals
            )
          : "0";
        comet.collateralAssets[i].collateral = amount;
      });
      len--;
      if (len > 0) {
        getCometCollaterals(len);
      } else {
        count++;
        formate("get comet collaterals");
      }
    })
    .catch((err) => {
      console.log(`get collaterals error`, err);
    });
};

const getPrice = (len) => {
  const comet = comets[len - 1];
  const calls = [
    {
      address: comet.address,
      name: "getPrice",
      params: [comet.baseToken.priceFeed],
    },
  ];

  comet.collateralAssets.forEach((asset) => {
    calls.push({
      address: comet.address,
      name: "getPrice",
      params: [asset.priceFeed],
    });
  });
  multicall({
    abi: COMET_ABI,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      res.forEach((item, i) => {
        if (i === 0) {
          comet.baseToken.price = ethers.utils.formatUnits(
            item[0]?._hex || 0,
            8
          );
          return;
        }
        comet.collateralAssets[i - 1].price = ethers.utils.formatUnits(
          item[0]?._hex || 0,
          8
        );
      });
      len--;
      if (len > 0) {
        getPrice(len);
      } else {
        count++;
        formate("get price");
      }
    })
    .catch((err) => {
      console.log(`get price error ${comet.address}`, err);
    });
};

const getCompPrice = (comet) => {
  if (!compPriceFeed) {
    count++;
    formate("get comp price");
    return;
  }
  const calls = [
    {
      address: comet.address,
      name: "getPrice",
      params: [compPriceFeed],
    },
  ];
  multicall({
    abi: COMET_ABI,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      compPrice = res ? ethers.utils.formatUnits(res[0][0]?._hex || 0, 8) : 0;
      count++;
      formate("get comp price");
    })
    .catch((err) => {
      console.log(`get comp price error`, err);
    });
};

const getAccountInfo = (comet, cb) => {
  const calls = [
    {
      address: comet.address,
      name: "borrowBalanceOf",
      params: [account],
    },
    {
      address: comet.address,
      name: "balanceOf",
      params: [account],
    },
    {
      address: comet.baseToken.address,
      name: "balanceOf",
      params: [account],
    },
  ];
  let hasNative = "";
  comet.collateralAssets.forEach((asset) => {
    calls.push({
      address: comet.address,
      name: "userCollateral",
      params: [account, asset.address],
    });
    calls.push({
      address: asset.address,
      name: "balanceOf",
      params: [account],
    });
    if (asset.isNative) hasNative = asset.address;
  });

  multicall({
    abi: COMET_ABI,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      const borrowedBalance = Big(res[0] || 0).div(
        Big(10).pow(comet.baseToken.decimals)
      );
      const borrowedBalanceUsd = borrowedBalance
        .mul(comet.baseToken.price)
        .toString();
      const balance = Big(res[1] || 0).div(
        Big(10).pow(comet.baseToken.decimals)
      );
      const walletBalance = Big(res[2] || 0).div(
        Big(10).pow(comet.baseToken.decimals)
      );
      const userCollateralUsd = Big(0);
      const userBorrowCapacityUsd = Big(0);
      const collateralBalances = {};
      const userLiquidationUsd = Big(0);
      let nativePrice = 0;
      comet.collateralAssets.forEach((collateralAsset, i) => {
        const startI = i * comet.collateralAssets.length + 3;
        const balance = Big(res[startI] ? res[startI][0] : 0).div(
          Big(10).pow(collateralAsset.decimals)
        );
        userCollateralUsd = balance
          .mul(collateralAsset.price)
          .add(userCollateralUsd);

        userBorrowCapacityUsd = balance
          .mul(collateralAsset.price)
          .mul(collateralAsset.borrowCollateralFactor / 100)
          .add(userBorrowCapacityUsd);

        userLiquidationUsd = balance
          .mul(collateralAsset.price)
          .mul(collateralAsset.liquidateCollateralFactor / 100)
          .add(userLiquidationUsd);

        const walletBalance = Big(res[startI + 1] || 0).div(
          Big(10).pow(collateralAsset.decimals)
        );
        if (hasNative === collateralAsset.address) {
          nativePrice = collateralAsset.price;
        }
        collateralBalances[collateralAsset.address] = {
          balance: balance.toString(),
          balanceUsd: balance.mul(collateralAsset.price).toString(),
          walletBalance: walletBalance.toString(),
          walletBalanceUsd: walletBalance.mul(collateralAsset.price).toString(),
        };
      });

      const returnData = {
        borrowedBalance: borrowedBalance.toString(),
        borrowedBalanceUsd,
        userCollateralUsd: userCollateralUsd.toString(),
        balance: balance.toString(),
        balanceUsd: balance.mul(comet.baseToken.price).toString(),
        walletBalance: walletBalance.toString(),
        walletBalanceUsd: walletBalance.mul(comet.baseToken.price).toString(),
        collateralBalances,
        userBorrowCapacityUsd: userBorrowCapacityUsd.toString(),
        userLiquidationUsd: userLiquidationUsd.toString(),
      };

      if (hasNative) {
        Ethers.provider()
          .getBalance(account)
          .then((rawBalance) => {
            const walletBalance = ethers.utils.formatUnits(rawBalance._hex, 18);
            collateralBalances[hasNative].walletBalance = walletBalance;
            collateralBalances[hasNative].walletBalanceUsd = Big(walletBalance)
              .mul(nativePrice)
              .toString();
            cb?.(returnData);
          });
      } else {
        cb?.(returnData);
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
};

const formate = () => {
  if (count < 4) return;
  const assets = comets.map((comet) => {
    const totalBorrowUsd = Big(comet.totalBorrow || 0)
      .mul(comet.baseToken.price)
      .toString();
    const totalEarningUsd = Big(comet.totalEarning || 0)
      .mul(comet.baseToken.price)
      .toString();

    const totalCollateral = Big(0);
    comet.collateralAssets?.forEach((asset) => {
      totalCollateral = totalCollateral.add(
        Big(asset.collateral).mul(asset.price)
      );
    });

    const cometRewardData = rewardData[comet.address];

    const compToSuppliersPerDay =
      (cometRewardData.baseTrackingSupplySpeed /
        cometRewardData.trackingIndexScale) *
      secondsPerDay;
    const compToBorrowersPerDay =
      (cometRewardData.baseTrackingBorrowSpeed /
        cometRewardData.trackingIndexScale) *
      secondsPerDay;

    const supplyCompRewardApr =
      ((compPrice * compToSuppliersPerDay) /
        (comet.totalEarning * comet.baseToken.price)) *
      365;
    const borrowCompRewardApr =
      ((compPrice * compToBorrowersPerDay) /
        (comet.totalBorrow * comet.baseToken.price)) *
      365;

    return {
      ...comet,
      totalBorrowUsd,
      totalEarningUsd,
      totalCollateralUsd: totalCollateral.toString(),
      supplyCompRewardApr,
      borrowCompRewardApr,
    };
  });
  onLoad({
    getAccountInfo,
    assets,
    compPrice,
  });
};

useEffect(() => {
  if (!comets.length) return;

  getPrice(comets.length);
  getCometInfo(comets.length);
  getCometCollaterals(comets.length);
  getCompPrice(comets[0]);
}, []);
