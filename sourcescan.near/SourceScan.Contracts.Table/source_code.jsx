const useNetwork = (mainnet, testnet) => {
  return context.networkId === "mainnet" ? mainnet : testnet;
};

State.init({
  contracts: props.contracts,
  theme: props.theme || "light",
  ownerId: useNetwork("sourcescan.near", "sourcescan.testnet"),
});

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

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Truncated = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LinkIcon = (width, height) => {
  const SVG = styled.svg`
    width: ${width}
    height: ${height}
  `;

  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    </SVG>
  );
};

const A = styled.a`
  text-decoration: none;
  color: ${useTheme(light.color, dark.color)};

  :hover {
    text-decoration: none;
    color: ${useTheme(light.color, dark.color)};
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const truncateStringInMiddle = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  }

  const halfMaxLength = Math.floor(maxLength / 2);
  const firstHalf = str.slice(0, halfMaxLength);
  const secondHalf = str.slice(-halfMaxLength);

  return firstHalf + "..." + secondHalf;
};

return (
  <>
    {state.contracts.length === 0 ? (
      <>Nothing here...</>
    ) : (
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
                      <A
                        href={`${props.apiHost}/ipfs/${cid}`}
                        target={"_blank"}
                      >
                        <HStack>
                          {truncateStringInMiddle(cid, 8)}
                          <LinkIcon width={"20px"} height={"20px"} />
                        </HStack>
                      </A>
                    </td>
                    <td>
                      <Center>
                        <Widget
                          src={`${state.ownerId}/widget/SourceScan.Contracts.Approved`}
                          props={{
                            rpcUrl: props.rpcUrl,
                            apiHost: props.apiHost,
                            accountId: contractId,
                            cid: cid,
                          }}
                        />
                      </Center>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    )}
  </>
);
