const Wrap = styled.span`
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
`;

const { value, symbol, digit, onClick } = props;

return (
  <Wrap onClick={(e) => onClick(value)}>
    {isNaN(Number(value)) ? "-" : Big(value).toFixed(digit || 2, 0)}
    {symbol}
  </Wrap>
);
