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

if (!name) {
  return (
    <div className="alert alert-warning rounded-4 mb-3">
      <p>Your project needs a name.</p>
      {editProjectButton}
    </div>
  );
}

if (
  !image.ipfs_cid &&
  (!image.nft.contractId || !image.nft.tokenId) &&
  !image.url
) {
  return (
    <div className="alert alert-warning rounded-4 mb-3">
      <p>Your project is missing a logo.</p>
      {editProjectButton}
    </div>
  );
}

if (!widget) {
  return (
    <div className="alert alert-warning rounded-4 mb-3">
      <p>Create your project page by saving a featured widget.</p>
      {editProjectButton}
    </div>
  );
}

return <></>;
