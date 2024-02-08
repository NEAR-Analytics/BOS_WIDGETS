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

return { renderSchemaSelection };
