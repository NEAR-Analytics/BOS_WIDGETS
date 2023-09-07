const GreenButton = styled.div`
  padding: 0px 10px;
  height: 26px;
  background-color: #00ffa3;
  border-radius: 6px;
  font-weight: 700;
  font-size: 12px;
  color: #1f1f1f;
  cursor: pointer;
  max-width: 70px;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .disabled {
    opacity: 0.5;
  }
  @media (max-width: 900px) {
    max-width: 100%;
    height: 36px;
  }
`;
const GreenLineButton = styled.div`
  padding: 0px 12px;
  height: 26px;
  border: 1px solid #00ffa3;
  border-radius: 6px;
  font-weight: 700;
  font-size: 12px;
  color: #00ffa3;
  cursor: pointer;
  max-width: 70px;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .disabled {
    opacity: 0.5;
  }
  @media (max-width: 900px) {
    max-width: 100%;
    height: 36px;
  }
`;
const { clickEvent, buttonType, actionName, hoverOn } = props;
return (
  <>
    {buttonType == "line" ? (
      <GreenLineButton
        onClick={() => {
          clickEvent();
        }}
      >
        <span class={`${!hoverOn ? "disabled" : ""}`}>{actionName}</span>
      </GreenLineButton>
    ) : (
      <GreenButton
        onClick={() => {
          clickEvent();
        }}
      >
        <span class={`${!hoverOn ? "disabled" : ""}`}>{actionName}</span>
      </GreenButton>
    )}
  </>
);
