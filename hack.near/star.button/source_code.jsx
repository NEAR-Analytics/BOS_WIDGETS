const accountId = props.accountId ?? context.accountId;

const thingPath = props.thingPath ?? "mob.near/widget/MetadataEditor";
const [ownerId, thingType, thingName] = thingPath.split("/");

const starEdge = Social.keys(
  `${accountId}/graph/star/${ownerId}/${thingType}/${thingName}`,
  undefined,
  {
    values_only: true,
  }
);

const starred = starEdge && Object.keys(starEdge).length > 0;

const type = starred ? "unstar" : "star";

const data = {
  graph: {
    star: { [ownerId]: { [thingType]: { [thingName]: starred ? null : "" } } },
  },
  index: {
    graph: JSON.stringify({
      key: "star",
      value: {
        type,
        path: thingPath,
      },
    }),
    notify: JSON.stringify({
      key: ownerId,
      value: {
        type,
        item: {
          path: thingPath,
        },
      },
    }),
  },
};

return (
  <CommitButton
    disabled={!context.accountId}
    className="btn btn-outline-secondary"
    data={data}
  >
    <i className={`bi ${starred ? "bi-star-fill" : "bi-star"}`} />
    <span style={{ marginLeft: "0.2rem" }}>{starred ? "starred" : "star"}</span>
  </CommitButton>
);
