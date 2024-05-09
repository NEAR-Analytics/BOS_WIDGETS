const { sender, amount, inputToken, actionOn, cb, config, chainId } = props;

const fromL2toL1 = chainId === config.chains.l2.id;

const fromL1toL2 = chainId === config.chains.l1.id;

const l2NodeUrl = "https://arb1.arbitrum.io/rpc";

const l1NodeUrl = "https://rpc.ankr.com/eth";

const l2Provider = new ethers.providers.JsonRpcProvider(l2NodeUrl);

const l1Provider = new ethers.providers.JsonRpcProvider(l1NodeUrl);

l2Provider.getGasPrice().then((res) => {
  State.update({ gasPrice: res.toString() });
});

if (!actionOn) {
  State.update({
    actionOn: false,
  });

  return "";
}

const successCb = ({ from, to, type, amount, symbol, tx }) => {
  const currenList = Storage.get("arb-bridge-pending-list-withdraw") || [];

  const newList = [
    ...currenList,
    {
      from,
      to,
      type,
      amount,
      symbol,
      tx,
    },
  ];

  Storage.set("arb-bridge-pending-list-withdraw", newList);
};

const l2BridgeRouterAddress = config.bridges.l2GatewayRouter;

const l2BridgeAddressAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_l1Token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "outboundTransfer",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

const l1BridgeRouterAddress = config.bridges.l1GatewayRouter;

const l1BridgeAddressAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxGas",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_gasPriceBid",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "outboundTransfer",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

const depositETHAbi = [
  {
    inputs: [],
    name: "depositEth",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

const withdrawETHAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "destination",
        type: "address",
      },
    ],
    name: "withdrawEth",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

const signer = Ethers.provider().getSigner();

const options = {
  gasLimit: 300000,
};

const rawAmount = Big(amount)
  .times(Big(10).pow(inputToken.decimals))
  .toFixed(0);

const handleWithdraw = () => {
  const L2BridgeContract = new ethers.Contract(
    l2BridgeRouterAddress,
    l2BridgeAddressAbi,
    signer
  );

  return L2BridgeContract["outboundTransfer(address,address,uint256,bytes)"](
    inputToken.addressL1,
    sender,
    Big(amount).times(Big(10).pow(inputToken.decimals)).toFixed(0),
    "0x"
  )
    .then((tx) => {
      return tx.wait();
    })
    .then((receipt) => {
      const { status, transactionHash } = receipt;

      if (status === 1) {
        successCb({
          from: config.chains.l2.name,
          to: config.chains.l1.name,
          amount: amount,
          symbol: inputToken.symbol,
          type: "Withdraw",
          tx: transactionHash,
        });
      }
    })
    .finally(() => cb());
};

const handleWithdrawETH = () => {
  const withdrawETHContract = new ethers.Contract(
    config.ethBridges.arb_sys,
    withdrawETHAbi,
    signer
  );

  return withdrawETHContract
    .withdrawEth(sender, {
      ...options,
      value: rawAmount,
    })
    .then((tx) => {
      return tx.wait();
    })
    .then((receipt) => {
      const { status, transactionHash } = receipt;

      if (status === 1) {
        successCb({
          from: config.chains.l2.name,
          to: config.chains.l1.name,
          amount: amount,
          symbol: inputToken.symbol,
          type: "Withdraw",
          tx: transactionHash,
        });
      }
    })
    .finally(() => cb());
};

const handleDepositETH = () => {
  const depositETHContract = new ethers.Contract(
    config.ethBridges.inbox,
    depositETHAbi,
    signer
  );

  return depositETHContract
    .depositEth({
      ...options,
      value: rawAmount,
    })
    .finally(() => cb());
};

const estimatesMaxSubmissionCost = (callData) => {
  const inboxAddress = config.ethBridges.inbox;
  const abi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "dataLength",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "baseFee",
          type: "uint256",
        },
      ],
      name: "calculateRetryableSubmissionFee",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const contract = new ethers.Contract(inboxAddress, abi, l1Provider);

  const dataSize = ethers.utils.hexDataLength(callData);

  return l1Provider
    .getBlock("latest")
    .then((block) => {
      const baseFeePerGas = block.baseFeePerGas;
      return contract.calculateRetryableSubmissionFee(
        dataSize,
        baseFeePerGas.toString()
      );
    })
    .then((fee) => {
      const maxSubmissionCost = fee.toString();
      return maxSubmissionCost;
    });
};

const handleDeposit = () => {
  const iface = new ethers.utils.Interface(l1BridgeAddressAbi);

  const L1BridgeContract = new ethers.Contract(
    l1BridgeRouterAddress,
    l1BridgeAddressAbi,
    signer
  );

  const _token = inputToken.addressL1;

  const _to = sender;

  const _amount = rawAmount;

  const _maxGas = 2500000;

  const _gasPriceBid = Big(state.gasPrice).times(Big(1.05)).toFixed(0);

  const _data = ethers.utils.defaultAbiCoder.encode(
    ["uint256", "bytes"],
    [1, "0x"]
  );

  const callData = iface.encodeFunctionData("outboundTransfer", [
    _token,
    _to,
    _amount,
    _maxGas,
    _gasPriceBid,
    _data,
  ]);

  estimatesMaxSubmissionCost(callData).then((maxSubmissionCost) => {
    const _data = ethers.utils.defaultAbiCoder.encode(
      ["uint256", "bytes"],
      [maxSubmissionCost, "0x"]
    );
    return L1BridgeContract.outboundTransfer(
      _token,
      _to,
      _amount,
      _maxGas,
      _gasPriceBid,
      _data,
      {
        ...options,
        value: Big(_maxGas)
          .times(_gasPriceBid)
          .plus(Big(maxSubmissionCost).times(1.05).toFixed(0))
          .toFixed(0),
      }
    ).finally(() => cb());
  });
};

if (state.actionOn === actionOn || !state.gasPrice) {
  return "";
} else {
  State.update({
    actionOn,
  });

  if (fromL2toL1) {
    if (inputToken.addressL2 === config.eth.addressL2) {
      handleWithdrawETH();
    } else {
      handleWithdraw();
    }
  }

  if (fromL1toL2) {
    if (inputToken.addressL1 === config.eth.addressL1) {
      handleDepositETH();
    } else {
      handleDeposit();
    }
  }
}

return "";
