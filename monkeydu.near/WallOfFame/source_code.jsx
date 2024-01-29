const contract = "excellency.monkeydu.near";
const entries = Near.view(contract, "get_all_names", {});
State.init({ entries });
const [newEntry, setNewEntry] = useState("");

const handleAddEntry = () => {
  if (newEntry.trim() !== "") {
    Near.call(contract, "add_name", {
      new_name: newEntry,
    });
    State.update({ entries });
    setNewEntry("");
  }
};
const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f2ad65",
    borderRadius: "10px",
  },
  wall: {
    listStyle: "none",
    padding: "0",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  wallHeader: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  entry: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    fontSize: "16px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
  },
  input: {
    flex: "1",
    padding: "8px",
    marginRight: "10px",
  },
  addButton: {
    padding: "10px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};
const Img = styled.img`
    height:50px;
`;

return (
  <div style={styles.container}>
    <Img
      src="https://i.ibb.co/hCGKDkT/avatar-1001375169474.png"
      alt="NearIndiaLogo"
    />
    <h1 style={styles.wallHeader}>Wall of Fame</h1>
    <ul style={styles.wall}>
      {entries.map((entry, index) => (
        <li key={index} style={styles.entry}>
          {entry}
        </li>
      ))}
    </ul>
    <div style={styles.inputContainer}>
      <input
        type="text"
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleAddEntry} style={styles.addButton}>
        Add Entry
      </button>
    </div>
  </div>
);
