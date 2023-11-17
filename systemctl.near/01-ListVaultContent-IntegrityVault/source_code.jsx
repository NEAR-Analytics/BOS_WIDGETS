const accountId = props.accountId ?? context.accountId; // Get Account ID
let blockHeight = props.blockHeight ? parseInt(props.blockHeight) : undefined; // Set initial BlockHeight
const profile = Social.getr(`${accountId}/profile`); // Get Profile Data
const entry =
  props.entry ?? Social.getr(`${accountId}/postEvidenceData`, blockHeight); // Get last Evidence Entry


// Styled component (For evidence)
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem 3rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--background-light, #fafafa);
`;

// Styled component CONTAINER (For loading animation)
const Container = styled.div`
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Styled component Loader (For loading animation)
const Loader = styled.div`
  border-width: 0.5rem;
  border-style: solid;
  border-color: purple purple purple purple;
  width: 3.625rem;
  height: 3.625rem;
  border-radius: 50%;
  position: relative;
  -webkit-animation: spin 2s infinite;
  animation: spin 2s infinite;

  &:before,
  &:after {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: purple;
    position: absolute;
    left: 0.125rem;
  }

  &:before {
    top: 0.063rem;
  }

  &:after {
    bottom: 0.063rem;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

// If the current user is not logged, show loading animation
if (!entry) {
  return (
    <Container>
      <Loader />
    </Container>
  );
}

// If the current user has no data, show loading animation
if (!props.entry && !blockHeight) {
  blockHeight = Social.keys(`${accountId}/postEvidenceData`, undefined, {
    return_type: "BlockHeight",
  })[accountId];
  if (!blockHeight) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }
}

// Get Profile link
const profileLink = (c) => (
  <a
    className="text-decoration-none"
    href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
  >
    {c}
  </a>
);

// Evidence
return (

  <div style={{ maxWidth: "100%" }}>
    {/* Profile Wiget */}
    <Widget src={"mob.near/widget/ProfileLarge"} />
    <div
      className="d-flex align-items-start"
      style={{
        padding: "1.5rem 0",
        borderTop: "1px solid #e9e9e9",
        borderBottom: "1px solid #e9e9e9",
      }}
    >

      {/* Account ID */}
      <div className="ms-2 flex-grow-1" style={{ minWidth: 0 }}>
        <div className="d-flex justify-content-start">
          <div
            className="flex-grow-1 me-1 text-truncate"
            style={{ padding: "0 0 0 1.5rem" }}
          >
            {profileLink(
              <>
                <span className="text-secondary">@{accountId}</span>
              </>
            )}
          </div>
        </div>

        {/* Entry Title */}
        <div style={{ padding: "1rem 0 0 1.5rem" }}>
          {entry.data.title && <b>Title: {entry.data.title}</b>}
        </div>

        {/* Entry observations */}
        <div style={{ padding: "1rem 0 0 1.5rem" }}>
          {entry.data.context && <span>Obs: {entry.data.context}</span>}
        </div>

        {/* Evidence URL */}
        <div style={{ padding: "1rem 0 0 1.5rem" }}>
          {entry.data.fileURL && (
            <a href={entry.data.fileURL}>IPFS URL: {entry.data.fileURL}</a>
          )}
        </div>

      </div>
    </div>
  </div>
);
