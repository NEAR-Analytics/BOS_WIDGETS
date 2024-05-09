State.init({ accountId: props.accountId ?? context.accountId });

useEffect(() => {
  asyncFetch(
    `https://lnr-airdrop.linearprotocol.org/1/${state.accountId}`
  ).then((data) => {
    if (data.ok && data.body) {
      State.update({
        balance: Number(data.body) / 471.621500185,
        points: Number(data.body),
      });
    } else {
      State.update({ balance: 0 });
    }
  });
}, [state.accountId]);

return (
  <div>
    <h1>Check LiNEAR Airdrop eligibility</h1>
    <div class="mb-3">
      Input NEAR account
      <input
        type="text"
        value={state.accountId}
        onChange={(e) => State.update({ accountId: e.target.value })}
      />
    </div>
    {!!state.balance && (
      <div>
        <div>Points: {state.points.toLocaleString()} </div>
        <div>$LNR: {state.balance.toLocaleString()} </div>
        <div>
          <a
            href="https://app.linearprotocol.org/airdrop"
            target="_blank"
            class="btn btn-success"
          >
            Claim
          </a>
        </div>
      </div>
    )}
    {state.accountId && !state.balance && (
      <div>{state.accountId} points were not found</div>
    )}
  </div>
);
