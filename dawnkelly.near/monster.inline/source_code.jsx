const accountId = props.accountId ?? context.accountId ?? "dawnkelly.near";

const monster = props.monster ?? Social.getr(`${accountId}/game/monster`);

const name = props.name ?? monster.metadata.name;
const image = props.image ??
  monster.metadata.image ?? {
    url: "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmYRYTKn362Ys9CKfdHEqFZ5RYPGoeKbeAsurB3gHhSksH",
  };

return (
  <>
    <p>{JSON.stringify(monster)}</p>
    <div className="d-flex flex-row">
      <Widget
        src="mob.near/widget/Image"
        props={{
          image,
          style: { width: "2.5em" },
          className: "me-3",
          fallbackUrl:
            "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmYRYTKn362Ys9CKfdHEqFZ5RYPGoeKbeAsurB3gHhSksH",
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
