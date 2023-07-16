const { accountId, value } = props;

return (
  <div>
    {value.type === "star" && (
      <Widget
        src="hack.near/widget/star.notification.item.LR"
        props={{
          L: value.type === "star" && "starred your widget",
          R: (
            <Widget src="mob.near/widget/FollowButton" props={{ accountId }} />
          ),
          ...props,
        }}
      />
    )}
  </div>
);
