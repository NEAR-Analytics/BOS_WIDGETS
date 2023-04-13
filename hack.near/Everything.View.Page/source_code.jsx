const accountId = props.accountId ?? context.accountId;
const domain = props.domain ?? "abc";

return (
  <>
    <Widget src="mob.near/widget/ProfileOnboarding" />
    <Widget src="hack.near/widget/ABC.Page.Content" props={domain} />
  </>
);
