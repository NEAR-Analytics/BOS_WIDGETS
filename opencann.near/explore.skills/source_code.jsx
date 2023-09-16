// AllLabels
const ownerId = "opencann.near";
const appName = "skillskill";

let skill = props.skill ?? "*";
const data = Social.keys(`*/${appName}/*/skills/${skill}`, "final");

if (!data) {
  return "Loading";
}

const contracts = {};

Object.values(data).forEach((account) => {
  Object.keys(account[appName]).forEach((contract) => {
    contracts[contract] = true;
  });
});

const allWidgets = Object.keys(contracts).map((accountId) => {
  return (
    <div className="mb-2 card">
      <div className="card-body">
        <div className="text-truncate">
          <Widget
            src={`zavodil.near/widget/ProfileLine`}
            props={{ accountId }}
          />
        </div>
        <Widget
          src={`${ownerId}/widget/profile.publicSkills`}
          props={{ accountId }}
        />
      </div>
    </div>
  );
});

return (
  <>
    <Widget
      src={`${ownerId}/widget/PublicSkillEditor`}
      key={`public-skill-editor-${props.accountId}`}
      props={{ contractId: props.accountId }}
    />
    <hr />

    {skill !== "*" && (
      <h4 className="ms-3">
        List of <span className="badge rounded-pill bg-primary">{skill}</span>
      </h4>
    )}

    {allWidgets}
    <hr />
    {skill !== "*" && (
      <>
        <Widget
          src={`${ownerId}/widget/profile.skillDetails`}
          props={{ skill: skill }}
        />

        <div className="mt-3 mb-5">
          <a
            className="btn btn-outline-primary"
            href="/#/opencann.near/widget/explore.skills"
          >
            All skills
          </a>
        </div>
      </>
    )}
  </>
);
