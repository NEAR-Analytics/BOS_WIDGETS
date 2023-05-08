let daoId = state.daoId ?? props.daoId;

if (daoId === undefined) {
  daoId = Storage.privateGet("daoId");
}

if (state.daoId !== daoId) {
  State.update({
    daoId,
  });
  if (daoId !== undefined) {
    Storage.privateSet("daoId", daoId);
  }
}

return (
  <div>
    <div>
      <label>DAO account ID</label>
      <input value={state.daoId} />
    </div>
    <div className="mt-3">
      <Widget
        src="mob.near/widget/DAO.Proposals"
        props={{ daoId: state.daoId }}
      />
    </div>
  </div>
);
