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
} = props;
console.log("props: ", props);

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
const AccessKey = Storage.get(
  "AccessKey",
  "guessme.near/widget/ZKEVMWarmUp.add-to-quest-card"
);
function add_action(param_body) {
  asyncFetch("https://test-api.dapdap.net/api/action/add-action-data", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: AccessKey,
    },
    body: JSON.stringify(param_body),
  });
}

function successCallback(tx, callback) {
  tx.wait().then((res) => {
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
      action_network_id: chainName,
    });
    if (status === 1) {
      onSuccess?.();
    }
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
        onError?.();
      });
  } else {
    WethContract.withdraw(
      ethers.utils.parseEther(Big(inputCurrencyAmount).toFixed(18).toString())
    )
      .then((tx) => {
        success?.(tx);
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
          },
        }}
      />
    )}

    <SwapButton
      onClick={() => {
        State.update({ swapping: true });
      }}
      disabled={state.swapping}
    >
      {state.swapping ? "Swapping..." : "Swap"}
    </SwapButton>
  </>
);
