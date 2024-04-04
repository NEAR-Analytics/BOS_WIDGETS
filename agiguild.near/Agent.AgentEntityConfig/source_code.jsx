const convertSnakeToPascal = (item) => {
    const newItems = {};
    Object.keys(item).forEach((key) => {
    const pascalKey = key.replace(/(_\w)/g, (m) => m[1].toUpperCase());
    newItems[pascalKey] = item[key];
  });
  return newItems;
};
const renderItem = (item, editFunction) => {
  const flatItem = {...item, ...item.attributes};
  delete flatItem.attributes;
  return (
    <Widget
      src="agiguild.near/widget/Agent.AgentCard"
      props={{
        item: convertSnakeToPascal(flatItem),
        editFunction,
        namespace: 'agiguild',
        entityType: 'agent',
        schemaFile: "agiguild.near/widget/Schema.Agent",
      }}
    />
  );
};
return (
        <Widget src="near/widget/Entities.Template.GenericEntityConfig"
                props={{namespace: 'agiguild', entityType: 'agent', title: 'Agent',
                    schemaFile: "agiguild.near/widget/Schema.Agent",
                    renderItem,
        }}/>
)