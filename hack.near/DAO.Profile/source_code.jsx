const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";

if (!daoId) {
  return (
    <div className="mt-3">
      <Widget src="hack.near/widget/Cyborgs" />
    </div>
  );
}

const profile = Social.getr(`${daoId}/profile`);

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
        <Widget
          src="frichard5.near/widget/NDC-Dashboard"
          props={{ selectedDao: daoId, widgetProvider: "frichard5.near" }}
        />
      </div>
    </div>
  </div>
);
