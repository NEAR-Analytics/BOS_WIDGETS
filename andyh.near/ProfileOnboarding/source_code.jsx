const accountId = props.debugAccountId ?? context.accountId;

if (!accountId) {
  return (
    <div className="alert alert-warning rounded-4 mb-3">
      <div className="text-end">
        <div className="fw-bold">
          Sign in by clicking
          <Widget
            src="andyh.near/widget/ProfileImage"
            props={{ accountId: "" }}
          />
          <i class="fs-1 align-middle bi bi-arrow-up-right" />
        </div>
      </div>
    </div>
  );
}

const profile = Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "";
}

const name = profile?.name;
const image = profile?.image;

const editProfileButton = (
  <div>
    <a className="btn btn-success" href="#/andyh.near/widget/ProfileEditor">
      Edit Profile
    </a>
  </div>
);

if (!name) {
  return (
    <div className="alert alert-warning rounded-4 mb-3">
      <p>Your profile is missing a name.</p>
      {editProfileButton}
    </div>
  );
}

if (
  !image.ipfs_cid &&
  (!image?.nft?.contractId || !image.nft.tokenId) &&
  !image.url
) {
  return (
    <div className="alert alert-warning rounded-4 mb-3">
      <p>Your profile is missing a picture.</p>
      {editProfileButton}
    </div>
  );
}

return <></>;
