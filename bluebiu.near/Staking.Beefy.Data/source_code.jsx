const {
  CHAIN_LIST,
  curChain,
  multicallAddress,
  multicall,
  account,
  prices,
  update,
  onLoad,
  pairs,
  chainId,
  addresses,
} = props;

const { formatUnits, parseUnits } = ethers.utils;

const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
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
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPricePerFullShare",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

useEffect(() => {
  if (!account || !update || !multicallAddress) return;
  const pairIds = pairs.map((pair) => pair.id);
  let count = 0;
  let _lpsDataRes = {};
  let _apyDataRes = {};
  let _totalSupplyRes = [];
  let _yourDepositsRes = [];
  let _pricePerFullShareRes = [];
  let _userPositionsRes = [];

  function formatData(params) {
    console.log(params, count);

    if (count < 5) return;
    count = 0;
    console.log("_lpsDataRes--", _lpsDataRes);
    for (let i = 0; i < pairs.length; i++) {
      const lpsData = _lpsDataRes[pairs[i].id];
      const apyData = _apyDataRes[pairs[i].id];
      pairs[i].detail = { ...lpsData, ...apyData };

      pairs[i].deposits = _yourDepositsRes[i] ? _yourDepositsRes[i][0] : 0;

      const _beefyTVL = Big(formatUnits(_totalSupplyRes[i][0]))
        .times(formatUnits(_pricePerFullShareRes[i][0]))
        .times(lpsData.price || 0)
        .toString();
      const _gammaTVL = Big(lpsData.price || 0)
        .times(lpsData.totalSupply)
        .toString();
      pairs[i].beefyTVL = _beefyTVL;
      pairs[i].gammaTVL = _gammaTVL;
      pairs[i].APY = Big(apyData.totalApy).times(100).toFixed(2);
      const _pow = 1 / 365;
      pairs[i].DAILY = Number(
        (Math.pow(Big(1).plus(apyData.totalApy).toString(), _pow) - 1) * 100
      ).toFixed(4);

      //   const _addr = pairs[i].vaultAddress.toLocaleLowerCase();
      //   const { token0, token1 } = _lpsDataRes[_addr];
      //   let token0TVL = Big(token0.tvl).times(token0.shareTokenPrice);
      //   let token1TVL = Big(token1.tvl).times(token1.shareTokenPrice);
      //   let _apr = 0;
      //   let _aum = 0;
      //   if (token0TVL.gt(token1TVL)) {
      //     _apr = token0.shareTokenApr;
      //     let _token0 = pairs[i].token0;
      //     _aum = Big(formatUnits(token0.tvl, pairs[i].decimals0))
      //       .times(prices[_token0] || 0)
      //       .toString();
      //   } else {
      //     _apr = token1.shareTokenApr;
      //     let _token1 = pairs[i].token1;
      //     _aum = Big(formatUnits(token1.tvl, pairs[i].decimals1))
      //       .times(prices[_token1] || 0)
      //       .toString();
      //   }
      //   if (
      //     pairs[i].id === "USDC-USDT-Oku" ||
      //     pairs[i].id === "USDC-USDT-PancakeSwap" ||
      //     pairs[i].id === "USDC-WETH-PancakeSwap"
      //   ) {
      //     _apr = token0.shareTokenApr;
      //   }
      //   pairs[i].APR = Big(_apr).div(10000).toFixed(2, 0);
      //   pairs[i].AUM = _aum;
      //   let _totalSupply = _totalSupplyRes[i][0].toString();
      //   let _totalAmount0 = _underlyingAssetsRes[i][0].toString();
      //   let _totalAmount1 = _underlyingAssetsRes[i][1].toString();
      //   let _shares = _userPositionsRes[i]
      //     ? formatUnits(_userPositionsRes[i][0])
      //     : 0;
      //   pairs[i].totalSupply = _totalSupply;
      //   pairs[i].totalAmount0 = _totalAmount0;
      //   pairs[i].totalAmount1 = _totalAmount1;
      //   pairs[i].shares = _shares;
      //   // pairs[i].shares = _userPositionsRes[i]
      //   //   ? formatUnits(_userPositionsRes[i][0])
      //   //   : 0;
      //   if (_userPositionsRes[i]) {
      //     let _token0Amount = Big(_shares)
      //       .times(_totalAmount0)
      //       .div(_totalSupply)
      //       .toString();
      //     let _token1Amount = Big(_shares)
      //       .times(_totalAmount1)
      //       .div(_totalSupply)
      //       .toString();
      //     pairs[i].token0Amount = _token0Amount;
      //     pairs[i].token1Amount = _token1Amount;
      //     pairs[i].token0Value = Big(_token0Amount)
      //       .times(prices[token0] || 0)
      //       .toString();
      //     pairs[i].token1Value = Big(_token1Amount)
      //       .times(prices[token0] || 0)
      //       .toString();
      //   }
    }

    onLoad({
      dataList: pairs,
    });
  }
  function getLpsData() {
    asyncFetch("https://api.beefy.finance/lps/breakdown")
      .then((res) => {
        pairIds.forEach((pairId) => {
          _lpsDataRes[pairId] = res.body[pairId];
        });
      })
      .catch((err) => {
        console.log("catch-getLpsData-error--", err);
      })
      .finally(() => {
        count++;
        formatData("getLpsData");
      });
  }
  function getApyData() {
    asyncFetch("https://api.beefy.finance/apy/breakdown")
      .then((res) => {
        pairIds.forEach((pairId) => {
          _apyDataRes[pairId] = res.body[pairId];
        });
      })
      .catch((err) => {
        console.log("catch-getLpsData-error--", err);
      })
      .finally(() => {
        count++;
        formatData("getLpsData");
      });
  }

  function getTotalSupply() {
    const calls = pairs.map((item) => ({
      address: item.vaultAddress,
      name: "totalSupply",
      //   params: [],
    }));
    multicall({
      abi: ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getTotalSupply--", res);
        _totalSupplyRes = res;
        count++;
        formatData("getTotalSupply");
      })
      .catch((err) => {
        console.log("getTotalSupply-error--", err);
      });
  }
  function getPricePerFullShare() {
    const calls = pairs.map((item) => ({
      address: item.vaultAddress,
      name: "getPricePerFullShare",
      //   params: [],
    }));
    multicall({
      abi: ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getPricePerFullShare--", res);
        _pricePerFullShareRes = res;
        count++;
        formatData("getPricePerFullShare");
      })
      .catch((err) => {
        console.log("getPricePerFullShare-error--", err);
      });
  }
  function getYourDeposits() {
    const calls = pairs.map((item) => ({
      address: item.vaultAddress,
      name: "balanceOf",
      params: [account],
    }));
    multicall({
      abi: ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getYourDeposits--", res);
        _yourDepositsRes = res;
        count++;
        formatData("getYourDeposits");
      })
      .catch((err) => {
        console.log("getYourDeposits-error--", err);
      });
  }

  getLpsData();
  getApyData();
  getTotalSupply();
  getPricePerFullShare();
  getYourDeposits();
}, [account, update]);
