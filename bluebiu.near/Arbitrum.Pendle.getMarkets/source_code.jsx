const { onLoad } = props;

const marketListApi =
  "https://api-v2.pendle.finance/core/v1/42161/markets?limit=20&select=pro&is_expired=false&order_by=customRank:-1";

const fetchRes = fetch(marketListApi);

if (fetchRes) {
  const result = fetchRes.body;

  State.update({
    markets: result.results,
  });
}

if (state.markets) {
  onLoad(state.markets);
}
