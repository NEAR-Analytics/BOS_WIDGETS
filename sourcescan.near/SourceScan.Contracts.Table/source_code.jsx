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
  button: {
    bg: "#39393c",
    hoverBg: "#5e5e60",
  },
};

const light = {
  bg: "#e3e8ef",
  color: "#4c5566",
  border: "#748094",
  button: {
    bg: "#eef2f6",
    hoverBg: "#e3e8ef",
  },
};

const useTheme = (light, dark) => {
  return state.theme === "light" ? light : dark;
};

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Table = styled.table`
  border: 1px solid ${useTheme(light.border, dark.border)};
  background-color: ${useTheme(light.bg, dark.bg)};
  color: ${useTheme(light.color, dark.color)};
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  text-align: start;
  width: 50%;

  thead {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 100;
    color: ${useTheme(light.border, dark.border)};
  }

  th {
    padding: 15px;
  }

  td {
    border-top: 0.5px dashed ${useTheme(light.border, dark.border)};
    padding: 15px;
  }

  @media only screen and (max-width: 600px) {
    border: none;

    thead {
      display: none;
    }

    th {
      display: block;
      width: 100%;
    }

    tr {
      border-radius: 10px;
      display: block;
      width: full;
      border: 1px solid ${useTheme(light.border, dark.border)};
      margin-bottom: 40px;
    }

    td {
      position: relative;
      display: flex;
      align-items: end;
      justify-content: end;
      text-align: end;
      border: none;
    }

    td:before {
      width: 100%;
      content: attr(data-label);
      text-transform: uppercase;
      padding-right: 20px;
      font-size: 12px;
      font-weight: 100;
      color: ${useTheme(light.border, dark.border)};
      font-weight: bold;
      text-align: start;
    }
  }
`;

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  gap: 8px;
`;

const Desktop = styled.div`
  display: flex;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const Mobile = styled.div`
  display: none;

  @media only screen and (max-width: 600px) {
    display: flex;
    width: 230%;
  }
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
        fillRule="evenodd"
        d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
        clipRule="evenodd"
      />
    </SVG>
  );
};

const InfoIcon = (width, height) => {
  const SVG = styled.svg`
    width: ${width}
    height: ${height}
  `;

  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={`${useTheme(light.color, dark.color)}`}
    >
      <path
        fill-rule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
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

const Button = styled.a`
  height: 36px;
  width: 96px;
  text-align: center;
  font-weight: 600;
  border-radius: 6px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid transparent;
  color: ${useTheme(light.color, dark.color)};
  background-color: ${useTheme(light.button.bg, dark.button.bg)};
  transition: background-color 0.1s ease-in-out;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
    color: ${useTheme(light.color, dark.color)};
  }
  :hover {
    background-color: ${useTheme(light.button.hoverBg, dark.button.hoverBg)};
  }
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
            <th>IPFS</th>
            <th>Github</th>
            <th>Approved</th>
            <Desktop>
              <th></th>
            </Desktop>
          </tr>
        </thead>
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
                    <td data-label={"Contract"}>{contractId}</td>
                    <td data-label={"Lang"}>{lang}</td>
                    <td data-label={"IPFS"}>
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
                    <td data-label={"Github"}>
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
                    <td data-label={"Approved"}>
                      <Center>
                        <Widget
                          src={`${state.ownerId}/widget/SourceScan.Contracts.Approved`}
                          props={{
                            rpcUrl: props.rpcUrl,
                            apiHost: props.apiHost,
                            accountId: contractId,
                            cid: cid,
                            ownerId: state.ownerId,
                            deploy_tx: deploy_tx,
                          }}
                        />
                      </Center>
                    </td>
                    <td>
                      <Desktop>
                        <OverlayTrigger
                          key={state.placement}
                          placement={state.placement}
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              Show More
                            </Tooltip>
                          }
                        >
                          <A
                            href={`/${state.ownerId}/widget/SourceScan.Contracts.Info?contractId=${contractId}`}
                            target={"_blank"}
                          >
                            <InfoIcon width={"20px"} height={"20px"} />
                          </A>
                        </OverlayTrigger>
                      </Desktop>
                      <Mobile>
                        <Button
                          href={`/${state.ownerId}/widget/SourceScan.Contracts.Info?contractId=${contractId}`}
                          target={"_blank"}
                        >
                          More
                        </Button>
                      </Mobile>
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
