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
  managed,
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
    name: "vaultAllUnderlyingAssets",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

useEffect(() => {
  if (!account || !update || !multicallAddress) return;
  console.log("managed-data--");
  if (!managed) {
    onLoad({
      dataList: [],
    });
    return;
  }
  let count = 0;
  let _pairsDataRes = {};
  let _totalSupplyRes = [];
  let _underlyingAssetsRes = [];
  let _userPositionsRes = [];

  function formatData(params) {
    console.log(params, count);

    if (count < 1) return;
    count = 0;

    for (let i = 0; i < managed.length; i++) {
      const _addr = managed[i].vaultAddress.toLocaleLowerCase();
      const { shareTokenApr, shareTokenPrice, tvl } = _pairsDataRes[_addr];

      managed[i].APR = Big(shareTokenApr).div(10000).toFixed(2, 0);
      managed[i].AUM = Big(tvl).div(1000000).toString();
      // let _totalSupply = _totalSupplyRes[i][0].toString();
      // let _totalAmount0 = _underlyingAssetsRes[i][0].toString();
      // let _totalAmount1 = _underlyingAssetsRes[i][1].toString();
      // let _shares = _userPositionsRes[i]
      //   ? formatUnits(_userPositionsRes[i][0])
      //   : 0;
      // pairs[i].totalSupply = _totalSupply;
      // pairs[i].totalAmount0 = _totalAmount0;
      // pairs[i].totalAmount1 = _totalAmount1;
      // pairs[i].shares = _shares;
      // pairs[i].shares = _userPositionsRes[i]
      //   ? formatUnits(_userPositionsRes[i][0])
      //   : 0;
      // if (_userPositionsRes[i]) {
      //   let _token0Amount = Big(_shares)
      //     .times(_totalAmount0)
      //     .div(_totalSupply)
      //     .toString();
      //   let _token1Amount = Big(_shares)
      //     .times(_totalAmount1)
      //     .div(_totalSupply)
      //     .toString();
      //   pairs[i].token0Amount = _token0Amount;
      //   pairs[i].token1Amount = _token1Amount;
      //   pairs[i].token0Value = Big(_token0Amount)
      //     .times(prices[token0] || 0)
      //     .toString();
      //   pairs[i].token1Value = Big(_token1Amount)
      //     .times(prices[token0] || 0)
      //     .toString();
      // }
    }

    onLoad({
      dataList: managed,
    });
  }
  function getPairsData() {
    asyncFetch("https://vault-api.teahouse.finance/vaults/type/managed")
      .then((res) => {
        const _addrs = managed.map((item) => item.vaultAddress);

        const _curChainRes = res.body.vaults.filter((item) =>
          _addrs.includes(item.address.toLocaleLowerCase())
        );

        _curChainRes.forEach(({ address, latestInfo }) => {
          let _addr = address.toLocaleLowerCase();
          _pairsDataRes[_addr] = latestInfo;
        });
      })
      .catch((err) => {
        console.log("catch-getPairsData-error--", err);
      })
      .finally(() => {
        count++;
        formatData("getPairsData");
      });
  }

  function getUserPositions() {
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
        console.log("getUserPositions--", res);
        _userPositionsRes = res;
        count++;
        formatData("getUserPositions");
      })
      .catch((err) => {
        console.log("getUserPositions-error--", err);
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
  function getAllUnderlyingAssets() {
    const calls = pairs.map((item) => ({
      address: item.vaultAddress,
      name: "vaultAllUnderlyingAssets",
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
        console.log("getAllUnderlyingAssets--", res);
        _underlyingAssetsRes = res;
        count++;
        formatData("getAllUnderlyingAssets");
      })
      .catch((err) => {
        console.log("getAllUnderlyingAssets-error--", err);
      });
  }

  getPairsData();
  // getTotalSupply();
  // getAllUnderlyingAssets();
  // getUserPositions();
}, [account, update]);
