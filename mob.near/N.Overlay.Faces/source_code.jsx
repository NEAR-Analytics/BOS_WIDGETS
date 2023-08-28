const accountId = context.accountId;

const likesByUsers = props.likesByUsers || {};
const limit = props.limit ?? 5;

let likes = Object.keys(likesByUsers).reverse();

const graphLikes = [];
const nonGraph = [];

const graph =
  (accountId &&
    Social.keys(`${accountId}/graph/follow/*`, "final")[accountId].graph
      .follow) ||
  {};

likes.forEach((accountId) => {
  if (accountId in graph) {
    graphLikes.push(accountId);
  } else {
    nonGraph.push(accountId);
  }
});

let faces = [...graphLikes, ...nonGraph];

const numLikes = likes.length;

const children = <span>{numLikes}</span>;

return numLikes > 0 ? (
  <Widget
    loading={children}
    src="mob.near/widget/N.Common.OverlayTrigger"
    props={{
      popup: (
        <div
          className="text-start overflow-hidden"
          style={{ maxWidth: "20em" }}
        >
          {faces.slice(0, limit).map((accountId, i) => (
            <Fragment key={i}>
              <Widget
                src="mob.near/widget/N.ProfileLine"
                props={{ accountId, link: false }}
              />
              <br />
            </Fragment>
          ))}
          {faces.length > limit ? "..." : ""}
        </div>
      ),
      children,
    }}
  />
) : (
  ""
);
