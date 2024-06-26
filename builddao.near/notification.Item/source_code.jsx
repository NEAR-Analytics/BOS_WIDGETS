const { value } = props;
const loading = <div className="placeholder" style={{ height: "48px" }} />;
const widgetSrc =
  value.type === "follow" || value.type === "unfollow"
    ? "mob.near/widget/Notification.Item.Follow"
    : value.type === "poke"
    ? "mob.near/widget/Notification.Item.Poke"
    : value.type === "like"
    ? "builddao.near/widget/notification.item.Like"
    : value.type === "comment"
    ? "builddao.near/widget/notification.item.Comment"
    : value.type && value.type?.startsWith("devgovgigs/")
    ? "mob.near/widget/Notification.Item.DevGov"
    : value.type === "mention"
    ? "builddao.near/widget/notification.item.Mention"
    : value.type === "repost"
    ? "builddao.near/widget/notification.item.Repost"
    : value.type === "star"
    ? "mob.near/widget/Notification.Item.Star"
    : value.type === "chess-game"
    ? "chess-game.near/widget/Notification.Item.ChessGame@98857466"
    : null;
return (
  <div className="mb-3">
    {widgetSrc ? (
      <Widget loading={loading} src={widgetSrc} props={{ loading, ...props }} />
    ) : (
      <div>
        Unknown notification:{" "}
        <span className="font-monospace">{JSON.stringify(value)}</span>
      </div>
    )}
  </div>
);
