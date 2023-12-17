function readAddress(accountNumber) {
  const addr = Storage.get(
    `contractAddress:${accountNumber}`,
    "sainy.near/widget/SupercallDeployer"
  );
  return addr;
}

function handleAddAccount() {
  State.update({
    accountNumbers: [
      ...state.accountNumbers,
      state.accountNumbers.length.toString(),
    ],
  });
}

State.init({
  accountNumbers: [],
});

return (
  <div>
    {state.accountNumbers.map((acc) => (
      <div key={acc} className="border border-1 rounded rounded-md p-2">
        <div>Account Number: {acc}</div>
        <div>Address: {readAddress(acc)}</div>
        <Widget
          src="sainy.near/widget/SupercallDeployer"
          props={{ accountNumber: acc }}
        />
      </div>
    ))}
    <div>
      <button onClick={handleAddAccount}>+</button>
    </div>
  </div>
);
