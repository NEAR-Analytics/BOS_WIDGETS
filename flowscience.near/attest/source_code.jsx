const selectedSchema = props.selectedSchema ?? "attestations.near/type/isTrue";
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

const initialFormValues = {
  recipientId: props.recipientId || "",
  expireDate: props.expireDate || "",
  expireTime: props.expireTime || "",
  revokeDate: props.revokeDate || "",
  refUID: props.refUID || "",
  payload: props.payload || "",
  // Initialize dynamic schema fields here as well
};

// Initialize state
const [formValues, setFormValues] = useState(initialFormValues);

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
  selectedSchema: selectedSchema,
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
    [selectedSchema]: {
      [state.objectUID]: {
        attestor: context.accountId,
        recipientId: state.recipientId,
        expireDate: state.expireDate,
        expireTime: state.expireTime,
        refUID: state.refUID,
        payload: state.payload,
      },
    },
  },
};

const DynamicInput = ({ fieldName, type, value, placeholder }) => {
  const handleChange = (e) => {
    const newValue =
      type === "boolean" ? e.target.value === "true" : e.target.value;
    handleInputChange(fieldName, newValue);
  };

  if (type === "boolean") {
    return (
      <Select onChange={handleChange} value={String(value)}>
        <option value="true">true</option>
        <option value="false">false</option>
      </Select>
    );
  } else {
    return (
      <Input
        type={type}
        onChange={handleChange}
        value={value || ""}
        placeholder={placeholder}
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
  // Construct the attestData object using formValues state
  const attestData = {
    attestation: {
      [selectedSchema]: {
        // Generate a UID for the attestation if necessary or use an existing one
        [formValues.objectUID || state.objectUID]: {
          ...formValues, // Spread the formValues into the attestation data
          attestor: context.accountId,
        },
      },
    },
  };

  // Save the attestation data
  Social.set(attestData)
    .then(() => {
      console.log("Attestation saved successfully");
      if (onChange) {
        onChange(attestData); // Invoke onChange with the new attestation data if provided
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

const handleInputChange = (propertyName, value) => {
  // Update the local state
  setFormValues((prev) => ({ ...prev, [propertyName]: value }));

  // Update the global state
  State.update({ [propertyName]: value });
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
}, [selectedSchema]);

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
      value={recipientId}
      onChange={(e) => State.update({ recipientId: e.target.value })}
      placeholder="recipient.near"
    />
    <Label>
      <b>Expiration Date: </b>
    </Label>
    <Input
      type="date"
      value={expireDate}
      onChange={(e) => State.update({ expireDate: e.target.value })}
      placeholder=""
    />
    <Label>
      <b>Expiration Time: </b>
    </Label>
    <Input
      type="time"
      value={expireTime}
      onChange={(e) => State.update({ expireTime: e.target.value })}
      placeholder=""
    />
    <Label>
      <b>refUID: </b>
    </Label>
    <Input
      type="text"
      value={refUID}
      onChange={(e) => State.update({ refUID: e.target.value })}
      placeholder="attestations.near/thing/0123456789123456"
    />
    <Label>
      <b>Data Payload: </b>
    </Label>
    <Input
      type="text"
      value={payload}
      onChange={(e) => State.update({ payload: e.target.value })}
      placeholder="# This is markdown text."
    />
    {Object.entries(schemaFields).map(([fieldName, details]) => (
      <Row key={fieldName}>
        <Label>{fieldName}:</Label>
        <DynamicInput
          fieldName={fieldName}
          type={details.type}
          value={formValues[fieldName]}
          placeholder={`Enter ${fieldName}`}
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
