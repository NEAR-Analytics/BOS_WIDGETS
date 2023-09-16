// LabelDetails
const ownerId = "zavodil.near";
const appName = "skilltag";

if (!props.skill) {
  return "Undefined skill";
}

let skill = props.skill;
const data = Social.get(`*/${appName}/*/skills/${skill}`, "final");

if (!data) {
  return "Loading";
}

const records = [];

let counter = 0;

Object.keys(data).forEach((accountId) => {
  Object.keys(data[accountId][appName]).forEach((contractId) => {
    Object.values(data[accountId][appName][contractId]).forEach((skills) => {
      if (Object.keys(skills).includes(skill)) {
        let text =
          accountId == contractId ? (
            `skillged themself`
          ) : (
            <>
              skillged{" "}
              <Widget
                src={`${ownerId}/widget/ProfileLine`}
                props={{ accountId: contractId }}
              />
            </>
          );
        records.push(
          <li className="list-group-item">
            <Widget
              src={`${ownerId}/widget/ProfileLine`}
              props={{ accountId }}
            />{" "}
            {text}
            <span className="public-skills collapse show">
              <button
                className="btn btn-sm btn-outline-secondary border-0"
                data-bs-toggle="collapse"
                data-bs-target={`.public-skills-${counter}`}
                aria-expanded="false"
                aria-controls={`public-skills-${counter}`}
                type="button"
              >
                <i className="bi bi-arrows-angle-expand me-1"></i>All skills
              </button>
            </span>
            <div className={`collapse public-skills-${counter}`}>
              <Widget
                src={`${ownerId}/widget/PublicSkills`}
                props={{ accountId: contractId }}
              />
            </div>
          </li>
        );

        counter++;
      }
    });
  });
});

return (
  <>
    <h4 className="ms-3">
      Public Skill{" "}
      <span className="badge rounded-pill bg-primary">{skill}</span>
    </h4>
    <ul className="list-group list-group-flush">{records}</ul>
  </>
);
