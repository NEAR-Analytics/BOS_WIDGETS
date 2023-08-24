State.init({
  placement: props.placement || "top",
  label: props.label || "Contracts per page",
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
  height: 36px;
  width: 76px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: start;
  color: ${useTheme(light.color, dark.color)};
`;

return (
  <OverlayTrigger
    key={state.placement}
    placement={state.placement}
    overlay={<Tooltip id={`tooltip-${placement}`}>{state.label}</Tooltip>}
  >
    <Select onChange={(e) => props.handleOptionsChange(e)}>
      {state.limits.map((limit, i) => (
        <option key={i} value={limit} selected={state.selectedLimit === limit}>
          {limit}
        </option>
      ))}
    </Select>
  </OverlayTrigger>
);
