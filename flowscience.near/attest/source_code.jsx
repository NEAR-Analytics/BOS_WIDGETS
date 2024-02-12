const initialFormValues = {
  recipientId: props.recipientId || "",
  expireDate: props.expireDate || "",
  expireTime: props.expireTime || "",
  revokeDate: props.revokeDate || "",
  refUID: props.refUID || "",
  payload: props.payload || "",
};

// Initialize state
const [formValues, setFormValues] = useState({
  recipientId: props.recipientId || "",
  expireDate: props.expireDate || "",
  expireTime: props.expireTime || "",
  revokeDate: props.revokeDate || "",
  refUID: props.refUID || "",
  payload: props.payload || "",
});
const [selectedSchema, setSelectedSchema] = useState(
  props.selectedSchema ?? "attestations.near/type/isTrue"
);
const [schemaFields, setSchemaFields] = useState({});
const {
  item,
  onChange,
  recipientId,
  expireDate,
  expireTime,
  revokeDate,
  refUID,
  payload,
} = props;

const Input = styled.input`
  height: 30px;
`;

const Select = styled.select`
  height: 30px;
`;

const Button = styled.button`
  text-transform: lowercase !important;
  padding: 8px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.label`
`;

const { generateUID } = VM.require("flowscience.near/widget/generateUID");

State.init({
  ...item.value,
  objectUID: generateUID(),
  selectedSchema: props.selectedSchema,
  schemaFields: schemaFields,
  recipientId: state.recipientId,
  expireDate: state.expireDate,
  expireTime: state.expireTime,
  refUID: state.refUID,
  payload: state.payload,
  attestData: props.data,
  metadata: "",
});

const attestData = {
  attestation: {
    [props.selectedSchema]: {
      [state.objectUID]: {
        ...formValues,
      },
    },
  },
};

const DynamicInput = ({ fieldName, type, onChange, value, placeholder }) => {
  // Ensure that the onChange function is properly calling handleInputChange with the correct values
  const handleChange = (e) => {
    const newValue =
      type === "boolean" ? e.target.value === "true" : e.target.value;
    onChange(fieldName, newValue);
  };

  if (type === "boolean") {
    return (
      <Select onChange={handleChange} value={String(value)}>
        <option value="">Select...</option>
        <option value="true">True</option>
        <option value="false">False</option>
      </Select>
    );
  } else {
    return (
      <Input
        type="text" // Change this if you have other types you want to handle differently
        onChange={handleChange}
        value={value || ""}
        placeholder={placeholder || `Enter ${fieldName}`}
      />
    );
  }
};

// Primitive checks
if (["string", "number", "date", "time", "boolean"].includes(item.type)) {
  return (
    <DynamicInput
      type={item.type === "string" ? "text" : item.type}
      onChange={onChange}
      value={item.value}
    />
  );
}

// On-chain Type
const type = JSON.parse(Social.get(item.type, "final") || "null");
const properties = type.properties || [];
const createWidgetSrc = type.widgets?.create;

function Property({ property, value }) {
  // If property is multiple values
  if (property.isMulti === "true") {
    // Build an array (recursively calls this Widget)
    return (
      <Widget
        src="efiz.near/widget/every.array.build"
        props={{
          item: { ...property, value },
          onChange: (val) => handleInputChange(property.name, val),
        }}
      />
    );
  }
  // Else check for primitives
  if (["string", "number", "date", "time", "boolean"].includes(property.type)) {
    return (
      <DynamicInput
        type={property.type === "string" ? "text" : property.type}
        onChange={(e) => handleInputChange(property.name, e.target.value)}
        value={state[property.name] || ""}
        placeholder={property.name}
      />
    );
  } else {
    // This requires a specific type of creator
    // (like image upload)
    // TODO: I don't think this does what I want it to yet...
    const propertyType = JSON.parse(
      Social.get(property.type, "final") || "null"
    );
    const widgetSrc = propertyType?.widgets?.create;
    // it would be great to modify the onChange function
    return (
      <Widget
        src={widgetSrc}
        props={{ onChange: (e) => handleInputChange(property.name, e) }}
      />
    );
  }
}

const handleSave = () => {
  Social.set(attestData)
    .then(() => {
      console.log("Attestation saved successfully");
      if (onChange) {
        onChange(attestData);
      }
    })
    .catch((error) => {
      console.error("Error saving attestation:", error);
    });
};

const handleSchemaChange = (e) => {
  const newSchema = e.target.value;
  State.update({
    selectedSchema: newSchema,
    schemaFields: Social.get(selectedSchema),
  });
};

const handleInputChange = (fieldName, newValue) => {
  setFormValues((prev) => ({
    ...prev,
    [fieldName]: newValue,
  }));
};

const fetchSchema = (selectedSchema) => {
  // Example fetch logic, adjust based on your API/backend
  const schemaDetails = Social.get(selectedSchema, "final");
  if (schemaDetails) {
    try {
      const parsedSchemaDetails = JSON.parse(schemaDetails);
      setSchemaFields(parsedSchemaDetails);
    } catch (error) {
      console.error("Failed to parse schema details:", error);
      setSchemaFields({});
    }
  } else {
    console.log("Schema details not found for:", schema);
    setSchemaFields({});
  }
};

useEffect(() => {
  const fetchSchemaDetails = async () => {
    const schemaDetailsRaw = Social.get(`${selectedSchema}`, "final");
    if (schemaDetailsRaw) {
      try {
        const schemaDetails = JSON.parse(schemaDetailsRaw);
        setSchemaFields(schemaDetails.properties || {});
      } catch (error) {
        console.error("Error parsing schema details:", error);
        setSchemaFields({});
      }
    } else {
      console.log("Schema details not found for:", selectedSchema);
      setSchemaFields({});
    }
  };

  fetchSchemaDetails();
}, [selectedSchema, props.selectedSchema]);

return (
  <Container>
    <Label>
      <b>UID:</b> {state.objectUID}
    </Label>
    <Label>
      <b>Attestor:</b> {context.accountId}
    </Label>
    <Label>
      <b>Recipient: </b>
    </Label>
    <Input
      type="text"
      value={formValues.recipientId}
      onChange={(e) => handleInputChange("recipientId", e.target.value)}
      placeholder="recipient.near"
    />
    <Label>
      <b>Expiration Date: </b>
    </Label>
    <Input
      type="date"
      value={formValues.expireDate}
      onChange={(e) => handleInputChange("expireDate", e.target.value)}
      placeholder=""
    />
    <Label>
      <b>Expiration Time: </b>
    </Label>
    <Input
      type="time"
      value={formValues.expireTime}
      onChange={(e) => handleInputChange("expireTime", e.target.value)}
      placeholder=""
    />
    <Label>
      <b>refUID: </b>
    </Label>
    <Input
      type="text"
      value={formValues.refUID}
      onChange={(e) => handleInputChange("refUID", e.target.value)}
      placeholder="attestations.near/thing/0123456789123456"
    />
    <Label>
      <b>Data Payload: </b>
    </Label>
    <Input
      type="text"
      value={formValues.payload}
      onChange={(e) => handleInputChange("payload", e.target.value)}
      placeholder="# This is markdown text."
    />
    {Object.entries(schemaFields).map(([fieldName, details]) => (
      <Row key={fieldName}>
        <Label>{fieldName}:</Label>
        <DynamicInput
          fieldName={fieldName}
          type={details.type}
          value={formValues[fieldName]}
          onChange={handleInputChange}
          placeholder={details.placeholder || `Enter ${fieldName}`}
        />
      </Row>
    ))}
    {createWidgetSrc ? (
      <>
        <Widget src={createWidgetSrc} props={{ onChange }} />
      </>
    ) : (
      <>
        {properties?.map((property) => (
          <div key={property.name}>
            <Label>{property.name}</Label>
            <Row>
              <Property property={property} value={item.value[property.name]} />
            </Row>
          </div>
        ))}
      </>
    )}
    <Button onClick={handleSave}>Save</Button>
    <hr></hr>Preview:
    <Widget
      src="efiz.near/widget/Every.Raw.View"
      props={{
        value: attestData,
      }}
    />
  </Container>
);
