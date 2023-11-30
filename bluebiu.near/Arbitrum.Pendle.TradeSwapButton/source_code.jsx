const SwapButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: ${props.theme.buttonColor};
  color: #fff;
  font-size: 18px;
  line-height: 22px;
  border: none;
  transition: 0.5s;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
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
const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;
const account = Ethers.send("eth_requestAccounts", [])[0];

if (props.loading) {
  return <SwapButton disabled>Getting Trade Info...</SwapButton>;
}

const {
  inputCurrency,
  extraInputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  outputCurrencyAmount,
  aggregatorTokenOut,
  maxInputBalance,
  maxInputBalanceExtra,
  tradeInfo,
  onSuccess,
  routerAddress,
  actionType,
  market,
  mintParams,
  gettingTrade,
  swapping,
  updateSwapping,
  onMessage,
  updateInputTokenBalance,
} = props;

State.init({
  isApproved: false,
  isExtraApproved: false,
  loadAllowanceDone: false,
  approving: false,
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
  TokenContract.allowance(account, routerAddress).then((inputAllowance) => {
    if (actionType === "Redeem") {
      TokenContract.allowance(account, routerAddress).then(
        (extraInputAllowance) => {
          State.update({
            isExtraApproved: !Big(
              ethers.utils.formatUnits(
                extraInputAllowance._hex,
                inputCurrency.decimals
              )
            ).lt(inputCurrencyAmount),
            isApproved: !Big(
              ethers.utils.formatUnits(
                inputAllowance._hex,
                inputCurrency.decimals
              )
            ).lt(inputCurrencyAmount),
            loadAllowanceDone: true,
          });
        }
      );
    } else {
      State.update({
        isApproved: !Big(
          ethers.utils.formatUnits(inputAllowance._hex, inputCurrency.decimals)
        ).lt(inputCurrencyAmount),
        isExtraApproved: true,
        loadAllowanceDone: true,
      });
    }
  });
};

if (gettingTrade && actionType == "Swap") {
  return (
    <SwapButton disabled>
      <Widget
        src="bluebiu.near/widget/0vix.LendingLoadingIcon"
        props={{
          size: 16,
        }}
      />
      Get Best Trade
    </SwapButton>
  );
}

console.log({ state, props });

if (updateInputTokenBalance) {
  return (
    <SwapButton disabled>
      <Widget
        src="bluebiu.near/widget/0vix.LendingLoadingIcon"
        props={{
          size: 16,
        }}
      />
    </SwapButton>
  );
}

if (Big(inputCurrencyAmount || 0).eq(0)) {
  return <SwapButton disabled>Enter An Amount</SwapButton>;
}
if (!inputCurrency || (actionType === "Swap" && !outputCurrency)) {
  return <SwapButton disabled>Select a token</SwapButton>;
}

if (Big(inputCurrencyAmount || 0).gt(maxInputBalance || 0)) {
  return (
    <SwapButton disabled>
      Insufficient {inputCurrency?.symbol} Balance
    </SwapButton>
  );
}

if (
  actionType === "Redeem" &&
  Big(inputCurrencyAmount || 0).gt(maxInputBalanceExtra || 0)
) {
  return (
    <SwapButton disabled>
      Insufficient {extraInputCurrency?.symbol} Balance
    </SwapButton>
  );
}

const handleApprove = (isExtra) => {
  State.update({
    approving: true,
  });
  const TokenContract = new ethers.Contract(
    isExtra ? extraInputCurrency.address : inputCurrency.address,
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
        const params = isExtra
          ? { isExtraApproved: status === 1 }
          : { isApproved: status === 1 };
        onMessage?.({
          status: status === 1 ? 1 : 2,
          open: true,
          title: status === 1 ? "Approved successed!" : "Approved failed!",
          hash: transactionHash,
        });
        State.update({
          ...params,
          approving: false,
        });
      });
    })
    .catch(() => {
      State.update({
        approving: false,
      });
      onMessage?.({
        status: 2,
        open: true,
        title: "Approved failed!",
      });
    });
};

const allowanceQs = `${inputCurrencyAmount}-${inputCurrency.address}-${actionType}`;

if (allowanceQs !== state.allowanceQs) {
  State.update({
    allowanceQs,
    loadAllowanceDone: false,
  });
  if (inputCurrency.address !== "active") {
    getAllowance();
  } else {
    State.update({ isApproved: true, loadAllowanceDone: true });
  }
}

if (!state.loadAllowanceDone) {
  return (
    <SwapButton disabled>
      <Widget
        src="bluebiu.near/widget/0vix.LendingLoadingIcon"
        props={{
          size: 16,
        }}
      />
    </SwapButton>
  );
}

