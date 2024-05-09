const { Button, InputField } = VM.require(
  "buildhub.near/widget/components"
) || {
  Button: () => <></>,
  InputField: () => <></>,
};

if (!Button || !InputField) {
  return "";
}

const accountId = context.accountId;

if (!accountId) {
  return "";
}

const profile = Social.getr(`${accountId}/profile`);
const badges = Social.getr(`${accountId}/badge`);

if (!profile ?? !badges) {
  return "";
}

const [hatColor, setHatColor] = useState(badges.builder[accountId] ?? "");

const onHatChange = useCallback((e) => {
  setHatColor(e.target.value);
}, []);

const Container = styled.div`
  background-color: #000;
  padding: 39px;
  border-radius: 8px;
`;

const SpanLabel = styled.span`
  color: var(--White-100, #fff);

  /* Body/14px */
  font-size: 15px;
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
            src="james.near/widget/profile.image"
            props={{
              accountId,
            }}
          />
          <h5 className="mt-2" style={{ color: "#fff" }}>
            {profile.name || accountId}
          </h5>
        </ProfileImageContainer>
        <div className="ms-auto">
          <Button
            style={{ marginRight: 8 }}
            variant="outline"
            onClick={() => {
              Social.set(
                {
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
                  force: true,
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
      <div className="d-flex flex-column">
        <span className="d-flex flex-row">
          <p className="me-2" style={{ color: "#fff" }}>
            Builder Hat
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
    </div>
  </Container>
);
