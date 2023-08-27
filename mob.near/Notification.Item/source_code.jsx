const { value } = props;

const placeholder = (
  <div className="placeholder-glow" style={{ minHeight: "48px" }} />
);

return (
  <div className="mb-3">
    {value.type === "follow" || value.type === "unfollow" ? (
      <Widget
        loading={placeholder}
        src="mob.near/widget/Notification.Item.Follow"
        props={props}
      />
    ) : value.type === "poke" ? (
      <Widget
        loading={placeholder}
        src="mob.near/widget/Notification.Item.Poke"
        props={props}
      />
    ) : value.type === "like" ? (
      <Widget
        loading={placeholder}
        src="mob.near/widget/Notification.Item.Like"
        props={props}
      />
    ) : value.type === "comment" ? (
      <Widget
        loading={placeholder}
        src="mob.near/widget/Notification.Item.Comment"
        props={props}
      />
    ) : value.type && value.type?.startsWith("devgovgigs/") ? (
      <Widget
        loading={placeholder}
        src="mob.near/widget/Notification.Item.DevGov"
        props={props}
      />
    ) : value.type === "mention" ? (
      <Widget
        loading={placeholder}
        src="mob.near/widget/Notification.Item.Mention"
        props={props}
      />
    ) : value.type === "repost" ? (
      <Widget
        loading={placeholder}
        src="mob.near/widget/Notification.Item.Repost"
        props={props}
      />
    ) : value.type === "chess-game" ? (
      <Widget
        loading={placeholder}
        src="chess-game.near/widget/Notification.Item.ChessGame@98857466"
        props={props}
      />
    ) : (
      <div>
        Unknown notification:{" "}
        <span className="font-monospace">{JSON.stringify(value)}</span>
      </div>
    )}
  </div>
);
