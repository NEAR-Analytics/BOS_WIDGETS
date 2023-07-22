const networks = ["mainnet", "testnet"];

State.init({
  theme: props.theme || "light",
  network: context.networkId,
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
  padding-top: 10px;
  padding-bottom: 10px;
  border: 1px dashed ${useTheme(light.border, dark.border)};
  background-color: transparent;
  border-radius: 5px;
  width: 100px;
  text-align: center;
  color: ${useTheme(light.color, dark.color)};
`;

const strCapitalize = (str) => {
  if (str.length === 0) return str;

  return str.replace(/^./, (match) => match.toUpperCase());
};

return (
  <Select>
    {networks.map((network) => (
      <option value={network} disabled={state.network !== network}>
        {strCapitalize(network)}
      </option>
    ))}
  </Select>
);
