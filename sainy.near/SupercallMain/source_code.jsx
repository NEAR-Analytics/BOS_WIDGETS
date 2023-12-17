function processCall() {}

return (
  <div>
    <div>
      <h2>Accounts</h2>
      <Widget src="sainy.near/widget/SupercallAccount" />
    </div>
    <div>
      <h2>Calls</h2>
      <Widget src="sainy.near/widget/SupercallBundler" />
    </div>
    <div>
      <button onClick={processCall}>Call</button>
    </div>
  </div>
);
