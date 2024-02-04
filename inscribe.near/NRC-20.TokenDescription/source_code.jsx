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

  @media (max-width: 768px) {
    font-size: 18px;
  }
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

const FormButton = styled.button`
  height: 56px;
  width: 100%;
  display: grid;
  place-content: center;
  cursor: pointer;
  border: 1px solid #ffffff;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
  background: transparent;
  color: #ffffff;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
  &:hover:not(:disabled) {
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

const TipText = styled.div`
  color: #fffffff0;
  font-size: 12px;
  font-weight: 600;
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

function formatProgress(tokenInfo) {
  return Big(tokenInfo.totalSupply).div(tokenInfo.maxSupply).toNumber();
}

const TopButton = styled("Link")`
  color: white;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  border-radius: 12px;
  padding: 8px 20px;
  border: 0;
  background: #101010;
  color: white;
  border: 1px solid #ffffff11;
  transition: all 0.3s ease-in-out;
  &:hover {
    text-decoration: none;
    opacity: 0.8;
    background: #333333;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const TopButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const NRC20Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 650px;
  padding: 24px 0;
  @media (min-width: 640px) {
    padding: 0px;
  }
`;



const tick = props.tick;

State.init({
  tokenInfo: undefined,
});

getBalances().then((balances) => {
  const balance = balances.find((balance) => balance.ticker === tick);
  State.update({
    balance: balance?.amount,
  });
});

fetchTokenInfoAsync(tick).then((response) => {
  State.update({
    tokenInfo: response.tokenInfo,
    holderCount: response.holderCount,
  });
});

const tokenInfo = state.tokenInfo;
const holderCount = state.holderCount;
const decimals = tokenInfo?.decimals ?? 0;

function shortNearAddress(accountId) {
  if (accountId && accountId.length > 21) {
    const splits = accountId.split(".");
    const prefix =
      accountId.substring(0, 5) +
      "..." +
      splits[0].substring(splits[0].length - 5);
    if (accountId.includes(".")) {
      return prefix + "." + splits.splice(1).join(".");
    } else return prefix;
  } else {
    return accountId;
  }
}

if (!state.registeredTokenContracts) {
  getFtWrappers().then((subcontracts) => {
    const contract = subcontracts.find(
      (contract) => contract.split(".")[0] === props.tick.toLowerCase()
    );
    const hasRegistered = !!contract;
    State.update({
      hasRegistered,
      registeredTokenContracts: subcontracts,
    });
  });
}

return (
  <FormFragment>
    <NRC20Header>
      <FormTitle style={{ fontWeight: "bold" }}>{tokenInfo.ticker}</FormTitle>
      <TopButtonGroup>
        {state.tokenInfo &&
          state.tokenInfo.totalSupply !== tokenInfo.maxSupply && (
            <TopButton
              href={`/${config.ownerId}/widget/NRC-20?tab=mint${
                tick ? `&tick=${tick}` : ""
              }`}
            >
              Mint
            </TopButton>
          )}
        {state.balance && (
          <TopButton
            href={`/${config.ownerId}/widget/NRC-20?tab=transfer${
              tick ? `&tick=${tick}` : ""
            }`}
          >
            Transfer
          </TopButton>
        )}
        {state.balance && state.hasRegistered && (
          <TopButton
            href={`/${config.ownerId}/widget/NRC-20?tab=wrap${
              tick ? `&tick=${tick}` : ""
            }`}
          >
            Wrap
          </TopButton>
        )}
      </TopButtonGroup>
    </NRC20Header>
    <NRC20Header style={{ display: "block", marginBottom: "12px" }}>
      {state.tokenInfo && (
        <Widget
          src={`${config.ownerId}/widget/NRC-20.Progress`}
          props={{
            progress: formatProgress(state.tokenInfo),
          }}
        />
      )}
    </NRC20Header>
    <FormContainer>
      <FormBody>
        <FormRowContainer>
          <FormRowTitle>Total Supply</FormRowTitle>
          <FormRowValue>
            {formatAmount(tokenInfo?.maxSupply, decimals)}
          </FormRowValue>
        </FormRowContainer>
        <FormRowContainer>
          <FormRowTitle>Minted</FormRowTitle>
          <FormRowValue>
            {formatAmount(tokenInfo?.totalSupply, decimals)}
          </FormRowValue>
        </FormRowContainer>
        <FormRowContainer>
          <FormRowTitle>Limit Per Mint</FormRowTitle>
          <FormRowValue>
            {tokenInfo?.limit
              ? formatAmount(tokenInfo.limit, decimals)
              : "No Limit"}
          </FormRowValue>
        </FormRowContainer>
        <FormRowContainer>
          <FormRowTitle>Decimals</FormRowTitle>
          <FormRowValue>{tokenInfo?.decimals}</FormRowValue>
        </FormRowContainer>
        <FormRowContainer>
          <FormRowTitle>Deployed By</FormRowTitle>
          <FormRowValue title={tokenInfo?.creatorId}>
            {shortNearAddress(tokenInfo?.creatorId)}
          </FormRowValue>
        </FormRowContainer>
        <FormRowContainer>
          <FormRowTitle>Deploy Time</FormRowTitle>
          <FormRowValue>
            {tokenInfo?.createdBlockTimestamp
              ? formatDeployTime(tokenInfo.createdBlockTimestamp)
              : "-"}
          </FormRowValue>
        </FormRowContainer>
        <FormRowContainer>
          <FormRowTitle>Holders</FormRowTitle>
          <FormRowValue>
            {formatAmount(holderCount?.count ?? 0, 0)}
          </FormRowValue>
        </FormRowContainer>
      </FormBody>
    </FormContainer>
    <FormContainer>
      <FormTitle>Minted address rank</FormTitle>
      <TipText>* Only top 5000 addresses are listed.</TipText>
      <FormBody>
        <Widget
          src={`${config.ownerId}/widget/NRC-20.IndexTable`}
          props={{
            searchValue: state.searchValue,
            tick: tick,
          }}
        />
      </FormBody>
    </FormContainer>
  </FormFragment>
);
