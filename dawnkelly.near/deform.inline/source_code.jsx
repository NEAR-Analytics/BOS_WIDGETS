const accountId = props.accountId ?? context.accountId ?? "dawnkelly.near";

const bkgImage =
  props.background ?? Social.getr(`${accountId}/frame/background`);

const altText = props.altText ?? background.metadata.altText;
const image = props.image ??
  background.metadata.image ?? {
    url: "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmSGUysAdv8i6NshJY6AYH5LXcc7vwsGXMUvMHiuFA3WU3",
  };

return (
  <>
    <p>{JSON.stringify(background)}</p>
    <div className="d-flex flex-column">
      <Widget
        src="mob.near/widget/Image"
        props={{
          bkgImage,
          style: { width: "720px" },
          className: "me-3",
          fallbackUrl:
            "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmSGUysAdv8i6NshJY6AYH5LXcc7vwsGXMUvMHiuFA3WU3",
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
