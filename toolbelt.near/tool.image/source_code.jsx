const accountId = props.accountId;
const thingId = props.name ?? "Index";
const type = props.type ?? "widget";
const path = `${accountId}/${type}/${thingId}`;
const metadata = props.metadata ?? Social.getr(`${path}/metadata`);

if (loading) {
  return "";
}

const className = props.className ?? "d-inline-block";
const style = props.style ?? { width: "3em", height: "3em" };
const imageStyle = props.imageStyle ?? {
  objectFit: "cover",
  borderRadius: "0.6em",
};
const imageClassName = props.imageClassName ?? "shadow w-100 h-100";
const thumbnail = props.thumbnail ?? "thumbnail";

const name = metadata.name ?? thingId;
const image =
  metadata.image ??
  "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e";
const title = props.title ?? name;
const tooltip =
  props.tooltip && (props.tooltip === true ? title : props.tooltip);

const inner = (
  <div className={className} style={style}>
    <Widget
      loading={<div className={imageClassName} style={imageStyle} />}
      src="mob.near/widget/Image"
      props={{
        image,
        alt: title,
        className: imageClassName,
        style: imageStyle,
        thumbnail,
        fallbackUrl:
          "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
      }}
    />
  </div>
);

return tooltip ? (
  <OverlayTrigger placement="auto" overlay={<Tooltip>{title}</Tooltip>}>
    {inner}
  </OverlayTrigger>
) : (
  inner
);
