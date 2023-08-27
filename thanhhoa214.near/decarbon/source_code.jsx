const { body: tableData } = fetch(
  "https://decarbon-protocol.vercel.app/api/table"
);
const cardStyle = {
  border: "1px solid #e5e7eb",
  padding: "1rem",
  borderRadius: "0.25rem",
};
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
  <div>
    <h3 style={{ fontWeight: "bold" }}>
      Blockchain Driven Carbon Emission Dashboard
    </h3>
    <div
      style={{
        ...cardStyle,
        marginBottom: "1rem",
      }}
    >
      <Widget src="thanhhoa214.near/widget/carbon-filter" />
    </div>
    <div style={cardStyle}>
      <Widget src="thanhhoa214.near/widget/carbon-table" />
    </div>
  </div>
);
