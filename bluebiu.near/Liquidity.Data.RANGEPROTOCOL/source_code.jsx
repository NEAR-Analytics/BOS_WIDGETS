
const {
  pairs,
  addresses,
  allData,
  onLoad,
  // chainType,
  curChain,
  multicallAddress,
  feesData,
  // rangeData,
  RANGE_URL,
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
          resolve(result.body)
        } else {
          reject(result.status)
        }
      } catch (error) {
        reject(error)
      }
    }).catch(reject)
  })

}

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
  onLoad({
    loading,
    dataList
  })
}
function getDataList() {
  pairs.forEach(pair => {
    const vaultAddress = addresses[pair.id]
    const data = allData.find(data => data.pool === pair.poolAddress && data.vault === vaultAddress)
    dataList.push({
      ...data,
      ...pair,
    })
  })
  formatedData('dataList')
}

function getLiquidity() {
  const sender = Ethers.send("eth_requestAccounts", [])[0];
  const query = `{
    users(where: {id: "${sender}"}) {
      id
      vaultBalances {
        token0
        token1
        balance
        address
        vault {
          id
          token0
          token1
        }
      }
    }
  }`
  asyncFetch(RANGE_URL, {
    method: 'POST',
    body: JSON.stringify({
      query
    })
  }).then(result => {
    if (result.ok) {
      const vaultBalances = result?.body?.data?.users[0]?.vaultBalances ?? []
      for (let i = 0; i < dataList.length; i++) {
        // const element = array[i];
        const data = dataList[i]
        const balance = vaultBalances.find(vaultBalance => vaultBalance.vault.id.toLowerCase() === addresses[data.id].toLowerCase())
        if (balance) {
          const {
            token0,
            token1
          } = balance
          dataList[i].liquidity = Big(ethers.utils.formatUnits(token0, data.decimals0)).times(prices[data.token0]).plus(Big(ethers.utils.formatUnits(token1, data.decimals1)).times(prices[data.token1])).toFixed(4)
        }
      }
      formatedData('getLiquidity')
    }
  })
}
function getFee() {
  for (let i = 0; i < dataList.length; i++) {
    const data = dataList[i];
    dataList[i].fee = Big(data.fee).div(10000).toFixed(2)
  }
  formatedData('getFee')
}
function getTvl() {
  const promiseArray = []
  if (curChain.chain_id === 56) {
    for (let i = 0; i < dataList.length; i++) {
      const vault = dataList[i].vault
      const query = "{\n  vault(id: \"" + vault + "\") {\n    liquidity\n    balance0\n    balance1\n    totalSupply\n    totalFeesEarned0\n    totalFeesEarned1\n    token0\n    token1\n    name\n    tag\n    pool\n  }\n}"
      promiseArray.push(asyncFetchWithPromise(RANGE_URL, {
        method: "POST",
        body: JSON.stringify({
          query
        })
      }))
    }
  } else {
    for (let i = 0; i < dataList.length; i++) {
      const query = `{
        vault(id: "${dataList[i].vault}") {
          liquidity
          balance0
          balance1
          totalSupply
          totalFeesEarned0
          totalFeesEarned1
          name
          tag
          pool
        }
      }`
      promiseArray.push(asyncFetchWithPromise("https://api.goldsky.com/api/public/project_clm97huay3j9y2nw04d8nhmrt/subgraphs/izumi-manta/0.2/gn", {
        method: "POST",
        body: JSON.stringify({
          query
        })
      }))
    }
  }
  Promise.all(promiseArray)
    .then(result => {
      for (let i = 0; i < result.length; i++) {
        const {
          balance0,
          balance1
        } = result[i].data.vault
        const data = dataList[i]
        console.log('token0===', data.token0, '=balance0', balance0, 'token1===', data.token1, '=balance1', balance1, "=prices", prices)
        dataList[i].tvlUSD = Big(ethers.utils.formatUnits(balance0, data.decimals0))
          .times(prices[data.token0] ?? 0)
          .plus(Big(ethers.utils.formatUnits(balance1, data.decimals1)).times(prices[data.token1] ?? 0))
          .toFixed(2)
      }
      formatedData('getTvl')
    })

}
function getApy() {
  if (curChain.chain_id === 56) {
    for (let i = 0; i < dataList.length; i++) {
      const vault = dataList[i].vault
      dataList[i].apy = Big(feesData[vault]?.apy ?? 0).toFixed(2) + '%'
    }
  } else {
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i]
      dataList[i].apy = Big(data?.fee_apy ?? 0).plus(data?.asset_yield ?? 0).toFixed(2) + '%'
    }
  }
  formatedData('getApy')
}
function getBalance() {
  const calls = [];
  const sender = Ethers.send("eth_requestAccounts", [])[0];
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
  getTvl()
  getApy()
  getBalance()
  getLiquidity()
}, [])