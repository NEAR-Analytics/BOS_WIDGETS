const { accountId, blockHeight, value } = props;

if (!accountId || !blockHeight || !value) {
  return "";
}

return (
  <div className="m-2">
    {value.type === "request" && (
      <Widget
        src="hack.near/widget/notification.item"
        props={{
          L: value.type === "request" && "requested changes",
          R: (
            <div className="m-2">
              <Widget
                src="mob.near/widget/FollowButton"
                props={{ accountId }}
              />
            </div>
          ),
          ...props,
        }}
      />
    )}
  </div>
);
