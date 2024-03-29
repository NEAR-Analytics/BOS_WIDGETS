const accountId = props.accountId;
if (!accountId) {
  return "";
}

const [tokens, setTokens] = useState(false);
const [loading, setLoading] = useState(true);

const { bigToString, MutedDecimals } = VM.require(
  "mob.near/widget/Token.utils"
);

// const priceData = Near.view("priceoracle.near", "get_price_data");
const refPrices = JSON.parse(
  fetch("https://indexer.ref.finance/list-token-price").body || "{}"
);
const accountBalance = fetch("https://rpc.mainnet.near.org", {
  method: "POST",
  request_type: "json",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "0",
    method: "query",
    params: {
      request_type: "view_account",
      finality: "optimistic",
      account_id: accountId,
    },
  }),
}).body.result.amount;

useEffect(() => {
  setTokens(false);
  setLoading(true);
  asyncFetch(`https://api.fastnear.com/v1/account/${accountId}/ft`)
    .then((res) => {
      if (!res.ok) {
        console.error("Failed to fetch ft_with_balances", res);
        return;
      }
      setTokens(
        Object.fromEntries(
          (res.body.tokens || [])
            .filter(({ balance }) => !!balance)
            .map(({ contract_id, balance }) => [contract_id, balance])
        )
      );
    })
    .finally(() => setLoading(false));
}, [accountId]);

const sortedTokens = useMemo(() => {
  if (!tokens) {
    return tokens;
  }
  tokens["near"] = accountBalance;
  // const prices = Object.fromEntries(
  //   (priceData?.prices || []).map(({ asset_id, price }) => [asset_id, price])
  // );
  const computeUsdBalance = (tokenId, balance) => {
    if (balance === null) {
      return "0";
    }
    const price =
      tokenId === "near"
        ? refPrices["wrap.near"]
        : refPrices[tokenId] || {
            price: "0",
            decimal: 1,
          };
    return Big(price.price)
      .mul(Big(balance))
      .div(Big(10).pow(price.decimal))
      .toFixed(6);
  };
  const st = Object.entries(tokens).map(([tokenId, balance]) => ({
    tokenId,
    balance,
    usdBalance: computeUsdBalance(tokenId, balance),
  }));
  st.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));
  st.sort((a, b) => parseFloat(b.usdBalance) - parseFloat(a.usdBalance));
  return st;
}, [tokens, refPrices, accountBalance]);

const Wrapper = styled.div`
.header {
  margin-bottom: 1em;
}
.token {
  overflow: hidden;
}
`;

const renderToken = ({ tokenId, balance, usdBalance }) => {
  return (
    <Widget
      loading=""
      src="mob.near/widget/Tokens.TokenWithBalance"
      props={{ tokenId, balance, usdBalance }}
    />
  );
};

const usdSum = sortedTokens
  ? sortedTokens
      .map(({ usdBalance }) => parseFloat(usdBalance || "0"))
      .reduce((s, v) => s + v, 0)
  : 0;

return (
  <Wrapper>
    <div className="header">
      Fungible Tokens of
      <Widget src="mob.near/widget/N.ProfileLine" props={{ accountId }} />
      {usdSum > 0 && (
        <div>
          Total USD sum:
          <span className="font-monospace fw-bold d-inline-flex">
            <span className="text-secondary">~$</span>
            <MutedDecimals value={bigToString(usdSum)} />
          </span>
        </div>
      )}
    </div>
    <div className="actions">
      {sortedTokens
        ? sortedTokens
            .filter((t) => t.balance !== null)
            .map((t) => (
              <div key={t.tokenId} className="token">
                {renderToken(t)}
              </div>
            ))
        : "Loading"}
    </div>
  </Wrapper>
);
