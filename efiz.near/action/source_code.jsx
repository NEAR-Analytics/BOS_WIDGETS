const accountId = context.accountId;

const action = accountId
  ? Social.get(`${accountId}/settings/every/action`)
  : undefined;

if (action === null) {
  return "Loading";
}

return <Widget src={action ?? "efiz.near/widget/action.default"} />;
