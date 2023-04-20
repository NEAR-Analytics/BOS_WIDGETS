const { options, selectedOption, onChange, label } = props;
const top = props.top | 0;
const id = props.id || "";

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
`;

const Select = styled.select`
  position: relative;
  border: none;
  padding: 7px;
  font-size: 16px; 
  cursor: pointer;
  background: rgba(68, 152, 224, 0.7);
  border-radius: 4px;
  top: ${top}px;
  left: 0px;
  width: fit-content;
`;

const Option = styled.option`
  padding: 7px;
  font-size: 16px; 
`;

const Options = [];

options.forEach((o) => {
  Options.push(
    <Option value={o.value} selected={o.value === selectedOption}>
      {o.label}
    </Option>
  );
});

return (
  <SelectWrapper>
    {label && (
      <label style={{ color: "#8c8c8c" }} for={id}>
        {label}
      </label>
    )}
    <Select onChange={onChange} name={id} id={id}>
      {Options}
    </Select>
  </SelectWrapper>
);
