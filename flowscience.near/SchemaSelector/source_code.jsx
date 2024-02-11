const [selectedSchema, setSelectedSchema] =
  useState("") || "attestations.near/type/isTrue";
const schemaType = props.schemaType || "hyperfiles.near/type/schema";
const schemaSrc = props.schemaSrc || "attestations.near";

State.init({
  schemaSrc,
  selectedSchema: selectedSchema,
  schemas: {},
});

let availableSchemas = [];
const schemas = Social.get(`${state.schemaSrc}/type/**`, "final");
if (schemas !== null) {
  availableSchemas =
    Object.keys(schemas)?.map((it) => `${state.schemaSrc}/type/${it}`) || [];
}

console.log(`Fetching schema for: ${selectedSchema}`);
const schemaDetails = Social.get(selectedSchema, "final");
console.log(`Response for ${selectedSchema}:`, schemaDetails);

const handleSchemaChange = (e) => {
  const newSchema = e.target.value;
  State.update({
    selectedSchema: newSchema,
  });
  if (!state.selectedSchema) {
    console.error("Selected schema is undefined");
    return;
  }
};

const handleSchemaOwnerChange = (e) => {
  const newSchemaSrc = e.target.value;
  State.update({
    schemaSrc: newSchemaSrc,
  });
  fetchSchemasList(newSchemaSrc);
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
    </FormContainer>
  );
};

return { renderSchemaSelection };
