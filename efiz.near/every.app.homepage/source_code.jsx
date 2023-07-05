const accountId = context.accountId;

const homepage = accountId
  ? Social.get(`${accountId}/settings/every/homepage`)
  : undefined;

if (homepage === null) {
  return "Loading";
}

return (
  <Widget src={homepage ?? "efiz.near/widget/placeholder"} props={props} />
);
