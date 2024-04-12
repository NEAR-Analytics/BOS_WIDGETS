const convertSnakeToPascal = (item) => {
  const newItems = {};
  Object.keys(item).forEach((key) => {
    const pascalKey = key.replace(/(_\w)/g, (m) => m[1].toUpperCase());
    newItems[pascalKey] = item[key];
  });
  return newItems;
};
const renderItem = (item, editFunction) => {
  const flatItem = { ...item, ...item.attributes };
  delete flatItem.attributes;
  return (
    <Widget
      src="near/widget/AI.Agent.AgentCard"
      props={{
        item: convertSnakeToPascal(flatItem),
        editFunction,
        namespace: "near",
        entityType: "agent",
        schemaFile: "near/widget/AI.Schema.Agent",
      }}
    />
  );
};
return (
  <Widget
    src="near/widget/Entities.Template.GenericEntityConfig"
    props={{
      namespace: "near",
      entityType: "agent",
      title: "Agent",
      schemaFile: "near/widget/AI.Schema.Agent",
      renderItem,
    }}
  />
);
