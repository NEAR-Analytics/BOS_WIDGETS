const accountId = props.accountId;
if (!accountId) {
  return "Requires accountID prop";
}

return (
  <div className="d-flex flex-column gap-1">
    <Widget src="mob.near/widget/Profile.InlineBlock" props={{ accountId }} />
    <div className="d-flex">
      <div className="me-3">
        <Widget src="mob.near/widget/FollowStats" props={{ accountId }} />
      </div>
      <Widget src="mob.near/widget/FollowsYouBadge" props={{ accountId }} />
    </div>
    <div className="d-flex gap-2">
      <Widget src="mob.near/widget/FollowButton" props={{ accountId }} />
      <Widget src="mob.near/widget/PokeButton" props={{ accountId }} />
    </div>
  </div>
);
