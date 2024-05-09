const accountId = props.accountId ?? "every.near";

return (
  <div className="m-2 gap-3 d-flex flex-row justify-content-between align-items-center">
    <Widget src="hack.near/widget/profile" props={{ accountId }} />
    <Widget src="hack.near/widget/attest" props={{ accountId }} />
  </div>
);
