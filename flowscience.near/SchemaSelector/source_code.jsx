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
const [schemaSrc, setSchemaSrc] = useState(
  props.schemaSrc || "attestations.near"
);
const [availableSchemas, setAvailableSchemas] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const fetchSchemasList = () => {
  setIsLoading(true);
  const schemas = Social.get(`${schemaSrc}/type/**`, "final");
  if (schemas !== null) {
    const schemasList = Object.keys(schemas).map(
      (key) => `${schemaSrc}/type/${key}`
    );
    setAvailableSchemas(schemasList);
  }
  setIsLoading(false);
  // Optionally handle state update using the State object if needed
  // State.update({ schemaSrc: schemaSrc });
};

const handleSchemaChange = (e) => {
  const newSchema = e.target.value;
  setSelectedSchema(newSchema);
  // Update the global state if necessary
  if (props.onSelectedSchemaChange) {
    props.onSelectedSchemaChange(newSchema);
  }
};

const handleSchemaOwnerChange = (e) => {
  setschemaSrc(e.target.value);
};

const handleApplyClick = () => {
  setSchemaSrc(schemaSrc);
  fetchSchemasList();
};

return (
  <FormContainer>
    <Label>Schema Owner:</Label>
    <Row>
      <Input type="text" value={schemaSrc} onChange={handleSchemaOwnerChange} />
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
