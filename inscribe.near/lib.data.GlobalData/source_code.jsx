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
  const result = fetch(`${config.indexerUrl}/tickers`, {
    method: "GET",
  });
  const data = result.body[0];
  State.update({
    tickerRawData: data,
    ticker: [
      {
        title: "Token:",
        value: data.display_name,
      },
      {
        title: "Protocol:",
        value: "NRC-20",
      },
      {
        title: "Total Supply:",
        value: Number(data.max_supply ?? 0).toLocaleString(),
      },
      {
        title: "Total Minted:",
        value: Number(data.total_supply ?? 0).toLocaleString(),
      },
      {
        title: "Minted%:",
        value:
          Big(data.total_supply ?? 0)
            .div(data.max_supply ?? 1)
            .times(100)
            .toFixed(2) + "%",
      },
      {
        title: "Mint Limit:",
        value: Number(data.limit).toLocaleString(),
      },
      {
        title: "Holders:",
        value: Number(data.holders).toLocaleString(),
      },
    ],
  });
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
