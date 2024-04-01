
const {
  pairs,
  addresses,
  allData,
  onLoad,
  // chainType,
  curChain,
  multicallAddress,
  feesData,
  rangeData,
  prices
} = props

let loading = false
let dataList = []
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
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
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
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
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
const fetchFusionsData = () => {
  asyncFetch("https://api.lynex.fi/api/v1/fusions").then((res) => {
    if (!res.ok) return;
    State.update({
      fusionsData: res?.body?.data,
    });
  });
}
const formatPercent = (value) => {
  return `${Number(value * 100).toLocaleString("en", {
    maximumFractionDigits: 2,
  })}%`;
};

function formatedData(type) {
  console.log('===type', type)
  onLoad({
    loading,
    dataList
  })
}
function getDataList() {
  pairs.forEach(pair => {
    const vaultAddress = addresses[pair.id]
    const data = allData.find(data => data.vault === vaultAddress)
    dataList.push({
      ...data,
      ...pair,
    })
  })
  formatedData('dataList')
}

function getLiquidity() {
  const calls = [];
  const sender = Ethers.send("eth_requestAccounts", [])[0];
  dataList.forEach(data => {
    calls.push({
      address: data.vaultAddress,
      name: "balanceOf",
      params: [sender],
    });
  })
  multicallv2(
    ERC20_ABI,
    calls,
    {},
    (res) => {
      for (let i = 0, len = res.length; i < len; i++) {
        if (res[i]) {
          dataList[i].liquidity = Big(ethers.utils.formatUnits(res[i][0]._hex)).toFixed(2)
        }
      }
      formatedData('getLiquidity')
    },
    (error) => {
      setTimeout(() => {
        getLiquidity();
      }, 500);
    }
  )
}
function getFee() {
  for (let i = 0; i < dataList.length; i++) {
    const data = dataList[i];
    dataList[i].fee = Big(data.fee).div(10000).toFixed(2)
  }
  formatedData('getFee')
}
function handleGetTvl(i, range) {
  const {
    balance0,
    balance1,
  } = range
  const data = dataList[i]
  dataList[i].tvlUSD = Big(ethers.utils.formatUnits(balance0, data.decimals0))
    .times(prices[data.token0] ?? 0)
    .plus(Big(ethers.utils.formatUnits(balance1, data.decimals1)).times(prices[data.token1] ?? 0))
    .toFixed(2)
  formatedData('getTvl')
}
function getTvl() {
  for (let i = 0; i < dataList.length; i++) {
    const vault = dataList[i].vault
    const range = rangeData[vault]
    handleGetTvl(i, range)
  }

}
function getApy() {
  for (let i = 0; i < dataList.length; i++) {
    const vault = dataList[i].vault
    dataList[i].apy = Big(feesData[vault].apy).toFixed(2) + '%'
  }
  formatedData('getApy')
}

useEffect(() => {
  getDataList()
  getFee()
  getTvl()
  getApy()
}, [])