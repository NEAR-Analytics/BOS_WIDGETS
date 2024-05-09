const Layer = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
`;
const StyledContainer = styled.div`
  border-radius: 12px;
  background: #fff;
  padding: 12px;
  width: 333px;
  flex-shrink: 0;
  position: absolute;
  @media (max-width: 768px) {
    left: 30px !important;
  }
`;
const StyledRoutes = styled.div`
  display: flex;
  align-items: center;
`;
const Route = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  .second-token {
    margin-left: -6px;
  }
`;
const RouteWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;
const Tag = styled.div`
  flex-shrink: 0;
  border-radius: 6px;
  background: #262626;
  display: flex;
  align-items: center;
  padding: 0px 4px;
  color: #8e8e8e;
  font-size: 10px;
  font-weight: 500;
  gap: 2px;
  .white {
    color: #fff;
    font-size: 12px;
    font-weight: 500;
  }
`;
const DashLine = styled.div`
  flex-grow: 1;
  height: 1px;
  border-bottom: 1px dashed #8e8e8e;
`;
const Desc = styled.div`
  color: #8e8e8e;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  margin-top: 10px;
`;

const { gasCost, inputCurrency, outputCurrency } = props;
const routes = props.routes || [];
return (
  <Layer
    onClick={() => {
      props.onClose();
    }}
    onTouchStart={() => {
      props.onClose();
    }}
    onMouseDown={() => {
      props.onClose();
    }}
  >
    <StyledContainer
      style={{
        left: props.clientX + 10 + "px",
        top: props.clientY + 20 + "px",
      }}
    >
      {routes.map((route, i) => (
        <StyledRoutes key={i + Math.random()}>
          <Route>
            <Widget
              src="dapdapbos.near/widget/Linea.Uniswap.Swap.TokenIcon"
              props={{
                size: 16,
                token: inputCurrency,
              }}
            />
            <Tag>
              <span className="white">{route.route[0]?.type}</span>
              <span>{route.percent}%</span>
            </Tag>
          </Route>
          <DashLine />
          {route.route.map((path, i) => (
            <RouteWrapper key={path.address}>
              <Route>
                <Widget
                  src="dapdapbos.near/widget/Linea.Uniswap.Swap.TokenIcon"
                  props={{
                    size: 16,
                    token: path.token0,
                  }}
                />
                <div className="second-token">
                  <Widget
                    src="dapdapbos.near/widget/Linea.Uniswap.Swap.TokenIcon"
                    props={{
                      size: 16,
                      token: path.token1,
                    }}
                  />
                </div>
                <Tag>
                  <span>{path.fee / 10000}%</span>
                </Tag>
              </Route>
              <DashLine />
            </RouteWrapper>
          ))}
          <Route>
            <Widget
              src="dapdapbos.near/widget/Linea.Uniswap.Swap.TokenIcon"
              props={{
                size: 16,
                token: outputCurrency,
              }}
            />
          </Route>
        </StyledRoutes>
      ))}
      <Desc>
        Best price route costs ~$
        {gasCost} in gas. This route optimizes your total output by considering
        split routes, multiple hops, and the gas cost of each step.
      </Desc>
    </StyledContainer>
  </Layer>
);
