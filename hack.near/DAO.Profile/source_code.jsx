const daoId = props.daoId ?? "onboarddao.sputnik-dao.near";

const profile = props.profile ?? Social.getr(`${daoId}/profile`);

if (profile === null) {
  return "Loading...";
}

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <Widget
        src="hack.near/widget/DAO.ProfileLarge"
        props={{
          daoId,
          profile,
          link: true,
          showEditButton: !props.profile,
        }}
      />

      <div className="mt-3">
        <Widget src="hack.near/widget/DAO.Tabs" props={{ daoId, profile }} />
      </div>
    </div>
  </div>
);
