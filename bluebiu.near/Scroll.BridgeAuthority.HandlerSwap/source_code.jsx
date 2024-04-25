const {
  amount,
  account,
  currency,
  routerAddress,
  routerEthAddress,
  target,
  loading,
  onSuccess,
  onError,
  quote,
} = props;
if (!loading) return "";

const L1FeeAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_gasLimit",
        "type": "uint256"
      }
    ],
    "name": "estimateCrossDomainMessageFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const L1StandardBridgeAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_gasLimit",
        "type": "uint256"
      }
    ],
    "name": "depositETH",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  // {
  //   "inputs": [
  //     {
  //       "internalType": "address",
  //       "name": "_token",
  //       "type": "address"
  //     },
  //     {
  //       "internalType": "address",
  //       "name": "_to",
  //       "type": "address"
  //     },
  //     {
  //       "internalType": "uint256",
  //       "name": "_amount",
  //       "type": "uint256"
  //     },
  //     {
  //       "internalType": "uint256",
  //       "name": "_gasLimit",
  //       "type": "uint256"
  //     }
  //   ],
  //   "name": "depositERC20",
  //   "outputs": [],
  //   "stateMutability": "payable",
  //   "type": "function"
  // },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_gasLimit",
        "type": "uint256"
      }
    ],
    "name": "depositERC20",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
];

const L1MessageBridgeAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_message",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "_gasLimit",
        "type": "uint256"
      }
    ],
    "name": "sendMessage",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_nonce",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_message",
        "type": "bytes"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "batchIndex",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "merkleProof",
            "type": "bytes"
          }
        ],
        "internalType": "struct IL1ScrollMessenger.L2MessageProof",
        "name": "_proof",
        "type": "tuple"
      }
    ],
    "name": "relayMessageWithProof",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
];

const L2StandardBridgeAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_gasLimit",
        "type": "uint256"
      }
    ],
    "name": "withdrawERC20",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
];

const L2MessageBridgeAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_message",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "_gasLimit",
        "type": "uint256"
      }
    ],
    "name": "sendMessage",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
]

console.log(target)
if (target.id === 534352) {
  const L1BridgeFeeContract = new ethers.Contract(
    '0x0d7E906BD9cAFa154b048cFa766Cc1E54E39AF9B',
    L1FeeAbi,
    Ethers.provider().getSigner()
  )

  const L1BridgeContract = new ethers.Contract(
    '0xF8B1378579659D8F7EE5f3C929c2f3E332E41Fd6',
    L1StandardBridgeAbi,
    Ethers.provider().getSigner()
  )

  const L1MessageBridgeContract = new ethers.Contract(
    '0x6774Bcbd5ceCeF1336b5300fb5186a12DDD8b367',
    L1MessageBridgeAbi,
    Ethers.provider().getSigner()
  )

  const gasLimit = 392000
  const l2GasLimit = 170000;

  L1BridgeFeeContract.estimateCrossDomainMessageFee(gasLimit).then(res => {
    const fee = ethers.utils.formatUnits(res._hex, 18);
    const rawAmount = new Big(amount).mul(Math.pow(10, currency.decimals))

    // return L1BridgeContract.depositETH(account, rawAmount.toString(), l2GasLimit, {
    //   value: rawAmount.plus(Big(fee).mul(Math.pow(10, currency.decimals))).toString(),
    //   gasLimit,
    // })
    if (currency.address === 'native') {
      return L1MessageBridgeContract.sendMessage(account, rawAmount.toString(), '0x', l2GasLimit, {
        value: rawAmount.plus(Big(fee).mul(Math.pow(10, currency.decimals))).toString(),
        // gasLimit,
      })
    } else {
      return L1BridgeContract.depositERC20(
        currency.address,
        // account,
        rawAmount.toString(),
        l2GasLimit,
        {
          value: Big(fee).mul(Math.pow(10, 18)).toString(),
          // gasLimit,
        }
      )
    }
  }).then((tx) => {
    console.log(tx)
    tx.wait()
      .then((res) => {
        onSuccess(res);
      })
      .catch((err) => {
        onError(tx);
      });
  })
    .catch((err) => {
      console.log(err)
      onError(err);
    });
} else {
  const l1GasLimit = 170000;
  const L2MessageBridgeContract = new ethers.Contract(
    '0x781e90f1c8Fc4611c9b7497C3B47F99Ef6969CbC',
    L2MessageBridgeAbi,
    Ethers.provider().getSigner()
  )

  const L2BridgeContract = new ethers.Contract(
    '0x4C0926FF5252A435FD19e10ED15e5a249Ba19d79',
    L2StandardBridgeAbi,
    Ethers.provider().getSigner()
  )

  const gasLimit = 392000
  const rawAmount = new Big(amount).mul(Math.pow(10, currency.decimals))

  let p
  if (currency.address === 'native') {
    p = L2MessageBridgeContract.sendMessage(account, rawAmount.toString(), '0x', l1GasLimit, {
      value: rawAmount.toString(),
      // gasLimit
    })
  } else {
    p = L2BridgeContract.withdrawERC20(
      currency.address,
      // account,
      rawAmount.toString(),
      0,
      {
        // gasLimit,
      }
    )
  }

  p.then((tx) => {
    console.log(tx)
    tx.wait()
      .then((res) => {
        onSuccess(res);
      })
      .catch((err) => {
        onError(tx);
      });
  })
    .catch((err) => {
      console.log(err)
      onError(err);
    });

}


return "";