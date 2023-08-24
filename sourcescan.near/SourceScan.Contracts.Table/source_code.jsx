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
  text-align: start;
  th {
    padding: 15px;
  }

  td {
    border-top: 0.5px dashed ${useTheme(light.border, dark.border)};
    padding: 15px;
  }
`;

const THead = styled.thead`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 100;
  color: ${useTheme(light.border, dark.border)};
`;

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  gap: 8px;
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
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
        clip-rule="evenodd"
      />
      <path
        fill-rule="evenodd"
        d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
        clip-rule="evenodd"
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
        <THead>
          <tr>
            <th>Contract</th>
            <th>Lang</th>
            <th>IPFS</th>
            <th>Github</th>
            <th>Approved</th>
          </tr>
        </THead>
        <tbody>
          {state.contracts
            ? state.contracts.map((contract, i) => {
                const contractId = contract[0];
                const lang = contract[1].lang;
                const cid = contract[1].cid;
                const deploy_tx = contract[1].deploy_tx;
                const github = contract[1].github;
                return (
                  <tr key={i}>
                    <td>{contractId}</td>
                    <td>{lang}</td>
                    <td>
                      <HStack>
                        {truncateStringInMiddle(cid, 8)}
                        <A
                          href={`${props.apiHost}/ipfs/${cid}`}
                          target={"_blank"}
                        >
                          <LinkIcon width={"20px"} height={"20px"} />
                        </A>
                      </HStack>
                    </td>
                    <td>
                      {github ? (
                        <HStack>
                          {github.owner}/{github.repo}
                          <A
                            href={`https://github.com/${github.owner}/${github.repo}/tree/${github.sha}`}
                            target={"_blank"}
                          >
                            <LinkIcon width={"20px"} height={"20px"} />
                          </A>
                        </HStack>
                      ) : (
                        "None"
                      )}
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
