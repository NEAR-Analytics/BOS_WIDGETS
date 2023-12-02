const creatorId = props.creatorId ?? context.accountId;
const namespace = props.namespace ?? "widget";
const thingId = props.thingId ?? "catalog";

const link = props.link ?? true;

const thing =
  props.thing ?? Social.getr(`${creatorId}/${namespace}/${thingId}`);

const inner = (
  <>
    <Widget
      src="mob.near/widget/ProfileImage"
      props={{
        style: { width: "1.5em", height: "1.5em" },
        profile: thing,
        accountId: creatorId,
        className: "d-inline-block",
        imageClassName: "rounded w-100 h-100 align-top",
      }}
    />
    <span>
      {thing.name || ""}
      <span className="text-muted">@{creatorId}</span>
    </span>
  </>
);

return link ? (
  <a
    href={
      link !== true
        ? link
        : `#/hack.near/widget/thing?thingId=${thingId}&creatorId=${creatorId}`
    }
    className="link-dark text-truncate"
    style={{ textDecoration: "none" }}
  >
    {inner}
  </a>
) : (
  <span className="text-truncate">{inner}</span>
);
