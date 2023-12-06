const StyledContainer = styled.div`
  border-radius: 16px;
  border: 1px solid #222222;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  .gray {
    color: #8e8e8e;
  }
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  &.router {
    cursor: pointer;
  }
  &.header {
    height: 54px;
  }
  &.row-border-top {
    border-top: 1px solid #222222;
  }
  &.item {
    height: 40px;
  }
`;
const GasWrapper = styled.div`
  display: flex;
  gap: 6px;
  cursor: pointer;
`;
const ArrowIcon = styled.div`
  transition: 0.3s;
  &.up {
    transform: rotate(180deg);
  }
  &.down {
    transform: rotate(0deg);
  }
`;
const Content = styled.div``;
const Token = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
const TokenIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const trade = props.trade;

return trade ? (
  <StyledContainer>
    <Row className="header">
      <div>
        1 {trade.outputCurrency.symbol} ={" "}
        {Number(
          Big(trade.inputCurrencyAmount || 0)
            .div(
              Big(trade.outputCurrencyAmount || 0).eq(0)
                ? 1
                : trade.outputCurrencyAmount
            )
            .toFixed(4)
        ).toLocaleString("en-US")}{" "}
        {trade.inputCurrency.symbol}{" "}
        <span className="gray">${trade.gasCost}</span>
      </div>
      <GasWrapper
        onClick={() => {
          State.update({
            showContent: !state.showContent,
          });
        }}
      >
        {!state.showContent && (
          <span className="gray">Gas ${trade.gasCost}</span>
        )}
        <ArrowIcon className={state.showContent ? "up" : "down"}>
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L6 5L11 1"
              stroke="#8E8E8E"
              stroke-opacity="0.933333"
              stroke-width="2"
            />
          </svg>
        </ArrowIcon>
      </GasWrapper>
    </Row>
    {state.showContent && (
      <Content>
        <Row className="row-border-top item">
          <div className="gray">Price impact</div>
          <div>{trade.priceImpact}%</div>
        </Row>
        <Row className="item">
          <div className="gray">Max. slippage</div>
          <div>{trade.slippage || 0.5}%</div>
        </Row>
        <Row className="item">
          <div className="gray">Network cost</div>
          <Token>
            <TokenIcon src="https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq" />
            <div>${trade.gasCost}</div>
          </Token>
        </Row>
        <Row
          className="row-border-top header router"
          onClick={(ev) => {
            props.onRouterClick(ev);
          }}
        >
          <div className="gray">Order routing</div>
          <div>Uniswap API</div>
        </Row>
      </Content>
    )}
  </StyledContainer>
) : (
  <div />
);
