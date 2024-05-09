
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

      console.log('allData', allData, 'vaultAddress', vaultAddress)
      const data = allData[vaultAddress]


      dataList.push({
        ...data,
        ...pair,
        fee: Big(data.feeTier).toFixed(2),
        tvlUSD: Big(data.tvl).toFixed(2),
        totalApr: Big(data.averageApr).toFixed(2) + '%',
        // liquidity: Big(data.liquidity).toFixed(2),
        vaultAddress,
      })
    })
    console.log('---dataList', dataList)
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
  // getLiquidity()
  // getBalance()
  // getFeeTiers()
  // getTotalApr()
}, [])