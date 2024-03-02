const accountId = props.accountId;
if (!accountId) {
  return "";
}
const [tokens, setTokens] = useState(false);
const [loading, setLoading] = useState(true);

useEffect(() => {
  setTokens(false);
  setLoading(true);
  asyncFetch(
    `https://api.fastnear.com/v0/account/${accountId}/ft_with_balances`
  )
    .then((res) => {
      if (!res.ok) {
        console.error("Failed to fetch ft_with_balances", res);
        return;
      }
      setTokens(res.body.tokens);
    })
    .finally(() => setLoading(false));
}, [accountId]);

const Wrapper = styled.div`
.header {
  margin-bottom: 1em;
}
.token {
  margin-bottom: 1em;
  overflow: hidden;
}
`;

const renderToken = (tokenId, balance) => {
  return (
    <Widget
      loading=""
      src="mob.near/widget/Tokens.TokenWithBalance"
      props={{ tokenId, balance }}
    />
  );
};

return (
  <Wrapper>
    <div className="header">
      Fungible Tokens of
      <Widget src="mob.near/widget/N.ProfileLine" props={{ accountId }} />
    </div>
    <div className="actions">
      {tokens
        ? Object.entries(tokens).map(([tokenId, balance]) => (
            <div key={tokenId} className="token">
              {renderToken(tokenId, balance)}
            </div>
          ))
        : "Loading"}
    </div>
  </Wrapper>
);
