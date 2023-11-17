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


const timestamp = Date.now(); // Get current time in unix epoch
const applicationId = "IntegrityVault"; // Set the application name
const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`; // Function to concat cid

// Container style (backgroud gradient)
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

// Style for component Title
const TitlePage = styled.h3`
  text-transform: uppercase;
  font-size: 3.75rem;
  font-weight: 700;
  margin: 20px 0 20px 0;
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
                <TitlePage>Fight the corruption</TitlePage>
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
            <div
                style={{
                    padding: "1rem 0 0",
                }}
            >
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
                    style={{
                        border:
                            "2px solid rgb(128,125,176)" /* Cambiar el color del borde del botón de carga de archivos */,
                        borderRadius: "5px" /* Hacer esquinas más redondeadas */,
                        backgroundColor: "#ffffff" /* Cambiar el color de fondo */,
                        color: "rgb(128,125,176)" /* Cambiar el color del texto */,
                    }}
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
            <CommitButton
                data={{ postEvidenceData: entry }}
                style={{
                    border:
                        "2px solid rgb(128,125,176)" /* Cambiar el color del borde del botón de carga de archivos */,
                    borderRadius: "5px" /* Hacer esquinas más redondeadas */,
                    backgroundColor: "rgb(128,125,176)" /* Cambiar el color de fondo */,
                    color: "#ffffff" /* Cambiar el color del texto */,
                }}
            >
                Post evidence
            </CommitButton>
        </div>
        <div style= {{ 
            marginLeft: "auto",
            marginRight: "0"
        }}>
            <a href="https://near.social/systemctl.near/widget/01-ListVaultContent-IntegrityVault">
                View your last posted evidence
            </a>
        </div>
    </Container>
);
