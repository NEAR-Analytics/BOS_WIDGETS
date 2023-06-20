const onChange = props.onChange;
const type = JSON.parse(Social.get(props.type, "final") || "null");
const properties = type.properties || [];

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

const handleInputChange = (name, value) => {
  State.update({ [name]: value });
  if (props.onChange) {
    props.onChange({ [name]: value });
  }
};

function Property({ item }) {
  if (item.array === "multi") {
    return (
      <Widget
        src="efiz.near/widget/every.array.build"
        props={{
          item,
          onChange: (val) => handleInputChange(item.name, val),
        }}
      />
    );
  }
  if (item.type === "string") {
    return (
      <Input
        onChange={(e) => handleInputChange(item.name, e.target.value)}
        value={state[item.name] || ""}
        placeholder={item.name}
      />
    );
  } else if (item.type === "boolean") {
    return (
      <Select
        onChange={(e) => handleInputChange(item.name, e.target.value)}
        value={state[item.name] || ""}
      >
        <option value="true">true</option>
        <option value="false">false</option>
      </Select>
    );
  } else if (item.type === "number") {
    return (
      <Input
        type="number"
        onChange={(e) =>
          handleInputChange(item.name, parseInt(e.target.value, 10))
        }
        value={state[item.name] || ""}
        placeholder={item.name}
      />
    );
  } else {
    const itemType = JSON.parse(Social.get(item.type, "final") || "null");
    const widgetSrc = itemType?.widgets?.create;
    // it would be great to modify the onChange function
    return <Widget src={widgetSrc} onChange={onChange} />;
  }
}

return (
  <Container>
    {properties.map((item) => (
      <div key={item.name}>
        <Label>{item.name}</Label>
        <Row>
          <Property item={item} />
        </Row>
      </div>
    ))}
  </Container>
);
