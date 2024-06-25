const accountId = props.accountId ?? "every.near";
const graphId = props.graphId ?? "commons";

const builders = Social.keys(`${accountId}/graph/${graphId}/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const attestors = Social.keys(`*/graph/${graphId}/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const numBuilders = builders
  ? Object.keys(builders[accountId].graph[graphId] || {}).length
  : null;
const numAttestors = attestors ? Object.keys(attestors || {}).length : null;

return (
  <div>
    <div className="d-flex flex-row">
      <div className="me-4">
        {numBuilders !== null ? (
          <span className="fw-bolder">{numBuilders}</span>
        ) : (
          "?"
        )}
        <span className="text-muted">Connection{numBuilders !== 1 && "s"}</span>
      </div>
      <div>
        {numAttestors !== null ? (
          <span className="fw-bolder">{numAttestors}</span>
        ) : (
          "?"
        )}
        <span className="text-muted">
          Attestation{numAttestors !== 1 && "s"}
        </span>
      </div>
    </div>
  </div>
);
