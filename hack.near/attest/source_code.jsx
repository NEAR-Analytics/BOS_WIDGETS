const accountId = props.accountId || "every.near";
const graphId = props.graphId || "commons";

const commons = Social.getr(`${accountId}/graph/commons`);

const graphEdge = Social.keys(
  `${context.accountId}/graph/${graphId}/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const inverseEdge = Social.keys(
  `${accountId}/graph/${graphId}/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = graphEdge === null || inverseEdge === null;
const attested = graphEdge && Object.keys(graphEdge).length;
const inverse = inverseEdge && Object.keys(inverseEdge).length;

const type = attested ? "undo" : graphId;

const data = props.data ?? {
  graph: { [graphId]: { [accountId]: attested ? null : "" } },
};

const attest = () => {
  Social.set(data);
};

return (
  <>
    {context.accountId && (
      <>
        {commons ? (
          <button
            disabled={loading}
            className={`btn btn-sm ${
              attested ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={attest}
          >
            <i className="bi bi-plus"></i>
          </button>
        ) : (
          <>
            <button
              disabled={loading}
              className={`btn btn-sm ${
                attested ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={attest}
            >
              {attested ? (
                <i className="bi bi-x"></i>
              ) : (
                <i className="bi bi-plus"></i>
              )}
            </button>
          </>
        )}
      </>
    )}
  </>
);
