const accountId = props.accountId;

const player = props.player ?? Social.getr(`${accountId}/game/player`);

const name = player.name;
const image = player.image;

return (
  <div className="d-flex flex-row">
    <Widget
      src="mob.near/widget/ProfileImage"
      props={{
        profile: player,
        accountId,
        style: { height: "2.5em", width: "2.5em", minWidth: "2.5em" },
        className: "me-2",
      }}
    />
    <div className="text-truncate lh-sm">
      <div className="text-truncate fw-bold">{name}</div>
      <div className="text-truncate text-muted">
        <small>
          <span className="font-monospace">@{accountId}</span>
        </small>
      </div>
    </div>
  </div>
);
