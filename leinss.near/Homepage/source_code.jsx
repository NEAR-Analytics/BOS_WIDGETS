const accountId = context.accountId;

const homepage = accountId
  ? Social.get(`${accountId}/settings/near.social/homepage`)
  : undefined;

if (homepage === null) {
  return "Loading";
}

return (
  <>
    <Widget src={"leinss.near/widget/LidoChanged"} props={props} />

    <Widget src={homepage ?? "mob.near/widget/Welcome"} props={props} />
  </>
);
