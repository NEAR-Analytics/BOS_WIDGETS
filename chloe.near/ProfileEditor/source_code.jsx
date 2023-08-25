// Styled component
const Wrapper = styled.div`
  #pills-tab,
  #pills-tabContent {
    display: none;
  }
`;

// Initialize state and variables
const accountId = context.accountId;
if (!accountId) {
  return "Please sign in with NEAR wallet to edit your profile";
}

const daoId = "research-collective.sputnik-dao.near";
let profile = Social.getr(`${daoId}/profile`);
if (profile === null) {
  return "Loading";
}

State.init({
  profile,
});

// Function to handle the proposal for updating the DAO profile
const handleProfileUpdateProposal = () => {
  // Your proposal logic here
};

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
              onChange: (newProfile) => State.update({ profile: newProfile }),
              options: {
                name: { label: "Name" },
                image: { label: "Profile picture" },
                backgroundImage: { label: "Background image" },
                description: { label: "About" },
                tags: {
                  label: "Tags",
                  tagsPattern: "*/profile/tags/*",
                  placeholder:
                    "rust, engineer, artist, humanguild, nft, learner, founder",
                },
                linktree: {
                  links: [
                    {
                      label: "Twitter",
                      prefix: "https://twitter.com/",
                      name: "twitter",
                    },
                    {
                      label: "Github",
                      prefix: "https://github.com/",
                      name: "github",
                    },
                    {
                      label: "Telegram",
                      prefix: "https://t.me/",
                      name: "telegram",
                    },
                    { label: "Website", prefix: "https://", name: "website" },
                  ],
                },
              },
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
  </Wrapper>
);
