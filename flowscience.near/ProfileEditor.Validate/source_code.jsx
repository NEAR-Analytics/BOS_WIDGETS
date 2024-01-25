const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to edit your profile";
}

let profile = Social.getr(`${accountId}/profile`);
const initialProfile = Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

State.init({
  initialProfile,
});

//const [profile, setProfile] = useState(initialProfile);

// Define the validation function
function isProfileValid(profile) {
  const requiredFields = [
    "name",
    "image",
    "backgroundImage",
    "description",
    "tags",
  ];
  const linktreeFilled =
    profile.linktree &&
    Array.isArray(profile.linktree.links) &&
    profile.linktree.links.some(
      (link) => typeof link.name === "string" && link.name.trim() !== ""
    );

  return (
    requiredFields.every(
      (field) =>
        typeof profile[field] === "string" && profile[field].trim() !== ""
    ) && linktreeFilled
  );
}

// Handler for profile change

function handleProfileChange(updatedProfile) {
  setProfile(updatedProfile);
  setIsValidProfile(isProfileValid(updatedProfile)); // Update the validity state
  State.update({ profile: updatedProfile });
}

// Check if the profile is valid
//let isValidProfile = isProfileValid(profile);
const [isValidProfile, setIsValidProfile] = useState(
  isProfileValid(initialProfile)
);

return (
  <div className="row">
    <div className="col-lg-6">
      <div>
        <h4>Edit profile of @{accountId}</h4>
      </div>
      <div className="mb-2">
        <Widget
          src="near/widget/MetadataEditor"
          props={{
            initialMetadata: profile,
            onChange: handleProfileChange,
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
                  {
                    label: "Website",
                    prefix: "https://",
                    name: "website",
                  },
                ],
              },
            },
          }}
        />
      </div>
      <div className="mb-2">
        <CommitButton data={{ profile: profile }} disabled={!isValidProfile}>
          Save profile
        </CommitButton>
        <a
          className="btn btn-outline-primary ms-2"
          href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
        >
          View profile
        </a>
      </div>
    </div>
    <div className="col-lg-6">
      <div>
        <Widget
          src="mob.near/widget/ProfilePage"
          props={{ accountId, profile: profile }}
        />
      </div>
    </div>
  </div>
);
