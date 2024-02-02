const accountId = props.accountId ?? context.accountId;

const homepage = accountId
  ? Social.get(`${accountId}/settings/near.social/homepage`)
  : undefined;

if (homepage === null) {
  return "Loading";
}

const markdown = ` ## SocialTeen`;

return (
  <div>
    <Markdown text={markdown} />
    <Widget src="mugdha.near/widget/Feed" props={props} />
  </div>
);
