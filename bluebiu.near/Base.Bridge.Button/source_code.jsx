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
const account = Ethers.send("eth_requestAccounts", [])[0];
const {
  disabled,
  amount,
  maxInputBalance,
  currency,
  from,
  target,
  handlerSwap,
  addAction,
  gasCost,
  isGasEnough,
  onSuccess,
} = props;

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
      tx.wait().then((res) => {
        const { status, transactionHash } = res;
        State.update({
          isApproved: status === 1,
          loading: false,
        });
      });
    })
    .catch(() => {
      State.update({
        loading: false,
      });
    });
};

if (!state.isApproved) {
  return (
    <Button onClick={handleApprove} disabled={state.loading}>
      {state.loading && (
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 16,
          }}
        />
      )}
      Approve
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
          if (status === 1) {
            onSuccess?.(transactionHash);
          }
        },
        onError: (err) => {
          State.update({ loading: false });
        },
      }}
    />
    <Button
      onClick={() => {
        State.update({ loading: true });
      }}
      disabled={state.loading}
    >
      {state.loading && (
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 16,
          }}
        />
      )}
      Confirm
    </Button>
  </>
);
