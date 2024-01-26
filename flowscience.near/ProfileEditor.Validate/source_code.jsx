const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to edit your profile";
}

//let profile = Social.getr(`${accountId}/profile`);
const initialProfile = Social.getr(`${accountId}/profile`);

if (initialProfile === null) {
  return "Loading";
}

State.init({ profile: initialProfile });

// useState to manage profile state
const [profile, setProfile] = useState(initialProfile);

// Define the validation function
function isProfileValid(profile) {
  let invalidFields = [];

  if (typeof profile.name !== "string" || profile.name.trim() === "") {
    invalidFields.push("name");
  }

  if (!profile.image.nft || typeof profile.image.nft.contractId !== "string") {
    invalidFields.push("image");
  }

  if (
    !profile.backgroundImage.ipfs_cid ||
    typeof profile.backgroundImage.ipfs_cid !== "string"
  ) {
    invalidFields.push("backgroundImage");
  }

  if (
    !profile.description ||
    typeof profile.description !== "string" ||
    profile.description.trim() === ""
  ) {
    invalidFields.push("description");
  }

  const hasValidTag = Object.values(profile.tags).some(
    (tag) => typeof tag === "string" && tag.trim() !== ""
  );
  if (!hasValidTag) {
    invalidFields.push("tags");
  }

  const hasValidLinktree = ["twitter", "github", "telegram", "website"].some(
    (key) =>
      profile.linktree[key] &&
      typeof profile.linktree[key] === "string" &&
      profile.linktree[key].trim() !== ""
  );
  if (!hasValidLinktree) {
    invalidFields.push("linktree");
  }

  return {
    isValid: invalidFields.length === 0,
    invalidFields: invalidFields,
  };
}

const [isValidProfile, setIsValidProfile] = useState(
  isProfileValid(initialProfile)
);

// Independent handler for profile change
function handleProfileChange(
  updatedProfile,
  setProfileFn,
  setIsValidProfileFn,
  State
) {
  console.log("Profile updated:", updatedProfile);
  setProfileFn(updatedProfile);
  const newValidity = isProfileValid(updatedProfile);
  console.log("Is new profile valid?", newValidity);
  setIsValidProfileFn(newValidity);
  State.update({ profile: updatedProfile });
}

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
            onChange: (updatedProfile) =>
              handleProfileChange(
                updatedProfile,
                setProfile,
                setIsValidProfile,
                State
              ),
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
