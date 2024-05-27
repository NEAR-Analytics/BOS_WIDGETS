const {
  amount,
  title,
  account,
  id,
  symbol,
  price,
  handler,
  handleApprove,
  checkAllowance,
  onSuccess,
  onError,
} = props;

if (Big(amount || 0).eq(0)) {
  return (
    <button className="button primary" disabled>
      Enter An Amount
    </button>
  );
}

if (state.loading) {
  return (
    <button className="button primary" disabled>
      <Widget
        src="bluebiu.near/widget/0vix.LendingLoadingIcon"
        props={{
          size: 16,
        }}
      />
    </button>
  );
}

useEffect(() => {
  if (title === "Withdraw") {
    State.update({
      approved: true,
    });
    return;
  }
  State.update({
    loading: true,
  });
  checkAllowance(amount, (approved) => {
    State.update({
      loading: false,
      approved,
    });
  });
}, [amount]);

return (
  <button
    className="button primary"
    disabled={state.loading}
    onClick={() => {
      State.update({
        loading: true,
      });
      if (!state.approved) {
        handleApprove(
          amount,
          () => {
            State.update({
              loading: false,
              approved: true,
            });
          },
          () => {
            State.update({
              loading: false,
            });
          }
        );
        return;
      }
      handler({
        type: "V2",
        amount,
        id,
        method: title === "Deposit" ? "stake" : "unstake",
        symbol,
        price,
        onSuccess: () => {
          State.update({
            loading: false,
          });
          onSuccess?.();
        },
        onError: () => {
          State.update({
            loading: false,
          });
          onError?.();
        },
      });
    }}
  >
    {state.approved ? title : "Approve"}
  </button>
);
