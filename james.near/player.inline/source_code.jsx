const accountId = props.accountId ?? context.accountId;

const player = props.player ?? Social.getr(`${accountId}/game/player`);

const name = player.metadata.name;
const image = player.metadata.image;

return (
  <>
    <p>{JSON.stringify(player)}</p>
    <div className="d-flex flex-row">
      <Widget
        src="mob.near/widget/Image"
        props={{
          image,
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
  </>
);
