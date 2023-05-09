const { daoId, policy, proposal } = props;

const bgClassname =
  proposal.status === "InProgress"
    ? ""
    : proposal.status === "Approved"
    ? "bg-success bg-opacity-10"
    : "bg-danger bg-opacity-10";

return (
  <div className={`border p-2 ${bgClassname}`}>
    <div className="mb-2">
      <h4 className="d-inline">
        #{proposal.id}{" "}
        <span className="text-muted small">({proposal.status})</span>
      </h4>
      <div className="float-end">
        {new Date(parseFloat(proposal.submission_time) / 1e6).toLocaleString()}
      </div>
    </div>
    <div className="mb-2">
      <label className="text-muted">Proposer</label>
      <div>
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId: proposal.proposer }}
        />
      </div>
    </div>
    <div className="mb-2">
      <label className="text-muted">Description</label>
      <div>{proposal.description}</div>
    </div>
    <div className="mb-2">
      <label className="text-muted">Action</label>
      <pre>{JSON.stringify(proposal.kind, undefined, 2)}</pre>
    </div>
    <div className="mb-2">
      <label className="text-muted">Votes</label>
      <div>
        {Object.entries(proposal.votes).map(([accountId, vote]) => (
          <div key={accountId} className="mb-1 d-flex flex-row">
            <div>{vote}</div>
            <div>
              <Widget
                src="mob.near/widget/Profile.ShortInlineBlock"
                props={{ accountId }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
