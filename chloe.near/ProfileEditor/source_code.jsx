// State and variable initialization
const accountId = context.accountId;

// Enforce NEAR wallet authentication
if (!accountId) {
  return "Please sign in with NEAR wallet to edit your profile";
}

// DAO and profile information retrieval
let daoId = "research-collective.sputnik-dao.near";
let profile = Social.getr(`${daoId}/profile`);

// Return a loading state if the profile is null
if (profile === null) {
  return "Loading";
}

// Initialize the state with the profile
State.init({
  profile,
});

// Function to create a DAO proposal for updating the profile
const handleProfileUpdateProposal = () => {
  // Serialize the profile state to a base64 encoded string
  const profile_update_args = JSON.stringify({
    data: {
      [daoId]: {
        profile: {
          main: JSON.stringify(state.profile),
        },
      },
    },
  });

  const proposal_update_args = Buffer.from(
    profile_update_args,
    "utf-8"
  ).toString("base64");

  // NEAR blockchain call to add the proposal
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "Update DAO profile on NEAR Social",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_update_args,
                  deposit: "10000000000000000000000", // 0.1 NEAR
                  gas: "219000000000000", // Specified gas amount
                },
              ],
            },
          },
        },
      },
      deposit: "10000000000000000000000", // 0.1 NEAR
      gas: "219000000000000", // Specified gas amount
    },
  ]);
};

// Main React JSX component for the profile editing interface
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
            props={{ daoId, profile: state.profile }}
          />
        </div>
      </div>
    </div>
  </div>
);
