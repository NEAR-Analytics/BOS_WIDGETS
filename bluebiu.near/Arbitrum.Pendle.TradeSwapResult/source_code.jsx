const Result = styled.div`
  border: 1px solid #2c334b;
  border-radius: 16px;
  padding: 20px;
  margin-top: 20px;
  position: relative;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  .right {
    text-align: right;
    display: flex;
  }
`;
const Text = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #979abe;
`;
const Routers = styled.div`
  background-color: #222436;
  border-radius: 12px;
  padding: 10px;
  display: flex;
  align-items: center;
`;
const TokenImg = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;
const LineWrapper = styled.div`
  flex-grow: 1;
  height: 26px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  .tooltips {
    display: none;
  }
  &:hover .tooltips {
    display: block;
  }
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    #979abe 0,
    #979abe 2px,
    transparent 2px,
    transparent 4px
  );
`;
const Loading = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: #181a27;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  z-index: 10;
`;
const ToolTips = styled.div`
  background-color: #37394f;
  border-radius: 8px;
  padding: 0px 10px;
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  .one-line {
    white-space: nowrap;
    line-height: 40px;
  }
  .two-lines {
    padding: 4px;
    width: 300px;
    line-height: 23px;
  }
  &::after {
    content: "";
    border: 6px solid transparent;
    border-top-color: #37394f;
    position: absolute;
    bottom: -12px;
    left: 50%;
  }
`;
const InfoIcon = styled.div`
  padding-left: 4px;
  cursor: pointer;
  position: relative;
  text-align: left;
  .tooltips {
    display: none;
  }
  &:hover .tooltips {
    display: block;
  }
`;

const { inputCurrency, outputCurrency, amount, loading } = props;
const tradeInfo = props.tradeInfo || {};

const getOut = tradeInfo?.netOut
  ? Big(tradeInfo.netOut || 0)
      .mul(0.995)
      .toFixed(3)
  : "-";
const getTokenSymbol = (token) => (
  <>
    {token.proSymbol}
    {token.baseType === "SY" ? (
      <Widget src="bluebiu.near/widget/Arbitrum.Pendle.TradeSyIcon" />
    ) : (
      ""
    )}
  </>
);
const formatAmount = (amount) => {
  if (!amount || isNaN(amount)) return "-";
  return Number(Big(amount || 0).toFixed(3));
};
const formatRate = () => {
  if (!inputCurrency?.price.usd || !outputCurrency?.price.usd) return "-";
  return Big(outputCurrency.price.usd).div(inputCurrency.price.usd).toFixed(3);
};
const formatTips = (route) => {
  if (
    (["PT", "YT"].includes(route.to.baseType) &&
      route.from.baseType === "SY") ||
    (["PT", "YT"].includes(route.from.baseType) && route.to.baseType === "SY")
  ) {
    return (
      <div className="two-lines">
        Swap from {formatAmount(route.from.amount)} {getTokenSymbol(route.from)}{" "}
        to
        {formatAmount(route.to.amount)} {getTokenSymbol(route.to)} on Pendle,
        swap fee is {Big(tradeInfo.netSyFee || 0).toFixed(5)}%.
      </div>
    );
  }
  if (route.to.baseType === "SY" || route.from.baseType === "SY") {
    return (
      <div className="one-line">
        {route.to.baseType === "SY" ? "Wrap" : "Unwrap"}{" "}
        {formatAmount(route.from.amount)} {getTokenSymbol(route.from)} to
        {formatAmount(route.to.amount)} {getTokenSymbol(route.to)}.
      </div>
    );
  }
  return (
    <div className="one-line">
      Swap from {formatAmount(route.from.amount)}
      {getTokenSymbol(route.from)} to {formatAmount(route.to.amount)}
      {getTokenSymbol(route.to)}.
    </div>
  );
};
return (
  <Result>
    {loading && (
      <Loading>
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 40,
          }}
        />
      </Loading>
    )}
    <Row>
      <Text>Rate</Text>
      <Text className="right">
        1 {outputCurrency.symbol} = {formatRate()} {inputCurrency.symbol}
      </Text>
    </Row>
    <Row>
      <Text>Min.Received</Text>
      <Text className="right">
        {getOut}
        {outputCurrency.symbol}
        <InfoIcon>
          <Widget
            src="bluebiu.near/widget/0vix.LendingInfoIcon"
            props={{ size: 14 }}
          />
          <ToolTips className="tooltips">
            <div className="one-line">Slippage tolerance = 0.5%</div>
          </ToolTips>
        </InfoIcon>
      </Text>
    </Row>
    <Row>
      <Text>Effective Fixed APY</Text>
      <Text className="right">
        {tradeInfo?.apy || "-"}%
        <InfoIcon>
          <Widget
            src="bluebiu.near/widget/0vix.LendingInfoIcon"
            props={{ size: 14 }}
          />
          <ToolTips className="tooltips">
            <div className="two-lines">
              The fixed APY you are effectively getting from this trade, taking
              into account price impact (
              {tradeInfo?.priceImpact &&
              Big(tradeInfo.priceImpact || 0).gt(0.0001)
                ? Big(tradeInfo.priceImpact || 0).toFixed(4)
                : "< 0.0001"}
              %) and swap fees.
            </div>
          </ToolTips>
        </InfoIcon>
      </Text>
    </Row>
    {tradeInfo.routes && (
      <Routers>
        {tradeInfo.routes?.map((route, i) => {
          return (
            <>
              <TokenImg src={route.from.proIcon} />
              <LineWrapper>
                <Line />
                <ToolTips className="tooltips">{formatTips(route)}</ToolTips>
              </LineWrapper>
              {i === tradeInfo.routes.length - 1 && (
                <TokenImg src={route.to.proIcon} />
              )}
            </>
          );
        })}
      </Routers>
    )}
  </Result>
);
