// Initialize state and variables
const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to edit your profile";
}

let daoId = "research-collective.sputnik-dao.near";
let profile = Social.getr(`${daoId}/profile`);

if (profile === null) {
  return "Loading";
}

State.init({
  profile,
});

// Function to handle the proposal for updating the DAO profile
const handleProfileUpdateProposal = () => {
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
                  gas: "219000000000000", // As per your usual setting
                },
              ],
            },
          },
        },
      },
      deposit: "10000000000000000000000", // 0.1 NEAR
      gas: "219000000000000", // As per your usual setting
    },
  ]);
};

// Main JSX component
return (
  <Wrapper>
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
              // other options
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
  </Wrapper>
);
