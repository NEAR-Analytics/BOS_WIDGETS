const TGas = Big(10).pow(12);
const MaxGasPerTransaction = TGas.mul(250);
const GasPerTransaction = MaxGasPerTransaction.plus(TGas);
const pageAmountOfPage = 5;
const ipfsPrefix = "https://ipfs.near.social/ipfs";
const landingUrl = "https://neatprotocol.ai";
const partnerProgramUrl = "https://forms.gle/4M3fvw3LPiJSyffcA";
const nrc20DocHost = "https://docs.nrc-20.io/";
function toLocaleString(source, decimals, rm) {
  if (typeof source === "string") {
    return toLocaleString(Number(source), decimals);
  } else if (typeof source === "number") {
    return decimals !== undefined
      ? source.toLocaleString(undefined, {
          maximumFractionDigits: decimals,
          minimumFractionDigits: decimals,
        })
      : source.toLocaleString();
  } else {
    // Big type
    return toLocaleString(
      decimals !== undefined
        ? Number(source.toFixed(decimals, rm))
        : source.toNumber(),
      decimals
    );
  }
}

function formatAmount(_balance, _decimal) {
  const balance = _balance ?? 0;
  const decimal = _decimal ?? 8;
  return toLocaleString(
    Big(balance).div(Big(10).pow(decimal)).toFixed(),
    decimal
  );
}

