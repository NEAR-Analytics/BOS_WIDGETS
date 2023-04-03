const accountId = props.accountId ?? context.accountId;

const pagepage = accountId
  ? Social.get(`${accountId}/settings/near.social/page`)
  : undefined;

if (homepage === null) {
  return "Loading...";
}

return <Widget src="create.near/widget/ABC.Content" props={props} />;
