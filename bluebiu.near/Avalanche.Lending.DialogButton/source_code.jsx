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

const { disabled, actionText, amount, data, onSuccess, onMessage, addAction } =
  props;

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
              const { status } = res;
              State.update({
                loading: false,
              });
              if (status === 1) {
                onSuccess?.(data.dapp);
              }
              State.update({
                loading: false,
              });
              onMessage?.({
                status: status === 1 ? 1 : 2,
                open: true,
                text: `${tokenSymbol} ${
                  isEnter ? "enable" : "disable"
                } as collateral request ${
                  status === 1 ? "successed!" : "failed!"
                }`,
              });
            },
            onError: () => {
              State.update({
                loading: false,
              });
              onMessage?.({
                status: 2,
                open: true,
                text: `${tokenSymbol} ${
                  isEnter ? "enable" : "disable"
                } as collateral request failed!
                `,
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
          State.update({
            loading: true,
          });
          onMessage?.({
            status: 3,
            open: true,
            text: `Submitting ${tokenSymbol} ${
              isEnter ? "enable" : "disable"
            } as collateral request...`,
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
    State.update({
      approving: true,
    });
    onMessage?.({
      status: 3,
      open: true,
      text: `Submitting ${tokenSymbol} approval request...`,
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
          const { status } = res;
          State.update({
            isApproved: status === 1,
            approving: false,
          });
          onMessage?.({
            status: status === 1 ? 1 : 2,
            open: true,
            text: status === 1 ? "Approved successed!" : "Approved failed!",
          });
          onLoad?.(status === 1);
        });
      })
      .catch(() => {
        State.update({
          isApproved: false,
          approving: false,
        });
        onMessage?.({
          status: 2,
          open: true,
          text: "Approved failed!",
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
            State.update({
              pending: false,
            });
            onMessage?.({
              status: status === 1 ? 1 : 2,
              open: true,
              text: `${tokenSymbol} ${actionText.toLowerCase()} request ${
                status === 1 ? " successed!" : " failed!"
              }`,
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
            }
          },
          onError: (err) => {
            console.log("error", err);
            State.update({
              pending: false,
            });
            onMessage?.({
              status: 2,
              open: true,
              text: `${tokenSymbol} ${actionText.toLowerCase()} request
            failed!
           `,
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
        State.update({
          pending: true,
        });
        onMessage?.({
          status: 3,
          open: true,
          text: `Submitting ${tokenSymbol} ${actionText.toLowerCase()} request...`,
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