if (!state.isApproved || !state.isExtraApproved) {
  return (
    <Buttons>
      {!state.isApproved && (
        <SwapButton
          onClick={() => {
            handleApprove(false);
          }}
          disabled={state.approving}
        >
          {state.approving && (
            <Widget
              src="bluebiu.near/widget/0vix.LendingLoadingIcon"
              props={{
                size: 16,
              }}
            />
          )}
          Approve {inputCurrency.symbol}
        </SwapButton>
      )}
      {actionType === "Redeem" && !state.isExtraApproved && (
        <SwapButton
          onClick={() => {
            handleApprove(true);
          }}
          disabled={state.approving}
        >
          {state.approving && (
            <Widget
              src="bluebiu.near/widget/0vix.LendingLoadingIcon"
              props={{
                size: 16,
              }}
            />
          )}
          Approve {extraInputCurrency.symbol}
        </SwapButton>
      )}
    </Buttons>
  );
}

if (Big(outputCurrencyAmount || 0).lte(0)) {
  return <SwapButton disabled>{actionType}</SwapButton>;
}

const AccessKey = Storage.get(
  "AccessKey",
  "guessme.near/widget/ZKEVMWarmUp.add-to-quest-card"
);

function add_action(param_body) {
  asyncFetch("/dapdap/api/action/add ", {
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
      action_title: `${actionType} ${inputCurrencyAmount} ${inputCurrency.symbol} on Pendle`,
      action_type: actionType,
      action_tokens: JSON.stringify([
        `${inputCurrency.symbol}`,
        `${outputCurrency.symbol}`,
      ]),
      action_amount: inputCurrencyAmount,
      account_id: account,
      account_info: uuid,
      template: "Pendle",
      action_status: status === 1 ? "Success" : "Failed",
      tx_id: transactionHash,
      action_network_id: "Arbitrum",
    });
    if (status === 1) {
      onSuccess?.();
    }
    onMessage?.({
      status: status === 1 ? 1 : 2,
      open: true,
      title: `${actionType} ${
        status === 1 ? "Mint Successfully!" : "Mint Failed!"
      }`,
      hash: transactionHash,
    });
  });
}

return (
  <>
    {actionType === "Swap" && swapping && (
      <Widget
        src="bluebiu.near/widget/Arbitrum.Pendle.TradeSwapAction"
        props={{
          routerAddress,
          swapping: swapping,
          account,
          tradeInfo,
          market: market,
          inputCurrency,
          outputCurrency,
          inputCurrencyAmount,
          aggregatorTokenOut,
          onSuccess: (res) => {
            onMessage?.({
              status: 3,
              open: true,
              title: "Transaction Submitted!",
              text: `Swap ${inputCurrencyAmount} ${inputCurrency.symbol} to ${outputCurrency.symbol}!`,
              hash: res.hash,
            });
            successCallback(res, () => {
              updateSwapping(false);
            });
          },
          onError: (err) => {
            updateSwapping(false);
            onMessage?.({
              status: 2,
              open: true,
              title: "Swap Failed!",
              text: err.reason,
            });
          },
        }}
      />
    )}
    {actionType === "Mint" && swapping && (
      <Widget
        src="bluebiu.near/widget/Arbitrum.Pendle.TradeMintAction"
        props={{
          inputCurrencyAmount,
          inputCurrency,
          wethAddress,
          outputCurrency,
          account,
          fee,
          routerAddress,
          swapping: swapping,
          market,
          onSuccess: (res) => {
            onMessage?.({
              status: 3,
              open: true,
              title: "Transaction Submitted!",
              text: `Mint PT and YT from ${inputCurrencyAmount} ${inputCurrency.symbol}!`,
              hash: res.hash,
            });
            successCallback(res, () => {
              updateSwapping(false);
            });
          },
          onError: (err) => {
            updateSwapping(false);
            onMessage?.({
              status: 2,
              open: true,
              title: "Mint Failed!",
              text: err.reason,
            });
          },
        }}
      />
    )}
    {actionType === "Redeem" && swapping && (
      <Widget
        src="bluebiu.near/widget/Arbitrum.Pendle.TradeRedeemAction"
        props={{
          inputCurrencyAmount,
          inputCurrency,
          wethAddress,
          outputCurrency,
          account,
          fee,
          market,
          routerAddress,
          swapping: swapping,
          onSuccess: (res) => {
            onMessage?.({
              status: 3,
              open: true,
              title: "Transaction Submitted!",
              text: `Redeem ${inputCurrencyAmount} PT and ${inputCurrencyAmount} YT to ${outputCurrency.symbol}!`,
              hash: res.hash,
            });
            successCallback(res, () => {
              updateSwapping(false);
            });
          },
          onError: (err) => {
            updateSwapping(false);
            onMessage?.({
              status: 2,
              open: true,
              title: "Redeem Failed!",
              text: err.reason,
            });
          },
        }}
      />
    )}

    <SwapButton
      onClick={() => {
        updateSwapping(true);
      }}
      disabled={swapping}
    >
      {swapping && (
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 16,
          }}
        />
      )}
      {actionType}
    </SwapButton>
  </>
);
