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
const Button = styled.button`
  background-color: var(--switch-color);
  line-height: 46px;
  height: 46px;
  border-radius: 10px;
  color: var(--button-text-color);
  font-size: 18px;
  font-weight: 500;
  border: none;
  width: 100%;
  transition: 0.5s;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
  }
  &.borrow {
    background-color: var(--repay-border-color);
    border: 1px solid var(--repay-border-color);
  }
  &.repay {
    background-color: var(--repay-bg-hover-color);
    border: 1px solid var(--repay-border-color);
  }
  &.close {
    width: 408px;
    background-color: var(--repay-border-color);
    border: 1px solid var(--repay-border-color);
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
  isBigerThanBalance,
} = props;

const { parseUnits, formatUnits } = ethers.utils;

let curToken;
if (["Deposit", "Withdraw", "Repay"].includes(actionText)) {
  curToken = "TOKEN_A";
}
if (["Borrow", "Add Collateral", "Remove Collateral"].includes(actionText)) {
  curToken = "TOKEN_B";
}
const tokenSymbol = data[curToken].symbol;
const tokenDecimals = data[curToken].decimals;
const tokenAddr = data[curToken].address;
const spender = data.POOL_MANAGER;

if (!actionText) return;

if (!amount) {
  return (
    <Button disabled={true} className={actionText.toLowerCase()}>
      Enter An Amount
    </Button>
  );
}

if (isBigerThanBalance) {
  return (
    <Button disabled={true} className={actionText.toLowerCase()}>
      Insufficient Balance
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
      console.log("ALLOWANCE:", allowanceRaw.toString());
      State.update({
        pending: false,
        isApproved: !Big(formatUnits(allowanceRaw, tokenDecimals)).lt(
          amount || "0"
        ),
      });
    })
    .catch((err) => {
      console.log("getAllowance-error:", err);
      State.update({
        pending: false,
      });
    });
}
useEffect(() => {
  if (["Deposit", "Repay", "Add Collateral"].includes(actionText)) {
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
    TokenContract.approve(
      spender,
      parseUnits(Big(amount).times(1.1).toFixed(10).toString(), tokenDecimals)
    )
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

function formatAddAction(actionText, _amount, status, transactionHash) {
  addAction?.({
    type: "Lending",
    action: actionText,
    token: {
      symbol,
    },
    amount: _amount,
    template: dexConfig.name,
    add: false,
    status,
    transactionHash,
  });
}

function handleWithdraw() {
  State.update({
    pending: true,
  });
  const contract = new ethers.Contract(
    data.POOL_MANAGER,
    [
      {
        stateMutability: "nonpayable",
        type: "function",
        name: "withdraw",
        inputs: [
          { name: "assets", type: "uint256" },
          { name: "receiver", type: "address" },
          { name: "owner", type: "address" },
        ],
        outputs: [{ name: "", type: "uint256" }],
      },
    ],
    Ethers.provider().getSigner()
  );
  contract
    .withdraw(parseUnits(amount, tokenDecimals), account, account)
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
          console.log("handleWithdraw-error:", err);
          State.update({
            pending: false,
          });
        });
    })
    .catch((err) => {
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
}
function handleDeposit() {
  State.update({
    pending: true,
  });
  const contract = new ethers.Contract(
    data.POOL_MANAGER,
    [
      {
        stateMutability: "nonpayable",
        type: "function",
        name: "deposit",
        inputs: [
          { name: "assets", type: "uint256" },
          { name: "receiver", type: "address" },
        ],
        outputs: [{ name: "", type: "uint256" }],
      },
    ],
    Ethers.provider().getSigner()
  );
  contract
    .deposit(parseUnits(amount, tokenDecimals), account)
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
          console.log("handleDeposit-error:", err);
          State.update({
            pending: false,
          });
        });
    })
    .catch((err) => {
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
}
function handleAddCollateral() {
  State.update({
    pending: true,
  });
  const contract = new ethers.Contract(
    data.POOL_MANAGER,
    [
      {
        stateMutability: "nonpayable",
        type: "function",
        name: "add_collateral",
        inputs: [
          { name: "to", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        outputs: [],
      },
    ],
    Ethers.provider().getSigner()
  );
  contract
    .add_collateral(account, parseUnits(amount, tokenDecimals))
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
          toast?.success({
            title: `${actionText} Successfully!`,
            text: `${actionText} ${Big(amount).toFixed(2)} ${tokenSymbol}`,
            tx: transactionHash,
            chainId,
          });
        })
        .catch((err) => {
          console.log("handleAddCollateral-error:", err);
          State.update({
            pending: false,
          });
        });
    })
    .catch((err) => {
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
}

function handleRemoveCollateral() {
  State.update({
    pending: true,
  });
  const contract = new ethers.Contract(
    data.POOL_MANAGER,
    [
      {
        stateMutability: "nonpayable",
        type: "function",
        name: "remove_collateral",
        inputs: [
          { name: "to", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        outputs: [],
      },
    ],
    Ethers.provider().getSigner()
  );
  contract
    .remove_collateral(account, parseUnits(amount, tokenDecimals))
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
          toast?.success({
            title: `${actionText} Successfully!`,
            text: `${actionText} ${Big(amount).toFixed(2)} ${tokenSymbol}`,
            tx: transactionHash,
            chainId,
          });
        })
        .catch((err) => {
          console.log("handleRemoveCollateral-error:", err);
          State.update({
            pending: false,
          });
        });
    })
    .catch((err) => {
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
}

function handleRepay() {
  State.update({
    pending: true,
  });
  const contract = new ethers.Contract(
    data.POOL_MANAGER,
    [
      {
        stateMutability: "nonpayable",
        type: "function",
        name: "repay",
        inputs: [{ name: "payment", type: "uint256" }],
        outputs: [{ name: "", type: "uint256" }],
      },
    ],
    Ethers.provider().getSigner()
  );
  contract
    .repay(parseUnits(amount, tokenDecimals))
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
          console.log("handleRepay-error:", err);
          State.update({
            pending: false,
          });
        });
    })
    .catch((err) => {
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
}

function handleBorrow() {
  State.update({
    pending: true,
  });
  const contract = new ethers.Contract(
    data.POOL_MANAGER,
    [
      {
        stateMutability: "nonpayable",
        type: "function",
        name: "borrow",
        inputs: [
          { name: "amount", type: "uint256" },
          { name: "_from", type: "address" },
          { name: "to", type: "address" },
        ],
        outputs: [{ name: "", type: "uint256" }],
      },
    ],
    Ethers.provider().getSigner()
  );
  contract
    .borrow(parseUnits(amount, tokenDecimals), account, account)
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
          console.log("handleRepay-error:", err);
          State.update({
            pending: false,
          });
        });
    })
    .catch((err) => {
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
}

function handleClick() {
  if (actionText === "Withdraw") {
    handleWithdraw();
  }
  if (actionText === "Deposit") {
    handleDeposit();
  }
  if (actionText === "Add Collateral") {
    handleAddCollateral();
  }
  if (actionText === "Remove Collateral") {
    handleRemoveCollateral();
  }
  if (actionText === "Repay") {
    handleRepay();
  }
  if (actionText === "Borrow") {
    handleBorrow();
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
    ) : (
      actionText
    )}
  </Button>
);
