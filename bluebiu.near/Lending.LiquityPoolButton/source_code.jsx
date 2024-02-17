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
  actionText,
  amount,
  data,
  chainId,
  onSuccess,
  toast,
  addAction,
  loading: estimating,
  gas,
  onApprovedSuccess,
  isBigerThanBalance,
} = props;
// for Yours
const account = Ethers.send("eth_requestAccounts", [])[0];

const tokenSymbol = data.underlyingToken.symbol;
if (!actionText) return;

useEffect(() => {
  State.update({
    approving: false,
    isApproved: true,
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

const tokenAddr = data.config.borrowTokenAddress;
const spender = data.config.BorrowerOperations;

console.log("APPROVE: ", tokenAddr, spender, props);

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

if (["Deposit"].includes(actionText)) {
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

function handleClick() {
  State.update({
    pending: true,
  });
  console.log("click:", actionText, data);
  let abi;
  if (data.BORROW_TOKEN === "GRAI") {
    abi = [
      {
        inputs: [
          { internalType: "uint256", name: "_amount", type: "uint256" },
          { internalType: "address[]", name: "_assets", type: "address[]" },
        ],
        name: "provideToSP",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_amount", type: "uint256" },
          { internalType: "address[]", name: "_assets", type: "address[]" },
        ],
        name: "withdrawFromSP",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
  }
  if (data.BORROW_TOKEN === "STAR" || data.BORROW_TOKEN === "ERN") {
    abi = [
      {
        inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
        name: "provideToSP",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
        name: "withdrawFromSP",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
  }
  const contract = new ethers.Contract(
    data.config.StabilityPool,
    abi,
    Ethers.provider().getSigner()
  );

  const tokenArray = Object.keys(data.config.markets);

  const _amount = ethers.utils.parseUnits(amount);
  let params = {};
  if (data.BORROW_TOKEN === "GRAI") {
    params = [_amount, tokenArray];
  }
  if (data.BORROW_TOKEN === "STAR" || data.BORROW_TOKEN === "ERN") {
    params = [_amount];
  }
  console.log("dw_params:", params);
  if (actionText === "Deposit") {
    contract
      .provideToSP(...params, {
        gasLimit: 700000,
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
  if (actionText === "Withdraw") {
    contract
      .withdrawFromSP(...params, {
        gasLimit: 700000,
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
}

return (
  <>
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
  </>
);
