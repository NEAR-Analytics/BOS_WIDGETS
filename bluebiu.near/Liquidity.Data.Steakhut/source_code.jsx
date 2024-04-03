const {
  pairs,
  addresses,
  allData,
  onLoad,
  // chainType,
  curChain,
  multicallAddress,
  LAST_SNAP_SHOT_DATA_URL,
  prices
} = props

const MULTICALL_ABI = [
  {
    inputs: [
      { internalType: "bool", name: "requireSuccess", type: "bool" },
      {
        components: [
          { internalType: "address", name: "target", type: "address" },
          { internalType: "bytes", name: "callData", type: "bytes" },
        ],
        internalType: "struct Multicall2.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "tryAggregate",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "success", type: "bool" },
          { internalType: "bytes", name: "returnData", type: "bytes" },
        ],
        internalType: "struct Multicall2.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const ERC20_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_shares",
        "type": "uint256"
      }
    ],
    "name": "getUnderlyingAssets",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalX",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalY",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  "function balanceOf(address) view returns (uint256)",
];

const MulticallContract = new ethers.Contract(
  multicallAddress,
  MULTICALL_ABI,
  Ethers.provider().getSigner()
);

const multicallv2 = (abi, calls, options, onSuccess, onError) => {
  const { requireSuccess, ...overrides } = options || {};
  const itf = new ethers.utils.Interface(abi);
  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }));
  MulticallContract.callStatic
    .tryAggregate(requireSuccess || true, calldata, overrides)
    .then((res) => {
      onSuccess(
        res.map((call, i) => {
          const [result, data] = call;
          return result && data !== "0x"
            ? itf.decodeFunctionResult(calls[i].name, data)
            : null;
        })
      );
    })
    .catch((err) => {
      onError?.(err);
    });
};

const formatPercent = (value) => {
  return `${Number(value * 100).toLocaleString("en", {
    maximumFractionDigits: 2,
  })}%`;
};


let loading = false
let dataList = []
function formatedData() {
  onLoad({
    loading,
    dataList
  })
}
function getDataList() {
  pairs.forEach(pair => {
    const findIndex = allData.findIndex(data => pair.poolAddress === data.id)
    console.log('=findIndex', findIndex)
    if (findIndex > -1) {
      dataList.push({
        ...pair,
        initialData: allData[findIndex],
        feeApr: 'NaN%',
      })
    }
  })
  formatedData('getDataList')
}
function getTvlUsd() {
  for (let i = 0; i < dataList.length; i++) {
    const { underlyingX, underlyingY, tokenX, tokenY } = dataList[i].initialData
    dataList[i].tvlUSD = Big(Big(ethers.utils.formatUnits(underlyingX, tokenX.decimals)).times(tokenX.priceUSD))
      .plus(Big(ethers.utils.formatUnits(underlyingY, tokenY.decimals)).times(tokenY.priceUSD)).toString(2)
  }
  formatedData('getTvlUsd')
}
function handleGetLiquidity(i, users) {
  const data = dataList[i]
  const calls = []
  users.forEach(user => {
    calls.push({
      address: data.initialData.id,
      name: 'getUnderlyingAssets',
      params: [user.amount]
    })
  })
  multicallv2(
    ERC20_ABI,
    calls,
    {},
    (result) => {
      const { tokenX, tokenY } = data.initialData
      let liquidity = Big(0)
      for (let j = 0; j < result.length; j++) {
        const element = result[j];
        const totalX = ethers.utils.formatUnits(element[0], tokenX.decimals)
        const totalY = ethers.utils.formatUnits(element[1], tokenY.decimals)
        const amount = Big(Big(totalX).times(tokenX.priceUSD)).plus(Big(totalY).times(tokenY.priceUSD))
        liquidity = liquidity.plus(amount)
      }
      dataList[i].liquidity = liquidity.toFixed(4)
      formatedData('getLiquidity')
    },
    (error) => {
      setTimeout(() => {
        getLiquidity();
      }, 500);
    }
  )
}
function getLiquidity() {
  for (let i = 0; i < dataList.length; i++) {
    const data = dataList[i];
    const users = data.initialData.users
    if (users.length > 0) {
      handleGetLiquidity(i, users)
    }
  }
}
function getBalance() {
  const calls = [];
  const sender = Ethers.send("eth_requestAccounts", [])[0];
  dataList.forEach(data => {
    calls.push({
      address: ethers.utils.getAddress(data.initialData.id),
      name: "balanceOf",
      params: [sender],
    });
  })
  multicallv2(
    ERC20_ABI,
    calls,
    {},
    (result) => {
      for (let i = 0; i < result.length; i++) {
        const element = result[i];
        dataList[i].balance = ethers.utils.formatUnits(element[0], 18)
      }
      formatedData('getBalance')
    },
    (error) => {
      setTimeout(() => {
        getBalance();
      }, 500);
    }
  )
}
useEffect(() => {
  getDataList()
  getTvlUsd()
  getBalance()
  getLiquidity()
}, [])