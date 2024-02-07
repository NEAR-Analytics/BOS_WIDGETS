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

State.init({
  ...item.value,
  objectUID: generateUID(),
  selectedSchema: selectedSchema,
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

const handleInputChange = (name, value) => {
  State.update({ [name]: value });
  if (props.onChange) {
    props.onChange({ [name]: value });
  }
};

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
    [state.selectedSchema]: JSON.stringify({
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
