const SwapButton = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background-color: var(--button-color);
  color: var(--button-text-color);
  font-size: 18px;
  line-height: 22px;
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
if (props.noPair) {
  return <SwapButton disabled>Insufficient Liquidity</SwapButton>;
}

if (props.loading) {
  return <SwapButton disabled>Getting Trade Info...</SwapButton>;
}

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
  fee,
  uniType,
  chainName,
  handlerV2,
  handlerV3,
  handlerSolidly,
  handleSyncswap,
  stable,
  syncSwapPoolAddress,
  chainId,
} = props;

if (Big(inputCurrencyAmount || 0).eq(0)) {
  return <SwapButton disabled>Enter An Amount</SwapButton>;
}
if (!inputCurrency || !outputCurrency) {
  return <SwapButton disabled>Select a token</SwapButton>;
}
if (Big(outputCurrencyAmount).lt("0.00000000001")) {
  return <SwapButton disabled>Insufficient Liquidity</SwapButton>;
}
if (Big(inputCurrencyAmount || 0).gt(maxInputBalance)) {
  return (
    <SwapButton disabled>
      Insufficient {inputCurrency?.symbol} Balance
    </SwapButton>
  );
}

State.init({
  isApproved: false,
  approving: false,
  swapping: false,
  wrapping: false,
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
    <SwapButton onClick={handleApprove} disabled={state.approving}>
      {state.approving ? " Approving..." : " Approve"}
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
      {wrapType === 1
        ? state.wrapping
          ? "Wrapping..."
          : "Wrap"
        : state.wrapping
        ? "Unwrapping..."
        : "Unwrap"}
    </SwapButton>
  );
}

return (
  <>
    {uniType === "v2" && state.swapping && (
      <Widget
        src={handlerV2}
        props={{
          inputCurrencyAmount,
          outputCurrencyAmount,
          inputCurrency,
          outputCurrency,
          wethAddress,
          account,
          routerAddress,
          swapping: state.swapping,
          title,
          onSuccess: (res) => {
            successCallback(res, () => {
              State.update({ swapping: false });
            });
          },
          onError: (err) => {
            State.update({ swapping: false });
            toast?.dismiss(state.toastId);
            toast?.fail({
              title: "Swap Failed!",
              text: err?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : `Swaped ${inputCurrencyAmount} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
            });
          },
        }}
      />
    )}

    {uniType === "solidly" && state.swapping && (
      <Widget
        src={handlerSolidly}
        props={{
          inputCurrencyAmount,
          outputCurrencyAmount,
          inputCurrency,
          outputCurrency,
          wethAddress,
          account,
          routerAddress,
          swapping: state.swapping,
          title,
          stable,
          onSuccess: (res) => {
            successCallback(res, () => {
              State.update({ swapping: false });
            });
          },
          onError: (err) => {
            State.update({ swapping: false });
            toast?.dismiss(state.toastId);
            toast?.fail({
              title: "Swap Failed!",
              text: err?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : `Swaped ${inputCurrencyAmount} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
            });
          },
        }}
      />
    )}

    {uniType === "Syncswap" && state.swapping && (
      <Widget
        src={handleSyncswap}
        props={{
          inputCurrencyAmount,
          outputCurrencyAmount,
          inputCurrency,
          outputCurrency,
          wethAddress,
          account,
          routerAddress,
          swapping: state.swapping,
          title,
          stable,
          syncSwapPoolAddress,
          onSuccess: (res) => {
            successCallback(res, () => {
              State.update({ swapping: false });
            });
          },
          onError: (err) => {
            State.update({ swapping: false });
            toast?.dismiss(state.toastId);
            toast?.fail({
              title: "Swap Failed!",
              text: err?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : `Swaped ${inputCurrencyAmount} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
            });
          },
        }}
      />
    )}

    {uniType === "v3" && state.swapping && (
      <Widget
        src={handlerV3}
        props={{
          inputCurrencyAmount,
          inputCurrency,
          wethAddress,
          outputCurrency,
          account,
          fee,
          routerAddress,
          swapping: state.swapping,
          onSuccess: (res) => {
            successCallback(res, () => {
              State.update({ swapping: false });
            });
          },
          onError: (err) => {
            State.update({ swapping: false });
            toast?.dismiss(state.toastId);
            toast?.fail({
              title: "Swap Failed!",
              text: err?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : `Swaped ${inputCurrencyAmount} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
            });
          },
        }}
      />
    )}

    <SwapButton
      onClick={() => {
        const toastId = toast?.loading({
          title: `Swap ${inputCurrencyAmount} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
        });
        State.update({ swapping: true, toastId });
      }}
      disabled={state.swapping}
    >
      {state.swapping ? "Swapping..." : "Swap"}
    </SwapButton>
  </>
);
