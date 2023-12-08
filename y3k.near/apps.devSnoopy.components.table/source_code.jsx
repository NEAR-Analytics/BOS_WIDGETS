const rawData = props.dataRegistry || [];
console.log(rawData);

function generateDynamicTableHeaders(tableData, thStyle) {
  if (tableData.length === 0) {
    return null;
  }

  // Extract keys from the first object in the data array as column names
  const columnNames = Object.keys(tableData[0]);

  return columnNames.map((columnName, index) => (
    <th key={index} style={thStyle}>
      {columnName.replace(/_/g, " ")}
    </th>
  ));
}

const { body: tableData } = rawData || [];

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
      <tr>{generateDynamicTableHeaders(tableData, thStyle)}</tr>
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
