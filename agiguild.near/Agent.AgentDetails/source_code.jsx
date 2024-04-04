let { src, tab, schemaFile, namespace } = props;

const summaryComponent = "agiguild.near/widget/Agent.AgentSummary";
const customComponentLabel = (component) => {
    if (component === `agiguild.near/widget/Agent.AgentChat`) {
        return "Chat";
    }
    return <Widget src="near/widget/DIG.Tooltip" props={{ content: <p>{component}</p>, trigger: "Chat (Custom component)"}} />;
}

const additionalTabs = (entity) => {
  const agentComponent = entity.component ? entity.component : `agiguild.near/widget/Agent.AgentChat`;

  return {
    name: customComponentLabel(agentComponent),
    value: "chat",
    content: <Widget src={agentComponent} props={{ src, embedded: true }} />,
    icon: "ph ph-code",
}};

return (
  <Widget src="near/widget/Entities.Template.EntityDetails"
          props={{ src, tab, schemaFile, namespace, summaryComponent, additionalTabs }} />
);
