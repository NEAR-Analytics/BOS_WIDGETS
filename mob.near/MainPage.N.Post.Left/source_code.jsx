const accountId = props.accountId;

const imgWrapperStyle = { width: "40px", height: "40px" };

return (
  <div className="left">
    <a href={`/mob.near/widget/ProfilePage?accountId=${accountId}`}>
      <Widget
        src="mob.near/widget/ProfileImage"
        loading={<div style={imgWrapperStyle} />}
        props={{
          accountId,
          tooltip: true,
          link: true,
          style: imgWrapperStyle,
          imageClassName: "rounded-circle w-100 h-100",
        }}
      />
    </a>
  </div>
);
