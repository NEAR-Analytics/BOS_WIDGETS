const {
  pairs,
  sender,
  addresses,
  allData,
  stakingPoolsData,
  onLoad,
  // chainType,
  curChain,
  FEE_APR_URL,
  multicallAddress,
  prices,
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
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  "function getTotalAmounts() external view returns (uint256 total0, uint256 total1)"
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

function multicallv2WithPromise(abi, calls, options) {
  return new Promise((resolve, reject) => {
    multicallv2(
      abi,
      calls,
      options,
      resolve,
      reject)
  })
}
function asyncFetchWithPromise(url, options) {
  return new Promise((resolve, reject) => {
    asyncFetch(url, options || {}).then(result => {
      try {
        if (result.ok) {
          resolve(typeof result.body === 'string' ? JSON.parse(result.body) : result.body)
        } else {
          reject(result.status)
        }
      } catch (error) {
        reject(error)
      }
    }).catch(reject)
  })

}

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
    const findIndex = allData.findIndex(data => addresses[pair.id].toLowerCase() === data.id)
    if (findIndex > -1) {
      dataList.push({
        initialData: allData[findIndex],
        ...pair,
      })
    }
  })
  formatedData('getDataList')
}
function getFee() {
  for (let i = 0; i < dataList.length; i++) {
    const data = dataList[i];
    dataList[i].fee = Big(data?.initialData?.feeTier).div(10000).toFixed(2)
  }
  formatedData('getFee')
}

function getTvlUSD() {
  console.log('=prices', prices)
  for (let i = 0; i < dataList.length; i++) {
    const data = dataList[i]
    const {
      token0Balance,
      token1Balance,
    } = data.initialData
    console.log('=data', data)
    if (data.poolAddress === "0x559e44572145aabf6fdbc7e49db92bb6e6079c66") {
      dataList[i].tvlUSD = Big(ethers.utils.formatUnits(token1Balance ?? 0, data.decimals1)).times(prices[data.token1]).toFixed(2)
    } else {
      dataList[i].tvlUSD = Big(ethers.utils.formatUnits(token0Balance ?? 0, data.decimals0)).times(prices[data.token0]).plus(Big(ethers.utils.formatUnits(token1Balance ?? 0, data.decimals1)).times(prices[data.token1])).toFixed(2)
    }
  }
  formatedData('getTvlUSD')
}
function handleGetBaseApr(baseAprUrl) {
  const baseAprPromiseArray = []
  baseAprUrl.forEach(url => {
    baseAprPromiseArray.push(asyncFetchWithPromise(url))
  })
  return new Promise((resolve, reject) => {
    Promise.all(baseAprPromiseArray).then(resolve).catch(reject)
  })
}
function getFeeApr() {
  const baseAprUrl = []
  dataList.forEach(data => {
    baseAprUrl.push(`${FEE_APR_URL}?address=${addresses[data.id]}&chain=${curChain.chain_id}&interval=604800`)
  })
  const promiseArray = []
  promiseArray.push(handleGetBaseApr(baseAprUrl))
  // promiseArray.push(asyncFetchWithPromise(`https://api.angle.money/v2/merkl?chainIds[]=${curChain.chain_id}&user=${sender}`))
  Promise.all(promiseArray).then(result => {
    const [baseAprResult] = result
    for (let i = 0; i < dataList.length; i++) {
      dataList[i].feeApr = Big(baseAprResult[i]?.apr ?? 0).toFixed(2) + '%'
    }
    formatedData("getFeeApr")
  }).catch(error => {
    console.log('error', error)
  })
}
function getLiquidity() {
  const totalSupplyCalls = []
  const getTotalAmountsColls = []
  dataList.forEach(data => {
    totalSupplyCalls.push({
      address: addresses[data.id],
      name: 'totalSupply'
    })
    getTotalAmountsColls.push({
      address: addresses[data.id],
      name: "getTotalAmounts",
    })
  })
  const promiseArray = []
  promiseArray.push(multicallv2WithPromise(ERC20_ABI, totalSupplyCalls, {}))
  promiseArray.push(multicallv2WithPromise(ERC20_ABI, getTotalAmountsColls, {}))
  Promise.all(promiseArray).then(result => {
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i]
      const [totalSupplyResult, getTotalAmountsResult] = result
      const total0 = ethers.utils.formatUnits(getTotalAmountsResult[i][0], data.decimals0)
      const total1 = ethers.utils.formatUnits(getTotalAmountsResult[i][1], data.decimals1)
      const totalSupply = ethers.utils.formatUnits(totalSupplyResult[i][0], 18)
      // console.log('totalSupply', totalSupply)
      const priceLp = Big(totalSupply).gt(0) ? Big(Big(total0)
        .times(prices[data.token0])
        .plus(Big(total1).times(prices[data.token1]))
      ).div(totalSupply) : 0
      const amountLp = data.balance
      dataList[i].liquidity = Big(priceLp).times(amountLp).toFixed()
    }
    formatedData("getLiquidity")
  }).catch(error => {
    console.log('error', error)
  })
}
function getBalance() {
  const calls = [];
  dataList.forEach(data => {
    calls.push({
      address: ethers.utils.getAddress(addresses[data.id]),
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
      getLiquidity()
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
  getFee()
  getTvlUSD()
  getFeeApr()
  getBalance()
}, [])