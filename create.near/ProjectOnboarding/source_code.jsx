const accountId = props.debugAccountId ?? context.accountId;

if (!accountId) {
  return (
    <div className="alert alert-warning rounded-4 mb-3">
      <div className="text-end">
        <div className="fw-bold">
          Start by clicking here
          <Widget
            src="gov.near/widget/ProjectImage"
            props={{ accountId: "" }}
          />
          <i class="fs-1 align-middle bi bi-arrow-up-right" />
        </div>
      </div>
    </div>
  );
}

const project = Social.getr(`${accountId}/project`);

if (project === null) {
  return "";
}

const name = project.name;
const image = project.image;
const widget = project.featuredWidget;

const editProjectButton = (
  <div>
    <a className="btn btn-success" href="#/create.near/widget/ProjectEditor">
      Edit Project
    </a>
  </div>
);

if (!widget) {
  return (
    <div className="alert alert-warning rounded-4 mb-3">
      <p>Choose your featured widget.</p>
      {editProjectButton}
    </div>
  );
}

return <></>;
