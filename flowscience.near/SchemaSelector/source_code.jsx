const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  `;

const FormContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
`;

const Select = styled.select`
  `;

const Label = styled.label`
`;

const Input = styled.input`
  `;

const [selectedSchema, setSelectedSchema] = useState(
  props.selectedSchema || "attestations.near/type/isTrue"
);
const [inputSchemaSrc, setInputSchemaSrc] = useState(
  props.schemaSrc || "attestations.near"
);
const [schemaSrc, setSchemaSrc] = useState(
  props.schemaSrc || "attestations.near"
);
const [availableSchemas, setAvailableSchemas] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const fetchSchemasList = () => {
  setIsLoading(true);
  const schemas = Social.get(`${inputSchemaSrc}/type/**`, "final");
  if (schemas !== null) {
    const schemasList = Object.keys(schemas).map(
      (key) => `${inputSchemaSrc}/type/${key}`
    );
    setAvailableSchemas(schemasList);
  }
  setIsLoading(false);
  // Optionally handle state update using the State object if needed
  // State.update({ schemaSrc: inputSchemaSrc });
};

const handleSchemaChange = (e) => {
  const newSchema = e.target.value;
  setSelectedSchema(newSchema);
  // Update the global state if necessary
  props.onSelectedSchemaChange(newSchema);
};

const handleSchemaOwnerChange = (e) => {
  setInputSchemaSrc(e.target.value);
};

const handleApplyClick = () => {
  setSchemaSrc(inputSchemaSrc);
  fetchSchemasList();
};

return (
  <FormContainer>
    <Label>Schema Owner:</Label>
    <Row>
      <Input
        type="text"
        value={inputSchemaSrc}
        onChange={handleSchemaOwnerChange}
      />
      <Button onClick={handleApplyClick}>apply</Button>
    </Row>
    <Label>Schema:</Label>
    <Row>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Select value={selectedSchema} onChange={handleSchemaChange}>
          <option value="">Choose a schema</option>
          {availableSchemas.map((schema) => (
            <option key={schema} value={schema}>
              {schema}
            </option>
          ))}
        </Select>
      )}
    </Row>
  </FormContainer>
);
