const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const StyledRing = styled.svg`
  width: 20px;
  height: 20px;
  transform: rotate(-90deg);
  circle {
    cx: 10px;
    cy: 10px;
    r: 8.5px;
    fill: none;
    stroke-width: 3px;
    stroke-linecap: round;
  }
`;
const StyledAmount = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
return (
  <StyledContainer>
    <StyledRing xmlns="http://www.w3.org/200/svg">
      <circle stroke="#000"></circle>
      <circle
        stroke="#00D395"
        style={{
          strokeDasharray:
            "calc(2 * 3.1415 * (20 - 3) / 2 * (" +
            props.value +
            " / 100)) 1000",
        }}
      ></circle>
    </StyledRing>
    <StyledAmount>{props.value}%</StyledAmount>
  </StyledContainer>
);
