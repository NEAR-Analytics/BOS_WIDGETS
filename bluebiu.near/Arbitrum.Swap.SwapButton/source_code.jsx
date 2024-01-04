const SwapButtonConnectWrapper = styled.button`
  border: none;
  width: 100%;
  background: transparent;

  .connect-button {
    width: 100%;
    height: 60px;
    border-radius: 10px;
    font-size: 18px;
    line-height: 22px;
    border: none;
    transition: 0.5s;
    cursor: pointer;
    font-weight: 700;
    background-color: var(--button-color);
    color: var(--button-text-color);
    :hover {
      opacity: 0.8;
    }
    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }
    @media (max-width: 900px) {
      height: 40px;
      font-size: 16px;
    }
  }
`;

const SwapButton = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  font-size: 18px;
  line-height: 22px;
  background-color: var(--button-color);
  color: var(--button-text-color);
  border: none;
  transition: 0.5s;
  cursor: pointer;
  font-weight: 700;
  :hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  @media (max-width: 900px) {
    height: 40px;
    font-size: 16px;
  }
`;
const account = Ethers.send("eth_requestAccounts", [])[0];

const {
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  outputCurrencyAmount,
  maxInputBalance,
  onSuccess,
  addAction,
  toast,
  routerAddress,
  wethAddress,
  title,
  chainId,
  unsignedTx,
  gas,
  theme,
  onApprovedSuccess,
  chainIdNotSupport,
} = props;

if (!account) {
  return (
    <SwapButtonConnectWrapper>
      <Web3Connect
        style={theme ? theme : {}}
        className="connect-button"
        connectLabel="Connect Wallet"
      />
    </SwapButtonConnectWrapper>
  );
}
if (props.chainIdNotSupport) {
  return (
    <SwapButton disabled style={theme ? theme : {}}>
      Switch Network
    </SwapButton>
  );
}

if (Big(inputCurrencyAmount || 0).eq(0)) {
  return (
    <SwapButton disabled style={theme ? theme : {}}>
      Enter An Amount
    </SwapButton>
  );
}
if (!inputCurrency || !outputCurrency) {
  return (
    <SwapButton disabled style={theme ? theme : {}}>
      Select a token
    </SwapButton>
  );
}
if (Big(outputCurrencyAmount || 0).lt("0.00000000001")) {
  return (
    <SwapButton disabled style={theme ? theme : {}}>
      Insufficient Liquidity
    </SwapButton>
  );
}
if (Big(inputCurrencyAmount || 0).gt(maxInputBalance || 0)) {
  return (
    <SwapButton disabled style={theme ? theme : {}}>
      Insufficient {inputCurrency?.symbol} Balance
    </SwapButton>
  );
}
if (props.loading) {
  return (
    <SwapButton disabled style={theme ? theme : {}}>
      <Widget
        src="bluebiu.near/widget/0vix.LendingLoadingIcon"
        props={{
          size: 16,
        }}
      />
    </SwapButton>
  );
}

if (props.noPair) {
  return (
    <SwapButton disabled style={theme ? theme : {}}>
      Insufficient Liquidity
    </SwapButton>
  );
}

State.init({
  isApproved: false,
  approving: false,
  swapping: false,
  wrapping: false,
  isGasEnough: true,
});

const getAllowance = () => {
  const TokenContract = new ethers.Contract(
    inputCurrency.address,
    [
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
    ],
    Ethers.provider().getSigner()
  );
  TokenContract.allowance(account, routerAddress).then((allowanceRaw) => {
    State.update({
      isApproved: !Big(
        ethers.utils.formatUnits(allowanceRaw._hex, inputCurrency.decimals)
      ).lt(inputCurrencyAmount),
    });
  });
};

if (inputCurrency.address !== "native") {
  getAllowance();
} else {
  State.update({ isApproved: true });
}

const wrapType =
  inputCurrency.address === "native" && outputCurrency.address === wethAddress
    ? 1
    : inputCurrency.address === wethAddress &&
      outputCurrency.address === "native"
    ? 2
    : 0;

const handleApprove = () => {
  const toastId = toast?.loading({
    title: `Approve ${inputCurrencyAmount} ${inputCurrency.symbol}`,
  });
  State.update({
    approving: true,
  });
  const TokenContract = new ethers.Contract(
    inputCurrency.address,
    [
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
    ],
    Ethers.provider().getSigner()
  );
  TokenContract.approve(
    routerAddress,
    ethers.utils.parseUnits(
      Big(inputCurrencyAmount).toFixed(inputCurrency.decimals).toString(),
      inputCurrency.decimals
    )
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
          text: `Approved ${inputCurrencyAmount} ${inputCurrency.symbol}`,
          tx: transactionHash,
          chainId,
        });
        onApprovedSuccess();
      });
    })
    .catch((err) => {
      State.update({
        approving: false,
      });
      toast?.dismiss(toastId);
      toast?.fail({
        title: "Approve Failed!",
        text: err?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : `Approved ${inputCurrencyAmount} ${inputCurrency.symbol}`,
      });
    });
};

if (!state.isApproved && wrapType === 0) {
  return (
    <SwapButton
      onClick={handleApprove}
      disabled={state.approving}
      style={theme ? theme : {}}
    >
      {state.approving ? (
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 16,
          }}
        />
      ) : (
        " Approve"
      )}
    </SwapButton>
  );
}
function successCallback(tx, callback) {
  tx.wait()
    .then((res) => {
      const { status, transactionHash } = res;
      addAction?.({
        type: "Swap",
        inputCurrencyAmount,
        inputCurrency,
        outputCurrencyAmount,
        outputCurrency,
        template: title,
        status,
        transactionHash,
        add: props.add,
        token_in_currency: {
          address: inputCurrency?.address,
          symbol: inputCurrency?.symbol,
          decimals: inputCurrency?.decimals,
        },
        token_out_currency: {
          address: outputCurrency?.address,
          symbol: outputCurrency?.symbol,
          decimals: outputCurrency?.decimals,
        },
      });
      toast?.dismiss(state.toastId);
      if (status !== 1) throw new Error("");
      onSuccess?.();
      callback?.();
      toast?.success({
        title: "Swap Successfully!",
        text: `Swaped ${inputCurrencyAmount} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
        tx: transactionHash,
        chainId,
      });
    })
    .catch((err) => {
      toast?.fail({
        title: "Swap Failed!",
        text: `Swaped ${inputCurrencyAmount} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
        tx: transactionHash,
        chainId,
      });
    });
}

const handleWrap = (type, success, onError) => {
  const WethContract = new ethers.Contract(
    wethAddress,
    [
      {
        constant: false,
        inputs: [],
        name: "deposit",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
      {
        constant: false,
        inputs: [{ internalType: "uint256", name: "wad", type: "uint256" }],
        name: "withdraw",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );
  if (type === 1) {
    WethContract.deposit({
      value: ethers.utils.parseEther(
        Big(inputCurrencyAmount).toFixed(18).toString()
      ),
    })
      .then((tx) => {
        success?.(tx);
      })
      .catch((err) => {
        onError?.(err);
      });
  } else {
    WethContract.withdraw(
      ethers.utils.parseEther(Big(inputCurrencyAmount).toFixed(18).toString())
    )
      .then((tx) => {
        success?.(tx);
      })
      .catch((err) => {
        onError?.(err);
      });
  }
};

if (wrapType) {
  return (
    <SwapButton
      style={theme ? theme : {}}
      onClick={() => {
        const toastId = toast?.loading({
          title: `Swap ${inputCurrencyAmount} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
        });
        State.update({
          wrapping: true,
          toastId,
        });
        handleWrap(
          wrapType,
          (res) => {
            successCallback(res, () => {
              State.update({ wrapping: false });
            });
          },
          (err) => {
            State.update({
              wrapping: false,
            });
            toast?.dismiss(toastId);
            toast?.fail({
              title: "Swap Failed!",
              text: err?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : `Swaped ${inputCurrencyAmount} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
            });
          }
        );
      }}
      disabled={state.wrapping}
    >
      {wrapType === 1 ? (
        state.wrapping ? (
          <Widget
            src="bluebiu.near/widget/0vix.LendingLoadingIcon"
            props={{
              size: 16,
            }}
          />
        ) : (
          "Wrap"
        )
      ) : state.wrapping ? (
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 16,
          }}
        />
      ) : (
        "Unwrap"
      )}
    </SwapButton>
  );
}

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

return (
  <>
    <SwapButton
      style={theme ? theme : {}}
      onClick={() => {
        const toastId = toast?.loading({
          title: `Swap ${inputCurrencyAmount} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
        });
        State.update({ swapping: true });
        Ethers.provider()
          .getSigner()
          .sendTransaction(unsignedTx)
          .then((tx) => {
            successCallback(tx, () => {
              State.update({ swapping: false });
            });
          })
          .catch((err) => {
            State.update({ swapping: false });
            toast?.dismiss(toastId);
            toast?.fail({
              title: "Swap Failed!",
              text: err?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : `Swaped ${inputCurrencyAmount} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
            });
          });
      }}
      disabled={state.swapping || !state.isGasEnough}
    >
      {!state.isGasEnough ? (
        `Not enough gas(${Big(state.gas || 0).toFixed(2)}) needed`
      ) : state.swapping ? (
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 16,
          }}
        />
      ) : (
        "Swap"
      )}
    </SwapButton>
  </>
);
