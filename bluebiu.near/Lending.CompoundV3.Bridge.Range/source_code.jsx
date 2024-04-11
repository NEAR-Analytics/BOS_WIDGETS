const StyledRange = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const StyledSegment = styled.div`
  height: 5px;
  border-radius: 8px;
  background-color: #33364b;
`;
const StyledPercent = styled.div`
  color: #fff;
  text-align: center;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  flex-shrink: 0;
`;
const StyledDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 50%;
  flex-shrink: 0;
`;
const { value } = props;

const _value = value > 94 ? 94 : value;

return (
  <StyledRange>
    <StyledSegment
      style={{ width: _value + "%", backgroundColor: "#00AD79" }}
    />
    <StyledPercent>{value}%</StyledPercent>
    <StyledSegment style={{ width: 94 - _value + "%" }} />
    <StyledDot />
    <StyledSegment style={{ width: "6%" }} />
  </StyledRange>
);
