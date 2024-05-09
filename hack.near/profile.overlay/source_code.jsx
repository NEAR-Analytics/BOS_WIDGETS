const accountId = props.accountId ?? "every.near";

return (
  <div className="m-3 gap 2 d-flex flex-row justify-content-between align-items-center">
    <Widget src="hack.near/widget/profile" props={{ accountId }} />
    <br />
    <Widget src="hack.near/widget/attest" props={{ accountId }} />
  </div>
);
