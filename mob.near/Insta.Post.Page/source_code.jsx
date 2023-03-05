const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(
    Social.get(`${accountId}/post/main`, blockHeight) ??
      Social.get(`${accountId}/post/insta`, blockHeight) ??
      "null"
  );
const subscribe = !!props.subscribe;
const raw = !!props.raw;
const hideLink = !!props.hideLink;

const imageStyle = props.imageStyle ?? {
  objectFit: "cover",
};
const imageClassName = props.imageClassName ?? "w-100 h-100";

return (
  <div>
    <div className="mb-1">
      <Widget src="mob.near/widget/Profile.InlineBlock" props={{ accountId }} />
    </div>
    <div className="ratio ratio-1x1 mb-1">
      <Widget
        src="mob.near/widget/Image"
        props={{
          image: content.image,
          style: imageStyle,
          className: imageClassName,
        }}
      />
    </div>
    <div className="mb-1">
      <Widget
        src="mob.near/widget/LikeButton"
        props={{
          item: {
            type: "social",
            path: `${accountId}/post/main`,
            blockHeight,
          },
          notifyAccountId: accountId,
        }}
      />
    </div>
  </div>
);
