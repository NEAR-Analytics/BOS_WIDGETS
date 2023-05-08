const { daoId, policy, proposal } = props;

return (
  <div className="border p-2">
    <div className="mb-2">
      <h4 className="d-inline">#{proposal.id}</h4>
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
      <label className="text-muted">Status</label>
      <pre>{proposal.status}</pre>
    </div>
    <div className="mb-2">
      <label className="text-muted">Votes</label>
      <pre>{JSON.stringify(proposal.vote_counts)}</pre>
    </div>
  </div>
);
