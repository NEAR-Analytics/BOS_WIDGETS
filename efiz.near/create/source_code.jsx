const item = props.item;
const onChange = props.onChange;

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

// Primitive checks
if (item.type === "string") {
  return <Input onChange={onChange} value={item.value} />;
} else if (item.type === "boolean") {
  return (
    <Select onChange={onChange} value={item.value}>
      <option value="true">true</option>
      <option value="false">false</option>
    </Select>
  );
} else if (item.type === "number") {
  return <Input type="number" onChange={onChange} value={item.value} />;
}

// On-chain Type
const type = JSON.parse(Social.get(item.type, "final") || "null");
const properties = type.properties || [];

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
  if (property.type === "string") {
    return (
      <Input
        onChange={(e) => handleInputChange(property.name, e.target.value)}
        value={state[property.name] || ""}
        placeholder={property.name}
      />
    );
  } else if (property.type === "date" || property.type === "time") {
    <Input
      type={property.type}
      onChange={(e) => handleInputChange(property.name, e.target.value)}
      value={state[property.name] || ""}
      placeholder={property.name}
    />;
  } else if (property.type === "boolean") {
    return (
      <Select
        onChange={(e) => handleInputChange(property.name, e.target.value)}
        value={state[property.name] || ""}
      >
        <option value="true">true</option>
        <option value="false">false</option>
      </Select>
    );
  } else if (property.type === "number") {
    return (
      <Input
        type="number"
        onChange={(e) =>
          handleInputChange(property.name, parseInt(e.target.value, 10))
        }
        value={state[property.name] || ""}
        placeholder={property.name}
      />
    );
  } else {
    // This requires a specific type of creator
    // (like image upload)
    // TODO: I don't think this does what I want it to yet...
    const itemType = JSON.parse(Social.get(item.type, "final") || "null");
    const widgetSrc = itemType?.widgets?.create;
    // it would be great to modify the onChange function
    return <Widget src={widgetSrc} onChange={onChange} />;
  }
}

return (
  <Container>
    {properties?.map((property) => (
      <div key={property.name}>
        <Label>{property.name}</Label>
        <Row>
          <Property property={property} value={item.value[property.name]} />
        </Row>
      </div>
    ))}
  </Container>
);
