const item = props.item;
const onChange = props.onChange;
const selectedSchema = props.selectedSchema;

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

State.init({
  ...item.value,
});

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

const fetchSchemaProperties = async (schemaIdentifier) => {
  const schema = JSON.parse(
    (await Social.get(schemaIdentifier, "final")) || "{}"
  );
  return schema.properties || [];
};

// Function to render input fields for schema properties
const renderSchemaProperties = async (schemaIdentifier) => {
  const properties = await fetchSchemaProperties(schemaIdentifier);
  return properties.map((property) => (
    <div key={property.name}>
      <Label>{property.name}</Label>
      <Row>
        <Property property={property} value={State[property.name] || ""} />
      </Row>
    </div>
  ));
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

return (
  <Container>
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
  </Container>
);
