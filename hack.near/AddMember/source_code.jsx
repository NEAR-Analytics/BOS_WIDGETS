if (
  !props.groupId ||
  !props.accountId ||
  !context.accountId ||
  context.accountId === props.accountId
) {
  return "";
}

const groupEdge = Social.keys(
  `${context.accountId}/graph/${props.groupId}/${props.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const inverseEdge = Social.keys(
  `${props.accountId}/graph/${props.groupId}/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = groupEdge === null || inverseEdge === null;
const add = groupEdge && Object.keys(groupEdge).length;
const inverse = inverseEdge && Object.keys(inverseEdge).length;

const type = group ? "remove" : "add";

const data = {
  graph: { [props.groupId]: { [props.accountId]: group ? null : "" } },
  index: {
    graph: JSON.stringify({
      key: props.groupId,
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
    className={`btn ${loading || group ? "btn-outline-dark" : "btn-primary"}`}
    data={data}
  >
    {loading ? "Loading" : group ? "Remove" : inverse ? "Approve" : "Add"}
  </CommitButton>
);
