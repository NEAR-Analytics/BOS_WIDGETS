const data = props.data || {};
const type = props.type || "";
const attestationType = props.attestation || "hyperfiles.near/type/attestation";
const schema = props.schema || "";
const schemaType = props.schemaType || "hyperfiles.near/type/schema";
const typeSrc = props.typeSrc || "hyperfiles.near";
const schemaSrc = props.schemaSrc || "attestations.near";
const buildEdges = props.buildEdges;
const template = props.template || "every.near/type/thing";
const thingId = props.thingId;
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

function generateUID() {
  const length = 16; // This will create a 64-bit number (16 hexadecimal characters)
  // randomly change the case of a character
  const randomCase = (char) =>
    Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
  // Generate a random hexadecimal number and convert it to a string
  let uid = "";
  for (let i = 0; i < length; i++) {
    const randomChar = Math.floor(Math.random() * 16).toString(16); // Generate a single random hexadecimal character
    uid += randomCase(randomChar); // Append the character in either case to the UID
  }
  return uid;
}

State.init({
  data,
  config: data,
  isModalOpen: false,
  typeSrc,
  schemaSrc,
  selectedType: type,
  selectedSchema: schema,
  view: defaultView,
  preview: "TEMPLATE",
  template,
  templateVal: template,
  thingId,
  schemas: {},
  loading: false,
  UID: generateUID(),
});

const fetchSchemasList = (schemaSrc) => {
  const response = fetch(`${schemaSrc}/type/**`, "final");
  if (response) {
    const schemasList = Object.keys(response).map(
      (key) => `${schemaSrc}/type/${key}`
    );
    State.update({ schemasList });
  }
};

const fetchSchema = (type) => {
  if (!type) return;
  const response = fetch(type, "final");
  if (response) {
    const schema = JSON.parse(response);
    State.update((prevState) => ({
      ...prevState,
      schemas: { ...prevState.schemas, [type]: schema },
      loading: false,
    }));
  }
};

useEffect(() => {
  fetchSchemasList(State.schemaSrc);
  fetchSchema(State.selectedSchema);
}, [State.schemaSrc, State.selectedSchema]);

const handleApply = () => {
  State.update({
    config: state.data,
    template: state.templateVal,
  });
  // set the props for the main content
};

const handleSave = () => {
  // create the thing
  State.update({ isModalOpen: false });
  const thingId = state.thingId || Math.random();
  let edges = [];
  if (buildEdges) {
    const newPath = `${context.accountId}/thing/${thingId}`;
    edges = buildEdges(newPath, state.selectedType);
  }

  const data = {
    thing: {
      [thingId]: JSON.stringify({
        data: state.config,
        template: {
          src: state.template,
        },
        type: state.selectedType,
      }),
    },
    index: {
      thing: JSON.stringify({
        key: thingId,
        value: {
          type: state.selectedType,
        },
      }),
    },
  };
  if (edges.length) {
    data.index.edge = JSON.stringify(edges);
  }
  Social.set(data, {
    onCommit: () => {
      State.update({
        data: {},
        isModalOpen: false,
        config: undefined,
      });
    },
    onCancel: () => {
      State.update({
        isModalOpen: false,
      });
    },
  });
};

let availableTypes = [];
const types = Social.get(`${state.typeSrc}/type/**`, "final");
if (types !== null) {
  availableTypes =
    Object.keys(types)?.map((it) => `${state.typeSrc}/type/${it}`) || [];
}

let availableSchemas = [];
const schemas = Social.get(`${state.schemaSrc}/type/**`, "final");
if (schemas !== null) {
  availableSchemas =
    Object.keys(schemas)?.map((it) => `${state.schemaSrc}/type/${it}`) || [];
}

// Update handleTypeChange to handle full schema including nested types
const handleSchemaChange = (e) => {
  const newSchema = e.target.value;
  State.update({
    selectedSchema: newSchema,
    templateVal: "",
    data: {},
    loading: true,
  });
};

// Update handleTypeChange to handle full schema including nested types
const handleTypeChange = (e) => {
  const newType = e.target.value;
  State.update({
    selectedType: newType,
    templateVal: "",
    data: {},
    loading: true,
  });
};

const handleSchemaOwnerChange = (e) => {
  const newSchemaSrc = e.target.value;
  State.update({
    schemaSrc: newSchemaSrc,
  });
  fetchSchemasList(newSchemaSrc);
};

const renderSchemaSelection = () => {
  return (
    <FormContainer>
      <Label>Schema Owner:</Label>
      <Input
        type="text"
        value={State.schemaSrc}
        onChange={handleSchemaOwnerChange}
      />
      <Label>Schema:</Label>
      <Select value={State.selectedSchema} onChange={handleSchemaChange}>
        {State.schemasList.map((schema) => (
          <option key={schema} value={schema}>
            {schema}
          </option>
        ))}
      </Select>
      {/* Additional form elements here */}
    </FormContainer>
  );
};

