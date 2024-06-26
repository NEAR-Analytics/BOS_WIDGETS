const GreenButton = styled.div`
  width: 70px;
  height: 26px;
  background: #00ffd1;
  border-radius: 6px;
  font-weight: 700;
  font-size: 12px;
  color: #1f1f1f;
  cursor: pointer;
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
`;
const GreenLineButton = styled.div`
  width: 70px;
  height: 26px;
  border: 1px solid #00ffd1;
  border-radius: 6px;
  font-weight: 700;
  font-size: 12px;
  color: #00ffd1;
  cursor: pointer;
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
