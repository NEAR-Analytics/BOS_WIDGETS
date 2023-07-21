State.init({
  contracts: props.contracts,
  theme: props.theme || "light",
});

const getConfig = (network) => {
  switch (network) {
    case "mainnet":
      return {
        rpcUrl: "https://rpc.mainnet.near.org",
        contractId: "v1.sourcescan.near",
        apiHost: "https://sourcescan.2bb.dev",
      };
    case "testnet":
      return {
        rpcUrl: "https://rpc.testnet.near.org",
        contractId: "v5.sourcescan.testnet",
        apiHost: "https://sourcescan.2bb.dev",
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
};
const config = getConfig(context.networkId);

if (props.contracts)
  State.update({
    contracts: props.contracts,
  });

const dark = {
  bg: "#28282b",
  color: "#e6eaee",
  border: "#748094",
};

const light = {
  bg: "#e3e8ef",
  color: "#4c5566",
  border: "#748094",
};

const useTheme = (light, dark) => {
  return state.theme === "light" ? light : dark;
};

const Table = styled.table`
  border: 1px solid ${useTheme(light.border, dark.border)};
  background-color: ${useTheme(light.bg, dark.bg)}; 
  color: ${useTheme(light.color, dark.color)};
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;

  th {
    padding: 15px;
  }

  td {
    max-width: 200px;
    border-top: 0.5px dashed ${useTheme(light.border, dark.border)};
    padding: 15px;
  }
`;

const Truncated = styled.p`
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; /
`;

return (
  <Table>
    <thead>
      <tr>
        <th>Contract</th>
        <th>Lang</th>
        <th>Source</th>
        <th>Approved</th>
      </tr>
    </thead>
    <tbody>
      {state.contracts
        ? state.contracts.map((contract) => {
            const contractId = contract[0];
            const lang = contract[1].lang;
            const cid = contract[1].cid;

            return (
              <tr>
                <td>{contractId}</td>
                <td>{lang}</td>
                <td>
                  <Truncated>{cid}</Truncated>
                </td>
                <td>
                  <Widget
                    src="sourcescan.near/widget/SourceScan.Contracts.Approved"
                    props={{
                      rpcUrl: config.rpcUrl,
                      apiHost: config.apiHost,
                      accountId: contractId,
                      cid: cid,
                    }}
                  />
                </td>
              </tr>
            );
          })
        : null}
    </tbody>
  </Table>
);
