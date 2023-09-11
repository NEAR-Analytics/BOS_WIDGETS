const Container = styled.div`
  margin-top: 20px;
  .error {
    color: #ff61d3;
  }
`;
const Label = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #787da1;
`;
const InputWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #787da1;
  padding: 10px 0px;
  width: 100%;
  @media (max-width: 768px) {
    position: relative;
  }
`;
const Input = styled.input`
  padding-left: 8px;
  color: #fff;
  outline: none;
  background-color: transparent;
  border: none;
  font-size: 26px;
  font-weight: 500;
  height: 30px;
  width: 100%;

  &::placeholder {
    color: #787da1;
  }
`;
const Token = styled.div`
  flex-shrink: 0;
  display: flex;
  @media (max-width: 768px) {
    position: absolute;
    right: 0;
  }
`;
const TokenIcon = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  margin-right: 4px;
`;
const TokenSymbol = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #787da1;
`;
const ValueWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  color: #787da1;
  margin-top: 8px;
`;
const BalanceWrapper = styled.div`
  text-align: right;
`;
const Balance = styled.span`
  text-decoration: underline;
`;
const ErrorTips = styled.div`
  font-size: 16px;
  margin-top: 4px;
`;

const {
  price,
  amount,
  balance,
  token,
  stakeType,
  lpToken,
  isNear,
  errorTips,
  balanceLoading,
  onAmountChange,
} = props;

const formatValue = () => {
  if (!price) return "-";
  const value = Big(price).mul(amount || 0);
  if (value.lt(0.01)) return value.toPrecision(1);
  return value.toFixed(2);
};

const handleInputChange = (ev) => {
  if (isNaN(Number(ev.target.value))) return;
  let error = "";
  if (isNear && Big(ev.target.value || 0).lt(1)) {
    error = "at least 1 NEAR.";
  }
  if (ev.target.value && Number(balance) && Big(ev.target.value).gt(balance)) {
    error = `You don’t have enough ${
      stakeType === 0 ? token.symbol : lpToken.symbol
    }.`;
  }
  props.onAmountChange?.(ev.target.value, error);
};

return (
  <Container>
    <Label>Enter Amount</Label>
    <InputWrapper>
      <Input
        className={errorTips && "error"}
        value={amount}
        placeholder="0"
        onChange={handleInputChange}
      />
      {stakeType === 0 ? (
        <Token>
          <TokenIcon src={token.icon} />
          <TokenSymbol>{token.symbol}</TokenSymbol>
        </Token>
      ) : (
        <Token>
          <TokenIcon src={lpToken.icon} />
          <TokenSymbol>{lpToken.symbol}</TokenSymbol>
        </Token>
      )}
    </InputWrapper>
    <ValueWrapper>
      <div>≈ ${formatValue()}</div>
      <BalanceWrapper
        className={errorTips && "error"}
        onClick={() => {
          if (balance) props.onAmountChange?.(balance);
        }}
      >
        Balance:{" "}
        <Balance>{balanceLoading ? "Loading" : balance || "-"}</Balance>
        {errorTips && <ErrorTips>{errorTips}</ErrorTips>}
      </BalanceWrapper>
    </ValueWrapper>
  </Container>
);
