// TODO:  approve a token when withdrawing and borrow  wethGateway

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
  line-height: 52px;
  border-radius: 10px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  border: none;
  width: 100%;
  transition: 0.5s;
  margin-top: 10px;
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
State.init({
  approving: false,
  isApproved: false,
});

const {
  disabled,
  actionText,
  amount,
  data,
  chainId,
  onSuccess,
  toast,
  addAction,
} = props;

const account = Ethers.send("eth_requestAccounts", [])[0];

const tokenSymbol = data.underlyingToken.symbol;

if (actionText.includes("Collateral")) {
  const isEnter = actionText === "Enable as Collateral";
  return (
    <>
      {!!state.loading && (
        <Widget
          src={data.config.handlerCollateral}
          props={{
            actionText,
            unitrollerAddress: data.config.unitrollerAddress,
            marketAddress: data.address,
            loading: state.loading,
            onSuccess: (res) => {
              const { status, transactionHash } = res;
              toast?.dismiss(state.toastId);
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
            },
            onError: (tx) => {
              State.update({
                loading: false,
              });
              toast?.fail({
                title: `${tokenSymbol} ${
                  isEnter ? "enable" : "disable"
                } as collateral request failed!`,
                tx: tx ? tx.hash : "",
                chainId,
              });
            },
            account,
            data,
          }}
        />
      )}
      <Button
        disabled={state.loading || disabled}
        onClick={() => {
          const toastId = toast?.loading({
            title: `Submitting ${tokenSymbol} ${
              isEnter ? "enable" : "disable"
            } as collateral request...`,
          });
          State.update({
            loading: true,
            toastId,
          });
        }}
      >
        {state.loading && (
          <Widget
            src="bluebiu.near/widget/0vix.LendingLoadingIcon"
            props={{
              size: 16,
            }}
          />
        )}
        Confirm
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
  return data.underlyingToken.description === "native"
    ? data.aTokenAddress
    : data.underlyingAsset.address;
};

const getAAVE2ApproveAddress = () => {
  return data.underlyingToken.description === "native"
    ? data.wethGateway
    : data.lendingPoolAddress;
};

const getAllowance = () => {
  const TokenContract = new ethers.Contract(
    data.type === "aave2"
      ? getAAVE2TokenAddress()
      : data.underlyingToken.address,
    ERC20_ABI,
    Ethers.provider().getSigner()
  );
  TokenContract.allowance(
    account,
    data.type == "aave2" ? getAAVE2ApproveAddress() : data.address
  ).then((allowanceRaw) => {
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
if (
  ["Deposit", "Repay"].includes(actionText) &&
  data.underlyingToken.address !== "native" &&
  data.underlyingToken.description !== "native"
) {
  getAllowance();
} else {
  State.update({ isApproved: true });
  onLoad?.(true);
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
      data.type === "aave2"
        ? getAAVE2TokenAddress()
        : data.underlyingToken.address,
      ERC20_ABI,
      Ethers.provider().getSigner()
    );
    TokenContract.approve(
      data.type == "aave2" ? getAAVE2ApproveAddress() : data.address,
      ethers.utils.parseUnits(amount, data.underlyingToken.decimals)
    )
      .then((tx) => {
        tx.wait().then((res) => {
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

return (
  <>
    {state.pending && (
      <Widget
        src={data.config.handlerCToken}
        props={{
          market: data,
          actionText,
          amount: Big(amount).toFixed(data.underlyingToken.decimals),
          loading: state.pending,
          onSuccess: (res) => {
            const { status, transactionHash } = res;
            toast?.dismiss(state.toastId);
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
          },
          onError: (tx) => {
            State.update({
              pending: false,
            });
            toast?.dismiss(state.toastId);
            toast?.fail({
              title: tx?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : `${tokenSymbol} ${actionText.toLowerCase()} request failed!`,
              tx: tx ? tx.hash : "",
              chainId,
            });
          },
          account,
        }}
      />
    )}
    <Button
      disabled={state.pending || disabled}
      className={actionText.toLowerCase()}
      onClick={() => {
        const toastId = toast?.loading({
          title: `Submitting ${tokenSymbol} ${actionText.toLowerCase()} request...`,
        });
        State.update({
          pending: true,
          toastId,
        });
      }}
    >
      {state.pending && (
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 16,
          }}
        />
      )}
      {actionText}
    </Button>
  </>
);
