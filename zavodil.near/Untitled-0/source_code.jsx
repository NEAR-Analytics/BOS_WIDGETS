const accountId = props.accountId ?? "mob.near";
return (
  <div>
    <Widget src="near/widget/AccountProfile" props={{ accountId }} />

    <Widget src="mob.near/widget/PublicTags" props={{ accountId }} />
  </div>
);
