const accountId = props.accountId ?? context.accountId;
const className = props.className ?? "profile-image d-inline-block";
const style = props.style ?? { border: "none", width: "3em", height: "3em" };
const imageStyle = props.imageStyle ?? { objectFit: "cover" };
const imageClassName = props.imageClassName ?? "rounded-circle w-100 h-100";
const thumbnail = props.thumbnail ?? "thumbnail";

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile.name || "Nameless profile";
const image = profile.image;
const title = props.title ?? `${name} @${accountId}`;
const tooltip =
  props.tooltip && (props.tooltip === true ? title : props.tooltip);
const fast = props.fast || (!props.profile && !!accountId);
if (accountId !== state.accountId) {
  State.update({
    fastImageUrl: `https://i.near.social/magic/${
      thumbnail || "large"
    }/https://near.social/magic/img/account/${accountId}`,
    accountId,
  });
}
const fallbackUrl =
  "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm";

const inner = fast ? (
  <div className={className} style={style} key={state.fastImageUrl}>
    <img
      className={imageClassName}
      style={imageStyle}
      src={state.fastImageUrl}
      alt={title}
      onError={() => {
        if (state.fastImageUrl !== fallbackUrl) {
          State.update({
            fastImageUrl: fallbackUrl,
          });
        }
      }}
    />
  </div>
) : (
  <div className={className} style={style} key={JSON.stringify(image)}>
    <Widget
      loading={
        <div
          className={`d-inline-block ${imageClassName}`}
          style={imgWrapperStyle}
        />
      }
      src="mob.near/widget/Image"
      props={{
        image,
        alt: title,
        className: imageClassName,
        style: imageStyle,
        thumbnail,
        fallbackUrl,
      }}
    />
  </div>
);

return props.tooltip ? (
  <Widget
    loading={inner}
    src="james.near/widget/profile.hover"
    props={{ accountId, children: inner }}
  />
) : (
  inner
);
