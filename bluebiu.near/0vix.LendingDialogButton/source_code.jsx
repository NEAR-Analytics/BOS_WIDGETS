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
const CTOKEN_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "mintAmount", type: "uint256" }],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "redeemAmount", type: "uint256" },
    ],
    name: "redeemUnderlying",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "borrowAmount", type: "uint256" },
    ],
    name: "borrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "repayAmount", type: "uint256" }],
    name: "repayBorrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const UNITROLLER_ABI = [
  {
    inputs: [{ internalType: "address[]", name: "oTokens", type: "address[]" }],
    name: "enterMarkets",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "oTokenAddress", type: "address" },
    ],
    name: "exitMarket",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const Button = styled.button`
  background-color: #8b71c2;
  line-height: 48px;
  border-radius: 6px;
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
    opacity: 0.3;
  }
`;
const ApproveTips = styled.div`
  background-color: rgba(121, 79, 221, 0.25);
  border-radius: 24px;
  padding: 0px 10px;
  line-height: 28px;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  .icon {
    margin-right: 4px;
    flex-shrink: 0;
    margin-top: -1px;
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
  market,
  unitrollerAddress,
  onSuccess,
  onMessage,
  addAction,
} = props;
const account = Ethers.send("eth_requestAccounts", [])[0];
const tokenSymbol = market.symbol.slice(1).toUpperCase();

const getAllowance = () => {
  const TokenContract = new ethers.Contract(
    market.underlyingToken.address,
    ERC20_ABI,
    Ethers.provider().getSigner()
  );
  TokenContract.allowance(account, market.address).then((allowanceRaw) => {
    State.update({
      isApproved: !Big(
        ethers.utils.formatUnits(
          allowanceRaw._hex,
          market.underlyingToken.decimals
        )
      ).lt(amount || "0"),
    });
  });
};
if (
  ["Supply", "Repay"].includes(actionText) &&
  market.underlyingToken.address !== "native"
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
      market.underlyingToken.address,
      ERC20_ABI,
      Ethers.provider().getSigner()
    );
    TokenContract.approve(
      market.address,
      ethers.utils.parseUnits(amount, market.underlyingToken.decimals)
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
    <>
      <ApproveTips>
        <div className="icon">
          <Widget
            src="bluebiu.near/widget/0vix.LendingInfoIcon"
            props={{ color: "#C7FF18" }}
          />
        </div>
        You must approve {tokenSymbol} first.
      </ApproveTips>
      <Button onClick={handleApprove} disabled={state.approving}>
        Approve {tokenSymbol}
        {state.approving && "..."}
      </Button>
    </>
  );
}

if (actionText.includes("Collateral")) {
  return (
    <>
      <Button
        disabled={state.loading}
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
          const isEnter = actionText === "Enable as Collateral";
          const CollateralContract = new ethers.Contract(
            unitrollerAddress,
            UNITROLLER_ABI,
            Ethers.provider().getSigner()
          );
          const method = isEnter ? "enterMarkets" : "exitMarket";
          const parameters = isEnter ? [market.address] : market.address;
          CollateralContract[method](parameters)
            .then((tx) => {
              tx.wait().then((res) => {
                const { status } = res;
                State.update({
                  loading: false,
                });

                if (status === 1) onSuccess?.();
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
              });
            })
            .catch(() => {
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
            });
        }}
      >
        {actionText}
        {state.loading && "..."}
      </Button>
    </>
  );
}

const CTokenContract = new ethers.Contract(
  market.address,
  CTOKEN_ABI,
  Ethers.provider().getSigner()
);

const CNativeTokenContract = new ethers.Contract(
  market.address,
  [
    {
      inputs: [],
      name: "mint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ],
  Ethers.provider().getSigner()
);

const getParametersAndOptions = () => {
  const parameters = [];
  const options = {};
  if (["Supply", "Repay"]) {
    if (market.underlyingToken.address !== "native") {
      parameters.push(
        ethers.utils.parseUnits(amount, market.underlyingToken.decimals)
      );
    } else {
      options.value = ethers.utils.parseUnits(
        amount,
        market.underlyingToken.decimals
      );
    }
    return [parameters, options];
  }
  parameters.push(
    ethers.utils.parseUnits(amount, market.underlyingToken.decimals)
  );
  return [parameters, options];
};

const questionSwitch = Storage.get(
  "zkevm-is-quest",
  "bluebiu.near/widget/0vix.LendingQuest"
);

return (
  <>
    <Button
      disabled={state.loading || disabled}
      onClick={() => {
        State.update({
          loading: true,
        });
        onMessage?.({
          status: 3,
          open: true,
          text: `Submitting ${tokenSymbol} ${actionText.toLowerCase()} request...`,
        });
        const handleSuccess = (tx, type) => {
          tx.wait().then((res) => {
            const { status, transactionHash } = res;
            State.update({
              loading: false,
            });
            onMessage?.({
              status: status === 1 ? 1 : 2,
              open: true,
              text: `${tokenSymbol} ${actionText.toLowerCase()} request ${
                status === 1 ? " successed!" : " failed!"
              }`,
            });

            if (status === 1) {
              if (type) {
                addAction?.({
                  type: "Lending",
                  action: type,
                  token: market.underlyingToken,
                  amount,
                  template: "0vix",
                  add: questionSwitch,
                  status,
                  transactionHash,
                });
              }
              onSuccess?.();
            }
          });
        };
        const handleError = () => {
          State.update({
            loading: false,
          });
          onMessage?.({
            status: 2,
            open: true,
            text: `${tokenSymbol} ${actionText.toLowerCase()} request
            failed!
           `,
          });
        };
        if (actionText === "Supply") {
          if (market.underlyingToken.address === "native") {
            CNativeTokenContract.mint({
              value: ethers.utils.parseUnits(amount, 18),
            })
              .then((tx) => {
                handleSuccess(tx, "Supply");
              })
              .catch((err) => {
                console.log(err);
                handleError();
              });
          } else {
            CTokenContract.mint(
              ethers.utils.parseUnits(amount, market.underlyingToken.decimals)
            )
              .then((tx) => {
                handleSuccess(tx, "Supply");
              })
              .catch((err) => {
                console.log(err);
                handleError();
              });
          }
          return;
        }
        if (actionText === "Withdraw") {
          CTokenContract.redeemUnderlying(
            ethers.utils.parseUnits(amount, market.underlyingToken.decimals)
          )
            .then((tx) => {
              handleSuccess(tx, "Withdraw");
            })
            .catch((err) => {
              console.log(err);
              handleError();
            });
          return;
        }
        if (actionText === "Borrow") {
          CTokenContract.borrow(
            ethers.utils.parseUnits(amount, market.underlyingToken.decimals)
          )
            .then((tx) => {
              handleSuccess(tx, "Borrow");
            })
            .catch((err) => {
              console.log(err);
              handleError();
            });
          return;
        }
        if (actionText === "Repay") {
          CTokenContract.repayBorrow(
            ethers.utils.parseUnits(amount, market.underlyingToken.decimals)
          )
            .then((tx) => {
              handleSuccess(tx, "Repay");
            })
            .catch((err) => {
              console.log(err);
              handleError();
            });
        }
      }}
    >
      {actionText} {tokenSymbol}
      {state.loading && "..."}
    </Button>
  </>
);
