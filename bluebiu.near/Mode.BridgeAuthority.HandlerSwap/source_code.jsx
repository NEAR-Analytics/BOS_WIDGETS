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

const MODENET_ID = 34443;
const ETH_WITHDRAWAL_TARGET = `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`;
const L1StandardBridgeAbi = [
  {
    inputs: [
      { internalType: "uint32", name: "_minGasLimit", type: "uint32" },
      { internalType: "bytes", name: "_extraData", type: "bytes" },
    ],
    name: "depositETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_l1Token", type: "address" },
      { internalType: "address", name: "_l2Token", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "uint32", name: "_minGasLimit", type: "uint32" },
      { internalType: "bytes", name: "_extraData", type: "bytes" },
    ],
    name: "depositERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const L2StandardBridgeAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_l2Token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_minGasLimit",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "_extraData",
        type: "bytes",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const nativeTokenL1ToL2 = () => {
  const signer = Ethers.provider().getSigner();
  const gasLimit = 300000;
  const rawAmount = Big(amount)
    .times(Big(10).pow(currency.decimals))
    .toFixed(0);
  const _data = ethers.utils.defaultAbiCoder.encode(
    ["uint256", "bytes"],
    [1, "0x"]
  );
  const iface = new ethers.utils.Interface(L1StandardBridgeAbi);
  const L1BridgeContract = new ethers.Contract(routerEthAddress, iface, signer);

  L1BridgeContract.depositETH(gasLimit, _data, {
    value: rawAmount,
  })
    .then((tx) => {
      tx.wait().then(onSuccess).catch(onError);
    })
    .catch(onError);
};

const erc20TokenL1ToL2 = () => {
  const signer = Ethers.provider().getSigner();
  const gasLimit = 300000;
  const rawAmount = Big(amount)
    .times(Big(10).pow(currency.decimals))
    .toFixed(0);
  const _data = ethers.utils.defaultAbiCoder.encode(
    ["uint256", "bytes"],
    [1, "0x"]
  );
  const iface = new ethers.utils.Interface(L1StandardBridgeAbi);
  const L1BridgeContract = new ethers.Contract(routerAddress, iface, signer);
  L1BridgeContract.depositERC20(
    currency.address,
    currency.targetAddress,
    rawAmount,
    gasLimit,
    _data
  )
    .then((tx) => {
      tx.wait().then(onSuccess).catch(onError);
    })
    .catch(onError);
};

const L2ToL1 = () => {
  const signer = Ethers.provider().getSigner();
  const gasLimit = 0;
  const rawAmount = Big(amount)
    .times(Big(10).pow(currency.decimals))
    .toFixed(0);
  const _data = ethers.utils.defaultAbiCoder.encode(
    ["uint256", "bytes"],
    [1, "0x"]
  );
  const iface = new ethers.utils.Interface(L2StandardBridgeAbi);
  const L2BridgeContract = new ethers.Contract(routerAddress, iface, signer);
  L2BridgeContract.withdraw(
    currency.isNative ? ETH_WITHDRAWAL_TARGET : currency.address,
    rawAmount,
    gasLimit,
    _data, {
      value: currency.isNative ? rawAmount : 0
    }
  )
    .then((tx) => {
      tx.wait().then(onSuccess).catch(onError);
    })
    .catch(onError);
};


if (target.id === MODENET_ID) {
  if (currency.isNative) {
    nativeTokenL1ToL2();
  } else {
    erc20TokenL1ToL2();
  }
} else {
  L2ToL1();
}
return "";