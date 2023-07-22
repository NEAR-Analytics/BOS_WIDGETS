State.init({
  selectedLimit: props.selectedLimit || props.limits[0] || 10,
  limits: props.limits || [10, 20, 50],
  theme: props.theme || "light",
});

const dark = {
  bg: "#28282b",
  color: "#e6eaee",
  border: "#748094",
};

const light = {
  bg: "#e3e8ef",
  color: "#4c5566",
  border: "#748094",
};

const useTheme = (light, dark) => {
  return state.theme === "light" ? light : dark;
};

const Select = styled.select`
  border: 1px solid ${useTheme(light.border, dark.border)};
  background-color: transparent;
  border-radius: 5px;
  width: 55px;
  text-align: center;
  color: ${useTheme(light.color, dark.color)};
`;

console.log("selectedLimit", props.selectedLimit, state.selectedLimit);

return (
  <Select onChange={(e) => props.handleOptionsChange(e)}>
    {state.limits.map((limit) => (
      <option value={limit} selected={state.selectedtLimit === limit}>
        {limit}
      </option>
    ))}
  </Select>
);
