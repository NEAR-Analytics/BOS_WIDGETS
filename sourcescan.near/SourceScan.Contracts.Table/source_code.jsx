State.init({
  contracts: props.contracts,
  theme: props.theme || "light",
});

if (props.contracts)
  State.update({
    contracts: props.contracts,
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

const Table = styled.table`
  border: 1px solid ${useTheme(light.border, dark.border)};
  background-color: ${useTheme(light.bg, dark.bg)}; 
  color: ${useTheme(light.color, dark.color)};
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;

  th {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5px;
    padding-right: 5px;
    text-align: center
`;

return (
  <Table>
    <thead>
      <tr>
        <th>Contract</th>
        <th>Lang</th>
        <th>Source</th>
        <th>Approved</th>
      </tr>
    </thead>
    <tbody>
      {state.contracts
        ? state.contracts.map((contract) => (
            <tr>
              <td class="border px-4 py-2">{contract[0]}</td>
              <td class="border px-4 py-2">{contract[1].lang}</td>
              <td class="border px-4 py-2">{contract[1].cid}</td>
              <td class="border px-4 py-2">{}</td>
            </tr>
          ))
        : null}
    </tbody>
  </Table>
);
