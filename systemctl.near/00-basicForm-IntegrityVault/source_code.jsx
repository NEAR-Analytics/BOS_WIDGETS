const accountId = context.accountId; // Set account ID from context
const fileAccept = props.fileAccept || "*"; // Wich file extensions are accepted
const fileIcon = props.fileIcon || "bi-file"; // File icon class
const buttonText = props.buttonText || "Upload a file"; // File button upload text

// Exit if user is not signed (A NEAR Wallet is needed)
if (!accountId) {
  return "Please sign in with NEAR wallet to add a new blog entry";
}

// Init State
initState({
  title: "",
  context: "",
  uploading: false,
  cid: null,
  filename: null,
  fileURL: null,
  observationError: null,
  titleError: null,
});

// Constants to save in Entry
const timestamp = Date.now();
const applicationId = "IntegrityVault";
const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem 3rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: rgb(128,125,176);
  background: linear-gradient(180deg, rgba(128,125,176,1) 0%, rgba(255,255,255,1) 58%);
`;

const TitlePage = styled.h3`
  text-transform: uppercase;
  font-size: 3.75rem;
  font-weight: 700;
  margin: 20px 0 20px 0;
`;

const CommitButton = styled.button`
  display: inline-block;
  color: #BF4F74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #BF4F74;
  border-radius: 3px;
  display: block;
`;

// Corruption proof
const entry = {
  id: timestamp,
  applicationName: applicationId,
  data: {
    title: state.title,
    context: state.context,
    cid: state.cid,
    fileURL: state.fileURL,
  },
};

// Form
return (
  <Container>
    <div className="row">
      <div className="mb-2">
        <TitlePage>Fight corruption</TitlePage>
      </div>
      <Widget
        src={"contribut3.near/widget/Inputs.Text"}
        props={{
          label: "Evidence Title",
          placeholder: "Give a name for your evidence",
          value: state.title,
          onChange: (title) => State.update({ title }),
          validate: () => {
            if (state.title.length > 50) {
              State.update({
                titleError: "The URL must be less than 50 characters",
              });
              return;
            }

            State.update({ titleError: "" });
          },
        }}
      />
      <Widget
        src={"contribut3.near/widget/Inputs.TextArea"}
        props={{
          label: "Evidence observations",
          placeholder: "Give a short description of your evidence",
          value: state.context,
          onChange: (context) => State.update({ context }),
          validate: () => {
            if (state.context.length > 500) {
              State.update({
                observationError:
                  "Observations must be less than 500 characters",
              });
              return;
            }

            State.update({ descriptionError: "" });
          },
          error: state.observationError,
        }}
      />
      <div>
        {state.cid ? (
          <a href={ipfsUrl(state.cid)} download>
            {state.filename}
          </a>
        ) : (
          <></>
        )}
        <Files
          multiple={false}
          accepts={["image/*", "video/*", ".pdf"]}
          minFileSize={1}
          clickable
          className="btn btn-outline-primary"
          onChange={(files) => {
            if (!files || !files.length) return;

            const [body] = files;

            State.update({ uploading: true, cid: null });
            asyncFetch("https://ipfs.near.social/add", {
              method: "POST",
              headers: { Accept: "application/json" },
              body,
            }).then(({ body: { cid } }) => {
              State.update({
                cid,
                filename: body.name,
                uploading: false,
                fileURL: ipfsUrl(cid),
              });
            });
          }}
        >
          {state.uploading ? "Uploading" : state.cid ? "Replace" : buttonText}
        </Files>
      </div>
      &nbsp;
      <CommitButton data={{ postEvidenceData: entry }}>
        Post evidence
      </CommitButton>
    </div>
  </Container>
);
