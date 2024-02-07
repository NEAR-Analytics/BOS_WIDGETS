const { Button, Avatar, InputField, TextEditor } = VM.require(
  "buildhub.near/widget/components"
) || {
  Button: () => <></>,
  Avatar: () => <></>,
  InputField: () => <></>,
  TextEditor: () => <></>,
};

if (!Button || !Avatar || !InputField || !TextEditor) {
  return "";
}

const accountId = context.accountId;

if (!accountId) {
  return "";
}

const profile = Social.getr(`${accountId}/profile`);
const badges = Social.getr(`${accountId}/badge`);

if (!profile || !badges) {
  return "";
}

const [name, setName] = useState(profile.name ?? "");
const [description, setDescription] = useState(profile.description ?? "");
const [location, setLocation] = useState(profile.location ?? "");
const [twitter, setTwitter] = useState(profile.linktree.twitter ?? "");
const [github, setGithub] = useState(profile.linktree.github ?? "");
const [telegram, setTelegram] = useState(profile.linktree.telegram ?? "");
const [website, setWebsite] = useState(profile.linktree.website ?? "");
const [image, setImage] = useState(profile.image ?? {});
const [hatColor, setHatColor] = useState(badges.builder[accountId] ?? "");

const onNameChange = useCallback((e) => {
  setName(e.target.value);
}, []);

const onDescriptionChange = useCallback((e) => {
  setDescription(e);
}, []);

const onHatChange = useCallback((e) => {
  setHatColor(e.target.value);
}, []);

const onLocationChange = useCallback((e) => {
  setLocation(e.target.value);
}, []);

const onTwitterChange = useCallback((e) => {
  setTwitter(e.target.value);
}, []);

const onGithubChange = useCallback((e) => {
  setGithub(e.target.value);
}, []);

const onTelegramChange = useCallback((e) => {
  setTelegram(e.target.value);
}, []);

const onWebsiteChange = useCallback((e) => {
  setWebsite(e.target.value);
}, []);

const setEditMode = props.setEditMode || (() => {});

const Container = styled.div`
  background-color: #000;
  padding: 23px;
`;

const SpanLabel = styled.span`
  color: var(--White-100, #fff);

  /* Body/14px */
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%; /* 23.8px */
`;

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;

  img {
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: 100%;
  }
`;

return (
  <Container>
    <div className="d-flex flex-column mb-3" style={{ gap: 24 }}>
      <div className="d-flex flex-row">
        <ProfileImageContainer className="d-flex align-items-center gap-3">
          <Widget
            src="buildhub.near/widget/components.profile.ImageUploader"
            loading=""
            props={{
              image: profile.image,
              setImage: setImage,
            }}
          />
        </ProfileImageContainer>
        <div className="ms-auto">
          <Button
            style={{ marginRight: 8 }}
            variant="outline"
            onClick={() => {
              Social.set(
                {
                  profile: {
                    name,
                    image: image,
                    description,
                    location,
                    linktree: {
                      twitter,
                      github,
                      telegram,
                      website,
                    },
                  },
                  badge: {
                    builder: {
                      [accountId]: hatColor,
                    },
                  },
                },
                {
                  onCommit: () => {
                    setEditMode(false);
                  },
                }
              );
            }}
            id={"save-profile"}
          >
            Save Profile
          </Button>
          <Button
            variant="outline"
            onClick={() => setEditMode(false)}
            id={"cancel-edit"}
          >
            Cancel
          </Button>
        </div>
      </div>
      <InputField
        label="Name"
        value={name}
        key={"name"}
        onChange={onNameChange}
        placeholder="Enter full name"
        maxWidth="100%"
      />
      <TextEditor
        value={description}
        onChange={onDescriptionChange}
        label="Description"
      />
      <div className="d-flex flex-column">
        <span className="d-flex flex-row">
          <p className="me-2" style={{ color: "#fff" }}>
            Hat Color
          </p>
          <Widget
            src="james.near/widget/BuilderHat"
            props={{ color: hatColor, accountId }}
          />
        </span>
        <InputField
          value={hatColor}
          key={"hat"}
          onChange={onHatChange}
          placeholder="red, green, blue, yellow, purple, gray, brown, orange, maroon, pink, white, black, rust"
          maxWidth="100%"
        />
      </div>
      <InputField
        label="Location"
        value={location}
        key={"location"}
        onChange={onLocationChange}
        placeholder="e.g. United States"
        maxWidth="100%"
      />
      <InputField
        label="Twitter"
        value={twitter}
        key={"twitter"}
        onChange={onTwitterChange}
        placeholder="username"
        maxWidth="100%"
      />
      <InputField
        label="Github"
        value={github}
        key={"github"}
        onChange={onGithubChange}
        placeholder="username"
        maxWidth="100%"
      />
      <InputField
        value={telegram}
        onChange={onTelegramChange}
        key={"telegram"}
        label="Telegram"
        placeholder="username"
        maxWidth="100%"
      />
      <InputField
        label="Website"
        value={website}
        key={"website"}
        onChange={onWebsiteChange}
        placeholder="URL"
        maxWidth="100%"
      />
    </div>
  </Container>
);
