const Process = styled.div`
  position: relative;
  width: 100%;
`;
const ActiveBar = styled.div`
  height: 5px;
  border-radius: 10px;
  background-color: #8b71c2;
  position: absolute;
  left: 0px;
  top: 12px;
`;
const Range = styled.input`
  -webkit-appearance: none;
  width: 100%;
  background-color: transparent;
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 5px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.3);
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #8b71c2;
    border: 3px solid #1a1b29;
    margin-top: -7px;
  }
`;
const { value, onChange } = props;
return (
  <Process>
    <ActiveBar style={{ width: `calc(${value}% - 3px)` }} />
    <Range
      type="range"
      value={value}
      step="any"
      min="0"
      max="100"
      onChange={(e) => {
        onChange?.(e.target.value);
      }}
    />
  </Process>
);
