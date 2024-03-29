const tokenId = props.tokenId;
if (!tokenId) {
  return "";
}

const [top, setTop] = useState(false);
const [loading, setLoading] = useState(true);

const { bigToString, MutedDecimals } = VM.require(
  "mob.near/widget/Token.utils"
);

const refPrices = JSON.parse(
  fetch("https://indexer.ref.finance/list-token-price").body || "{}"
);

useEffect(() => {
  setTop(false);
  setLoading(true);
  asyncFetch(`https://api.fastnear.com/v1/ft/${tokenId}/top`)
    .then((res) => {
      if (!res.ok) {
        console.error("Failed to fetch ft top", res);
        return;
      }
      setTop(
        Object.fromEntries(
          (res.body.accounts || [])
            .filter(({ balance }) => !!balance)
            .map(({ account_id, balance }) => [account_id, balance])
        )
      );
    })
    .finally(() => setLoading(false));
}, [tokenId]);

const topWithPrices = useMemo(() => {
  if (!top) {
    return top;
  }
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
  const st = Object.entries(top).map(([accountId, balance]) => ({
    accountId,
    balance,
    usdBalance: computeUsdBalance(tokenId, balance),
  }));
  st.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));
  st.sort((a, b) => parseFloat(b.usdBalance) - parseFloat(a.usdBalance));
  return st;
}, [top, refPrices, accountBalance]);

const Wrapper = styled.div`
.header {
  margin-bottom: 1em;
}
.token {
  overflow: hidden;
}
`;

const renderToken = ({ accountId, balance, usdBalance }) => {
  return (
    <Widget
      loading=""
      src="mob.near/widget/Tokens.AccountWithBalance"
      props={{ tokenId, accountId, balance, usdBalance }}
    />
  );
};

const usdSum = topWithPrices
  ? topWithPrices
      .map(({ usdBalance }) => parseFloat(usdBalance || "0"))
      .reduce((s, v) => s + v, 0)
  : 0;

return (
  <Wrapper>
    <div className="header">
      <Widget src="mob.near/widget/Tokens.Token" props={{ tokenId }} />
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
      {topWithPrices
        ? topWithPrices
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
