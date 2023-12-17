function readAddress() {
  const addr = Storage.get(
    "sainy.near/widget/SupercallDeployer",
    `contractAddress:${state.accountNumber}`
  );
  console.log(addr);
  return addr;
}

State.init({
  accountNumber: "0",
});

return (
  <div>
    <div>
      <input
        onChange={(e) => State.update({ accountNumber: e.target.value })}
      />
    </div>
    <div>Address: {readAddress()}</div>
    <Widget
      src="sainy.near/widget/SupercallDeployer"
      props={{ accountNumber: state.accountNumber }}
    />
  </div>
);
