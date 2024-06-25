const accountId = props.accountId ?? "every.near";

return (
  <div
    style={{ fontFamily: "Courier" }}
    className="m-3 gap-5 d-flex flex-row justify-content-between align-items-center"
  >
    <Widget src="hack.near/widget/profile" props={{ accountId }} />
    <Widget src="hack.near/widget/attest" props={{ accountId }} />
  </div>
);
