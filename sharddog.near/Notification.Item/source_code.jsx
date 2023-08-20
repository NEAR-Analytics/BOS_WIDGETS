const { value } = props;

return (
  <div className="mb-3">
    <div className="context-title-text">
      {value.type === "follow" || value.type === "unfollow" ? (
        <Widget
          src="sharddog.near/widget/Notification.Item.Follow"
          props={props}
        />
      ) : value.type === "poke" ? (
        <Widget src="mob.near/widget/Notification.Item.Poke" props={props} />
      ) : value.type === "like" ? (
        <Widget
          src="sharddog.near/widget/Notification.Item.Like"
          props={props}
        />
      ) : value.type === "comment" ? (
        <Widget
          src="sharddog.near/widget/Notification.Item.Comment"
          props={props}
        />
      ) : value.type && value.type?.startsWith("devgovgigs/") ? (
        <Widget src="mob.near/widget/Notification.Item.DevGov" props={props} />
      ) : value.type === "mention" ? (
        <Widget
          src="sharddog.near/widget/Notification.Item.Mention"
          props={props}
        />
      ) : value.type === "repost" ? (
        <Widget
          src="sharddog.near/widget/Notification.Item.Repost"
          props={props}
        />
      ) : value.type === "chess-game" ? (
        <Widget
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
  </div>
);
