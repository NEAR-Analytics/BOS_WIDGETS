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

  let count = 0;
  let _pairsDataRes = {};
  let _totalSupplyRes = [];
  let _underlyingAssetsRes = [];

  function formatData(params) {
    console.log(params, count);

    if (count < 3) return;
    count = 0;

    for (let i = 0; i < pairs.length; i++) {
      const _addr = pairs[i].vaultAddress.toLocaleLowerCase();

      const { token0, token1 } = _pairsDataRes[_addr];
      let token0TVL = Big(token0.tvl).times(token0.shareTokenPrice);
      let token1TVL = Big(token1.tvl).times(token1.shareTokenPrice);
      let _apr = 0;
      let _aum = 0;
      if (token0TVL.gt(token1TVL)) {
        _apr = token0.shareTokenApr;
        let _token0 = pairs[i].token0;

        _aum = Big(formatUnits(token0.tvl, pairs[i].decimals0))
          .times(prices[_token0] || 0)
          .toString();
      } else {
        _apr = token1.shareTokenApr;
        let _token1 = pairs[i].token1;

        _aum = Big(formatUnits(token1.tvl, pairs[i].decimals1))
          .times(prices[_token1] || 0)
          .toString();
      }
      pairs[i].APR = Big(_apr).div(10000).toFixed(2, 0);
      pairs[i].AUM = _aum;

      pairs[i].totalSupply = _totalSupplyRes[i][0].toString();

      pairs[i].totalAmount0 = _underlyingAssetsRes[i][0].toString();
      pairs[i].totalAmount1 = _underlyingAssetsRes[i][1].toString();
    }

    onLoad({
      dataList: pairs,
    });
  }
  function getPairsData() {
    asyncFetch("https://vault-api.teahouse.finance/vaults/type/permissionless")
      .then((res) => {
        const _curChainRes = res.body.vaults.filter(
          (item) => item.network === curChain.name.toLocaleLowerCase()
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
  function fetchPosition(vaultAddress) {
    return asyncFetch(
      `https://vault-api.teahouse.finance/vaults/permissionless/position/${chainId}/${vaultAddress}/${account}`
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("fetchPosition-error--", err);
      });
  }
  function getUserPositions() {
    const calls = pairs.map((item) => fetchPosition(item.vaultAddress));

    Promise.all(calls)
      .then((res) => {
        console.log("getUserPositions--", res);
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
  getTotalSupply();
  getAllUnderlyingAssets();
  //   getUserPositions();
}, [account, update]);
