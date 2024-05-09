const contract = "notepad.ankit2866.near";
const styles = {
  notepad: {
    width: "400px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f5f5dc" /* Cream color */,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
  },
  notepadHeader: {
    marginBottom: "20px",
    textAlign: "center",
  },
  notepadTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  notepadLogo: {
    width: "30px", // Adjust the width of the logo as needed
    height: "30px", // Adjust the height of the logo as needed
    marginLeft: "10px", // Add some margin to separate the title and logo
  },
  notepadContent: {
    width: "100%",
    height: "200px",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    resize: "none",
  },
  saveButton: {
    padding: "8px 16px",
    backgroundColor: "#4caf50" /* Green */,
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
  saveButtonHover: {
    backgroundColor: "#45a049",
  },
};

const text = Near.view(contract, "get_greeting", {});
State.init({ text });
const [content, setContent] = useState("");
const handleInputChange = (e) => {
  setContent(e.target.value);
};

function handleSave() {
  Near.call(contract, "set_greeting", { new_greeting: content });
  console.log("Save button clicked");
}

return (
  <div style={styles.notepad}>
    <div style={styles.notepadHeader}>
      <img
        src="https://i.ibb.co/gtq1pJ5/Screenshot-2024-01-27-213414.png" // Replace with the path to your logo image
        alt="logo"
        style={styles.notepadLogo}
      />
      <span style={styles.notepadTitle}>NearPad</span>
    </div>
    <textarea
      style={styles.notepadContent}
      value={content}
      onChange={handleInputChange}
      placeholder="Write anything..."
    />
    <button
      style={styles.saveButton}
      onClick={handleSave}
      onMouseOver={() => handleButtonHover(true)}
      onMouseOut={() => handleButtonHover(false)}
    >
      Save
    </button>
    <h3>NearPad Says:</h3>
    <p>{text}</p>
  </div>
);
