const accountId = props.accountId;
const link = props.link ?? true;
const hideAccountId = props.hideAccountId;
const hideName = props.hideName;
const hideImage = props.hideImage;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile.name ?? accountId;
const title = props.title ?? `${name} @${accountId}`;
const tooltip =
  props.tooltip && (props.tooltip === true ? title : props.tooltip);

let inner = (
  <>
    {!hideImage && (
      <Widget
        key="image"
        src="mob.near/widget/ProfileImage"
        props={{
          style: {
            width: "3em",
            height: "3em",
            borderRadius: "50%",
            marginRight: "0.1em",
          },
          profile,
          accountId,
          className: "d-inline-block",
          imageClassName: "rounded w-100 h-100 align-top",
        }}
      />
    )}
    <div style={{ marginLeft: "3.5em" }}>
      {!hideName && (
        <span key="name" style={{ fontSize: "1.5em", fontWeight: "bold" }}>
          {name}
        </span>
      )}
      {!hideAccountId && (
        <span
          key="accountId"
          className="text-muted ms-1"
          style={{ display: "block", fontSize: "1em" }}
        >
          @{accountId}
        </span>
      )}
    </div>
  </>
);

inner = link ? (
  <a
    href={
      link !== true
        ? link
        : `#/mob.near/widget/ProfilePage?accountId=${accountId}`
    }
    className="link-dark text-truncate d-inline-flex"
  >
    {inner}
  </a>
) : (
  <span className="text-truncate d-inline-flex">{inner}</span>
);

if (props.tooltip === true) {
  return (
    <Widget
      src="mob.near/widget/Profile.OverlayTrigger"
      props={{ accountId, children: inner }}
    />
  );
}
if (tooltip) {
  inner = (
    <OverlayTrigger placement="auto" overlay={<Tooltip>{tooltip}</Tooltip>}>
      {inner}
    </OverlayTrigger>
  );
}

return inner;
