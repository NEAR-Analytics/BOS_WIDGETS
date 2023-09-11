const Result = styled.div`
  display: flex;
  justify-content: space-between;
  color: #787da1;
  margin-top: 30px;
  .mr-8 {
    margin-right: 8px;
  }
`;
const Label = styled.div`
  font-size: 16px;
  font-weight: 500;
`;
const TokenIcon = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;
const TokenAmount = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
`;
const TokenSymbol = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: right;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Price = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
`;
const { chain, lpToken, token, stakeType, value, stnearPrice } = props;

return (
  <Result>
    <Label>You will get:</Label>
    {chain === "ETH" && (
      <div>
        <Flex>
          <TokenIcon
            className="mr-8"
            src={stakeType ? token.icon : lpToken.icon}
          />
          <TokenAmount>{value || 0}</TokenAmount>
        </Flex>
        <TokenSymbol>{stakeType ? token.symbol : lpToken.symbol}</TokenSymbol>
      </div>
    )}
    {chain === "NEAR" && (
      <div>
        <Flex>
          <TokenIcon
            className="mr-8"
            src={stakeType ? token.icon : lpToken.icon}
          />
          <TokenSymbol className="mr-8">
            {stakeType ? token.symbol : lpToken.symbol}
          </TokenSymbol>
          <TokenAmount>{value || 0}</TokenAmount>
        </Flex>
        <Price>
          1 stNEAR = {stnearPrice ? Big(stnearPrice || 0).toFixed(5) : "-"} NEAR
        </Price>
      </div>
    )}
  </Result>
);
