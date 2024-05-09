const Layer = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
`;
const StyledContainer = styled.div`
  width: 238px;
  box-sizing: border-box;
  border-radius: 12px;
  background: #fff;
  position: absolute;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  padding: 13px 11px 9px 14px;
  color: rgba(16, 16, 16, 0.6);
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
  @media (max-width: 768px) {
    right: 30px !important;
  }
`;

const { clientX, clientY } = props;

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
      A swap of this size may have a high price impact, given the current
      liquidity in the pool. There may be a large difference between the amount
      of your input token and what you will receive in the output token
    </StyledContainer>
  </Layer>
);
