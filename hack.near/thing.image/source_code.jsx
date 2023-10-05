const accountId = props.accountId ?? context.accountId;
const thingId = props.thingId ?? "f8ad9d1a76259lmdpjnd74e69162a0a014";

const className = props.className ?? "thing-image d-inline-block";
const style = props.style ?? { width: "3em", height: "3em" };
const imageStyle = props.imageStyle ?? { objectFit: "cover" };
const imageClassName = props.imageClassName ?? "rounded w-100 h-100";
const thumbnail = props.thumbnail ?? "thumbnail";

const thing =
  props.thing ?? Social.get(`${accountId}/thing/${thingId}/metadata/**`);

const name = thing.name || "No-name thing";
const image = thing.image;
const title = props.title ?? `${name} @${accountId}`;
const tooltip =
  props.tooltip && (props.tooltip === true ? title : props.tooltip);
const fallbackUrl =
  "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm";

return (
  <div className={className} style={style} key={JSON.stringify(image)}>
    <Widget
      src="mob.near/widget/Image"
      props={{
        image: thing.image,
        alt: title,
        className: imageClassName,
        style: imageStyle,
        thumbnail,
        fallbackUrl,
      }}
    />
  </div>
);
