
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

// const MULTICALL_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11"
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


useEffect(() => {
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
      const vaultAddress = addresses[pair.id]
      const data = allData[vaultAddress]
      dataList.push({
        
      })
    })
    formatedData('dataList')
  }
  function getBalance() {

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
        console.log('====res', res)
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
    const name = curChain.name
    if (['Base', 'Optimism', 'Linea', 'Polygon zkEVM'].includes(name)) {
      dataList = dataList.map(data => {
        data.totalApr = formatPercent(data.returns.weekly.feeApr)
        return data
      })
    }
    if (name === 'BSC') {
      const calls = [];
      const addressMap = {
        'ETH-WBNB-0': '0xD777E84b0D29128351A35045D7AE728780dEf54D',
        'BTCB-WBNB-0': '0x65E40E779560199F5e68126Bc95bdc03083e5AA4',
        'USDT-USDC-0': '0x1011530830c914970CAa96a52B9DA1C709Ea48fb',
        'USDT-WBNB-0': '0xf50Af14BC4953Dcf9d27EbCA8BB3625855F5B42d',
        'BNBx-WBNB-0': '0xf50Af14BC4953Dcf9d27EbCA8BB3625855F5B42d',
      }
      dataList.forEach(data => {
        calls.push({
          address: addressMap[data.id],
          name: "rewardRate",
        });
      })
      multicallv2(
        ERC20_ABI,
        calls,
        {},
        res => {
          for (let i = 0, len = res.length; i < len; i++) {
            dataList[i]['totalApr'] = dataList[i].tvlUSD > 0 ? Big(ethers.utils.formatUnits(res[i][0]._hex))
              .mul(365 * 24 * 60 * 60)
              .mul(prices['ETH'])
              .div(dataList[i].tvlUSD)
              .toFixed(2) : '0.00'
          }
          formatedData('getTotalApr')
        },
        error => {
          // console.log('=====error', error)
          setTimeout(() => {
            getTotalApr()
          }, 500)
        }
      )
    }
    if (name === 'Polygon') {

    }
    formatedData('getTotalApr')
  }
  function getFeeTiers() {
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
  getDataList()
  getLiquidity()
  getBalance()
  getFeeTiers()
  getTotalApr()
}, [])