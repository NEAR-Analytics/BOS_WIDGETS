const accountId = props.accountId ?? "every.near";
const graphId = props.graphId ?? "connect";

const graphEdge = Social.keys(
  `${context.accountId}/graph/${graphId}/${props.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const inverseEdge = Social.keys(
  `${props.accountId}/graph/${graphId}/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = graphEdge === null || inverseEdge === null;
const connected = graphEdge && Object.keys(graphEdge).length;
const inverse = inverseEdge && Object.keys(inverseEdge).length;

const type = connected ? "undo" : graphId;

const data = {
  graph: { [graphId]: { [props.accountId]: connected ? null : "" } },
  index: {
    graph: JSON.stringify({
      key: `${graphId}`,
      value: {
        type,
        accountId: props.accountId,
      },
    }),
    notify: JSON.stringify({
      key: props.accountId,
      value: {
        type,
      },
    }),
  },
};

return (
  <CommitButton
    disabled={loading}
    className={`btn btn-sm ${
      loading || connected ? "btn-secondary" : "btn-outline-dark"
    }`}
    data={data}
  >
    {loading ? "" : connected ? "Undo" : "Add"}
  </CommitButton>
);
