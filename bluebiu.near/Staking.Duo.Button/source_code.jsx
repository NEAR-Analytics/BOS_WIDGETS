// basic params
const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

// deposit functions
const DEPOSIT_POOL_ABI = [
  // 1: Boost Points | 4: Points & Fixed Yield
  {
    // deposit ETH
    ETH: {
      inputs: [
        { internalType: "address", name: "exchange", type: "address" },
        { internalType: "uint256", name: "amountIn", type: "uint256" },
        { internalType: "uint256", name: "amountOutMin", type: "uint256" },
        { internalType: "uint256", name: "minLockedYield", type: "uint256" },
        { internalType: "bytes", name: "data", type: "bytes" },
      ],
      name: "mintFixedRateEth",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    // deposit WETH
    WETH: {
      inputs: [
        { internalType: "address", name: "exchange", type: "address" },
        { internalType: "address", name: "token", type: "address" },
        { internalType: "uint256", name: "amountIn", type: "uint256" },
        { internalType: "uint256", name: "amountOutMin", type: "uint256" },
        { internalType: "uint256", name: "minLockedYield", type: "uint256" },
        { internalType: "bytes", name: "data", type: "bytes" },
      ],
      name: "mintFixedRate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    // deposit USDB
    USDB: {
      inputs: [
        { internalType: "address", name: "exchange", type: "address" },
        { internalType: "address", name: "token", type: "address" },
        { internalType: "uint256", name: "amountIn", type: "uint256" },
        { internalType: "uint256", name: "amountOutMin", type: "uint256" },
        { internalType: "uint256", name: "minLockedYield", type: "uint256" },
        { internalType: "bytes", name: "data", type: "bytes" },
      ],
      name: "mintFixedRate",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  },
  // 2: Boost Yield | 3: Points & Yield
  {
    // deposit ETH
    ETH: {
      inputs: [
        { internalType: "address", name: "exchange", type: "address" },
        { internalType: "uint256", name: "amountIn", type: "uint256" },
        { internalType: "uint256", name: "amountOutMin", type: "uint256" },
        { internalType: "bytes", name: "data", type: "bytes" },
      ],
      name: "mintVariableRateEth",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    // deposit WETH
    WETH: {
      inputs: [
        { internalType: "address", name: "exchange", type: "address" },
        { internalType: "address", name: "token", type: "address" },
        { internalType: "uint256", name: "amountIn", type: "uint256" },
        { internalType: "uint256", name: "amountOutMin", type: "uint256" },
        { internalType: "bytes", name: "data", type: "bytes" },
      ],
      name: "mintVariableRate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    // deposit USDB
    USDB: {
      inputs: [
        { internalType: "address", name: "exchange", type: "address" },
        { internalType: "address", name: "token", type: "address" },
        { internalType: "uint256", name: "amountIn", type: "uint256" },
        { internalType: "uint256", name: "amountOutMin", type: "uint256" },
        { internalType: "bytes", name: "data", type: "bytes" },
      ],
      name: "mintVariableRate",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  },
];

// withdraw params
const WITHDRAW_ABI = [
  // 1: Boost Points | 4: Points & Fixed Yield
  {
    // withdraw ETH
    ETH: {
      inputs: [
        { internalType: "address", name: "fixedRate", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "burnFixedRate",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    // withdraw USDB
    USDB: {
      inputs: [
        { internalType: "address", name: "fixedRate", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "burnFixedRate",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  },
  // 2: Boost Yield | 3: Points & Yield
  {
    // withdraw ETH
    ETH: {
      inputs: [
        { internalType: "address", name: "variableRate", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "uint256", name: "minYield", type: "uint256" },
      ],
      name: "burnVariableRate",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    // withdraw USDB
    USDB: {
      inputs: [
        { internalType: "address", name: "variableRate", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "uint256", name: "minYield", type: "uint256" },
      ],
      name: "burnVariableRate",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  },
];

// button styles
const Button = styled.button`
  background: var(--switch-color);
  color: var(--button-text-color);

  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  height: 56px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.5s;
  margin-top: 20px;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
  }
`;

const {
  account,
  actionText,
  amount,
  data,
  chainId,
  onSuccess,
  toast,
  addAction,
  loading: estimating,
  gas,
  dexConfig,
  stakeToken,
  onSwitchChain,
  curPointsAndYield,
  curPointsAndYieldItem,
  curToken,
  curReceivedToken,
} = props;

const { ExchangeToken, WithdrawalContract, DepositPool } = dexConfig;
const { parseUnits, formatUnits } = ethers.utils;

let tokenSymbol;
let tokenDecimals;
let tokenAddr;
let spender;
if (actionText === "Stake") {
  tokenSymbol = stakeToken.symbol;
  tokenDecimals = stakeToken.decimals;
  tokenAddr = stakeToken.address;
  spender = curPointsAndYieldItem[curToken];
}

if (!actionText) return;

if (!amount) {
  return (
    <Button disabled={true} className={actionText.toLowerCase()}>
      Enter An Amount
    </Button>
  );
}

useEffect(() => {
  State.update({
    approving: false,
    isApproved: false,
  });
}, []);

function getAllowance() {
  State.update({
    pending: true,
  });
  const TokenContract = new ethers.Contract(
    tokenAddr,
    ERC20_ABI,
    Ethers.provider().getSigner()
  );
  TokenContract.allowance(account, spender)
    .then((allowanceRaw) => {
      State.update({
        pending: false,
        isApproved: !Big(formatUnits(allowanceRaw, tokenDecimals)).lt(
          amount || "0"
        ),
      });
    })
    .catch((err) => {
      State.update({
        pending: false,
      });
    });
}

useEffect(() => {
  if (["Stake"].includes(actionText) && !stakeToken.isNative) {
    getAllowance();
  } else {
    State.update({
      isApproved: true,
    });
  }
}, [amount, actionText]);

if (!state.isApproved) {
  function handleApprove() {
    const toastId = toast?.loading({
      title: `Approve ${Big(amount).toFixed(2)} ${tokenSymbol}`,
    });
    State.update({
      approving: true,
    });

    const TokenContract = new ethers.Contract(
      tokenAddr,
      ERC20_ABI,
      Ethers.provider().getSigner()
    );
    TokenContract.approve(spender, parseUnits(amount, tokenDecimals))
      .then((tx) => {
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            toast?.dismiss(toastId);
            if (status !== 1) throw new Error("");
            State.update({
              isApproved: true,
              approving: false,
            });
            toast?.success({
              title: "Approve Successfully!",
              text: `Approve ${Big(amount).toFixed(2)} ${tokenSymbol}`,
              tx: transactionHash,
              chainId,
            });
          })
          .catch((err) => {
            State.update({
              isApproved: false,
              approving: false,
            });
          });
      })
      .catch((err) => {
        State.update({
          isApproved: false,
          approving: false,
        });
        toast?.dismiss(toastId);
        toast?.fail({
          title: "Approve Failed!",
          text: err?.message?.includes("user rejected transaction")
            ? "User rejected transaction"
            : `Approve ${Big(amount).toFixed(2)} ${tokenSymbol}`,
        });
        onLoad?.(false);
      });
  }
  return (
    <Button onClick={handleApprove} disabled={state.approving}>
      {state.approving ? (
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 16,
          }}
        />
      ) : (
        "Approve"
      )}
    </Button>
  );
}

// params formatter
function formatAddAction(actionText, _amount, status, transactionHash) {
  addAction?.({
    type: "Staking",
    action: actionText,
    token: {
      symbol: tokenSymbol,
    },
    amount: _amount,
    template: props.name,
    add: false,
    status,
    transactionHash,
  });
}

// stake event
function handleDepositErc20() {
  State.update({
    pending: true,
  });

  let DEPOSIT_POOL_ABI_LATEST;
  let params;

  // DEPOSIT_POOL_ABI
  // ETH: deposit ETH
  // WETH: deposit WETH
  // USDB: deposit USDB

  // Boost Points, Points & Fixed Yield
  if ([1, 4].includes(curPointsAndYield)) {
    DEPOSIT_POOL_ABI_LATEST = DEPOSIT_POOL_ABI[0][curToken];
    params = [
      // exchange
      DepositPool,
      // token: tokenAddr
      tokenAddr,
      // amountIn
      parseUnits(amount, tokenDecimals),
      // amountOutMin
      parseUnits('0', tokenDecimals),
      // minLockedYield
      parseUnits('0', tokenDecimals),
      // data
      '0x',
    ];
    if (curToken === 'ETH') {
      // delete token
      params.splice(1, 1);
    }
  }
  // 2: Boost Yield | 3: Points & Yield
  else {
    DEPOSIT_POOL_ABI_LATEST = DEPOSIT_POOL_ABI[1][curToken];
    params = [
      // exchange
      DepositPool,
      // token: tokenAddr
      tokenAddr,
      // amountIn
      parseUnits(amount, tokenDecimals),
      // amountOutMin
      parseUnits('0', tokenDecimals),
      // data
      '0x',
    ];
    if (curToken === 'ETH') {
      // delete token
      params.splice(1, 1);
    }
  }

  const contract = new ethers.Contract(
    curPointsAndYieldItem[curToken],
    [
      DEPOSIT_POOL_ABI_LATEST,
      {
        ...DEPOSIT_POOL_ABI_LATEST,
        name: "deposit",
        constant: false,
      }
    ],
    Ethers.provider().getSigner()
  );
  const getTx = (gas) => {
    const contractOption = {
      gasLimit: gas || 4000000,
    }
    if (DEPOSIT_POOL_ABI_LATEST.stateMutability === 'payable') {
      contractOption.value =  parseUnits(amount, tokenDecimals);
    }
    contract[DEPOSIT_POOL_ABI_LATEST.name](...params, contractOption)
      .then((tx) => {
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            toast?.dismiss(toastId);
            if (status !== 1) throw new Error("");
            State.update({
              pending: false,
            });
            onSuccess();
            formatAddAction(actionText, amount, status, transactionHash);
            toast?.success({
              title: `${actionText} Successfully!`,
              text: `${actionText} ${Big(amount).toFixed(2)} ${tokenSymbol}`,
              tx: transactionHash,
              chainId,
            });
          })
          .catch((err) => {
            console.log('tx error: ', err);
            State.update({
              pending: false,
            });
            toast?.dismiss(toastId);
            toast?.fail({
              title: `${actionText} Failed!`,
              text: err?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : ``,
            });
          });
      })
      .catch((err) => {
        console.log('contract fn error: ', err);
        State.update({
          pending: false,
        });
        toast?.dismiss(toastId);
        toast?.fail({
          title: `${actionText} Failed!`,
          text: err?.message?.includes("user rejected transaction")
            ? "User rejected transaction"
            : ``,
        });
      });
  };
  // get gas
  const estimateGas = () => {
    contract.estimateGas.deposit(
      ...params,
      { value: parseUnits(amount, tokenDecimals), gasLimit: 1 }
    ).then((gas) => {
      getTx(gas);
    }).catch((err) => {
      console.log('get gas failed: ', err);
      getTx();
    });
  };
  estimateGas();
}

// un-stake event
function handleWithdraw() {
  State.update({
    pending: true,
  });

  let WITHDRAW_ABI_LATEST;
  let params;

  // WITHDRAW_ABI
  // ETH: withdraw ETH
  // USDB: withdraw USDB

  // Boost Points, Points & Fixed Yield
  if ([1, 4].includes(curPointsAndYield)) {
    WITHDRAW_ABI_LATEST = WITHDRAW_ABI[0][stakeToken.symbol];
    params = [
      // fixedRate
      WithdrawalContract,
      // amount
      parseUnits(amount, tokenDecimals),
    ];
  }
  // 2: Boost Yield | 3: Points & Yield
  else {
    WITHDRAW_ABI_LATEST = WITHDRAW_ABI[1][stakeToken.symbol];
    params = [
      // variableRate
      WithdrawalContract,
      // amount
      parseUnits(amount, tokenDecimals),
      // minYield
      parseUnits('0', tokenDecimals),
    ];
  }

  const contract = new ethers.Contract(
    curPointsAndYieldItem[stakeToken.symbol],
    [
      WITHDRAW_ABI_LATEST,
      {
        ...WITHDRAW_ABI_LATEST,
        name: "withdraw",
        constant: false,
      }
    ],
    Ethers.provider().getSigner()
  );

  const getTx = (gas) => {
    contract[WITHDRAW_ABI_LATEST.name](
      ...params,
      {
        gasLimit: gas || 4000000,
        value: parseUnits(amount, tokenDecimals),
      }
    )
      .then((tx) => {
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            toast?.dismiss(toastId);
            if (status !== 1) throw new Error("");
            State.update({
              pending: false,
            });
            onSuccess();
            formatAddAction(actionText, amount, status, transactionHash);
            toast?.success({
              title: `${actionText} Successfully!`,
              text: `${actionText} ${Big(amount).toFixed(2)} ${tokenSymbol}`,
              tx: transactionHash,
              chainId,
            });
          })
          .catch((err) => {
            console.log('tx error: ', err);
            State.update({
              pending: false,
            });
            toast?.dismiss(toastId);
            toast?.fail({
              title: `${actionText} Failed!`,
              text: err?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : ``,
            });
          });
      })
      .catch((err) => {
        console.log('contract error: ', err);
        State.update({
          pending: false,
        });
        toast?.dismiss(toastId);
        toast?.fail({
          title: `${actionText} Failed!`,
          text: err?.message?.includes("user rejected transaction")
            ? "User rejected transaction"
            : ``,
        });
      });
  };

  // get gas
  const estimateGas = () => {
    contract.estimateGas.withdraw(
      ...params,
      { value: parseUnits(amount, tokenDecimals) }
    ).then((gas) => {
      getTx(gas);
    }).catch((err) => {
      console.log('get gas failed: ', err);
      getTx();
    });
  };
  estimateGas();
}

// btn click event
function handleClick() {
  if (actionText === "Stake") {
    handleDepositErc20();
  }
  if (actionText === "Unstake") {
    handleWithdraw();
  }
}

// btn shown text
function getRealActionText() {
  if (actionText === "Stake") {
    return `Get ${curReceivedToken.symbol}, Earn ${curPointsAndYieldItem.label}`;
  }
  if (actionText === "Unstake") {
    return actionText;
  }
}

return (
  <Button
    disabled={state.pending}
    className={actionText.toLowerCase()}
    onClick={handleClick}
  >
    {state.pending ? (
      <Widget
        src="bluebiu.near/widget/0vix.LendingLoadingIcon"
        props={{
          size: 16,
        }}
      />
    ) : getRealActionText()}
  </Button>
);
