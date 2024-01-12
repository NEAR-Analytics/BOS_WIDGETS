const abi = [
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "onBehalfOf", type: "address" },
      { internalType: "uint16", name: "referralCode", type: "uint16" },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "withdraw",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "interestRateMode", type: "uint256" },
      { internalType: "uint16", name: "referralCode", type: "uint16" },
      { internalType: "address", name: "onBehalfOf", type: "address" },
    ],
    name: "borrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "rateMode", type: "uint256" },
      { internalType: "address", name: "onBehalfOf", type: "address" },
    ],
    name: "repay",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
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
  market,
  wethAddress,
  lendingPoolAddress,
  wethGateway,
  actionText,
  amount,
  loading,
  onSuccess,
  onError,
  account,
} = props;

useEffect(() => {
  if (
    !loading ||
    !wethGateway ||
    !lendingPoolAddress ||
    !account ||
    !market.underlyingToken ||
    !market.variableDebtTokenAddress
  ) {
    return;
  }

  const isETH = market.underlyingToken.address === "native";

  const addressTo = isETH ? lendingPoolAddress : market.underlyingToken.address;

  const contract = new ethers.Contract(
    isETH ? wethGateway : lendingPoolAddress,
    isETH ? wethGateWayAbi : abi,
    Ethers.provider().getSigner()
  );

  const parsedAmount = ethers.utils.parseUnits(
    amount,
    market.underlyingToken.decimals
  );

  const options = {
    value:
      isETH && (actionText === "Deposit" || actionText === "Repay")
        ? parsedAmount
        : 0,
    gasLimit: 4000000,
  };

  const deposit = () => {
    const method = isETH ? "depositETH" : "deposit";

    const inputs = isETH
      ? [addressTo, account, 0]
      : [addressTo, parsedAmount, account, 0];

    contract.estimateGas[method](...inputs, options)
      .then((gas) => {
        console.log("gas", gas);
        contract[method](...inputs, { ...options, gasLimit: gas })
          .then((tx) => {
            tx.wait()
              .then((res) => {
                onSuccess(res);
              })
              .catch((err) => {
                onError(tx);
              });
          })
          .catch((err) => {
            onError(err);
          });
      })
      .catch((err) => {
        onError(err);
      });
  };

  const withdraw = () => {
    const method = isETH ? "withdrawETH" : "withdraw";

    contract.estimateGas[method](addressTo, parsedAmount, account, options)
      .then((gas) => {
        console.log("gas", gas);
        contract[method](addressTo, parsedAmount, account, {
          ...options,
          gasLimit: gas,
        })
          .then((tx) => {
            tx.wait()
              .then((res) => {
                onSuccess(res);
              })
              .catch((err) => {
                onError(tx);
              });
          })
          .catch((err) => {
            onError(err);
          });
      })
      .catch((err) => {
        onError(err);
      });
  };

  const borrow = () => {
    if (isETH) {
      checkDebtETHAllowanceAndBorrow();
      return;
    }

    const method = "borrow";

    const inputs = [addressTo, parsedAmount, 2, 0, account];

    contract.estimateGas[method](...inputs, options)
      .then((gas) => {
        console.log("gas", gas);
        contract[method](...inputs, {
          ...options,
          gasLimit: gas,
        })
          .then((tx) => {
            tx.wait()
              .then((res) => {
                onSuccess(res);
              })
              .catch((err) => {
                onError(tx);
              });
          })
          .catch((err) => {
            onError(err);
          });
      })
      .catch((err) => {
        onError(err);
      });
  };

  const borrowETH = () => {
    const method = "borrowETH";

    const inputs = [addressTo, parsedAmount, 2, 0];

    contract.estimateGas[method](...inputs, options)
      .then((gas) => {
        console.log("gas", gas);
        contract[method](...inputs, {
          ...options,
          gasLimit: gas,
        })
          .then((tx) => {
            tx.wait()
              .then((res) => {
                onSuccess(res);
              })
              .catch((err) => {
                onError(tx);
              });
          })
          .catch((err) => {
            onError(err);
          });
      })
      .catch((err) => {
        onError(err);
      });
  };
  const checkDebtETHAllowanceAndBorrow = () => {
    const debtTokenAbi = [
      {
        inputs: [
          { internalType: "address", name: "delegatee", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "approveDelegation",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "fromUser", type: "address" },
          { internalType: "address", name: "toUser", type: "address" },
        ],
        name: "borrowAllowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ];

    const deptTokenContract = new ethers.Contract(
      market.variableDebtTokenAddress,
      debtTokenAbi,
      Ethers.provider().getSigner()
    );

    deptTokenContract
      .borrowAllowance(account, wethGateway)
      .then((res) => {
        if (Big(res.toString()).lt(parsedAmount)) {
          deptTokenContract
            .approveDelegation(wethGateway, parsedAmount)
            .then((tx) => {
              tx.wait().then(() => {
                borrowETH();
              });
            });
        } else {
          borrowETH();
        }
      })
      .catch((err) => {
        onError(err);
      });
  };

  const repay = () => {
    const method = isETH ? "repayETH" : "repay";
    contract.estimateGas[method](addressTo, parsedAmount, 2, account, options)
      .then((gas) => {
        console.log("gas", gas);
        contract[method](addressTo, parsedAmount, 2, account, {
          ...options,
          gasLimit: gas,
        })
          .then((tx) => {
            tx.wait()
              .then((res) => {
                onSuccess(res);
              })
              .catch((err) => {
                onError(tx);
              });
          })
          .catch((err) => {
            onError(err);
          });
      })
      .catch((err) => {
        onError(err);
      });
  };

  if (actionText === "Deposit") {
    deposit();
  }
  if (actionText === "Withdraw") {
    withdraw();
  }
  if (actionText === "Borrow") {
    borrow();
  }
  if (actionText === "Repay") {
    repay();
  }
}, [loading]);

return "";
