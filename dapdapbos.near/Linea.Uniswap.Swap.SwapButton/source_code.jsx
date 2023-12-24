const SwapButtonConnectWrapper = styled.button`
  border: none;
  width: 100%;
  background: transparent;

  .connect-button {
    width: 100%;
    height: 60px;
    border-radius: 10px;
    background-color: #62ddff;
    color: #1b1b1b;
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
      background-color: #1d2a30;
      color: #62ddff;
      pointer-events: none;
    }
    @media (max-width: 768px) {
      height: 50px;
      font-size: 16px;
    }
  }
`;

const SwapButton = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background-color: #62ddff;
  margin-top: 4px;

  color: #1b1b1b;
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
    background-color: #1d2a30;
    color: #62ddff;
    pointer-events: none;
  }
  @media (max-width: 768px) {
    height: 50px;
    font-size: 16px;
  }
`;

const {
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  outputCurrencyAmount,
  maxInputBalance,
  onSuccess,
  routerAddress,
  wethAddress,
  title,
  uniType,
  chainName,
  handlerV3,
  handleSyncswap,
  stable,
  syncSwapPoolAddress,
  chainId,
  currentChainId,
  slippage,
  trade,
  onPending,
  openRequestModal,
  toast,
  addTransaction,
} = props;
const account = Ethers.send("eth_requestAccounts", [])[0];

if (!account) {
  return (
    <SwapButtonConnectWrapper>
      <Web3Connect className="connect-button" connectLabel="Connect Wallet" />
    </SwapButtonConnectWrapper>
  );
}

if (chainId !== currentChainId) {
  return (
    <SwapButton
      onClick={() => {
        Ethers.send("wallet_switchEthereumChain", [
          { chainId: `0x${Number(chainId).toString(16)}` },
        ]);
      }}
    >
      Switch Linea Chain
    </SwapButton>
  );
}

if (props.noPair) {
  const NoPairButton = styled.div`
    color: #ff75bf;
    font-size: 18px;
    font-weight: 400;
    height: 62px;
    flex-shrink: 0;
    border-radius: 16px;
    background: rgba(255, 117, 191, 0.1);
    margin-top: 4px;
    text-align: center;
    line-height: 62px;
  `;
  return <NoPairButton>No pool available</NoPairButton>;
}

if (props.loading) {
  return <SwapButton disabled>Getting Trade Info...</SwapButton>;
}

if (Big(inputCurrencyAmount || 0).eq(0)) {
  return <SwapButton disabled>Enter An Amount</SwapButton>;
}
if (!inputCurrency || !outputCurrency) {
  return <SwapButton disabled>Select a token</SwapButton>;
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
    ethers.utils.parseUnits(inputCurrencyAmount, inputCurrency.decimals)
  )
    .then((tx) => {
      tx.wait().then((res) => {
        const { status, transactionHash } = res;
        State.update({
          isApproved: status === 1,
          approving: false,
        });
        if (status === 1) {
          toast.success?.({
            title: "Transaction Successful!",
            text: `Approved ${inputCurrency.symbol}`,
          });
        } else {
          toast.fail?.({
            title: "Transaction Failed!",
            text: `Approved ${inputCurrency.symbol}`,
          });
        }
        addTransaction?.({
          icons: [inputCurrency.icon],
          failed: status !== 1,
          tx: transactionHash,
          handler: "Approved",
          desc: inputCurrency.symbol,
          time: Date.now(),
        });
      });
    })
    .catch((err) => {
      if (err.code === "ACTION_REJECTED") {
        toast.fail?.({
          title: "Transaction Failed",
          text: `User rejected the request. Details: 
          MetaMask Tx Signature: User denied transaction signature. `,
        });
      }
      State.update({
        approving: false,
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

function add_action(param_body) {
  asyncFetch("https://api.dapdap.net/api/uniswap/records/add", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param_body),
  });
}
const tradeText = `${
  Big(inputCurrencyAmount).lt(0.001)
    ? "<0.001"
    : Big(inputCurrencyAmount).toFixed(3)
} ${inputCurrency.symbol} to ${
  Big(outputCurrencyAmount || 0).lt(0.001)
    ? "<0.001"
    : Big(outputCurrencyAmount || 0).toFixed(3)
} ${outputCurrency.symbol} `;
function successCallback(tx, callback) {
  const prices = Storage.get(
    "tokensPrice",
    "dapdapbos.near/widget/Linea.Uniswap.Swap.TokensPrice"
  );
  tx.wait().then((res) => {
    const { status, transactionHash } = res;
    callback?.();
    const _amountIn = Big(inputCurrencyAmount || 0).mul(
      Big(10).pow(inputCurrency.decimals)
    );
    const _amountOut = Big(outputCurrencyAmount || 0).mul(
      Big(10).pow(outputCurrency.decimals)
    );
    const _priceIn = prices[inputCurrency.symbol] || 0;
    const _priceOut = prices[outputCurrency.symbol] || 0;

    add_action({
      sender: account,
      tx_hash: transactionHash,
      token_in_address: inputCurrency.address,
      token_in_volume: _amountIn.toString(),
      token_in_usd_amount: Big(inputCurrencyAmount || 0)
        .mul(_priceIn)
        .toFixed(0),
      token_out_address: outputCurrency.address,
      token_out_volume: _amountOut.toString(),
      token_out_usd_amount: Big(outputCurrencyAmount || 0)
        .mul(_priceOut)
        .toFixed(0),
    });
    if (status === 1) {
      onSuccess?.();
      toast.success?.({
        title: "Transaction Successful!",
        text: "Swap" + tradeText,
      });
    } else {
      toast.fail?.({
        title: "Transaction Failed!",
        text: "Swap" + tradeText,
      });
    }
    addTransaction?.({
      icons: [inputCurrency.icon, outputCurrency.icon],
      failed: status !== 1,
      tx: transactionHash,
      handler: status !== 1 ? "Swap Failed" : "Swapped",
      desc: tradeText,
      time: Date.now(),
    });
  });
}

const handleWrap = (type, onSuccess, onError) => {
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
  openRequestModal?.({
    status: 1,
    text: type === 1 ? "Wrapped" : "Unwrapped" + tradeText,
    open: true,
  });
  if (type === 1) {
    WethContract.deposit({
      value: ethers.utils.parseEther(inputCurrencyAmount),
    })
      .then((tx) => {
        openRequestModal?.({
          status: 0,
          text: type === 1 ? "Wrapped" : "Unwrapped" + tradeText,
          open: true,
          tx: tx.hash,
        });
        tx.wait().then((res) => {
          onSuccess?.(res);
          if (res.status === 1) {
            toast.success?.({
              title: "Transaction Successful!",
              text: "Wrapped" + tradeText,
            });
          } else {
            toast.fail?.({
              title: "Transaction Failed!",
              text: "Wrapped" + tradeText,
            });
          }
          addTransaction?.({
            icons: [inputCurrency.icon, outputCurrency.icon],
            failed: res.status !== 1,
            tx: res.transactionHash,
            handler: res.status !== 1 ? "Wrapp Failed" : "Wrapped",
            desc: tradeText,
            time: Date.now(),
          });
        });
      })
      .catch((err) => {
        if (err.code === "ACTION_REJECTED") {
          toast.fail?.({
            title: "Transaction Failed",
            text: `User rejected the request. Details: 
            MetaMask Tx Signature: User denied transaction signature. `,
          });
        }
        onError?.();
      });
  } else {
    WethContract.withdraw(ethers.utils.parseEther(inputCurrencyAmount))
      .then((tx) => {
        openRequestModal?.({
          status: 0,
          text: type === 1 ? "Wrapped" : "Unwrapped" + tradeText,
          open: true,
          tx: tx.hash,
        });
        tx.wait().then((res) => {
          onSuccess?.(res);
          if (res.status === 1) {
            toast.success?.({
              title: "Transaction Successful!",
              text: "Unwrapped" + tradeText,
            });
          } else {
            toast.fail?.({
              title: "Transaction Failed!",
              text: "Unwrapped" + tradeText,
            });
          }
          addTransaction?.({
            icons: [inputCurrency.icon, outputCurrency.icon],
            failed: res.status !== 1,
            tx: res.transactionHash,
            handler: res.status !== 1 ? "Unwrapp Failed" : "Unwrapped",
            desc: tradeText,
            time: Date.now(),
          });
        });
      })
      .catch((err) => {
        if (err.code === "ACTION_REJECTED") {
          toast.fail?.({
            title: "Transaction Failed",
            text: `User rejected the request. Details: 
            MetaMask Tx Signature: User denied transaction signature. `,
          });
        }
        onError?.();
      });
  }
};

if (wrapType) {
  return (
    <SwapButton
      onClick={() => {
        State.update({
          wrapping: true,
        });
        handleWrap(
          wrapType,
          (res) => {
            successCallback(res, () => {
              State.update({ wrapping: false });
            });
          },
          () => {
            State.update({
              wrapping: false,
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
    {uniType === "v3" && state.swapping ? (
      <Widget
        src={handlerV3}
        props={{
          inputCurrencyAmount,
          outputCurrencyAmount,
          inputCurrency,
          outputCurrency,
          wethAddress,
          account,
          chainId,
          slippage,
          routerAddress,
          swapping: state.swapping,
          title,
          trade,
          tradeText,
          openRequestModal,
          onSuccess: (res) => {
            openRequestModal?.({
              status: 0,
              text: "Swap" + tradeText,
              open: true,
              tx: res.hash,
            });
            successCallback(res, () => {
              onPending(false);
              State.update({ swapping: false });
            });
          },
          onError: (err) => {
            onPending(false);
            State.update({ swapping: false });
            openRequestModal?.({ open: false });
            if (err.code !== "ACTION_REJECTED") {
              openRequestModal?.({
                status: 3,
                open: true,
              });
            } else {
              openRequestModal?.({
                open: false,
              });
              toast.fail?.({
                title: "Transaction Failed",
                text: `User rejected the request. Details: 
                MetaMask Tx Signature: User denied transaction signature. `,
              });
            }
          },
        }}
      />
    ) : (
      ""
    )}

    <SwapButton
      onClick={() => {
        onPending(true);
        openRequestModal?.({
          status: 1,
          text: "Swap" + tradeText,
          open: true,
        });
        State.update({ swapping: true });
      }}
      disabled={state.swapping}
    >
      {state.swapping ? "Swapping..." : "Swap"}
    </SwapButton>
  </>
);
