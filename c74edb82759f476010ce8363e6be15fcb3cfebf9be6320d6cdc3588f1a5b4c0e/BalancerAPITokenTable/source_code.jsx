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

const calculateTokenValue = (token) => {
  // If there are nested tokens, ignore them and return the value of this token
  if (token.token?.pool?.tokens) {
    return token.balance * token.priceRate;
  }

  // If there are no nested tokens, calculate the value as usual
  return token.balance * token.priceRate;
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

const getBorderColor = (level) => {
  const colors = [
    "#88C0D0",
    "#5E81AC",
    "#BF616A",
    "#D08770",
    "#EBCB8B",
    "#A3BE8C",
    "#B48EAD",
    "#8FBCBB",
    "#4C566A",
  ];
  return colors[level <= 8 ? level - 1 : 8];
};

const cellStyles = `
  background-color: #333;
  padding: 20px 10px;
`;

const StyledCellWithBorder = styled.td`
  padding: 20px 10px;
  background-color: #333;
  border-left: ${(props) =>
    `${2 + props.level * 2}px solid ${getBorderColor(props.level + 1)}`};
  padding-left: ${(props) => `${1 + props.level * 0.5}em`};
`;

const StyledRow = styled.tr`
  &:nth-child(even) {
    ${StyledCell}, ${StyledCellWithBorder} {
      background-color: #444;
    }
  }

  &:hover {
    ${StyledCell}, ${StyledCellWithBorder} {
      background-color: #555;
    }
  }
`;

const RenderRow = ({ token, level, parentAddress }) => {
  const hasNestedTokens = token.token?.pool?.tokens;

  if (token.address === parentAddress) return null;

  const value = calculateTokenValue(token);

  return (
    <Fragment key={token.symbol}>
      <StyledRow>
        <StyledCellWithBorder level={level * 2}>
          {token.symbol}
          {level}
        </StyledCellWithBorder>
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
        <StyledCell>${value.toFixed(2)}</StyledCell>
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
