const { daoId, policy, proposal } = props;

return (
  <div className="border p-2">
    <h4>#{proposal.id}</h4>
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
  </div>
);
