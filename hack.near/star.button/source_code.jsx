const accountId = props.accountId ?? context.accountId;

const widgetPath = props.widgetPath ?? "devs.near/widget/dev.library";
const [ownerId, widget, widgetName] = widgetPath.split("/");

const starEdge = Social.keys(
  `${accountId}/graph/star/${widgetPath}`,
  undefined,
  {
    values_only: true,
  }
);

const starred = starEdge && Object.keys(starEdge).length;

const type = star ? "unstar" : "star";

const data = {
  graph: { star: { [widgetPath]: star ? null : "" } },
  index: {
    graph: JSON.stringify({
      key: "star",
      value: {
        type,
        src: widgetPath,
      },
    }),
    notify: JSON.stringify({
      key: ownerId,
      value: {
        type,
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
    <i className={`bi ${starred ? "bi-star" : "bi-star-fill"}`} />
    <span style={{ marginLeft: "0.2rem" }}>{starred ? "Starred" : "Star"}</span>
  </CommitButton>
);