function formatDeployTime(blockTime) {
  const milliseconds = blockTime / 1000000;
  const date = new Date(milliseconds);

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

// Config for Bos app
function getConfig(network) {
  switch (network) {
    case "mainnet":
      return {
        ownerId: "inscribe.near",
        graphUrl:
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/neat",
        nodeUrl: "https://rpc.mainnet.near.org",
        contractName: "inscription.near",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "neat",
          amt: "100000000",
        },
        transferArgs: {
          p: "nrc-20",
          op: "transfer",
          tick: "neat",
        },
        ftWrapperFactory: "nrc-20.near",
        ftWrapper: "neat.nrc-20.near",
        refFinance: "https://app.ref.finance/",
        minMintEvents: 1_000_000,
        minHolders: 1_000,
        neatDecimals: 8,
      };
    case "testnet":
      return {
        ownerId: "inscribe.testnet",
        graphUrl:
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/neat-test",
        nodeUrl: "https://rpc.testnet.near.org",
        contractName: "inscription.testnet",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "neat",
          amt: "100000000",
        },
        transferArgs: {
          p: "nrc-20",
          op: "transfer",
          tick: "neat",
        },
        ftWrapperFactory: "nrc-20.testnet",
        ftWrapper: "neat.nrc-20.testnet",
        refFinance: "https://testnet.ref-finance.com/",
        minMintEvents: 10,
        minHolders: 5,
        neatDecimals: 8,
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

function ftWrapperAddress(tick) {
  return tick.toLowerCase() + "." + config.ftWrapperFactory;
}

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

const TableRowLink = styled("Link")`
  cursor: pointer;
  font-weight: 600;
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
`;

const TableSortButton = styled.button`
  color: #fff;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
`;

const TableDropdownImage = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 8px;
  transition: all 0.3s ease-in-out;
  ${(props) =>
    props.hide &&
    `
    opacity: 0;
  `}
  ${(props) =>
    props.up === true &&
    `
    transform: rotate(180deg);
  `}
`;

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

function asyncFetchFromGraph(query) {
  return asyncFetch(config.graphUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });
}

function fetchEventCounts(_tick) {
  const tick = _tick || "NEAT";
  return asyncFetchFromGraph(`
    query {
      eventCounts(where: {id:"${tick}"}) {
        id
        ticker
        mintEventCount
        transferEventCount
      }
    }
  `).then((response) => {
    if (response.body?.data?.eventCounts) {
      return response.body.data.eventCounts;
    }
    return undefined;
  });
}

function fetchTokenInfosAsync() {
  return asyncFetchFromGraph(`
    query {
      tokenInfos(first: 1000) {
        ticker
        maxSupply
        totalSupply
        limit
        createdBlockTimestamp
        decimals
      }
      holderCounts(first: 1000) {
        ticker
        count
      }
    }
  `).then((tokensInfoResponse) => {
    if (tokensInfoResponse.body?.data) {
      return tokensInfoResponse.body?.data;
    }
    return undefined;
  });
}

function fetchTokenInfoAsync(token) {
  return asyncFetchFromGraph(`
    query {
      tokenInfo (
        id: "${token.toUpperCase()}",
      ) {
        ticker
        limit
        decimals
        maxSupply
        totalSupply
        creatorId
        createdBlockHeight
        createdBlockTimestamp
      }
      holderCount (
        id: "${token.toUpperCase()}",
      ) {
        ticker
        count
      }
    }
  `).then((tokenInfoResponse) => {
    if (tokenInfoResponse.body?.data) {
      return tokenInfoResponse.body.data;
    }
    return undefined;
  });
}

function fetchOwnTokenInfosAsync(creatorId) {
  return asyncFetchFromGraph(`
    query {
      tokenInfos(where:{creatorId:"${creatorId}"}) {
        ticker
        decimals
        limit
      }
    }
  `).then((tokenInfoResponse) => {
    if (tokenInfoResponse.body?.data) {
      return tokenInfoResponse.body.data;
    }
    return undefined;
  });
}

function getBalance() {
  const accountId = props.accountId || context.accountId;
  return asyncFetchFromGraph(`
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
  `).then((balanceResponse) => {
    const holder = balanceResponse.body.data.holderInfos[0];
    if (holder) {
      return holder.amount;
    }
    return "0";
  });
}

function getBalances() {
  const accountId = props.accountId || context.accountId;
  return asyncFetchFromGraph(`
    query {
      holderInfos(
        where: {
          accountId: "${accountId}"
        }
      ) {
        ticker
        amount
      }
    }
  `).then((balanceResponse) => {
    if (balanceResponse.body?.data) {
      return balanceResponse.body.data.holderInfos;
    }
    return undefined;
  });
}

function getFtWrappers(n, _data) {
  const i = n ?? 0;
  const data = _data ?? [];
  const amount = 500;
  return Near.asyncView(config.ftWrapperFactory, "get_ft_wrappers", {
    offset: i * amount,
    limit: amount,
  })
    .then((subcontracts) => {
      if (subcontracts.length < amount) {
        return [...subcontracts, ...data];
      } else {
        return getFtWrappers(i + 1, subcontracts).then((response) => {
          return [...response, ...data];
        });
      }
    })
    .catch((err) => {
      console.error(err);
      return data;
    });
}

function getNep141Balance(contractName) {
  const accountId = props.accountId || context.accountId;
  return Near.asyncView(contractName, "ft_balance_of", {
    account_id: accountId,
  });
}

function getWrapFeeRate(contractName) {
  const accountId = props.accountId || context.accountId;
  return Near.asyncView(contractName, "get_wrap_fee_rate", {
    account_id: accountId,
  });
}

function getUnwrapFeeRate(contractName) {
  const accountId = props.accountId || context.accountId;
  return Near.asyncView(contractName, "get_unwrap_fee_rate", {
    account_id: accountId,
  });
}

function getWrappedFtBalance() {
  const accountId = props.accountId || context.accountId;
  return Near.asyncView(config.ftWrapper, "ft_balance_of", {
    account_id: accountId,
  });
}

function getNrc20TotalSupply() {
  if (!state.nep141TotalSupply || !state.tokenInfo?.maxSupply) return undefined;
  return Big(state.tokenInfo.maxSupply)
    .minus(state.nep141TotalSupply)
    .toFixed();
}

function getNep141TotalSupply() {
  return Near.asyncView(config.ftWrapper, "ft_total_supply");
}

function formatProgress(tokenInfo) {
  return Big(tokenInfo.totalSupply).div(tokenInfo.maxSupply).toNumber();
}



State.init({
  sortBy: "Holders", // Deploy Time / Holders
  orderDirection: "desc", // desc / asc
  hasFetchData: false,
  currentTab: undefined,
});

const { searchValue, currentTab } = props;

function updateCurrentTabWhenChanged() {
  if (currentTab !== state.currentTab) {
    State.update({
      currentTab,
      current: 1,
    });
  }
}

updateCurrentTabWhenChanged();

function compareByDeployTime(a, b, orderDirection) {
  const t1 = Number(a.createdBlockTimestamp);
  const t2 = Number(b.createdBlockTimestamp);
  if (orderDirection === "desc") {
    if (t1 < t2) return 1;
    else if (t1 > t2) return -1;
    else return 0;
  } else {
    if (t1 < t2) return -1;
    else if (t1 > t2) return 1;
    else return 0;
  }
}

function compareByHolders(a, b, orderDirection, holderCounts) {
  const h1 = Number(
    holderCounts.find(
      (holderCount) =>
        holderCount.ticker.toUpperCase() == a.ticker.toUpperCase()
    )?.count ?? "0"
  );
  const h2 = Number(
    holderCounts.find(
      (holderCount) =>
        holderCount.ticker.toUpperCase() == b.ticker.toUpperCase()
    )?.count ?? "0"
  );
  if (orderDirection === "desc") {
    if (h1 < h2) return 1;
    else if (h1 > h2) return -1;
    else return 0;
  } else {
    if (h1 < h2) return -1;
    else if (h1 > h2) return 1;
    else return 0;
  }
}

if (!state.hasFetchData) {
  fetchTokenInfosAsync().then((data) => {
    State.update({
      tokenInfos: data.tokenInfos.sort((a, b) =>
        compareByHolders(a, b, "desc", data.holderCounts)
      ),
      holderCounts: data.holderCounts,
    });
  });
  State.update({ hasFetchData: true });
}

const filteredTokenInfos = state.tokenInfos
  ? state.tokenInfos
      .filter((a) => {
        if (currentTab === "in-progress") {
          return Big(a.totalSupply).lt(a.maxSupply);
        } else if (currentTab === "completed") {
          return Big(a.totalSupply).eq(a.maxSupply);
        } else {
          return true;
        }
      })
      .filter((tokenInfo) =>
        tokenInfo.ticker
          .toUpperCase()
          .includes((searchValue ?? "").toUpperCase())
      )
  : [];

const current = String(state.current ?? "1");
const totalPage = String(
  Math.ceil(Number(filteredTokenInfos?.length ?? 0) / pageAmountOfPage)
);

function onClickSortButton(target) {
  State.update({ current: 1 });
  if (state.sortBy !== target) {
    const tokenInfos = [...(state.tokenInfos ?? [])];
    const sortedTokenInfos = tokenInfos.sort((a, b) => {
      if (target === "Deploy Time") {
        return compareByDeployTime(a, b, "desc");
      } else {
        return compareByHolders(a, b, "desc", state.holderCounts);
      }
    });
    State.update({
      tokenInfos: sortedTokenInfos,
      sortBy: target,
      orderDirection: "desc",
    });
  } else {
    if (state.orderDirection === "asc") {
      const tokenInfos = [...(state.tokenInfos ?? [])];
      const sortedTokenInfos = tokenInfos.sort((a, b) => {
        if (target === "Deploy Time") {
          return compareByDeployTime(a, b, "desc");
        } else {
          return compareByHolders(a, b, "desc", state.holderCounts);
        }
      });
      State.update({
        tokenInfos: sortedTokenInfos,
        orderDirection: "desc",
      });
    } else {
      const tokenInfos = [...(state.tokenInfos ?? [])];
      const sortedTokenInfos = tokenInfos.sort((a, b) => {
        if (target === "Deploy Time") {
          return compareByDeployTime(a, b, "asc");
        } else {
          return compareByHolders(a, b, "asc", state.holderCounts);
        }
      });
      State.update({
        tokenInfos: sortedTokenInfos,
        orderDirection: "asc",
      });
    }
  }
}

return (
  <TableOuter>
    <TableContainer>
      <IndexTable>
        <IndexHeaderTr>
          <IndexTh>Tick</IndexTh>
          <IndexTh>
            <TableSortButton onClick={() => onClickSortButton("Deploy Time")}>
              <div>Deploy Time</div>
              <TableDropdownImage
                hide={state.sortBy !== "Deploy Time"}
                up={state.orderDirection === "asc"}
                src={`${ipfsPrefix}/bafkreiabdtjq6x2qgoj7ygx2nqrq63xyyrh4p7cqyu6f2loyui33iaa6ny`}
              />
            </TableSortButton>
          </IndexTh>
          <IndexTh>Progress</IndexTh>
          <IndexTh>
            <TableSortButton onClick={() => onClickSortButton("Holders")}>
              <div>Holders</div>
              <TableDropdownImage
                hide={state.sortBy !== "Holders"}
                up={state.orderDirection === "asc"}
                src={`${ipfsPrefix}/bafkreiabdtjq6x2qgoj7ygx2nqrq63xyyrh4p7cqyu6f2loyui33iaa6ny`}
              />
            </TableSortButton>
          </IndexTh>
        </IndexHeaderTr>
        <IndexTableBody>
          {filteredTokenInfos &&
            filteredTokenInfos
              .slice(
                (current - 1) * pageAmountOfPage,
                current * pageAmountOfPage
              )
              .map((row) => (
                <IndexDataTr key={row.ticker}>
                  <IndexTd>
                    <TableRowLink
                      href={`/${config.ownerId}/widget/NRC-20?tick=${row.ticker}`}
                    >
                      {row.ticker.toUpperCase()}
                    </TableRowLink>
                  </IndexTd>
                  <IndexTd>
                    {formatDeployTime(row.createdBlockTimestamp)}
                  </IndexTd>
                  <IndexTd style={{ paddingRight: "26px" }}>
                    <AddressData>
                      <Widget
                        src={`${config.ownerId}/widget/NRC-20.Progress`}
                        props={{
                          progress: formatProgress(row),
                        }}
                      />
                    </AddressData>
                  </IndexTd>
                  <IndexTd>
                    {state.holderCounts.find(
                      (holderCount) =>
                        holderCount.ticker.toUpperCase() ==
                        row.ticker.toUpperCase()
                    )?.count ?? "0"}
                  </IndexTd>
                </IndexDataTr>
              ))}
        </IndexTableBody>
      </IndexTable>
    </TableContainer>
    <TableFooter>
      <TableRowsAmount>
        {filteredTokenInfos?.length ?? "-"}{" "}
        {Number(filteredTokenInfos?.length ?? 0) !== 1 ? "tokens" : "token"} in
        total
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
