const cardStyle = {
  border: "1px solid #e5e7eb",
  padding: "1rem",
  borderRadius: "0.25rem",
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
        <select
          style={{
            padding: "0.5rem 0.75rem",
            borderRadius: "0.25rem",
            border: "1px solid #e5e7eb",
          }}
        >
          <option>NEAR (mainnet)</option>
          <option>NEAR (testnet)</option>
          <option>Polkadot (mainnet)</option>
          <option>Polkadot (testnet)</option>
          <option>Ethereum (mainnet)</option>
          <option>Ethereum (testnet)</option>
        </select>
      </div>
    </div>
  </div>
);
