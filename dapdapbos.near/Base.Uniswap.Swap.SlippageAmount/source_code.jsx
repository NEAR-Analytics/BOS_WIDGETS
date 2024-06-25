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
  position: absolute;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  height: 40px;
  padding: 0px 12px;
  line-height: 40px;
  color: rgba(16, 16, 16, 0.6);
  font-size: 12px;
  font-weight: 400;
  @media (max-width: 768px) {
    right: 30px !important;
  }
`;

const { clientX, clientY, slippage, amount, outputCurrency } = props;

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
        left: clientX + "px",
        top: clientY + "px",
      }}
    >
      Receive at least{" "}
      {Big(amount)
        .mul(100 - (slippage || 0.5))
        .div(100)
        .toFixed(5)}{" "}
      {outputCurrency.symbol}
    </StyledContainer>
  </Layer>
);
