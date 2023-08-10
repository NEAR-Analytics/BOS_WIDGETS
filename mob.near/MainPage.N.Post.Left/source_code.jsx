const accountId = props.accountId;

return (
  <div className="left">
    <a href={`/mob.near/widget/ProfilePage?accountId=${accountId}`}>
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          accountId,
          tooltip: true,
          link: true,
          imageClassName: "rounded-circle w-100 h-100",
        }}
      />
    </a>
  </div>
);
