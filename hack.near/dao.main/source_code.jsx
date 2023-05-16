const accountId = context.accountId;

const main = accountId
  ? Social.get(`${accountId}/settings/dao/main`)
  : undefined;

if (main === null) {
  return "Loading";
}

return <Widget src={main ?? "mob.near/widget/Welcome"} props={props} />;
