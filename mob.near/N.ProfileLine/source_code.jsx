const accountId = props.accountId;
const link = props.link ?? true;
const hideAccountId = props.hideAccountId;
const hideName = props.hideName;
const hideImage = props.hideImage;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const fast = !!props.fast || (!props.profile && accountId);

const name = profile.name ?? accountId;
const title = props.title ?? `${name} @${accountId}`;
const tooltip =
  props.tooltip && (props.tooltip === true ? title : props.tooltip);

const GrayWrapper = styled.span`
  display: inline-flex;
  img {
    filter: grayscale(100%);
    opacity: 0.5;
    margin-bottom: 0.2em;
  }
  :hover img {
    opacity: 1;
    filter: none;
  }
`;

const imgWrapperStyle = {
  width: "1em",
  height: "1em",
  marginRight: "0.1em",
};

let inner = (
  <GrayWrapper>
    {!hideImage && (
      <Widget
        key="image"
        src="mob.near/widget/ProfileImage"
        loading={<div style={imgWrapperStyle} />}
        props={{
          fast,
          style: imgWrapperStyle,
          profile,
          accountId,
          className: "d-inline-block",
          imageClassName: "rounded-circle w-100 h-100",
        }}
      />
    )}
    {!hideName && <span key="name">{name}</span>}
    {!hideAccountId && (
      <span key="accountId" className="text-muted ms-1">
        @{accountId}
      </span>
    )}
  </GrayWrapper>
);

inner = link ? (
  <a
    href={
      link !== true
        ? link
        : `#/mob.near/widget/ProfilePage?accountId=${accountId}`
    }
    className="text-truncate d-inline-flex"
    style={{ color: "inherit" }}
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
