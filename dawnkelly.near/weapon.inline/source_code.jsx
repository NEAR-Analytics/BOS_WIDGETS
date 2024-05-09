const accountId = props.accountId ?? context.accountId ?? "dawnkelly.near";

const weapon = props.weapon ?? Social.getr(`${accountId}/game/weapon`);

const name = props.name ?? weapon.metadata.name;
const image = props.image ??
  weapon.metadata.image ?? {
    url: "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmXiH36M7PrUbCJPTHCoAziuc7EpNR4FniNCqL5aR4tuXT",
  };

return (
  <>
    <p>{JSON.stringify(weapon)}</p>
    <div className="d-flex flex-row">
      <Widget
        src="mob.near/widget/Image"
        props={{
          image,
          style: { width: "2.5em" },
          className: "me-3",
          fallbackUrl:
            "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmXiH36M7PrUbCJPTHCoAziuc7EpNR4FniNCqL5aR4tuXT",
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
