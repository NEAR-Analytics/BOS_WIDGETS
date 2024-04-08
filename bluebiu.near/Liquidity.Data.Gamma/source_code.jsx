
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
    "inputs": [],
    "name": "rewardRate",
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
    "inputs": [],
    "name": "rewardToken",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "globalState",
    "outputs": [
      {
        "internalType": "uint160",
        "name": "price",
        "type": "uint160"
      },
      {
        "internalType": "int24",
        "name": "tick",
        "type": "int24"
      },
      {
        "internalType": "uint16",
        "name": "fee",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "timepointIndex",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "communityFeeToken0",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "communityFeeToken1",
        "type": "uint16"
      },
      {
        "internalType": "bool",
        "name": "unlocked",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
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

function formatedData() {
  onLoad({
    loading,
    dataList
  })
}
function getDataList() {
  console.log('===pairs', pairs)
  pairs.forEach(pair => {
    const vaultAddress = addresses[pair.id]
    const data = allData[vaultAddress]
    dataList.push({
      ...data,
      ...pair,
      vaultAddress,
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
function getTotalApr() {
  const chain_id = curChain.chain_id
  if ([8453, 10, 1101, 5000].includes(chain_id)) {
    dataList = dataList.map(data => {
      data.totalApr = formatPercent(data.returns.weekly.feeApr)
      return data
    })
    formatedData('getTotalApr')
  }
  if (chain_id === 59144) {
    asyncFetch("https://api.lynex.fi/api/v1/fusions").then((res) => {
      if (!res.ok) return;
      const fusionsData = res?.body?.data
      dataList = dataList.map(data => {
        const fusionData = fusionsData.find(fusionData => fusionData.address === data.vaultAddress)
        data.totalApr = ((fusionData?.gauge?.tvl ?? 0 > 0) ? Big(fusionData?.gauge?.rewardPerSecond ?? 0)
          .times(365 * 24 * 60 * 60)
          .times(prices?.Lynex ?? 0)
          .times(100)
          .div(fusionData?.gauge?.tvl ?? 0).toFixed(2) : '0.00') + '%'
        return data
      })
      formatedData('getTotalApr')
    });
  }
  if (chain_id === 56) {
    const calls = [];
    // const addressMap = {
    //   'N ETH-WBNB-0': '0xD777E84b0D29128351A35045D7AE728780dEf54D',
    //   'N BTCB-WBNB-0': '0x65E40E779560199F5e68126Bc95bdc03083e5AA4',
    //   'S USDT-USDC-0': '0x1011530830c914970CAa96a52B9DA1C709Ea48fb',
    //   'N USDT-WBNB-0': '0xf50Af14BC4953Dcf9d27EbCA8BB3625855F5B42d',
    //   'P ankrBNB-WBNB-0': '0xf50Af14BC4953Dcf9d27EbCA8BB3625855F5B42d',
    //   'P BNBx-WBNB-0': '0xf50Af14BC4953Dcf9d27EbCA8BB3625855F5B42d',
    // }
    dataList.forEach(data => {
      data?.gaugeV2Address && calls.push({
        address: data?.gaugeV2Address,
        name: "rewardRate",
      });
    })
    multicallv2(
      ERC20_ABI,
      calls,
      {},
      res => {
        for (let i = 0, len = res.length; i < len; i++) {
          dataList[i]['totalApr'] = (dataList[i].tvlUSD > 0 ? Big(ethers.utils.formatUnits(res[i][0]._hex))
            .mul(365 * 24 * 60 * 60)
            .mul(prices['THE'])
            .div(dataList[i].tvlUSD)
            .toFixed(2) : '0.00') + '%'
        }
        formatedData('getTotalApr')
      },
      error => {
        setTimeout(() => {
          getTotalApr()
        }, 500)
      }
    )
  }
}
function getFeeTiers() {
  const chain_id = curChain.chain_id
  if ([59144, 56].includes(chain_id)) {
    const calls = [];
    dataList.forEach(data => {
      calls.push({
        address: data.poolAddress,
        name: "globalState",
      });
    })
    multicallv2(
      ERC20_ABI,
      calls,
      {},
      res => {
        for (let i = 0, len = res.length; i < len; i++) {
          dataList[i]['fee'] = Big(res[i][2]).div(10000).toFixed(4)
        }
        formatedData('getFeeTiers')
      },
      error => {
        setTimeout(() => {
          getFeeTiers()
        }, 500)
      }
    )
  } else {
    asyncFetch(LAST_SNAP_SHOT_DATA_URL)
      .then(res => {
        if (res.ok) {
          dataList.forEach((data, index) => {
            const findIndex = res.body.findIndex(source => data.vaultAddress === source.address)
            if (findIndex > -1) {
              dataList[index]['fee'] = Big(res.body[findIndex].fee).div(100).toFixed(2)
            }
          })
          formatedData('getFeeTiers')
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }
}

useEffect(() => {
  getDataList()
  getLiquidity()
  getFeeTiers()
  getTotalApr()
}, [])