const accountId = props.debugAccountId ?? context.accountId;

if (!accountId) {
  return (
    <div className="alert alert-warning rounded-4 mb-3">
      <div className="text-end">
        <div className="fw-bold">
          Join by clicking
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

const editProjectButton = (
  <div>
    <a className="btn btn-success" href="#/create.near/widget/PageEditor">
      Edit Project
    </a>
  </div>
);

if (!name) {
  return (
    <div className="alert alert-warning rounded-4 mb-3">
      <p>Your project is missing a name.</p>
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

return <></>;
