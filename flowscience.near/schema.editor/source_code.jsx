const typeSrc = props.typeSrc || "every.near";
const schemaSrc = props.schemaSrc ?? "attestations.near";
const blockHeight = props.blockHeight || "final";
const selectedSchema = props.selectedSchema ?? "attestations.near/type/isTrue";
const [resolverPath, setResolverPath] = useState(
  "flowscience.near/widget/attester.resolver"
);
const [resolverData, setResolverData] = Social.get(resolverPath.accountIds) || [
  "james.near",
  "build.near",
];

let type = {
  name: "",
  properties: [],
  widgets: {},
};

let schemaType = {
  UID: "",
  resolver: {
    resolverPath: state.resolverPath,
    resolverData: state.resolverData,
  },
  revocable: boolean,
  schema: Social.get(`${schemaSrc}/schema/**`, "final"),
};

const { generateUID } = VM.require("flowscience.near/widget/generateUID");

State.init({
  newType: typeSrc,
  typeName: type.name || "",
  properties: type.properties || [],
  widgets: type.widgets || {},
  newPropertyName: "",
  newPropertyType: "string",
  newWidgetKey: "",
  newWidgetSrc: "",
  newTypeSrc: "",
  typeSrc: typeSrc,
  expanded: false,
  selectedSchema: selectedSchema,
  schemaUID: state.selectedSchema.UID,
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
  const parts = state.newSchema.split("/");
  schema = JSON.parse(Social.get(state.newSchema, blockHeight) || null);
  if (schema) {
    schema.name = parts[2];
    State.update({
      schemaUID: schema.UID,
      properties: schema.properties,
      resolver: schema.resolver,
      revocable: schema.revocable,
    });
  }
};

if (prop.schemaSrc !== "" && state.schemaName === "") {
  loadSchema();
}

const handleAddProperty = () => {
  if (state.newPropertyName.trim() === "") return;

  const newProperty = {
    name: state.newPropertyName,
    type: state.newPropertyType,
    required: state.newPropertyRequired,
    isMulti: state.newPropertyIsMulti,
  };

  State.update({
    properties: [...state.properties, newProperty],
    newPropertyName: "",
    newPropertyType: "string",
    newPropertyIsMulti: false,
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

const handleTypeNameChange = (e) => {
  State.update({ typeName: e.target.value.toLowerCase() });
};

const handleWidgetKeyChange = (e) => {
  State.update({ newWidgetKey: e.target.value.toLowerCase() });
};

const handleWidgetSrcChange = (e) => {
  State.update({ newWidgetSrc: e.target.value });
};

const handleAddWidget = () => {
  if (state.newWidgetKey.trim() === "" || state.newWidgetSrc.trim() === "")
    return;

  const newWidget = {
    [state.newWidgetKey]: state.newWidgetSrc,
  };

  State.update({
    widgets: { ...state.widgets, ...newWidget },
    newWidgetKey: "",
    newWidgetSrc: "",
  });
};

const handleRemoveWidget = (key) => {
  const updatedWidgets = { ...state.widgets };
  delete updatedWidgets[key];
  State.update({ widgets: updatedWidgets });
};

const schemaData = () => {
  const data = {
    schemas: {
      [state.selectedSchema]: JSON.stringify({
        schemaUID: generateUID(),
        properties: state.properties,
        resolverPath: state.resolverPath,
        resolver: {
          type: resolverPath,
          data: resolverData,
        },
      }),
    },
  };
  return data;
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

const handleResolverPathChange = (e) => {
  setResolverPath(e.target.value);
};

const handleResolverDataChange = (newData) => {
  setResolverData(newData);
};

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
        placeholder={"accountId/type/schemaId"}
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
          <b>Schema Id:</b>
        </Text>
        <Input
          type="text"
          placeholder="schemaId"
          value={state.typeName}
          onChange={handleTypeNameChange}
        />
        <i>*overwrites existing path</i>
      </Row>
      <hr></hr>
      <Text>
        <h4>Schema Fields</h4>
        <i>*Add fields below that are relevant to your use case.</i>
        <br></br>
        <b>1.</b> [Field Name]: give a meaningful name to the data<br></br>
        <b>2.</b> [Field Type]: select an appropriate primitive for the data.{" "}
        <a href="https://everything.dev/every.near/widget/every.type.create">
          <i>[Define new types]</i>
        </a>
        <br></br>
        <b>3.</b> [Single/Multi]: will the data contain multiple objects of the
        selected type?
      </Text>
      {state.properties?.map((property, index) => (
        <Row key={index}>
          <Input
            type="text"
            value={property.name}
            onChange={(e) => handlePropertyChange(e, index)}
          />
          <TypeSelect
            value={property.type}
            onChange={(e) => handleTypeChange(e, index)}
          />
          <MultiSelect
            value={property.isMulti}
            onChange={(e) => handleMultiChange(e, index)}
          />
          <Button onClick={() => handleRemoveProperty(index)}>Remove</Button>
        </Row>
      ))}
      <Row>
        <Input
          type="text"
          placeholder="Field Name"
          value={state.newPropertyName}
          onChange={(e) => State.update({ newPropertyName: e.target.value })}
        />
        <TypeSelect
          value={state.newPropertyType}
          onChange={(e) => State.update({ newPropertyType: e.target.value })}
        />
        <MultiSelect
          value={state.newPropertyIsMulti}
          onChange={(e) => State.update({ newPropertyIsMulti: e.target.value })}
        />
        <Button
          onClick={handleAddProperty}
          disabled={state.newPropertyName.trim() === ""}
        >
          +
        </Button>
      </Row>
      <hr></hr>
      <Text>
        <b>Widgets (optional):</b>
      </Text>
      {Object.entries(state.widgets)?.map(([key, src]) => (
        <Row key={key}>
          <Text>{key}:</Text>
          <Input type="text" value={src} onChange={() => {}} />
          <Button onClick={() => handleRemoveWidget(key)}>Remove</Button>
        </Row>
      ))}
      <Row>
        <Input
          type="text"
          placeholder="Widget Name"
          value={state.newWidgetKey}
          onChange={handleWidgetKeyChange}
        />
        {":"}
        <Input
          type="text"
          placeholder="accountId/widget/name"
          value={state.newWidgetSrc}
          onChange={handleWidgetSrcChange}
        />
        <Button
          onClick={handleAddWidget}
          disabled={
            state.newWidgetKey.trim() === "" || state.newWidgetSrc.trim() === ""
          }
        >
          +
        </Button>
      </Row>
      <hr></hr>
      <Row>
        <Text>
          <b>Resolver:</b>
        </Text>
        <Select value={resolverPath} onChange={handleResolverPathChange}>
          <option value="">None</option>
          <option value="attester.resolver">Attester Resolver</option>
          {/* ... (other resolver options) */}
        </Select>
        {resolverPath === "attester.resolver" && (
          <Widget
            src="flowscience.near/widget/attester.resolver"
            props={{
              item: {
                type: item.resolverPath,
                value: item.resolverData,
              },
              onChange: handleResolverDataChange,
            }}
          />
        )}
      </Row>
      <i>
        *Optional logic that gets executed with every attestation of this type.
        (Can be used to verify, limit, act upon any attestation)
      </i>
      <hr></hr>
      <Row>
        <Text>
          <b>Is Revocable?</b>
        </Text>
        <Input
          type="checkbox"
          defaultChecked="true"
          onChange={(e) => State.update({ isRevocable: e.target.checked })}
        />
      </Row>
      <i>*Determine if attestations of this schema can be revocable.</i>
      <hr></hr>
      <Row>
        <CommitButton
          force
          data={schemaData()}
          disabled={state.properties.length === 0}
          className="styless"
        >
          Publish/Update Schema
        </CommitButton>
      </Row>
    </FormContainer>
  </Container>
);
