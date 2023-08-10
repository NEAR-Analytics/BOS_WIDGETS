const accountId = props.accountId;

return (
  <div className="left">
    <Widget src="mob.near/widget/ProfileImage" props={{ accountId }} />
  </div>
);
