// Typecheck your tokens Array (ApiRes.tokens): https://gist.github.com/dredshep/1960149838d1415c70e53997866ca3a7#file-zkevmbalancerapiresponsetypes-ts
// Sample token prop object: https://gist.github.com/dredshep/1960149838d1415c70e53997866ca3a7#file-example_tokens_object-json

if (!props.tokens?.map) {
  return (
    <div className="bg-warning p-2 rounded-2">
      `props.tokens` must be an array.
    </div>
  );
}

const abbreviateNumber = (num) => {
  if (isNaN(num)) return null;

  if (num === 0) return "0";

  const k = 1000;
  const sizes = ["K", "M", "B", "T", "Qa", "Qi"];
  const i = Math.floor(Math.log(num) / Math.log(k));

  return (num / Math.pow(k, i)).toFixed(2) + (sizes[i - 1] ?? "");
};

const StyledTable = styled.table`
  color: #fff;
  background-color: #333;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  margin-bottom: 1em;
  font-family: 'Roboto', sans-serif;
`;

const StyledHeader = styled.th`
  padding: 20px 10px;
  text-align: left;
  background-color: #444;
`;

const StyledCell = styled.td`
  padding: 20px 10px;
  background-color: #333;
`;

const StyledRow = styled.tr`
  &:nth-child(even) {
    ${StyledCell} {
      background-color: #444;
    }
  }

  &:hover {
    ${StyledCell} {
      background-color: #555;
    }
  }
`;

const RenderRow = ({ token, level, parentAddress }) => {
  const hasNestedTokens = token.token?.pool?.tokens;

  if (token.address === parentAddress) return null;

  return (
    <Fragment key={token.symbol}>
      <StyledRow>
        <StyledCell style={{ paddingLeft: `${1 + level}em` }}>
          {token.symbol}
        </StyledCell>
        {hasNestedTokens ? (
          <StyledCell></StyledCell>
        ) : (
          <StyledCell>
            {token.balance === "0" ? "0" : abbreviateNumber(token.balance)}
          </StyledCell>
        )}
        <StyledCell>
          ${parseFloat(token.token?.latestUSDPrice).toFixed(2)}
        </StyledCell>
        <StyledCell>
          {token.weight ? token.weight * 100 + "%" : <></>}
        </StyledCell>
        <StyledCell>
          ${abbreviateNumber(token.token?.latestUSDPrice * token.balance)}
        </StyledCell>
      </StyledRow>
      {hasNestedTokens &&
        token.token.pool.tokens.map((nestedToken) => (
          <RenderRow
            token={nestedToken}
            level={level + 1}
            parentAddress={token.address}
          />
        ))}
    </Fragment>
  );
};

const NestedTable = ({ tokens }) => {
  return (
    <StyledTable className="table">
      <thead>
        <StyledRow>
          <StyledHeader>Symbol</StyledHeader>
          <StyledHeader>Balance</StyledHeader>
          <StyledHeader>USD Price</StyledHeader>
          <StyledHeader>Weight</StyledHeader>
          <StyledHeader>Value</StyledHeader>
        </StyledRow>
      </thead>
      <tbody>
        {tokens.map((token) => (
          <RenderRow key={token.symbol} token={token} level={0} />
        ))}
      </tbody>
    </StyledTable>
  );
};

return <NestedTable tokens={props.tokens} />;
