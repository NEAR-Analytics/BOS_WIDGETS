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
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/neat-copy",
        nodeUrl: "https://rpc.mainnet.near.org",
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
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/neat-copy",
        nodeUrl: "https://rpc.testnet.near.org",
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

const TableOuter = styled.div``;
const TableContainer = styled.div`
  height: 320px;
  overflow: hidden;
`;

const IndexTableBody = styled.tbody``;

const IndexTable = styled.table`
  border-spacing: 10px;
  width: 100%;
`;

const IndexHeaderTr = styled.tr`
  width: 100%;
  top: 20px;
  left: 0;
`;

const IndexTd = styled.td`
  font-size: 14px;
  color: #fffffff0;
  max-width: 160px;
  @media (min-width: 640px) {
    max-width: auto;
  }
`;

const IndexTh = styled.th`
  font-size: 14px;
  color: #ffffffa8;
  font-weight: 600;
`;

const IndexDataTr = styled.tr`
  background: #18181805;
  height: 56px;
`;

const AddressData = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TableFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TableRowsAmount = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff66;
`;

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

function fetchFromGraph(query) {
  return fetch(config.graphUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });
}
function fetchAllData() {
  const response = fetchFromGraph(`
    query {
      tokenInfo (id: "NEAT") {
        ticker
        maxSupply
        totalSupply
        limit
      }
      holderCount (id: "NEAT") {
        count
      }
    }
  `);

  if (response) {
    const tokenInfo = response.body.data.tokenInfo;
    const holderCount = response.body.data.holderCount.count;
    State.update({
      tokenInfo,
      tickerRawData: {
        display_name: tokenInfo.ticker,
        holderCount,
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

  const accountId = props.accountId || context.accountId;
  const balanceResponse = fetchFromGraph(`
    query {
      holderInfos(
        where: {
          accountId: "${accountId}"
          ticker: "neat"
        }
      ) {
        accountId
        amount
      }
    }
  `);
  if (balanceResponse) {
    const holder = balanceResponse.body.data.holderInfos[0];
    if (holder) {
      State.update({ balance: holder.amount });
    } else {
      State.update({ balance: "0" });
    }
  }
}

fetchAllData();



const headers = ["Rank", "Account ID", "Amount"];
const current = String(state.current ?? "1");
const totalPage = String(
  5000 / pageAmountOfPage
  // Math.ceil(Number(state.tickerRawData.holderCount ?? 0) / pageAmountOfPage)
);
const { searchValue } = props;
const holdersResponse = fetchFromGraph(`
  query {
    holderInfos(
      skip: ${(current - 1) * pageAmountOfPage}
      first: ${pageAmountOfPage}
      where: {
        ticker: "neat"
      }
      orderBy: amount
      orderDirection: desc
    ) {
      accountId
      amount
    }
  }
`);
if (holdersResponse) {
  if (holdersResponse.body.errors) {
    State.update({ holderInfos: [] });
  } else {
    const holderInfos = holdersResponse.body.data.holderInfos.map(
      (row, idx) => ({
        rank: (current - 1) * pageAmountOfPage + Number(idx) + 1,
        address: row.accountId,
        amount: Number(row.amount).toLocaleString(),
      })
    );
    State.update({ holderInfos });
  }
}
return (
  <TableOuter>
    <TableContainer>
      <IndexTable>
        <IndexHeaderTr>
          {headers.map((header) => (
            <IndexTh key={header}>{header}</IndexTh>
          ))}
        </IndexHeaderTr>
        <IndexTableBody>
          {state.holderInfos &&
            state.holderInfos.map((row) => (
              <IndexDataTr key={row.rank}>
                <IndexTd>{row.rank}</IndexTd>
                <IndexTd style={{ paddingRight: "24px" }}>
                  <AddressData>{row.address}</AddressData>
                </IndexTd>
                <IndexTd>{row.amount}</IndexTd>
              </IndexDataTr>
            ))}
        </IndexTableBody>
      </IndexTable>
    </TableContainer>
    <TableFooter>
      <TableRowsAmount>
        {state.tickerRawData.holderCount ?? "-"} holders in total
      </TableRowsAmount>
      <Widget
        src={`${config.ownerId}/widget/NEAT.Pagination`}
        props={{
          current,
          totalPage,
          updateCurrentPage: (value) => {
            State.update({ current: value });
          },
        }}
      />
    </TableFooter>
  </TableOuter>
);
