const { body: tableData } = fetch(
  "https://decarbon-protocol.vercel.app/api/table"
);
const tableStyle = {
  borderCollapse: "collapse",
  width: "100%",
  borderRadius: "0.25rem",
  overflow: "hidden",
};
const thStyle = {
  backgroundColor: "#f2f2f2",
  padding: "8px",
  textAlign: "left",
  borderBottom: "1px solid #e5e7eb",
};
const tdStyle = {
  padding: "8px",
  textAlign: "left",
  borderBottom: "1px solid #e5e7eb",
};

return (
  <table style={tableStyle}>
    <thead>
      <tr>
        <th style={thStyle}>Emission Level</th>
        <th style={thStyle}>Address</th>
        <th style={thStyle}>Amount</th>
      </tr>
    </thead>
    <tbody>
      {tableData.map((item) => (
        <tr key={item.address}>
          <td style={tdStyle}>{item.ghg_emission_group}</td>
          <td style={tdStyle}>{item.address}</td>
          <td style={tdStyle}>{item.ghg_emission}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
