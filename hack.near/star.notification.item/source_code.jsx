const { accountId, value } = props;

return (
  <Widget
    src="hack.near/widget/star.notification.item.LR"
    props={{
      L:
        value.type === "star" ? "starred your widget" : "unstarred your widget",
      R: <Widget src="mob.near/widget/FollowButton" props={{ accountId }} />,
      ...props,
    }}
  />
);
