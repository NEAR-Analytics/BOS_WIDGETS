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
  height: 46px;
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
  actionText,
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
  isAssetBigerThanBalance,
  isDebtBigerThanBalance,
  collateralRatio,
  yourLTV,
  IS_ETHOS_DAPP,
  IS_PREON_DAPP,
  IS_GRAVITA_DAPP,
  _maxFeePercentage,
  GAS_LIMIT_RECOMMENDATIONS,
  isCloseDisabled,
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

function makeCloseContract() {
  if (IS_PREON_DAPP || IS_GRAVITA_DAPP) {
    const contract = new ethers.Contract(
      data.config.BorrowerOperations,
      [
        {
          inputs: [
            { internalType: "address", name: "_asset", type: "address" },
          ],
          name: "closeVessel",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      Ethers.provider().getSigner()
    );

    return contract.closeVessel(data.underlyingToken.address, {
      gasLimit: 700000,
    });
  }

  if (IS_ETHOS_DAPP) {
    const contract = new ethers.Contract(
      data.config.BorrowerOperations,
      [
        {
          inputs: [
            { internalType: "address", name: "_collateral", type: "address" },
          ],
          name: "closeTrove",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      Ethers.provider().getSigner()
    );

    return contract.closeTrove(data.underlyingToken.address, {
      gasLimit: 4000000,
    });
  }
}

function handleClose() {
  State.update({
    pending: true,
  });

  makeCloseContract()
    .then((tx) => {
      tx.wait()
        .then((res) => {
          const { status, transactionHash } = res;
          toast?.dismiss(toastId);
          State.update({
            pending: false,
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
      disabled={state.pending || isCloseDisabled}
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
        "Close"
      )}
    </Button>
  );
}

if (!_assetAmount) {
  return (
    <Button disabled={true} className={actionText.toLowerCase()}>
      Enter An Amount
    </Button>
  );
}

if (IS_GRAVITA_DAPP && IS_PREON_DAPP) {
  if (isAssetBigerThanBalance || isDebtBigerThanBalance) {
    return (
      <Button disabled={true} className={actionText.toLowerCase()}>
        Insufficient Balance
      </Button>
    );
  }
  if (Big(yourLTV).gt(Big(data.MAX_LTV).mul(100))) {
    return (
      <Button disabled={true} className={actionText.toLowerCase()}>
        LTV must be below {Big(data.MAX_LTV).mul(100).toFixed(2)}%
      </Button>
    );
  }
}
if (IS_ETHOS_DAPP) {
  if (
    Big(collateralRatio || 0)
      .mul(100)
      .lt(Big(data.MCR).mul(100))
  ) {
    return (
      <Button disabled={true} className={actionText.toLowerCase()}>
        {`Collateral Ratio must above the MCR of ${Big(data.MCR).mul(100)}%`}
      </Button>
    );
  }
}

if (Big(_debtTokenAmount || 0).lt(data["MIN_DEBT"])) {
  return (
    <Button disabled={true} className={actionText.toLowerCase()}>
      A minimum of {data["MIN_DEBT"]} {data.BORROW_TOKEN}
    </Button>
  );
}

const tokenAddr = data.underlyingToken.address;
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
      ).lt(_assetAmount || "0"),
    });
  });
};

if (["Borrow"].includes(actionText)) {
  getAllowance();
}

if (!state.isApproved) {
  const handleApprove = () => {
    const toastId = toast?.loading({
      title: `Approve ${Big(_assetAmount).toFixed(2)} ${tokenSymbol}`,
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
      ethers.utils.parseUnits(_assetAmount, data.underlyingToken.decimals)
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
              text: `Approve ${Big(_assetAmount).toFixed(2)} ${tokenSymbol}`,
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
            : `Approve ${Big(_assetAmount).toFixed(2)} ${tokenSymbol}`,
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

function makeOpenContract() {
  if (IS_PREON_DAPP || IS_GRAVITA_DAPP) {
    const _asset = data.underlyingToken.address;
    const _assetAmount = ethers.utils.parseUnits(
      _assetAmount,
      data.underlyingToken.decimals
    );
    const _debtTokenAmount = ethers.utils.parseUnits(
      _debtTokenAmount,
      data.decimals
    );
    const _upperHint = "0x544f96434f77437425d5aC40fd4755C0cf39399A";
    const _lowerHint = "0xA1B7bbade134DB3B14B56056480e81c60Ab77377";
    const params = [
      _asset,
      _assetAmount,
      _debtTokenAmount,
      _upperHint,
      _lowerHint,
    ];
    const contract = new ethers.Contract(
      data.config.BorrowerOperations,
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

    return contract.openVessel(...params, {
      gasLimit: GAS_LIMIT_RECOMMENDATIONS["borrow"].limit,
    });
  }

  if (IS_ETHOS_DAPP) {
    const _collateral = data.underlyingToken.address;
    const _collAmount = ethers.utils.parseUnits(
      _assetAmount,
      data.underlyingToken.decimals
    );
    const _LUSDAmount = ethers.utils.parseUnits(
      _debtTokenAmount,
      data.decimals
    );
    const _upperHint = "0xc655B790FF812109c8F6c3f24fd20b3495164A51";
    const _lowerHint = "0x0000000000000000000000000000000000000000";
    const params = [
      _collateral,
      _collAmount,
      _maxFeePercentage,
      _LUSDAmount,
      _upperHint,
      _lowerHint,
    ];

    const contract = new ethers.Contract(
      data.config.BorrowerOperations,
      [
        {
          inputs: [
            { internalType: "address", name: "_collateral", type: "address" },
            { internalType: "uint256", name: "_collAmount", type: "uint256" },
            {
              internalType: "uint256",
              name: "_maxFeePercentage",
              type: "uint256",
            },
            { internalType: "uint256", name: "_LUSDAmount", type: "uint256" },
            { internalType: "address", name: "_upperHint", type: "address" },
            { internalType: "address", name: "_lowerHint", type: "address" },
          ],
          name: "openTrove",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      Ethers.provider().getSigner()
    );

    return contract.openTrove(...params, {
      gasLimit: 4000000,
    });
  }
}

function handleBorrow() {
  State.update({
    pending: true,
  });

  makeOpenContract()
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
            amount: _assetAmount,
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
      disabled={state.pending || estimating || !state.isGasEnough}
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
