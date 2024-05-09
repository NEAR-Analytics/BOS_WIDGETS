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
  disabled,
  actionText,
  amount,
  data,
  chainId,
  onSuccess,
  toast,
  addAction,
  unsignedTx,
  loading: estimating,
  gas,
  _assetAmount,
  _debtTokenAmount,
  onApprovedSuccess,
} = props;

const account = Ethers.send("eth_requestAccounts", [])[0];

const tokenSymbol = data.underlyingToken.symbol;
if (!actionText) return;

useEffect(() => {
  State.update({
    approving: false,
    isApproved: false,
    isGasEnough: true,
  });
}, []);

useEffect(() => {
  if (!account || !gas) return;
  const provider = Ethers.provider();
  provider.getBalance(account).then((rawBalance) => {
    State.update({
      gasBalance: rawBalance.toString(),
      isGasEnough: !Big(rawBalance.toString()).lt(gas.toString()),
      gas: ethers.utils.formatUnits(gas, 18),
    });
  });
}, [account, gas]);

function handleClose() {
  State.update({
    pending: true,
  });
  const contract = new ethers.Contract(
    data.BorrowerOperations,
    [
      {
        inputs: [{ internalType: "address", name: "_asset", type: "address" }],
        name: "closeVessel",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );

  contract
    .closeVessel(data.underlyingToken.address, {
      gasLimit: 4000000,
    })
    .then((tx) => {
      tx.wait()
        .then((res) => {
          const { status, transactionHash } = res;
          toast?.dismiss(toastId);
          State.update({
            pending: false,
          });
          // addAction?.({
          //   type: "Lending",
          //   action: actionText,
          //   token: data.underlyingToken,
          //   amount,
          //   template: data.dappName,
          //   add: false,
          //   status,
          //   transactionHash,
          // });
          if (status === 1) {
            onSuccess?.(data.dapp);
            toast?.success({
              title: `${tokenSymbol} ${actionText.toLowerCase()} request successed!`,
              tx: transactionHash,
              chainId,
            });
          } else {
            toast?.fail({
              title: `${tokenSymbol} ${actionText.toLowerCase()} request failed!`,
              tx: transactionHash,
              chainId,
            });
          }
        })
        .catch((err) => {
          State.update({
            pending: false,
          });
        });
    })
    .catch((err) => {
      console.log("closeVessel_error:", err);
      State.update({
        pending: false,
      });

      toast?.dismiss(toastId);
      toast?.fail({
        title: err?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : `${tokenSymbol} ${actionText.toLowerCase()} request failed!`,
        tx: err ? err.hash : "",
        chainId,
      });
    });
}

if (actionText === "Close") {
  return (
    <Button
      onClick={handleClose}
      disabled={state.pending || disabled}
      className={actionText.toLowerCase()}
    >
      {state.pending ? (
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 16,
          }}
        />
      ) : (
        "Close Vessel"
      )}
    </Button>
  );
}

if (!amount) {
  return (
    <Button disabled={true} className={actionText.toLowerCase()}>
      Enter An Amount
    </Button>
  );
}
if (Big(_debtTokenAmount || 0).lt(data["MIN-DEBT"])) {
  return (
    <Button disabled={true} className={actionText.toLowerCase()}>
      A minimum of {data["MIN-DEBT"]} {data.BORROW_TOKEN}
    </Button>
  );
}

const tokenAddr = data.underlyingToken.address;
const spender = data.BorrowerOperations;

console.log("APPROVE: ", tokenAddr, spender);

const getAllowance = () => {
  const TokenContract = new ethers.Contract(
    tokenAddr,
    ERC20_ABI,
    Ethers.provider().getSigner()
  );
  TokenContract.allowance(account, spender).then((allowanceRaw) => {
    console.log("ALLOWANCE:", allowanceRaw.toString());
    State.update({
      isApproved: !Big(
        ethers.utils.formatUnits(
          allowanceRaw._hex,
          data.underlyingToken.decimals
        )
      ).lt(amount || "0"),
    });
  });
};

if (["Borrow"].includes(actionText)) {
  getAllowance();
}

if (!state.isApproved) {
  const handleApprove = () => {
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
      ethers.utils.parseUnits(amount, data.underlyingToken.decimals)
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
            onApprovedSuccess();
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
  };
  return (
    <Button onClick={handleApprove} disabled={state.approving}>
      {state.approving && (
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 16,
          }}
        />
      )}
      Approve
    </Button>
  );
}

function handleBorrow() {
  State.update({
    pending: true,
  });
  const _upperHint = "0x544f96434f77437425d5aC40fd4755C0cf39399A";
  const _lowerHint = "0xA1B7bbade134DB3B14B56056480e81c60Ab77377";

  const contract = new ethers.Contract(
    data.BorrowerOperations,
    [
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
    ],
    Ethers.provider().getSigner()
  );

  contract
    .openVessel(
      data.underlyingToken.address,
      ethers.utils.parseUnits(_assetAmount),
      ethers.utils.parseUnits(_debtTokenAmount),
      _upperHint,
      _lowerHint,
      {
        gasLimit: 4000000,
      }
    )
    .then((tx) => {
      tx.wait()
        .then((res) => {
          const { status, transactionHash } = res;
          toast?.dismiss(toastId);
          State.update({
            pending: false,
          });
          addAction?.({
            type: "Lending",
            action: actionText,
            token: data.underlyingToken,
            amount,
            template: data.dappName,
            add: false,
            status,
            transactionHash,
          });
          if (status === 1) {
            onSuccess?.(data.dapp);
            toast?.success({
              title: `${tokenSymbol} ${actionText.toLowerCase()} request successed!`,
              tx: transactionHash,
              chainId,
            });
          } else {
            toast?.fail({
              title: `${tokenSymbol} ${actionText.toLowerCase()} request failed!`,
              tx: transactionHash,
              chainId,
            });
          }
        })
        .catch((err) => {
          State.update({
            pending: false,
          });
        });
    })
    .catch((err) => {
      console.log("openVessel_error:", err);
      State.update({
        pending: false,
      });

      toast?.dismiss(toastId);
      toast?.fail({
        title: err?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : `${tokenSymbol} ${actionText.toLowerCase()} request failed!`,
        tx: err ? err.hash : "",
        chainId,
      });
    });
}

return (
  <>
    <Button
      disabled={state.pending || disabled || estimating || !state.isGasEnough}
      className={actionText.toLowerCase()}
      onClick={handleBorrow}
    >
      {state.pending || estimating ? (
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 16,
          }}
        />
      ) : !state.isGasEnough ? (
        `Not enough gas(${Big(state.gas || 0).toFixed(2)}) needed`
      ) : (
        actionText
      )}
    </Button>
  </>
);
