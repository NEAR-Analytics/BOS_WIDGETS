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

const {
  getExtraData,
} = VM.require('bluebiu.near/widget/Blast.BridgeAuthority.Util');

const L1BlastBridgeProxyAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_localToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_remoteToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint32",
        "name": "_minGasLimit",
        "type": "uint32"
      },
      {
        "internalType": "bytes",
        "name": "_extraData",
        "type": "bytes"
      }
    ],
    "name": "bridgeERC20",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const L1WETHSwapAbi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "wad",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const L2BlastBridgeAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_localToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_remoteToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint32",
        "name": "_minGasLimit",
        "type": "uint32"
      },
      {
        "internalType": "bytes",
        "name": "_extraData",
        "type": "bytes"
      }
    ],
    "name": "bridgeERC20",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const signer = Ethers.provider().getSigner()

function computeGas(params) {
  return Ethers.provider().getGasPrice().then(gasPrice => {
    return signer.estimateGas({
      ...params,
      gasPrice
    }).then(res => {
      return new Big(res.toString()).mul(1.2).toString().split('.')[0]
    })
  })
}


const rawAmount = new Big(amount).mul(Math.pow(10, currency.decimals)).toString()
if (target.id === 81457) {
  let pRes, wethPRes
  if (currency.symbol === 'WETH') {
    const L1WETHSWAPContract = new ethers.Contract(
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      L1WETHSwapAbi,
      signer
    )

    wethPRes = L1WETHSWAPContract.withdraw(rawAmount).then(tx => tx.wait())
  }


  // const L1BlastBridgeProxy = '0x3a05E5d33d7Ab3864D53aaEc93c8301C1Fa49115'
  if (currency.isNative || wethPRes) {
    
    const params = {
      from: account,
      to: routerAddress,
      value: rawAmount,
    }
    if (wethPRes) {
      pRes = wethPRes.then(() => {
        return computeGas(params).then(gasLimit => {
          return signer.sendTransaction({
            ...params,
            gasLimit,
          }).then(tx => {
            return tx.wait()
          })
        })
      })
    } else {
      pRes = computeGas(params).then(gasLimit => {
        return signer.sendTransaction({
          ...params,
          gasLimit,
        }).then(tx => {
          return tx.wait()
        })
      })
    }
    
  } else {
    const L1BridgeContract = new ethers.Contract(
      routerAddress,
      L1BlastBridgeProxyAbi,
      signer
    )

    pRes = L1BridgeContract.bridgeERC20(
      currency.address,
      currency.targetAddress,
      rawAmount,
      800000,
      getExtraData(amount),
      {
        // gasLimit: 100000
      }
    ).then(tx => tx.wait())
  }

  pRes.then(res => {
    onSuccess(res);
  }).catch(err => {
    console.log('err:', err)
    onError(err);
  })



} else {
  const L2BlastBridge = '0x4300000000000000000000000000000000000005'

  let pRes
  let nonce, blockNumber
  if (currency.isNative) {
    const params = {
      from: account,
      to: L2BlastBridge,
      value: rawAmount,
    }

    pRes = signer.sendTransaction(params).then(tx => {
      nonce = tx.nonce
      return tx.wait()
    })
  } else {
    const L2BridgeContract = new ethers.Contract(
      routerAddress,
      L2BlastBridgeAbi,
      signer
    )

    pRes = L2BridgeContract.bridgeERC20(
      currency.address,
      '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      rawAmount,
      800000,
      getExtraData(amount),
      {
        // gasLimit: 800000
      }
    ).then(tx => tx.wait())
  }

  pRes.then(res => {
    blockNumber = res.blockNumber
    // Storage.privateSet(res.transactionHash, {
    //   nonce,
    //   blockNumber,
    // });
    onSuccess(res);
  }).catch(err => {
    onError(err);
  })

}


return "";