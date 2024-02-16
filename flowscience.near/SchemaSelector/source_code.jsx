const initialSchemaSrc = props.schemaSrc || "attestations.near";
const [newSchemaSrc, setNewSchemaSrc] = useState(initialSchemaSrc);
const [schemaSrc, setSchemaSrc] = useState(initialSchemaSrc);
const [availableSchemas, setAvailableSchemas] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [selectedSchema, setSelectedSchema] = useState(
  props.selectedSchema || "attestations.near/type/isTrue"
);

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

useEffect(() => {
  const fetchSchemasList = async () => {
    setIsLoading(true);
    const schemas = Social.get(`${schemaSrc}/type/**`, "final");
    if (schemas !== null) {
      const schemasList = Object.keys(schemas).map(
        (key) => `${schemaSrc}/type/${key}`
      );
      setAvailableSchemas(schemasList);
    } else {
      setAvailableSchemas([]);
    }
    setIsLoading(false);
  };

  fetchSchemasList();
}, [schemaSrc]); // Fetch schemas when schemaSrc changes

useEffect(() => {
  // Sync state with prop when it changes
  setSelectedSchema(props.selectedSchema);
}, [props.selectedSchema]); // Re-run effect if props.selectedSchema changes

const handleSchemaChange = (e) => {
  setSelectedSchema(e.target.value);
  console.log(`New schema selected: ${newSchema}`); // Log the new schema selection

  if (props.onSelectedSchemaChange) {
    props.onSelectedSchemaChange(e.target.value);
  }
};

const handleSchemaOwnerChange = (e) => {
  setNewSchemaSrc(e.target.value);
};

const handleApplySchemaSrc = () => {
  setSchemaSrc(newSchemaSrc);
  props.onSchemaSrcChange(newSchemaSrc); // Make sure this matches the prop passed from NAS.
  console.log("Applying new Schema Owner:", newSchemaSrc); // You mentioned seeing this log.

  console.log(`Applying new Schema Owner: ${schemaSrc}`); // Optionally log when applying a new Schema Owner
};

return (
  <FormContainer>
    <Label>Schema Owner:</Label>
    <Row>
      <Input
        type="text"
        value={newSchemaSrc}
        onChange={handleSchemaOwnerChange}
        placeholder="accountId"
      />
      <Button onClick={handleApplySchemaSrc}>apply</Button>
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
