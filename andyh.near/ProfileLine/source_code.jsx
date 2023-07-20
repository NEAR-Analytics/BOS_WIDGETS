const accountId = props.accountId;
const link = props.link ?? true;
const hideAccountId = props.hideAccountId;
const hideName = props.hideName;
const hideImage = props.hideImage;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile?.name ?? accountId;
const title = props.title ?? `${name} @${accountId}`;
const tooltip =
  props.tooltip && (props.tooltip === true ? title : props.tooltip);

console.log({ props });
let inner = (
  <>
    {!hideImage && (
      <Widget
        key="image"
        src="andyh.near/widget/ProfileImage"
        props={{
          style: { width: "1.5em", height: "1.5em", marginRight: "0.1em" },
          profile,
          accountId,
          className: "d-inline-block",
          imageClassName: "rounded w-100 h-100 align-top",
        }}
      />
    )}
    {!hideName && <span key="name">{name}</span>}
    {!hideAccountId && (
      <span key="accountId" className="text-muted ms-1">
        @{accountId}
      </span>
    )}
  </>
);

inner = link ? (
  <a
    href={
      link !== true
        ? link
        : `#/andyh.near/widget/ProfilePage?accountId=${accountId}`
    }
    className="link-dark text-truncate d-inline-flex"
  >
    {inner}
  </a>
) : (
  <span className="text-truncate d-inline-flex">{inner}</span>
);

if (props.tooltip === true) {
  console.log("retruning overlaytrigger");
  return (
    <Widget
      src="andyh.near/widget/Profile.OverlayTrigger"
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
console.log({ inner });
return inner;
