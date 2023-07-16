const { accountId, value } = props;

return (
  <div>
    {value.type === "star" && (
      <Widget
        src="hack.near/widget/star.notification.item.LR"
        props={{
          L: (
            <div className="m-2">
              value.type === "star" && "starred your widget"
            </div>
          ),
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
