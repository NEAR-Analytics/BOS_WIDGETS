const accountId = props.accountId ?? context.accountId ?? "james.near";

const player = props.player ?? Social.getr(`${accountId}/game/player`);

const name = props.name ?? player.metadata.name;
const image = props.image ??
  player.metadata.image ?? {
    url: "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/Qmb1LYHJY6CrVCzdxo6PiTiFdwVwR5njbMi4z1CiWLV3CB",
  };

return (
  <>
    <p>{JSON.stringify(player)}</p>
    <div className="d-flex flex-row">
      <Widget
        src="mob.near/widget/Image"
        props={{
          image,
          style: { width: "2.5em" },
          className: "me-3",
          fallbackUrl:
            "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/Qmb1LYHJY6CrVCzdxo6PiTiFdwVwR5njbMi4z1CiWLV3CB",
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
