const abi = [
  {
    inputs: [
      { internalType: "address", name: "_asset", type: "address" },
      { internalType: "uint256", name: "_assetAmount", type: "uint256" },
      {
        internalType: "uint256",
        name: "_debtTokenAmount",
        type: "uint256",
      },
      { internalType: "address", name: "_upperHint", type: "address" },
      { internalType: "address", name: "_lowerHint", type: "address" },
    ],
    name: "openVessel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const LENDING_ABI = [
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "bool", name: "useAsCollateral", type: "bool" },
    ],
    name: "setUserUseReserveAsCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const wethGateWayAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "weth",
        type: "address",
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
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "lendingPool",
        type: "address",
      },
    ],
    name: "authorizeLendingPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "lendingPool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "interesRateMode",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "referralCode",
        type: "uint16",
      },
    ],
    name: "borrowETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "lendingPool",
        type: "address",
      },
      {
        internalType: "address",
        name: "onBehalfOf",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "referralCode",
        type: "uint16",
      },
    ],
    name: "depositETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "emergencyEtherTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "emergencyTokenTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getWETHAddress",
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
    inputs: [],
    name: "owner",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "lendingPool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rateMode",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "onBehalfOf",
        type: "address",
      },
    ],
    name: "repayETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "lendingPool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "withdrawETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const {
  update,
  data,
  amount,
  _assetAmount,
  _debtTokenAmount,
  _upperHint,
  _lowerHint,
  account,
  onLoad,
} = props;

useEffect(() => {
  if (!update || !data.actionText || !data.underlyingToken) return;
  let params = [];
  let method = "";
  let contract = null;
  const isETH = data.underlyingToken.address === "native";
  let options = {
    gasLimit: 4000000,
  };
  // if (["Deposit", "Repay", "Withdraw", "Borrow"].includes(data.actionText)) {
  //   if (
  //     !amount ||
  //     !data.actionText ||
  //     !data.config.wethGateway ||
  //     !data.config.lendingPoolAddress ||
  //     !account ||
  //     !data.underlyingToken ||
  //     !data.variableDebtTokenAddress
  //   ) {
  //     return;
  //   }
  //   const addressTo = isETH
  //     ? data.config.lendingPoolAddress
  //     : data.underlyingToken.address;
  //   const parsedAmount = ethers.utils.parseUnits(
  //     amount,
  //     data.underlyingToken.decimals
  //   );
  //   options = {
  //     value:
  //       isETH && ["Repay", "Deposit"].includes(data.actionText)
  //         ? parsedAmount
  //         : 0,
  //     gasLimit: 4000000,
  //   };
  //   if (data.actionText === "Deposit") {
  //     method = isETH ? "depositETH" : "deposit";
  //     params = isETH
  //       ? [addressTo, account, 0]
  //       : [addressTo, parsedAmount, account, 0];
  //   }
  //   if (data.actionText === "Withdraw") {
  //     method = isETH ? "withdrawETH" : "withdraw";
  //     params = [addressTo, parsedAmount, account];
  //   }
  //   if (data.actionText === "Borrow") {
  //     method = isETH ? "borrowETH" : "borrow";
  //     params = isETH
  //       ? [addressTo, parsedAmount, 2, 0]
  //       : [addressTo, parsedAmount, 2, 0, account];
  //   }
  //   if (data.actionText === "Repay") {
  //     method = isETH ? "repayETH" : "repay";
  //     params = [addressTo, parsedAmount, 2, account];
  //   }
  //   contract = new ethers.Contract(
  //     isETH ? data.config.wethGateway : data.config.lendingPoolAddress,
  //     isETH ? wethGateWayAbi : abi,
  //     Ethers.provider().getSigner()
  //   );
  // }
  // if (data.actionText.includes("Collateral")) {
  //   if (!data.config.lendingPoolAddress || !data.underlyingToken) return;
  //   const isEnter = data.actionText === "Enable as Collateral";
  //   contract = new ethers.Contract(
  //     data.config.lendingPoolAddress,
  //     LENDING_ABI,
  //     Ethers.provider().getSigner()
  //   );
  //   method = "setUserUseReserveAsCollateral";
  //   params = [data.underlyingToken.address, isEnter];
  // }
  // if (!contract) return;
  contract = new ethers.Contract(
    data.BorrowerOperations,
    abi,
    Ethers.provider().getSigner()
  );
  params = [
    data.underlyingToken.address,
    ethers.utils.parseUnits(_assetAmount),
    ethers.utils.parseUnits(_debtTokenAmount),
    _upperHint,
    _lowerHint,
  ];
  console.log("HANDLER: ", contract, method, params, options, isETH);
  const createTx = (gas) => {
    const _gas = gas ? Big(gas.toString()).mul(1.2).toFixed(0) : 4000000;
    contract.populateTransaction[method](...params, {
      ...options,
      gasLimit: _gas,
    })
      .then((res) => {
        console.log(444444, res);
        onLoad({
          gas: _gas,
          unsignedTx: res,
          isError: false,
        });
      })
      .catch((err) => {
        console.log(55555, res);
        onLoad({});
      });
  };
  contract.estimateGas["openVessel"](...params, options)
    .then((gas) => {
      createTx(gas);
    })
    .catch((err) => {
      console.log("estimateGas", err);
      createTx();
    });
}, [update]);

return "";
