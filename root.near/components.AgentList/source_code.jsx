const accountId = props.accountId || '*';
const agents = props.agents ?? [];

const data = Social.keys(`${accountId}/agent/*`, "final", { return_type: "BlockHeight" });

if (data) {
    agents = [];

    Object.keys(data).forEach((accountId) => {
        return Object.keys(data[accountId].agent).forEach((agentName) => {
            agents.push({
                accountId,
                agentName,
                blockHeight: data[accountId].agent[agentName],
            });
        });
    });

    agents.sort((a, b) => b.blockHeight - a.blockHeight);
}

if (!agents) return 'Loading...';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px;

  @media (max-width: 700px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

return (
    <Wrapper>
        <Items>
            {agents.map((agent, i) => (
                <Widget
                    src="${REPL_ACCOUNT}/widget/AgentCard"
                    props={{ src: `${agent.accountId}/agent/${agent.agentName}`, blockHeight: agent.blockHeight }}
                />
            ))}
        </Items>
    </Wrapper>
);
