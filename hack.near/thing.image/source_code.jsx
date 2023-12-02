const creatorId = props.creatorID ?? context.accountId;
const namespace = props.namespace ?? "widget";
const thingId = props.thingId ?? "widgets.rank";

const className = props.className ?? "thing-image d-inline-block";
const style = props.style ?? { width: "3em", height: "3em" };
const imageStyle = props.imageStyle ?? { objectFit: "cover" };
const imageClassName = props.imageClassName ?? "rounded-circle w-100 h-100";
const thumbnail = props.thumbnail ?? "thumbnail";

const thing =
  props.thing ?? Social.getr(`${creatorId}/${namespace}/${thingId}`);

const name = thing.metadata.name || "Something";
const image = thing.metadata.image;
const title = props.title ?? `${name}`;
const fast = props.fast || (!props.thing && !!creatorId);
if (creatorId !== state.creatorId) {
  State.update({
    fastImageUrl: `https://i.near.social/magic/${
      thumbnail || "large"
    }/https://near.social/magic/img/account/${creatorId}`,
    creatorId,
  });
}
const fallbackUrl =
  "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm";

return (
  <>
    {fast ? (
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
    )}
  </>
);
