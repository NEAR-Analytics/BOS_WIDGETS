const {
  token,
  config,
  sender,
  loadTransder,
  amountIn,
  forceReload,
  sourceBridge,
  callBack,
} = props;

const qs = `${token.ethereum_address}-${token.near_address}-${sourceBridge}-${amountIn}-${forceReload}`;

if (qs !== state.cacheQs) {
  State.update({
    cacheQs: qs,
  });
} else {
  return "";
}

const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};

const lockerAbi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "nearTokenFactory",
        type: "bytes",
      },
      {
        internalType: "contract INearProver",
        name: "prover",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "minBlockAcceptanceHeight",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "pausedFlags",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "accountId",
        type: "string",
      },
    ],
    name: "Locked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "Unlocked",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "adminDelegatecall",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "flags",
        type: "uint256",
      },
    ],
    name: "adminPause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminReceiveEth",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "destination",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "adminSendEth",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "key",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "adminSstore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "destination",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "adminTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "ethToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "accountId",
        type: "string",
      },
    ],
    name: "lockToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minBlockAcceptanceHeight_",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nearTokenFactory_",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
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
  {
    inputs: [],
    name: "prover_",
    outputs: [
      {
        internalType: "contract INearProver",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "tokenFallback",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "proofData",
        type: "bytes",
      },
      {
        internalType: "uint64",
        name: "proofBlockHeight",
        type: "uint64",
      },
    ],
    name: "unlockToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "usedProofs_",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const signer = Ethers.provider().getSigner();

const eNearAbi = [
  {
    inputs: [
      { internalType: "string", name: "_tokenName", type: "string" },
      { internalType: "string", name: "_tokenSymbol", type: "string" },
      { internalType: "bytes", name: "_nearConnector", type: "bytes" },
      {
        internalType: "contract INearProver",
        name: "_prover",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "_minBlockAcceptanceHeight",
        type: "uint64",
      },
      { internalType: "address", name: "_admin", type: "address" },
      { internalType: "uint256", name: "_pausedFlags", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "_receiptId",
        type: "bytes32",
      },
    ],
    name: "ConsumedProof",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "NearToEthTransferFinalised",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "accountId",
        type: "string",
      },
    ],
    name: "TransferToNearInitiated",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "target", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "adminDelegatecall",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "flags", type: "uint256" }],
    name: "adminPause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminReceiveEth",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "destination", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "adminSendEth",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "key", type: "uint256" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "adminSstore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "proofData", type: "bytes" },
      { internalType: "uint64", name: "proofBlockHeight", type: "uint64" },
    ],
    name: "finaliseNearToEthTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minBlockAcceptanceHeight",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nearConnector",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "prover",
    outputs: [
      { internalType: "contract INearProver", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      {
        internalType: "string",
        name: "_nearReceiverAccountId",
        type: "string",
      },
    ],
    name: "transferToNear",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "usedProofs",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];

const custodianAbi = [
  {
    inputs: [
      { internalType: "bytes", name: "nearEvm", type: "bytes" },
      { internalType: "contract INearProver", name: "prover", type: "address" },
      {
        internalType: "uint64",
        name: "minBlockAcceptanceHeight",
        type: "uint64",
      },
      { internalType: "address", name: "_admin", type: "address" },
      { internalType: "uint256", name: "pausedFlags", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "recipient",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "Deposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "target", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "adminDelegatecall",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "flags", type: "uint256" }],
    name: "adminPause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminReceiveEth",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "destination", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "adminSendEth",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "key", type: "uint256" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "adminSstore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "key", type: "uint256" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "mask", type: "uint256" },
    ],
    name: "adminSstoreWithMask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "ethRecipientOnNear", type: "string" },
      { internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "depositToEVM",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "nearRecipientAccountId",
        type: "string",
      },
      { internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "depositToNear",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "minBlockAcceptanceHeight_",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nearProofProducerAccount_",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "prover_",
    outputs: [
      { internalType: "contract INearProver", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "usedEvents_",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "proofData", type: "bytes" },
      { internalType: "uint64", name: "proofBlockHeight", type: "uint64" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const ethLockerContract = new ethers.Contract(
  config.ethLockerAddress,
  lockerAbi,
  signer
);

const eNearContract = new ethers.Contract(
  config.enearAddress,
  eNearAbi,
  signer
);

const etherCustodianContract = new ethers.Contract(
  config.etherCustodianAddress,
  custodianAbi,
  signer
);

const queryString = `${token.ethereum_address}-${token.near_address}-${isApprovedOut}-${forceReload}-${amountIn}`;

if (queryString !== state.cacheString) {
  State.update({
    cacheString: queryString,
  });
} else {
  return "";
}

// near to eth
const sendNearToEthereum = () => {
  const recipient = sender.replace("0x", "");
  const tx = [
    {
      contractName: "e-near.near",
      methodName: "migrate_to_ethereum",
      gas: "300" + "0".repeat(12),
      deposit: expandToken(amountIn, token.decimals).toFixed(),
      args: {
        eth_recipient: recipient,
      },
    },
  ];

  Near.call(tx);
};

// near to near
const sendNearToNear = () => {
  return eNearContract
    .transferToNear(expandToken(amountIn, token.decimals).toFixed(), accountId)
    .then((res) => {
      callBack && callBack();
    });
};

const sendEthToNear = () => {
  return etherCustodianContract
    .depositToNear(accountId, 0, {
      value: expandToken(amountIn, token.decimals).toFixed(),
    })
    .then(() => {
      callBack && callBack();
    });
};

const sendEthToEthereum = () => {
  const recipient_id = ethers.utils.arrayify(ethers.utils.getAddress(sender));
  const amount = expandToken(amountIn, token.decimals).toFixed();

  const args = {
    recipient_id,
    amount,
  };

  const bufferArgs = Buffer.from(JSON.stringify(args));

  const tx = [
    {
      contractName: "aurora",
      methodName: "withdraw",
      args: bufferArgs,
      deposit: 1,
      gas: "300" + "0".repeat(12),
    },
  ];

  Near.call(tx);
};

// nep141 to eth
const sendNep141toEth = () => {
  const tx = [
    {
      contractName: token.near_address,
      methodName: "withdraw",
      gas: "300" + "0".repeat(12),

      deposit: 1,
      args: {
        amount: expandToken(amountIn, token.decimals).toFixed(),
        recipient: sender.replace("0x", ""),
      },
    },
  ];

  Near.call(tx);
};

// erc20 to near
const sendERC20toNear = () => {
  ethLockerContract
    .lockToken(
      token.ethereum_address,
      expandToken(amountIn, token.decimals).toFixed(),
      accountId
    )
    .then(() => {
      callBack && callBack();
    });
};

loadTransder({
  transfer: sendEthToEthereum,
});
