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
      <label
        htmlFor="address"
        style={{ fontWeight: 600, marginBottom: "0.25rem" }}
      >
        Address
      </label>
      <div></div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          id="address"
          type="text"
          placeholder="Enter an address to check carbon emission"
          style={{
            padding: "0.5rem 0.75rem",
            borderRadius: "0.25rem",
            border: "1px solid #e5e7eb",
          }}
        />
      </div>
    </div>
  </div>
);
