const { generateUID } = VM.require("flowscience.near/widget/generateUID");
const path = props.path;
const typeSrc = props.typeSrc || "every.near";
const schemaSrc = context.accountId ?? props.schemaSrc ?? "attestations.near";
const blockHeight = props.blockHeight || "final";
const selectedSchema = props.selectedSchema;

let type = {
  name: "",
  properties: [],
  widgets: {},
};

const [jsonSchema, setJsonSchema] = useState({
  schema: path,
  id: generateUID(),
  title: schemaTitle,
  description: "",
  type: "object", // Default to 'object'
  properties: [],
  required: [],
});

const output = {
  jsonSchema: {
    [state.jsonSchema.title]: jsonSchema,
  },
};

const handleSave = () => {
  // create the thing
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

//define the schema type, not currently being used
let schemaType = {
  UID: "",
  resolver: {
    resolverPath: "",
    resolverData: "",
  },
  revocable: True,
  fields: {},
};

const jsonSchemaEASSchema = {
  schema: `${context.accountId}/jsonschema/${path}`,
  id: generateUID(),
  title: "JSON EAS Schema",
  description: "A JSON Schema for the EAS Schema Type",
  type: "object", // object or boolean
  properties: {
    uid: "",
    resolver: {
      resolverPath: "",
      resolverData: "",
    },
    revocable: True,
    fields: {},
  }, // description, type, and modifiers
  required: ["uid", "revocable", "fields"],
};

State.init({
  newType: typeSrc,
  typeName: type.name || "",
  properties: type.properties || [],
  newPropertyName: "",
  newPropertyType: "string",
  newTypeSrc: "",
  typeSrc: typeSrc,
  schemaSrc: schemaSrc,
  expanded: false,
  selectedSchema: selectedSchema,
  schemaUID: state.selectedSchema.UID,
  schemaPath: path,
  schemaDescription: jsonSchema.description,
  required: jsonSchema.isRequired,
});

let importedTypes = [];
if (state.typeSrc !== "") {
  const defaultTypes = Social.get(`every.near/type/**`, "final");
  const hyperfilesTypes = Social.get(`hyperfiles.near/type/**`, "final");
  const types = Social.get(`${state.typeSrc}/type/**`, "final");
  if (!types) {
    return <></>;
  }
  importedTypes =
    Object.keys(types)?.map((it) => `${state.typeSrc}/type/${it}`) || [];
}

const availableTypes = JSON.parse(props.availableTypes) || [
  "string",
  "boolean",
  "number",
  "date",
  "time",
  "tags",
  ...importedTypes,
];

const Container = styled.div`
  margin: 20px 0;
`;

const FormContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  max-width: 200px;
  margin-bottom: 10px;
  height: 30px;
`;

const Select = styled.select`
  height: 30px;
`;

const Button = styled.button`
  height: 30px;
`;

const Text = styled.p`
  display: inline-block;
  margin-right: 10px;
`;

const Label = styled.label`
  display: block; // Ensures the label is on a new line, above the input
  margin-bottom: 5px; // Adds some space between the label and the input
`;

const loadType = () => {
  const parts = state.newType.split("/");
  type = JSON.parse(Social.get(state.newType, blockHeight) || null);
  if (type) {
    type.name = parts[2];
    State.update({
      typeName: type.name,
      properties: type.properties,
      widgets: type.widgets,
    });
  }
};

if (prop.typeSrc !== "" && state.typeName === "") {
  loadType();
}

const loadSchema = () => {
  State.update({ selectedSchema: newSchema });
  const parts = state.newSchema.split("/");
  schema = JSON.parse(Social.get(state.newSchema, blockHeight) || null);
  if (schema) {
    schema.name = parts[2];
    State.update({
      schemaName: schema.name,
      properties: schema.properties,
      widgets: type.widgets,
    });
  }
};

if (prop.schemaSrc !== "" && state.schemaName === "") {
  loadSchema();
}

const handleJsonSchemaChange = (e) => {
  const { name, value } = e.target; // Destructure name and value from the event target
  setJsonSchema((prevJsonSchema) => ({
    ...prevJsonSchema,
    [name]: value, // Dynamically update the property based on input name
  }));
};

const handleAddProperty = () => {
  if (state.newPropertyName.trim() === "") return;

  const newProperty = {
    name: state.newPropertyName,
    type: state.newPropertyType,
    isRequired: state.newPropertyRequired,
    isMulti: state.newPropertyIsMulti,
  };

  State.update({
    properties: [...state.properties, newProperty],
    newPropertyName: "",
    newPropertyType: "string",
    newPropertyIsMulti: false,
    newPropertyIsRequired: false,
  });
};

const handleRemoveProperty = (index) => {
  const updatedProperties = [...state.properties];
  updatedProperties.splice(index, 1);
  State.update({ properties: updatedProperties });
};

const handlePropertyChange = (e, index) => {
  const updatedProperties = [...state.properties];
  updatedProperties[index].name = e.target.value;
  State.update({ properties: updatedProperties });
};

const handleTypeChange = (e, index) => {
  const updatedProperties = [...state.properties];
  updatedProperties[index].type = e.target.value;
  State.update({ properties: updatedProperties });
};

const handleMultiChange = (e, index) => {
  const updatedProperties = [...state.properties];
  updatedProperties[index].isMulti = e.target.value;
  State.update({ properties: updatedProperties });
};

const handleRequiredChange = (e, index) => {
  const updatedProperties = [...state.properties];
  updatedProperties[index].isRequired = e.target.value;
  State.update({ properties: updatedProperties });
};

const handleTypeNameChange = (e) => {
  State.update({ typeName: e.target.value.toLowerCase() });
};

const handleSchemaNameChange = (e) => {
  State.update({ schemaTitle: e.target.value });
};

function TypeSelect({ value, onChange }) {
  return (
    <Select value={value} onChange={onChange}>
      {availableTypes.map((it) => (
        <option value={it} key={it}>
          {it}
        </option>
      ))}
    </Select>
  );
}

function MultiSelect({ value, onChange }) {
  return (
    <Select value={value} onChange={onChange}>
      <option value={false}>single</option>
      <option value={true}>multi</option>
    </Select>
  );
}

function RequiredSelect({ value, onChange }) {
  return (
    <Select value={value} onChange={onChange}>
      <option value={false}>no</option>
      <option value={true}>yes</option>
    </Select>
  );
}

return (
  <Container>
    <Row>
      <Text>
        <b>Import Schema:</b>
      </Text>
      <Input
        type="text"
        value={state.newSchema}
        onChange={(e) => State.update({ newSchema: e.target.value })}
        placeholder={"account/schema/title"}
      />
      <Button onClick={loadSchema}>load</Button>
    </Row>
    <Row>
      <Text>
        <b>Import Types:</b>
      </Text>
      <Input
        type="text"
        value={state.newTypeSrc}
        onChange={(e) => State.update({ newTypeSrc: e.target.value })}
        placeholder={"hyperfiles.near"}
      />
      <Button onClick={() => State.update({ typeSrc: state.newTypeSrc })}>
        apply
      </Button>
    </Row>
    <FormContainer>
      <Row>
        <Text>
          <b>Title:</b>
        </Text>
        <Input
          type="text"
          name="title"
          value={schemaTitle}
          onChange={handleSchemaNameChange}
          placeholder="Schema Title"
        />
        <i>*overwrites existing path when saved</i>
      </Row>
      <Row>
        <Text>
          <b>Description:</b>
        </Text>
        <Input
          type="text"
          placeholder="Concisely explain."
          value={state.jsonSchema.description}
          onChange={handleSchemaDescriptionChange}
        />
      </Row>
      <Row>
        <Text>
          <b>Type:</b>
        </Text>
        <Select value={value} onChange={handleSchemaTypeChange}>
          <option value={"object"}>object</option>
          <option value={"boolean"}>boolean</option>
        </Select>
      </Row>
      <hr></hr>
      <Text>
        <h4>Schema Properties</h4>
        <i>*Add properties below that are relevant to your use case.</i>
        <br />
        <br />
        <b>1.</b> [Name]: describe the property
        <br />
        <b>2.</b> [Type]: how is the property structured?
        <a href="https://everything.dev/every.near/widget/every.type.create">
          <i>[Define new types]</i>
        </a>
        <br />
        <b>3.</b> [Single/Multi]: can the property be an array?
        <br />
        <b>4.</b> [Required]: is the property required?
      </Text>
      {state.properties?.map((property, index) => (
        <Row key={index}>
          <div>
            <Label>Name:</Label>
            <Input
              type="text"
              value={property.name}
              onChange={(e) => handlePropertyChange(e, index)}
            />
          </div>
          <div>
            <Label>Type:</Label>
            <TypeSelect
              value={property.type}
              onChange={(e) => handleTypeChange(e, index)}
            />
          </div>
          <div>
            <Label>isMulti:</Label>
            <MultiSelect
              value={property.isMulti}
              onChange={(e) => handleMultiChange(e, index)}
            />
          </div>
          <div>
            <Label>Required:</Label>
            <RequiredSelect
              value={property.isRequired}
              onChange={(e) => handleRequiredChange(e, index)}
            />
          </div>
          <div>
            <Label>Remove:</Label>

            <Button onClick={() => handleRemoveProperty(index)}>Remove</Button>
          </div>
        </Row>
      ))}
      <Row>
        <div>
          <Label>New Property Name:</Label>
          <Input
            type="text"
            placeholder="Property Name"
            value={state.newPropertyName}
            onChange={(e) => State.update({ newPropertyName: e.target.value })}
          />
        </div>
        <div>
          <Label>New Type:</Label>
          <TypeSelect
            value={state.newPropertyType}
            onChange={(e) => State.update({ newPropertyType: e.target.value })}
          />
        </div>
        <div>
          <Label>isMulti:</Label>
          <MultiSelect
            value={state.newPropertyIsMulti}
            onChange={(e) =>
              State.update({ newPropertyIsMulti: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Required:</Label>
          <RequiredSelect
            value={state.newPropertyIsRequired}
            onChange={(e) =>
              State.update({ newPropertyIsRequired: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Add:</Label>
          <Button
            onClick={handleAddProperty}
            disabled={state.newPropertyName.trim() === ""}
          >
            +
          </Button>
        </div>
      </Row>

      <hr></hr>
      <Row>
        <CommitButton
          force
          data={output}
          disabled={state.properties.length === 0}
          className="styless"
        >
          Publish/Update Schema
        </CommitButton>
      </Row>
    </FormContainer>
  </Container>
);
