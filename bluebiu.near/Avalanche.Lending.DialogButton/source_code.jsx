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
  background: var(--button-color);
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
  onApprovedSuccess,
  account,
} = props;

const tokenSymbol = data.underlyingToken.symbol;
if (!actionText || !account) return;

useEffect(() => {
  State.update({
    approving: false,
    isApproved: false,
    isGasEnough: true,
    pending: false,
    checking: true,
  });
}, [amount]);

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

if (actionText.includes("Collateral")) {
  return (
    <>
      <Button
        disabled={state.loading || disabled || estimating || !state.isGasEnough}
        onClick={() => {
          const isEnter = actionText === "Enable as Collateral";
          const toastId = toast?.loading({
            title: `Submitting ${tokenSymbol} ${
              isEnter ? "enable" : "disable"
            } as collateral request...`,
          });
          State.update({
            loading: true,
          });

          Ethers.provider()
            .getSigner()
            .sendTransaction(unsignedTx)
            .then((tx) => {
              tx.wait()
                .then((res) => {
                  const { status, transactionHash } = res;
                  toast?.dismiss(toastId);
                  if (status !== 1) throw new Error("");
                  State.update({
                    loading: false,
                  });
                  toast?.success({
                    title: `${tokenSymbol} ${
                      isEnter ? "enable" : "disable"
                    } as collateral request successed!`,
                    tx: transactionHash,
                    chainId,
                  });
                  onSuccess?.(data.dapp);
                })
                .catch((err) => {
                  State.update({
                    loading: false,
                  });
                });
            })
            .catch((err) => {
              State.update({
                loading: false,
              });
              toast?.dismiss(toastId);
              toast?.fail({
                title: err?.message?.includes("user rejected transaction")
                  ? "User rejected transaction"
                  : `${tokenSymbol} ${
                      isEnter ? "enable" : "disable"
                    } as collateral request failed!`,
                tx: err ? err.hash : "",
                chainId,
              });
            });
        }}
      >
        {state.loading || estimating ? (
          <Widget
            src="bluebiu.near/widget/0vix.LendingLoadingIcon"
            props={{
              size: 16,
            }}
          />
        ) : !state.isGasEnough ? (
          `Not enough gas(${Big(state.gas || 0).toFixed(2)}) needed`
        ) : (
          "Confirm"
        )}
      </Button>
    </>
  );
}
if (!amount) {
  return (
    <Button disabled={true} className={actionText.toLowerCase()}>
      Enter An Amount
    </Button>
  );
}

const getAAVE2TokenAddress = () => {
  return data.underlyingToken.address === "native"
    ? data.address
    : data.underlyingToken.address;
};

const getAAVE2ApproveAddress = () => {
  return data.underlyingToken.address === "native"
    ? data.config.wethGateway
    : data.config.lendingPoolAddress;
};

const tokenAddr =
  data.config.type === "aave2"
    ? getAAVE2TokenAddress()
    : data.underlyingToken.address;
const spender =
  data.config.type == "aave2" ? getAAVE2ApproveAddress() : data.address;

const getAllowance = () => {
  const TokenContract = new ethers.Contract(
    tokenAddr,
    ERC20_ABI,
    Ethers.provider().getSigner()
  );
  TokenContract.allowance(account, spender).then((allowanceRaw) => {
    State.update({
      isApproved: !Big(
        ethers.utils.formatUnits(
          allowanceRaw._hex,
          data.underlyingToken.decimals
        )
      ).lt(amount || "0"),
      checking: false,
    });
  });
};

if (data.underlyingToken.isNative) {
  State.update({ isApproved: true, checking: false });
  onLoad?.(true);
} else {
  if (["Deposit", "Repay"].includes(actionText)) {
    getAllowance();
  }
  if (["Withdraw", "Borrow"].includes(actionText)) {
    State.update({ isApproved: true, checking: false });
    onLoad?.(true);
  }
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
      {state.approving || state.checking ? (
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

return (
  <>
    <Button
      disabled={state.pending || disabled || estimating || !state.isGasEnough}
      className={actionText.toLowerCase()}
      onClick={() => {
        const toastId = toast?.loading({
          title: `Submitting ${tokenSymbol} ${actionText.toLowerCase()} request...`,
        });
        State.update({
          pending: true,
        });

        Ethers.provider()
          .getSigner()
          .sendTransaction(unsignedTx)
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
                  template: data.dappName || data.dapp,
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
            State.update({
              pending: false,
            });
            console.log("err", err);
            toast?.dismiss(toastId);
            toast?.fail({
              title: err?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : `${tokenSymbol} ${actionText.toLowerCase()} request failed!`,
              tx: err ? err.hash : "",
              chainId,
            });
          });
      }}
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
