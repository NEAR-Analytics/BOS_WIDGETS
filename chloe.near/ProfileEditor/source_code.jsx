// Initialize state and variables
const accountId = context.accountId;

// Check for NEAR wallet authentication
if (!accountId) {
  return "Please sign in with NEAR wallet to edit your profile";
}

let daoId = "research-collective.sputnik-dao.near";
let profile = Social.getr(`${daoId}/profile`);

// Display a loading state if the profile is null
if (profile === null) {
  return "Loading";
}

// Initialize the state
State.init({
  profile,
});

return (
  <div>
    <div className="row">
      <div className="col-lg-6">
        <div>
          <h4>Edit profile of @{daoId}</h4>
        </div>
        <div className="mb-2">
          <Widget
            src="near/widget/MetadataEditor"
            props={{
              initialMetadata: profile,
              onChange: (profile) => State.update({ profile }),
            }}
          />
        </div>
        <div className="mb-2">
          <button onClick={handleProfileUpdateProposal}>Save profile</button>
          <a
            className="btn btn-outline-primary ms-2"
            href={`#/near/widget/ProfilePage?accountId=${daoId}`}
          >
            View profile
          </a>
        </div>
      </div>
      <div className="col-lg-6">
        <div>
          <Widget
            src="near/widget/ProfilePage"
            props={{ accountId: daoId, profile: state.profile }}
          />
        </div>
      </div>
    </div>
  </div>
);
