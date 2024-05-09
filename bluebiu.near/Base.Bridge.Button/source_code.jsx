const Button = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background-color: var(--button-color);
  line-height: 60px;
  border: none;
  font-size: 18px;
  font-weight: 500;
  color: var(--button-text-color);
  margin-top: 20px;

  &:disabled {
    opacity: 0.5;
  }
`;
const {
  disabled,
  loading,
  amount,
  maxInputBalance,
  currency,
  from,
  target,
  handlerSwap,
  addAction,
  toast,
  gasCost,
  isGasEnough,
  onSuccess,
  account,
  quote,
} = props;

if (loading)
  return (
    <Button disabled={disabled}>
      <Widget src="bluebiu.near/widget/0vix.LendingLoadingIcon" />
    </Button>
  );
if (disabled) return <Button disabled={disabled}>Confrim</Button>;

if (Big(amount || 0).eq(0))
  return <Button disabled={true}>Enter An Amount</Button>;
if (Big(amount || 0).gt(maxInputBalance || 0) || !currency) {
  return <Button disabled>Insufficient {currency?.symbol} Balance</Button>;
}

State.init({
  isApproved: false,
  loading: false,
});
if (!isGasEnough) {
  return (
    <Button disabled>
      Not enough gas, {Big(gasCost || 0).toFixed(3)} needed
    </Button>
  );
}
const spender = currency
  ? currency.oftAddress
    ? currency.oftAddress
    : currency.isNative
    ? from.routerEthAddress
    : from.routerAddress
  : "";

const getAllowance = () => {
  if (!spender) return;
  const TokenContract = new ethers.Contract(
    currency.address,
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
    Ethers?.provider()?.getSigner()
  );
  TokenContract?.allowance(account, spender)
    .then((allowanceRaw) => {
      State.update({
        isApproved: !Big(
          ethers.utils.formatUnits(allowanceRaw._hex, currency.decimals)
        ).lt(amount),
      });
    })
    .catch((err) => {});
};

if (!currency?.isNative) {
  getAllowance();
} else {
  State.update({ isApproved: true });
}

const handleApprove = () => {
  const toastId = toast?.loading({
    title: `Approve ${amount} ${currency?.symbol}`,
  });
  State.update({
    loading: true,
  });
  const TokenContract = new ethers.Contract(
    currency.address,
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
    spender,
    ethers.utils.parseUnits(amount, currency.decimals)
  )
    .then((tx) => {
      tx.wait()
        .then((res) => {
          const { status, transactionHash } = res;
          if (status !== 1) throw new Error("");
          toast?.dismiss(toastId);
          State.update({
            isApproved: true,
            loading: false,
          });
          toast?.success({
            title: "Approve Successfully!",
            text: `Approve ${amount} ${currency?.symbol}`,
            tx: transactionHash,
            chainId: from.id,
          });
        })
        .catch((err) => {
          State.update({
            isApproved: false,
            loading: false,
          });
          toast?.dismiss(toastId);
          toast?.fail({
            title: "Approve Failed!",
            text: `Approve ${amount} ${currency?.symbol}`,
            tx: transactionHash,
            chainId: from.id,
          });
        });
    })
    .catch((err) => {
      State.update({
        loading: false,
      });
      toast?.dismiss(toastId);
      toast?.fail({
        title: "Approve Failed!",
        text: err?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : `Approve ${amount} ${currency?.symbol}`,
      });
    });
};

if (!state.isApproved) {
  return (
    <Button onClick={handleApprove} disabled={state.loading}>
      {state.loading ? (
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

return (
  <>
    <Widget
      src={handlerSwap}
      props={{
        amount,
        account,
        currency,
        routerAddress: from.routerAddress,
        routerEthAddress: from.routerEthAddress,
        loading: state.loading,
        target,
        quote,
        onSuccess: (res) => {
          State.update({ loading: false });
          const { status, transactionHash } = res;
          addAction?.({
            type: "Bridge",
            fromChainId: from.id,
            toChainId: target.id,
            token: currency,
            amount: amount,
            template: "Stargate Bridge",
            add: false,
            status,
            transactionHash,
          });
          toast?.dismiss(state.toastId);
          if (status === 1) {
            onSuccess?.(transactionHash);
            toast?.success({
              title: "Bridge Successfully!",
              text: `Bridge ${amount} ${inputCurrency.symbol} from ${from.name} to ${target.name}`,
              tx: transactionHash,
              chainId: from.id,
            });
          } else {
            toast?.fail({
              title: "Bridge Failed!",
              text: `Bridge ${amount} ${inputCurrency.symbol} from ${from.name} to ${target.name}`,
              tx: transactionHash,
              chainId: from.id,
            });
          }
        },
        onError: (tx) => {
          State.update({ loading: false });
          toast?.dismiss(state.toastId);
          toast?.fail({
            title: "Bridge Failed!",
            text: tx?.message?.includes("user rejected transaction")
              ? "User rejected transaction"
              : `Bridge ${amount} ${inputCurrency.symbol} from ${from.name} to ${target.name}`,
            tx: tx ? tx.hash : "",
            chainId,
          });
        },
      }}
    />
    <Button
      onClick={() => {
        const toastId = toast?.loading({
          title: `Bridge ${amount} ${inputCurrency.symbol} from ${from.name} to ${target.name}`,
        });
        State.update({ loading: true, toastId });
      }}
      disabled={state.loading}
    >
      {state.loading ? (
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 16,
          }}
        />
      ) : (
        "Confirm"
      )}
    </Button>
  </>
);
