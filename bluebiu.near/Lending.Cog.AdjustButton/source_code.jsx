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
  _assetAmount,
  data,
  chainId,
  onSuccess,
  toast,
  addAction,
  unsignedTx,
  loading: estimating,
  gas,
  _debtTokenAmount,
  onApprovedSuccess,

  isAssetBigerThanBalance,
  isDebtBigerThanBalance,
  yourLTV,
  _maxFeePercentage,
  IS_ETHOS_DAPP,
  IS_PREON_DAPP,
  IS_GRAVITA_DAPP,
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

// useEffect(() => {
//   if (!account || !gas) return;
//   const provider = Ethers.provider();
//   provider.getBalance(account).then((rawBalance) => {
//     State.update({
//       gasBalance: rawBalance.toString(),
//       isGasEnough: !Big(rawBalance.toString()).lt(gas.toString()),
//       gas: ethers.utils.formatUnits(gas, 18),
//     });
//   });
// }, [account, gas]);

if (!_assetAmount && !_debtTokenAmount) {
  return (
    <Button disabled={true} className={actionText.toLowerCase()}>
      Enter An Amount
    </Button>
  );
}

if (isAssetBigerThanBalance || isDebtBigerThanBalance) {
  return (
    <Button disabled={true} className={actionText.toLowerCase()}>
      Insufficient Balance
    </Button>
  );
}

// if (Big(_debtTokenAmount || 0).lt(data["MIN_DEBT"])) {
//   return (
//     <Button disabled={true} className={actionText.toLowerCase()}>
//       A minimum of {data["MIN_DEBT"]} {data.BORROW_TOKEN}
//     </Button>
//   );
// }

if (Big(yourLTV || 0).gt(Big(data.MAX_LTV).mul(100))) {
  return (
    <Button disabled={true} className={actionText.toLowerCase()}>
      LTV must be below {Big(data.MAX_LTV).mul(100).toFixed()}%
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
      ).lt(Big(_assetAmount || 0)),
    });
  });
};

getAllowance();

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

function makeAdjustContract() {
  const _asset = data.underlyingToken.address;
  const _assetSent = _assetAmount ? ethers.utils.parseUnits(_assetAmount) : 0;
  const _collWithdrawal = 0;
  const _debtTokenChange = _debtTokenAmount
    ? ethers.utils.parseUnits(_debtTokenAmount)
    : 0;
  const _isDebtIncrease = Big(_debtTokenAmount || 0).gt(0);
  let _upperHint;
  let _lowerHint;

  let params;
  let abi;
  if (IS_GRAVITA_DAPP || IS_PREON_DAPP) {
    _upperHint = "0xA1B7bbade134DB3B14B56056480e81c60Ab77377";
    _lowerHint = "0x0000000000000000000000000000000000000000";
    abi = [
      {
        inputs: [
          { internalType: "address", name: "_asset", type: "address" },
          { internalType: "uint256", name: "_assetSent", type: "uint256" },
          {
            internalType: "uint256",
            name: "_collWithdrawal",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_debtTokenChange",
            type: "uint256",
          },
          { internalType: "bool", name: "_isDebtIncrease", type: "bool" },
          { internalType: "address", name: "_upperHint", type: "address" },
          { internalType: "address", name: "_lowerHint", type: "address" },
        ],
        name: "adjustVessel",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    params = [
      _asset,
      _assetSent,
      _collWithdrawal,
      _debtTokenChange,
      _isDebtIncrease,
      _upperHint,
      _lowerHint,
    ];
    return new ethers.Contract(
      data.config.BorrowerOperations,
      abi,
      Ethers.provider().getSigner()
    ).adjustVessel(...params, {
      gasLimit: 700000,
    });
  }
  if (IS_ETHOS_DAPP) {
    _upperHint = account;
    _lowerHint = account;
    abi = [
      {
        inputs: [
          { internalType: "address", name: "_collateral", type: "address" },
          {
            internalType: "uint256",
            name: "_maxFeePercentage",
            type: "uint256",
          },
          { internalType: "uint256", name: "_collTopUp", type: "uint256" },
          {
            internalType: "uint256",
            name: "_collWithdrawal",
            type: "uint256",
          },
          { internalType: "uint256", name: "_LUSDChange", type: "uint256" },
          { internalType: "bool", name: "_isDebtIncrease", type: "bool" },
          { internalType: "address", name: "_upperHint", type: "address" },
          { internalType: "address", name: "_lowerHint", type: "address" },
        ],
        name: "adjustTrove",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    params = [
      _asset,
      _maxFeePercentage,
      _assetSent,
      _collWithdrawal,
      _debtTokenChange,
      _isDebtIncrease,
      _upperHint,
      _lowerHint,
    ];
    console.log(33333, params);
    return new ethers.Contract(
      data.config.BorrowerOperations,
      abi,
      Ethers.provider().getSigner()
    ).adjustTrove(...params, {
      gasLimit: 700000,
    });
  }
}

function handleAdjust() {
  State.update({
    pending: true,
  });

  makeAdjustContract()
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
      console.log("handleAdjust_error:", err);
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
  <Button
    disabled={state.pending || estimating || !state.isGasEnough}
    className={actionText.toLowerCase()}
    onClick={handleAdjust}
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
);
