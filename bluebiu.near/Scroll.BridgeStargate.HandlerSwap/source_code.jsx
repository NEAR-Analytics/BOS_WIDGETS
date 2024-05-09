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
} = props;
if (!loading) return "";

const chainIds = {
  1: 101,
  534352: 214
}

let RouterContract
let method
if (target.dstId === 1) {
  RouterContract = new ethers.Contract(
    routerAddress,
    [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_oft",
            "type": "address"
          },
          {
            "internalType": "uint16",
            "name": "_dstChainId",
            "type": "uint16"
          },
          {
            "internalType": "bytes32",
            "name": "_toAddress",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_minAmount",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address payable",
                "name": "refundAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "zroPaymentAddress",
                "type": "address"
              },
              {
                "internalType": "bytes",
                "name": "adapterParams",
                "type": "bytes"
              }
            ],
            "internalType": "struct ICommonOFT.LzCallParams",
            "name": "_callParams",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "callerBps",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "caller",
                "type": "address"
              },
              {
                "internalType": "bytes2",
                "name": "partnerId",
                "type": "bytes2"
              }
            ],
            "internalType": "struct IOFTWrapper.FeeObj",
            "name": "_feeObj",
            "type": "tuple"
          }
        ],
        "name": "sendOFTV2",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
    ],
    Ethers.provider().getSigner()
  );

  method = 'sendOFTV2'
} else {
  RouterEthContract = new ethers.Contract(
    routerAddress,
    [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_proxyOft",
            "type": "address"
          },
          {
            "internalType": "uint16",
            "name": "_dstChainId",
            "type": "uint16"
          },
          {
            "internalType": "bytes32",
            "name": "_toAddress",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_minAmount",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address payable",
                "name": "refundAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "zroPaymentAddress",
                "type": "address"
              },
              {
                "internalType": "bytes",
                "name": "adapterParams",
                "type": "bytes"
              }
            ],
            "internalType": "struct ICommonOFT.LzCallParams",
            "name": "_callParams",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "callerBps",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "caller",
                "type": "address"
              },
              {
                "internalType": "bytes2",
                "name": "partnerId",
                "type": "bytes2"
              }
            ],
            "internalType": "struct IOFTWrapper.FeeObj",
            "name": "_feeObj",
            "type": "tuple"
          }
        ],
        "name": "sendProxyOFTV2",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
    ],
    Ethers.provider().getSigner()
  );
  method = 'sendProxyOFTV2'
}

const minAmount = ethers.utils.parseUnits(
  Big(amount || 0)
    .mul(0.995)
    .toFixed(currency.decimals),
  currency.decimals
);

const _amount = ethers.utils.parseUnits(
  Big(amount || 0)
    .toFixed(currency.decimals),
  currency.decimals
);

const toAddressBytes = ethers.utils.defaultAbiCoder.encode(['address'], [account])
const adapterParams = ethers.utils.solidityPack(["uint16", "uint256"], [1, 999999999999999])

RouterContract[method](
  currency.address,
  chainIds[target.dstId],
  toAddressBytes,
  _amount.toString(),
  '0',
  {
    refundAddress: account,
    zroPaymentAddress: '0x0000000000000000000000000000000000000000',
    adapterParams,
  },
  {
    caller: "0x0000000000000000000000000000000000000000",
    callerBps: 0,
    partnerId: "0x0000",
  },
  {
    gasLimit: 100000,
    // nonce: nonce || undefined,
  }
).then((tx) => {
  tx.wait()
    .then((res) => {
      onSuccess(res);
    })
    .catch((err) => {
      onError(tx);
    });
})
  .catch((err) => {
    console.log('err: ', err)
    onError(err);
  });


return "";
