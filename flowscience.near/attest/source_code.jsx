const item = props.item;
const onChange = props.onChange;
const selectedSchema = props.selectedSchema ?? "attestations.near/type/isTrue";
const recipientId = props.recipientId;
const expireDate = props.expireDate;
const expireTime = props.expireTime;
const revokeDate = props.revokeDate;
const refUID = props.refUID;
const payload = props.payload;

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

function generateUID() {
  const length = 42; // This will create a 168-bit number (42 hexadecimal characters)
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

const fetchSchema = (schemaId) => {
  // Simulate fetching schema details asynchronously
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const schemaDetails = {
        /* mock schema details based on schemaId */
      };
      resolve(schemaDetails);
    }, 1000); // Simulate network request delay
  });
};

State.init({
  ...item.value,
  objectUID: generateUID(),
  selectedSchema: selectedSchema,
  schemaDetails: schemaDetails,
  recipientId: state.recipientId,
  expireDate: state.expireDate,
  expireTime: state.expireTime,
  revokeDate: state.revokeDate,
  revokeTime: state.revokeTime,
  refUID: state.refUID,
  payload: state.payload,
  data: state.data,
  metadata: "",
});

useEffect(() => {
  if (!state.initialFetchCompleted) {
    // Assuming you introduce a flag like this
    fetchSchema(state.selectedSchema)
      .then((schemaDetails) => {
        State.update({ schemaDetails, initialFetchCompleted: true });
      })
      .catch((error) => {
        console.error("Failed to fetch schema details:", error);
      });
  }
}, [state.selectedSchema]);

const data = {
  attestation: {
    [selectedSchema]: JSON.stringify({
      fields: {
        objectUID: state.objectUID,
        attestor: context.accountId,
        recipientId: state.recipientId,
        expireDate: state.expireDate,
        expireTime: state.expireTime,
        revokeDate: state.revokeDate,
        revokeTime: state.revokeTime,
        refUID: state.refUID,
        payload: state.payload,
        schema: state.selectedSchema,
      },
    }),
  },
};

const DynamicInput = ({ type, onChange, value, placeholder }) => {
  if (type === "boolean") {
    return (
      <Select onChange={onChange} value={value}>
        <option value="true">true</option>
        <option value="false">false</option>
      </Select>
    );
  } else {
    return (
      <Input
        type={type}
        onChange={onChange}
        value={value}
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
  // Check if selectedSchema is correctly set in the state before saving
  if (!state.selectedSchema) {
    console.error("Selected schema is undefined");
    return;
  }

  // Use the selectedSchema from state
  const attestationData = {
    data: JSON.stringify({
      fields: {
        objectUID: state.objectUID,
        attestor: context.accountId,
        recipientId: state.recipientId,
        expireDate: state.expireDate,
        expireTime: state.expireTime,
        revokeDate: state.revokeDate,
        revokeTime: state.revokeTime,
        refUID: state.refUID,
        payload: state.payload,
        schemaState: state.schemaState,
      },
      schema: state.selectedSchema,
    }),
  };

  // Construct the final data structure to save
  const saveData = {
    attestation: attestationData,
  };

  Social.set(saveData)
    .then(() => {
      // Handle the success of the operation
      console.log("Attestation saved successfully");
    })
    .catch((error) => {
      // Handle any errors that occur during the save
      console.error("Error saving attestation:", error);
    });
};

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

// Dynamically render input fields based on the fetched schema details
const renderSchemaInputs = () => {
  const { schemaDetails } = State;
  if (!schemaDetails || !schemaDetails.properties) return null;

  return schemaDetails.properties.map((property) => (
    <div key={property.name}>
      <Label>{property.name}</Label>
      <Input
        type="text" // Adjust the type based on the property type
        value={State.data[property.name] || ""}
        onChange={(e) => handleInputChange(property.name, e.target.value)}
      />
    </div>
  ));
};

// Handle input changes for dynamically rendered fields
const handleInputChange = (propertyName, value) => {
  const newData = { ...State.data, [propertyName]: value };
  State.update({ data: newData });
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
      <b>Data: </b>
    </Label>
    <Input
      type="text"
      value={payload}
      onChange={(e) => State.update({ payload: e.target.value })}
      placeholder="# This is markdown text."
    />
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
    {renderSchemaInputs()}
    <Button onClick={handleSave}>Save</Button>
    <hr></hr>Preview:
    <Widget
      src="efiz.near/widget/Every.Raw.View"
      props={{
        value: data,
      }}
    />
  </Container>
);
