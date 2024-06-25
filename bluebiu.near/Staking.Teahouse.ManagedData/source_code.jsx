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
    name: "globalState",
    outputs: [
      { internalType: "uint128", name: "depositLimit", type: "uint128" },
      { internalType: "uint128", name: "lockedAssets", type: "uint128" },
      { internalType: "uint32", name: "cycleIndex", type: "uint32" },
      {
        internalType: "uint64",
        name: "cycleStartTimestamp",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "fundingLockTimestamp",
        type: "uint64",
      },
      { internalType: "bool", name: "fundClosed", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_owner", type: "address" }],
    name: "requestedFunds",
    outputs: [
      { internalType: "uint256", name: "assets", type: "uint256" },
      { internalType: "uint256", name: "shares", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userState",
    outputs: [
      {
        internalType: "uint128",
        name: "requestedDeposits",
        type: "uint128",
      },
      { internalType: "uint128", name: "owedShares", type: "uint128" },
      {
        internalType: "uint128",
        name: "requestedWithdrawals",
        type: "uint128",
      },
      { internalType: "uint128", name: "owedAssets", type: "uint128" },
      {
        internalType: "uint32",
        name: "requestCycleIndex",
        type: "uint32",
      },
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
  let _vaultStateRes = [];
  let _userStateRes = [];
  let _shareInfo = {};
  let _totalSupplyRes = [];
  let _userPositionsRes = [];

  function formatData(params) {
    console.log(params, count);

    if (count < 4) return;
    count = 0;

    for (let i = 0; i < managed.length; i++) {
      const _addr = managed[i].vaultAddress.toLocaleLowerCase();
      const { shareTokenApr, shareTokenPrice, tvl } = _pairsDataRes[_addr];

      managed[i].APR = Big(shareTokenApr).div(10000).toFixed(2, 0);
      managed[i].AUM = Big(tvl).div(1000000).toString();
      // let _totalSupply = _totalSupplyRes[i][0].toString();
      // let _totalAmount0 = _vaultStateRes[i][0].toString();
      // let _totalAmount1 = _vaultStateRes[i][1].toString();
      const [
        depositLimit,
        lockedAssets,
        cycleIndex,
        cycleStartTimestamp,
        fundingLockTimestamp,
        fundClosed,
      ] = _vaultStateRes[i];
      const [
        requestedDeposits,
        owedShares,
        requestedWithdrawals,
        owedAssets,
        requestCycleIndex,
      ] = _userStateRes[i];

      managed[i].depositLimit = depositLimit;
      managed[i].lockedAssets = lockedAssets;
      managed[i].cycleIndex = cycleIndex;
      managed[i].cycleStartTimestamp = cycleStartTimestamp;
      managed[i].fundingLockTimestamp = fundingLockTimestamp;
      managed[i].fundClosed = fundClosed;
      managed[i].pendingAssets = requestedDeposits.toString();
      managed[i].shares = formatUnits(_shareInfo["amount"]);
      managed[i].requestedWithdrawals = formatUnits(requestedWithdrawals);
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
  function getVaultState() {
    const calls = managed.map((item) => ({
      address: item.vaultAddress,
      name: "globalState",
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
        console.log("getVaultState--", res);
        _vaultStateRes = res;
        count++;
        formatData("getVaultState");
      })
      .catch((err) => {
        console.log("getVaultState-error--", err);
      });
  }
  function getUserState() {
    const calls = managed.map((item) => ({
      address: item.vaultAddress,
      name: "userState",
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
        console.log("getUserState--", res);
        _userStateRes = res;
        count++;
        formatData("getUserState");
      })
      .catch((err) => {
        console.log("getUserState-error--", err);
      });
  }
  function getUserShares() {
    asyncFetch(
      `https://vault-api.teahouse.finance/vaults/managed/position/42161/${managed[0].vaultAddress}/${account}`
    )
      .then((res) => {
        _shareInfo = res.body.shareInfo;
      })
      .catch((err) => {
        console.log("catch-getUserShares-error--", err);
      })
      .finally(() => {
        count++;
        formatData("getUserShares");
      });
  }

  getPairsData();
  getVaultState();
  getUserState();
  getUserShares();
  // getTotalSupply();
  // getAllUnderlyingAssets();
  // getUserPositions();
}, [account, update]);
