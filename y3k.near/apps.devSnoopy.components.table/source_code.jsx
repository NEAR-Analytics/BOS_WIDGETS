// const tData = props.dataRegistry || [];

function aggregateData(data) {
  const aggregatedData = {};

  data.forEach((item) => {
    // Use series_id as the key
    const key = item.series_id;
    if (!aggregatedData[key]) {
      // Initialize with the first item of this series and set count to 1
      aggregatedData[key] = { ...item, count: 1 };
    } else {
      // Increment count for each occurrence
      aggregatedData[key].count += 1;
    }
  });

  return Object.values(aggregatedData);
}
const tData = aggregateData(props.dataRegistry || []);

function generateDynamicTableHeaders(tableData, thStyle) {
  // Check if tableData is an array and not empty
  if (!Array.isArray(tableData) || tableData.length === 0) {
    return null;
  }

  // Ensure the first element is an object
  const firstItem = tableData[0];
  if (typeof firstItem !== "object" || firstItem === null) {
    return null;
  }

  // Extract keys from the first object in the data array as column names
  const columnNames = Object.keys(firstItem);
  console.log(columnNames);

  return columnNames.map((columnName, index) => (
    <th key={index} style={thStyle}>
      {columnName.replace(/_/g, " ")}
    </th>
  ));
}

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
      <tr>{generateDynamicTableHeaders(tData, thStyle)}</tr>
    </thead>
    <tbody>
      {tData.map((item) => (
        <tr key={item.address}>
          <td style={tdStyle}>{item.token_ids}</td>
          <td style={tdStyle}>{item.series_title}</td>
          <td style={tdStyle}>{item.mint_timestamp_utc}</td>
          <td style={tdStyle}>{item.originated_from_transaction_hash}</td>
          <td style={tdStyle}>{item.address}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
