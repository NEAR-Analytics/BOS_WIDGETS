const StyledContainer = styled.div`
  border-radius: 16px;
  border: 1px solid #c7bfb6;
  font-size: 14px;
  font-weight: 400;
  color: rgba(16, 16, 16, 0.6);
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
    border-top: 1px solid #c7bfb6;
  }
  &.item {
    height: 40px;
  }
`;
const GasWrapper = styled.div`
  display: flex;
  gap: 6px;
  cursor: pointer;
  align-items: center;
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
        {props.showPriceImpactWarning && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
          >
            <path
              d="M6.5 0C2.91037 0 0 2.91037 0 6.5C0 10.0896 2.91037 13 6.5 13C10.0896 13 13 10.0896 13 6.5C13 2.91037 10.0896 0 6.5 0ZM6.5 1.08333C9.49162 1.08333 11.9167 3.50838 11.9167 6.5C11.9167 9.49162 9.49162 11.9167 6.5 11.9167C3.50838 11.9167 1.08333 9.49162 1.08333 6.5C1.08333 3.50838 3.50838 1.08333 6.5 1.08333ZM5.95833 7.04167C5.95833 7.18533 6.0154 7.3231 6.11698 7.42468C6.21857 7.52627 6.35634 7.58333 6.5 7.58333C6.64366 7.58333 6.78143 7.52627 6.88302 7.42468C6.9846 7.3231 7.04167 7.18533 7.04167 7.04167V3.25C7.04167 3.10634 6.9846 2.96857 6.88302 2.86698C6.78143 2.7654 6.64366 2.70833 6.5 2.70833C6.35634 2.70833 6.21857 2.7654 6.11698 2.86698C6.0154 2.96857 5.95833 3.10634 5.95833 3.25V7.04167ZM6.44583 8.775C6.24471 8.775 6.05183 8.8549 5.90961 8.99711C5.7674 9.13933 5.6875 9.33221 5.6875 9.53333C5.6875 9.73446 5.7674 9.92734 5.90961 10.0696C6.05183 10.2118 6.24471 10.2917 6.44583 10.2917C6.64696 10.2917 6.83984 10.2118 6.98206 10.0696C7.12427 9.92734 7.20417 9.73446 7.20417 9.53333C7.20417 9.33221 7.12427 9.13933 6.98206 8.99711C6.83984 8.8549 6.64696 8.775 6.44583 8.775Z"
              fill="#FF684B"
            />
          </svg>
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
          <div
            style={{
              color: props.showPriceImpactWarning ? "#FF684B" : "#101010",
            }}
          >
            {trade.priceImpact}%
          </div>
        </Row>
        <Row
          className="item"
          onClick={(ev) => {
            props.onSlippageClick(ev);
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="gray">Max. slippage</div>
          <div>{trade.slippage || 0.5}%</div>
        </Row>
        <Row className="item">
          <div className="gray">Network cost</div>
          <Token>
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
          <div style={{ textDecoration: "underline" }}>Uniswap API</div>
        </Row>
      </Content>
    )}
  </StyledContainer>
) : (
  <div />
);
