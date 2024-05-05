const attestorId = props.attestorId ?? context.accountId;

if (!attestorId) {
  return "";
}

const accountId = props.accountId ?? "every.near";
const graphId = props.graphId ?? "commons";

const graphEdge = Social.keys(
  `${attestorId}/graph/${graphId}/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const inverseEdge = Social.keys(
  `${accountId}/graph/${graphId}/${attestorId}`,
  undefined,
  {
    values_only: true,
  }
);

const defaultBuilder = props.defaultBuilder || "every.near";

const defaultEdge = Social.keys(
  `${attestorId}/graph/${graphId}/${defaultBuilder}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = graphEdge === null || inverseEdge === null;
const attested = graphEdge && Object.keys(graphEdge).length;
const inverse = inverseEdge && Object.keys(inverseEdge).length;

const joined = defaultEdge && Object.keys(defaultEdge).length;

const type = joined ? "undo" : "join";

const data = props.data ?? {
  graph: { [graphId]: { [defaultBuilder]: joined ? null : "" } },
};

const attest = () => {
  Social.set(data);
};

return (
  <button
    disabled={loading}
    className={`btn ${attested ? "btn-secondary" : "btn-dark"}`}
    onClick={attest}
    style={{ fontFamily: "Courier, sans-serif" }}
  >
    {attested ? "Joined" : "Join"}
  </button>
);
