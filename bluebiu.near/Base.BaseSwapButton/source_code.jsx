const SwapButton = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background-color: #004bfc;
  color: #fff;
  font-size: 18px;
  line-height: 22px;
  border: none;
  transition: 0.5s;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
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
  routerAddress,
  wethAddress,
  title,
} = props;

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
      isApproved: !Big(Number(allowanceRaw._hex)).eq(0),
    });
  });
};

if (inputCurrency.address !== "native") {
  getAllowance();
} else {
  State.update({ isApproved: true });
}

const wrapType =
  inputCurrency.address === "native" && outputCurrency.symbol === "WETH"
    ? 1
    : inputCurrency.symbol === "WETH" && outputCurrency.address === "native"
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
      });
    })
    .catch(() => {
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
  asyncFetch("https://bos-api.delink.one/add-action-data", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param_body),
  });
}

function successCallback(res, callback) {
  const { status, transactionHash } = res;
  callback?.();
  const uuid = Storage.get(
    "zkevm-warm-up-uuid",
    "bluebiu.near/widget/ZKEVMWarmUp.generage-uuid"
  );
  add_action({
    action_title: `Swap ${inputCurrencyAmount} ${inputCurrency.symbol} on ${title}`,
    action_type: "Swap",
    action_tokens: JSON.stringify([
      `${inputCurrency.symbol}`,
      `${outputCurrency.symbol}`,
    ]),
    action_amount: inputCurrencyAmount,
    account_id: account,
    account_info: uuid,
    template: title,
    action_status: status === 1 ? "Success" : "Failed",
    tx_id: transactionHash,
    action_network_id: "Base",
  });
  if (status === 1) {
    onSuccess?.();
  }
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

  if (type === 1) {
    WethContract.deposit({
      value: ethers.utils.parseEther(inputCurrencyAmount),
    })
      .then((tx) => {
        tx.wait().then((res) => {
          onSuccess?.(res);
        });
      })
      .catch((err) => {
        onError?.();
      });
  } else {
    WethContract.withdraw(ethers.utils.parseEther(inputCurrencyAmount))
      .then((tx) => {
        tx.wait().then((res) => {
          onSuccess?.(res);
        });
      })
      .catch((err) => {
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

const handleSwap = () => {
  const type =
    inputCurrency.address === "native"
      ? 1
      : outputCurrency.address === "native"
      ? 2
      : 0;
  const RouterContract = new ethers.Contract(
    routerAddress,
    [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountOut",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountInMax",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "path",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        name: "swapExactTokensForTokens",
        outputs: [
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amountOutMin", type: "uint256" },
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "swapExactETHForTokens",
        outputs: [
          { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint256", name: "amountOutMin", type: "uint256" },
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "swapExactTokensForETH",
        outputs: [
          { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );

  State.update({
    swapping: true,
  });
  if (type === 0) {
    RouterContract.swapExactTokensForTokens(
      ethers.utils.parseUnits(inputCurrencyAmount, inputCurrency.decimals),
      "0",
      [inputCurrency.address, outputCurrency.address],
      account,
      Math.ceil(Date.now() / 1000) + 60,
      { gasLimit: 5000000 }
    )
      .then((res) => {
        successCallback(res, () => {
          State.update({ swapping: false });
        });
      })
      .catch((err) => {
        State.update({
          swapping: false,
        });
      });
    return;
  }
  if (type === 1) {
    RouterContract.swapExactETHForTokens(
      "0",
      [wethAddress, outputCurrency.address],
      account,
      Math.ceil(Date.now() / 1000) + 60,
      { gasLimit: 5000000, value: ethers.utils.parseEther(inputCurrencyAmount) }
    )
      .then((res) => {
        successCallback(res, () => {
          State.update({ swapping: false });
        });
      })
      .catch((err) => {
        State.update({
          swapping: false,
        });
      });
    return;
  }
  if (type === 2) {
    RouterContract.swapExactTokensForETH(
      ethers.utils.parseUnits(inputCurrencyAmount, inputCurrency.decimals),
      "0",
      [inputCurrency.address, wethAddress],
      account,
      Math.ceil(Date.now() / 1000) + 60,
      { gasLimit: 5000000 }
    )
      .then((res) => {
        successCallback(res, () => {
          State.update({ swapping: false });
        });
      })
      .catch((err) => {
        console.log(err);
        State.update({
          swapping: false,
        });
      });
  }
};

return (
  <SwapButton onClick={handleSwap} disabled={state.swapping}>
    {state.swapping ? "Swapping..." : "Swap"}
  </SwapButton>
);
