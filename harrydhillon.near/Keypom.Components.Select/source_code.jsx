const StyledSelect = styled.select`
    padding:8px;
    border-radius:10px;
    border: 1px solid #E2E8F0;
    color: #94A3B8;
`;

return (
  <StyledSelect {...props.selectProps}>
    <option>{props.label}</option>
    {(props.options??[]).map((item) => (
      <option value={item.value}>{item.label}</option>
    ))}
  </StyledSelect>
);