// A function to render properties, adjusted to use stored schemas from the state
const renderProperties = (properties, data, onChange) => {
  if (state.loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }
  if (!properties) {
    return <div>No properties to display</div>; // Add a condition for no properties
  }
  return properties.map((property) => {
    const propertyType = property.type;
    if (
      propertyType.startsWith("${typeSrc}.near/type/") &&
      state.schemas[propertyType]
    ) {
      // Use the stored schema from the state
      const nestedSchema = state.schemas[propertyType];
      if (nestedSchema && nestedSchema.properties) {
        return renderProperties(
          nestedSchema.properties,
          data[property.name],
          onChange
        );
      } else {
        // Handle the case where the nested schema is not available yet
        // This could be a placeholder or a loading indicator
        return <div>Loading...</div>;
      }
    } else {
      // Render a simple input for primitive types
      return (
        <Input
          key={property.name}
          type={property.type === "string" ? "text" : property.type}
          value={data[property.name] || ""}
          placeholder={property.name}
          onChange={(e) => onChange(property.name, e.target.value)}
        />
      );
    }
  });
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
          <FormContainer>
            <Label>Schema Owner:</Label>
            <Row>
              <Input
                type="text"
                value={state.newSchemaSrc}
                onChange={(e) => State.update({ newSchemaSrc: e.target.value })}
                placeholder={schemaSrc}
              />
              <Button
                onClick={() => State.update({ schemaSrc: state.newSchemaSrc })}
              >
                apply
              </Button>
            </Row>
            <Label>Schema</Label>
            <Row>
              <Select
                value={state.selectedSchema}
                onChange={handleSchemaChange}
              >
                <option value="">Choose a schema</option>
                {availableSchemas?.map((it) => (
                  <option value={it} key={it}>
                    {it}
                  </option>
                ))}
              </Select>
            </Row>
          </FormContainer>

          <FormContainer>
            <Row>
              <Label>UID</Label>
            </Row>
            <Input
              type="text"
              value={state.UID}
              readOnly // Make this field read-only if you don't want users to edit it
            />
            <Row>
              <Label>Attestor</Label>
            </Row>
            <Input
              type="text"
              value={context.accountId}
              readOnly // Make this field read-only if you don't want users to edit it
            />
            <Widget
              src="efiz.near/widget/create"
              props={{
                item: {
                  type: state.selectedSchema,
                  value: state.data,
                },
                onChange: handleOnChange,
              }}
            />
          </FormContainer>
          <Footer>
            <Button onClick={() => handleApply()}>apply</Button>
            <Button
              onClick={() => State.update({ isModalOpen: true })}
              disabled={state.config === undefined}
            >
              save
            </Button>
          </Footer>
        </>
      ) : (
        <Widget
          src="flowscience.near/widget/schema.editor"
          props={{ schemaSrc: state.selectedSchema }}
        />
      )}
    </SidePanel>
    <MainContent>
      {state.view === "CREATE_THING" ? (
        <>
          <Header>
            <Row style={{ justifyContent: "space-between" }}>
              <div>
                <Label>Template:</Label>
                <Input
                  value={state.templateVal}
                  onChange={(e) =>
                    State.update({ templateVal: e.target.value })
                  }
                />
              </div>
              <Select
                value={state.preview}
                onChange={(e) => State.update({ preview: e.target.value })}
              >
                <option value="TEMPLATE">template</option>
                <option value="RAW">raw</option>
              </Select>
              <Button>
                <a
                  className={`btn`}
                  href={`https://jutsu.ai/editor/${state.template}`}
                  target="_blank"
                >
                  <i className=" me-1">
                    <svg
                      focusable="false"
                      aria-hidden="true"
                      viewBox="2 2 18 18"
                      width="16px"
                      height="16px"
                    >
                      <path d="M12.16 3h-.32L9.21 8.25h5.58zm4.3 5.25h5.16l-2.07-4.14C19.21 3.43 18.52 3 17.76 3h-3.93l2.63 5.25zm4.92 1.5h-8.63V20.1zM11.25 20.1V9.75H2.62zM7.54 8.25 10.16 3H6.24c-.76 0-1.45.43-1.79 1.11L2.38 8.25h5.16z"></path>
                    </svg>
                  </i>
                  <span>Open in Jutsu</span>
                </a>
              </Button>
            </Row>
          </Header>
          {state.preview === "TEMPLATE" ? (
            <>
              {(state.template && (
                <Widget src={state.template} props={{ data: state.config }} />
              )) || <CenteredDiv>set a template and click apply</CenteredDiv>}
            </>
          ) : (
            <Widget
              src="hyperfiles.near/widget/hyperfile.view"
              props={{ value: state.config || {} }}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </MainContent>
    {state.isModalOpen && (
      <ModalOverlay>
        <ModalContent>
          <ModalTitle>Make an attestation</ModalTitle>
          <p>option to provide a thing id</p>
          <Row style={{ gap: "8px" }}>
            <Input
              value={state.thingId}
              onChange={(e) => State.update({ thingId: e.target.value })}
              placeholder="thing id"
            />
          </Row>
          <Widget
            src="efiz.near/widget/Every.Raw.View"
            props={{
              value: { data: state.config, template: { src: state.template } },
            }}
          />
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={() => State.update({ isModalOpen: false })}>
            Cancel
          </Button>
        </ModalContent>
      </ModalOverlay>
    )}
  </Container>
);
