const daoId = props.daoId ?? "multi.sputnik-dao.near";

State.init({
  daoId,
});

const proposals = Near.view(daoId, "get_proposals", {
  from_index: 0,
  limit: 888,
});

const onChangeDAO = (daoId) => {
  State.update({
    daoId,
  });
};

return (
  <>
    <div>
      <h3>DAO Proposals</h3>

      <hr />

      <div>
        {proposals
          .slice()
          .reverse()
          .map((proposal, i) => (
            <Widget
              key={i}
              src="hack.near/widget/DAO.Proposal"
              props={{ daoId: state.daoId, id: proposals.length - i - 1 }}
            />
          ))}
      </div>
    </div>
  </>
);
