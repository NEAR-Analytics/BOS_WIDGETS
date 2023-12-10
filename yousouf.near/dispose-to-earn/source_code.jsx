const [users, setUsers] = useState([]);
const [name, setName] = useState("");
const [address, setAddress] = useState("");
const [waste, setWaste] = useState("");

const handleFormSubmit = () => {
  const existingUserIndex = users.findIndex((user) => user.name === name);

  if (existingUserIndex !== -1) {
    const updatedUsers = [...users];
    updatedUsers[existingUserIndex].waste += Number(waste);
    setUsers(updatedUsers);
  } else {
    const newUser = { name, address, waste: Number(waste) };
    setUsers([...users, newUser]);
  }

  setName("");
  setAddress("");
  setWaste("");
};

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  backgroundColor: "#f2f2f2",
};

const handlePayClick = (index) => {
  const updatedUsers = [...users];
  updatedUsers[index].status = "Paid";
  updatedUsers[index].waste = 0;
  updatedUsers[index].rewardAmount = 0;
  setUsers(updatedUsers);
};

const generateRows = () => {
  return users.map((user, index) => (
    <tr key={user.name}>
      <td>{user.name}</td>
      <td>{user.address}</td>
      <td>{user.waste}</td>
      <td>N{200 * user.waste}</td>
      <td style={tableCellStyle}>
        {user.status !== "Paid" && (
          <button onClick={() => handlePayClick(index)}>Pay</button>
        )}
      </td>
    </tr>
  ));
};

return (
  <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
    <hr />
    <h1 style={{ textAlign: "center", color: "green" }}>Dispose To Earn 🗑️</h1>
    <h6 style={{ textAlign: "center", color: "green" }}>Keep Nigeria clean</h6>
    <hr />
    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </label>
    </div>
    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </label>
    </div>
    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>
        Waste (kg):
        <input
          type="number"
          value={waste}
          onChange={(e) => setWaste(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </label>
    </div>
    <button
      type="button"
      onClick={handleFormSubmit}
      style={{
        width: "100%",
        padding: "10px",
        background: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Submit
    </button>
    <br />
    <br />
    <hr />
    <table
      style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}
    >
      <thead>
        <tr>
          <th style={tableCellStyle}>Name</th>
          <th style={tableCellStyle}>Address</th>
          <th style={tableCellStyle}>Waste (kg)</th>
          <th style={tableCellStyle}>Reward Amount</th>
          <th style={tableCellStyle}>Payment Status</th>
        </tr>
      </thead>
      <tbody>{generateRows()}</tbody>
    </table>
  </div>
);
