const data = props.data || {};
const type = props.type || "";
const attestationType = "hyperfiles.near/type/attestation";
const [selectedSchema, setSelectedSchema] = useState(
  props.selectedSchema ?? "attestations.near/type/isTrue"
);
const schemaType = props.schemaType || "hyperfiles.near/type/schema";
const typeSrc = props.typeSrc || "hyperfiles.near";
const schemaSrc = props.schemaSrc ?? "attestations.near";
const defaultView = props.defaultView || "CREATE_THING";

if (type !== "") {
  const parts = type.split("/");
  typeSrc = parts[0];
}

const Container = styled.div`
    display: flex;
  `;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #b276f4;
  width: auto;
  z-index: 50;
  min-width: 400px;
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `;

const FormContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    gap: 8px;
    background-color: #b276f4;
    padding: 30px;
  `;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-self: flex-start;
  width: 100%;
`;

const Button = styled.button`
  `;

const LeftPanelItem = styled.div`
    padding: 8px;
    background-color: #ccc;
    color: white;
    border-radius: 4px;
  `;

const Select = styled.select`
  `;

const Label = styled.label`
`;

const Input = styled.input`
  `;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  min-width: 500px;
  height: 100%;
  overflow: scroll;
`;

const ModalTitle = styled.h3`
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

State.init({
  data,
  config: data,
  typeSrc,
  schemaSrc,
  selectedType: type,
  selectedSchema: state.selectedSchema,
  view: defaultView,
  preview: "TEMPLATE",
  template,
  templateVal: template,
  schemas: {},
  loading: false,
});

const handleSelectedSchemaChange = (newSelectedSchema) => {
  setSelectedSchema(newSelectedSchema);
  // Here you would also handle any other logic that needs to occur when the schema changes
};

const handleOnChange = (updatedItem) => {
  // Assuming updatedItem is an object with { key: value } pairs representing changes
  console.log("Changes from attest:", updatedItem);

  // Update your state accordingly
  // This example assumes you have a state.data object that you're updating
  // Ensure you have a state setup to handle this in NAS if using React's useState
  setState((prevState) => ({
    ...prevState,
    data: {
      ...prevState.data,
      ...updatedItem, // This merges the changes into the existing data object
    },
  }));
};

return (
  <Container>
    <SidePanel>
      <h1>Near Attestation Service (NAS)</h1>
      <Row style={{ gap: "8px", marginBottom: "16px" }}>
        <h2>Make a new</h2>{" "}
        <Select
          value={state.view}
          onChange={(e) => State.update({ view: e.target.value })}
        >
          <option value="CREATE_THING">attestation</option>
          <option value="CREATE_TYPE">schema</option>
        </Select>
      </Row>
      {state.view === "CREATE_THING" ? (
        <>
          <Widget
            src="flowscience.near/widget/SchemaSelector"
            onSelectedSchemaChange={handleSelectedSchemaChange}
            selectedSchema={selectedSchema}
          />
          <FormContainer>
            <Widget
              src="flowscience.near/widget/attest"
              props={{
                item: {
                  value: state.data,
                },
                onChange: handleOnChange,
                selectedSchema: selectedSchema,
              }}
            />
          </FormContainer>
          <Footer></Footer>
        </>
      ) : (
        <Widget
          src="flowscience.near/widget/schema.editor"
          props={{ schemaSrc: state.schemaSrc }}
        />
      )}
    </SidePanel>
    <MainContent>
      {state.view === "CREATE_THING" ? (
        <>
          <Header>
            <Row style={{ justifyContent: "space-between" }}>
              <div>
                <Label>Hyperfile (set of edges)</Label>
                <Input
                  value={state.templateVal}
                  onChange={(e) =>
                    State.update({ templateVal: e.target.value })
                  }
                />
              </div>

              <Button>
                <a
                  className={`btn`}
                  href={`https://draw.everything.dev/${state.template}`}
                  target="_blank"
                >
                  <span>Open on Canvas</span>
                </a>
              </Button>
            </Row>
          </Header>
          {state.preview === "RAW" ? (
            <></>
          ) : (
            <Widget
              src="hack.near/widget/graph.view"
              props={{
                accounts: [context.accountId, state.recipientId, state.refUID],
              }}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </MainContent>
  </Container>
);
