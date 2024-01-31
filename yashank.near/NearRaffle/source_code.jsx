const contract = "raffle.yashank.near";
const entriesResult = Near.view(contract, "entry_names", {});
const entries = Array.isArray(entriesResult) ? entriesResult : [];
State.init({ entries });
const [newEntry, setNewEntry] = useState("");
const [winners, setWinners] = useState({ winner1: "" });

const handleAddEntry = () => {
  if (newEntry.trim() !== "") {
    Near.call(contract, "entry", {
      new_entry: newEntry,
    });
    State.update({ entries });
    setNewEntry("");
  }
};

const pickWinner = () => {
  if (entries.length >= 2) {
    const winnerIndex1 = Near.view(contract, "pick_random_user", {});

    setWinners({
      winner1: winnerIndex1,
    });
  } else {
    alert("Not enough entries to pick winners.");
  }
};

const clearSelection = () => {
  Near.call(contract, "clear_participants", {});
  State.update({ entries: [] }); // Clear the entries state as well
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#ddd", // Grey background
    borderRadius: "10px",
  },
  wall: {
    listStyle: "none",
    padding: "0",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  winnersColumn: {
    marginLeft: "20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  logo: {
    height: "50px",
    marginRight: "10px",
  },
  wallHeader: {
    fontSize: "24px",
    fontWeight: "bold", // Bold styling
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
    marginRight: "10px",
  },
  pickWinnersButton: {
    padding: "10px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    marginRight: "10px",
  },
  clearSelectionButton: {
    padding: "10px",
    cursor: "pointer",
    backgroundColor: "#e74c3c", // Red color for clear selection button
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
  entryHeader: {
    fontSize: "20px", // Smaller font size for entries
  },
  winnersHeader: {
    fontSize: "20px", // Smaller font size for winners
  },
};

const Img = styled.img`
  height: 50px;
`;

return (
  <div style={styles.container}>
    <div style={styles.header}>
      <Img
        src="https://i.ibb.co/qxdyxF6/Screenshot-2024-01-23-004646.png"
        alt="NearIndiaLogo"
        style={styles.logo}
      />
      <h1 style={styles.wallHeader}>Near Raffle</h1>
    </div>
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
      <button onClick={pickWinner} style={styles.pickWinnersButton}>
        Pick Winners
      </button>
      <button onClick={clearSelection} style={styles.clearSelectionButton}>
        Clear Selection
      </button>
    </div>
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <h2 style={styles.entryHeader}>Entries:</h2>
        <ul style={styles.wall}>
          {entries.map((entry, index) => (
            <li key={index} style={styles.entry}>
              {entry}
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.winnersColumn}>
        <h2 style={styles.winnersHeader}>Winners:</h2>
        <p>{winners.winner1}</p>
      </div>
    </div>
  </div>
);
