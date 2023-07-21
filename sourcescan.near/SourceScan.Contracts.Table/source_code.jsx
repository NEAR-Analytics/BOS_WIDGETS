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
  background-color: ${useTheme(light.bg, dark.bg)}; 
  color: ${useTheme(light.color, dark.color)};
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border-radius: 10px;

  th {
    padding: 15px;
  }

  td {
    padding: 15px;
  }
`;

const TrData = styled.tr`
  border-top: 0.5px dashed ${useTheme(light.border, dark.border)};
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
            <TrData>
              <td>{contract[0]}</td>
              <td>{contract[1].lang}</td>
              <td>{contract[1].cid}</td>
              <td>{}</td>
            </TrData>
          ))
        : null}
    </tbody>
  </Table>
);
