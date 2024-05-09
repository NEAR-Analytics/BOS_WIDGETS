const FormContainer = styled.div`
  max-width: 650px;
  width: 100%;
  background: #141414;
  border-radius: 4px;
  border: 1px solid #ffffff1a;
  display: flex;
  flex-direction: column;
  gap: 36px;

  padding: 16px;
  @media (min-width: 640px) {
    padding: 24px;
  }
`;

const FormTitle = styled.div`
  font-size: 22px;
  font-weight: 600px;
`;

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormRowTitle = styled.div``;

const FormRowValue = styled.div``;

const FormButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormButton = styled.div`
  height: 56px;
  width: 100%;
  display: grid;
  place-content: center;
  cursor: pointer;
  border: 1px solid #ffffff;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const FormFragment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const TGas = Big(10).pow(12);
const MaxGasPerTransaction = TGas.mul(250);
const GasPerTransaction = MaxGasPerTransaction.plus(TGas);
const pageAmountOfPage = 5;
const ipfsPrefix = "https://ipfs.near.social/ipfs";
// Config for Bos app
function getConfig(network) {
  switch (network) {
    case "mainnet":
      return {
        ownerId: "inscribe.near",
        graphUrl:
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/neat",
        nodeUrl: "https://rpc.mainnet.near.org",
        indexerUrl: "https://inscription-indexer-a16497da251b.herokuapp.com/v1",
        contractName: "inscription.near",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "neat",
          amt: "100000000",
        },
      };
    case "testnet":
      return {
        ownerId: "inscribe.testnet",
        graphUrl:
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/neat",
        nodeUrl: "https://rpc.testnet.near.org",
        indexerUrl: "https://inscription-indexer-a16497da251b.herokuapp.com/v1",
        contractName: "inscription.testnet",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "neat",
          amt: "100000000",
        },
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
}
const config = getConfig(context.networkId);
const tx = {
  contractName: config.contractName,
  methodName: config.methodName,
  args: config.args,
  gas: GasPerTransaction,
};

State.init({
  balance: undefined,
  tickerRawData: {},
  holders: [],
  ticker: [
    {
      title: "Token:",
      value: "-",
    },
    {
      title: "Protocol:",
      value: "-",
    },
    {
      title: "Total Supply:",
      value: "-",
    },
    {
      title: "Total Minted:",
      value: "-",
    },
    {
      title: "Minted%:",
      value: "-",
    },
    {
      title: "Mint Limit:",
      value: "-",
    },
    {
      title: "Holders:",
      value: "-",
    },
  ],
});

function fetchAllData() {
  const response = fetch(config.graphUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          tokenInfo (id: "NEAT") {
            ticker
            maxSupply
            totalSupply
            limit
          }
          holderCount (id: "HolderCount") {
            count
          }
        }
      `,
    }),
  });

  if (response) {
    const tokenInfo = response.body.data.tokenInfo;
    const holderCount = response.body.data.holderCount.count;
    State.update({
      tickerRawData: {
        display_name: tokenInfo.ticker,
      },
      ticker: [
        {
          title: "Token:",
          value: tokenInfo.ticker,
        },
        {
          title: "Protocol:",
          value: "NRC-20",
        },
        {
          title: "Total Supply:",
          value: Number(tokenInfo.maxSupply ?? 0).toLocaleString(),
        },
        {
          title: "Total Minted:",
          value: Number(tokenInfo.totalSupply ?? 0).toLocaleString(),
        },
        {
          title: "Minted%:",
          value:
            Big(tokenInfo.totalSupply ?? 0)
              .div(tokenInfo.maxSupply ?? 1)
              .times(100)
              .toFixed(2) + "%",
        },
        {
          title: "Mint Limit:",
          value: Number(tokenInfo.limit).toLocaleString(),
        },
        {
          title: "Holders:",
          value: Number(holderCount).toLocaleString(),
        },
      ],
    });
  }

  const displayName = state.tickerRawData.display_name;
  if (displayName) {
    const holdersResult = fetch(
      `${config.indexerUrl}/tickers/${displayName}/holders`,
      {
        method: "GET",
      }
    );
    State.update({
      holders: holdersResult.body,
    });
  }
  const accountId = props.accountId || context.accountId;
  const balancesResponse = fetch(`${config.indexerUrl}/balances/${accountId}`, {
    method: "GET",
  });
  const balance = balancesResponse.body[0]?.balance ?? "0";
  State.update({ balance });
}

fetchAllData();



const yourNeatData = [
  {
    title: "Token amount",
    value: state.balance ? Number(state.balance).toLocaleString() : "-",
  },
];
return (
  <FormFragment>
    <FormContainer>
      <FormTitle>Your $Neat</FormTitle>
      <FormBody>
        {yourNeatData.map((row) => (
          <FormRowContainer key={row.title}>
            <FormRowTitle>{row.title}</FormRowTitle>
            <FormRowValue>{row.value}</FormRowValue>
          </FormRowContainer>
        ))}
      </FormBody>
    </FormContainer>
    <FormContainer>
      <FormTitle>Minted address rank</FormTitle>
      <FormBody>
        <Widget src={`${config.ownerId}/widget/NEAT.SearchInput`} />
        <Widget src={`${config.ownerId}/widget/NEAT.IndexTable`} />
      </FormBody>
    </FormContainer>
  </FormFragment>
);
