const styleHeader = {
  backgroundColor: "#f5ba13",
  margin: "auto -16px",
  padding: "16px 32px",
  color: "#fff",
  fontWeight: "200",
  fontFamily: '"McLaren", cursive',
};

const styleFooter = {
  position: "absolute",
  textAlign: "center",
  bottom: "0",
  width: "100%",
  height: "2.5rem",
  color: "#ccc",
};

const styleNote = {
  background: "#FAEDEB",
  borderRadius: "7px",
  padding: "10px",
  width: "240px",
  margin: "16px",
  marginLeft: "50%",
  float: "left",
};

const styleNoteh1 = {
  outline: "none",
  border: "none",
  fontSize: "1.1em",
  width: "100%",
  marginBottom: "6px",
  background: "#FAEDEB",
  resize: "none",
  fontFamily: "inherit",
};

const styleNotep = {
  outline: "none",
  border: "none",
  width: "100%",
  padding: "4px",
  fontSize: "1.2em",
  fontFamily: "inherit",
  resize: "none",
  background: "#FAEDEB",
};

const stylebutton = {
  position: "relative",
  right: "18px",
  bottom: "-18px",
  background: "#f5ba13",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
  cursor: "pointer",
  outline: "none",
};

const notestyle = {
  background: "#fff",
  borderRadius: "7px",
  boxShadow: "0 2px 5px #ccc",
  padding: "10px",
  width: "240px",
  margin: "16px",
  float: "left",
};

const noteh1 = {
  fontSize: "1.1em",
  marginBottom: "6px",
};

const notep = {
  fontSize: "1.1em",
  marginBottom: "10px",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
};

const notebutton = {
  position: "relative",
  float: "right",
  marginRight: "10px",
  color: "#fff",
  border: "none",
  width: "75px",
  height: "30px",
  cursor: "pointer",
  outline: "none",
  backgroundColor: "#f5ba13",
};

function Footer() {
  return <p style={styleFooter}>Copyright ⓒ 2023</p>;
}

function Header() {
  return <h1 style={styleHeader}>Keeper</h1>;
}

function Noting({ title, content, onDelete }) {
  return (
    <div style={notestyle} className="note">
      <h1 style={noteh1}>{title}</h1>
      <p style={notep}>{content}</p>
      <button onClick={onDelete} style={notebutton}>
        DELETE
      </button>
    </div>
  );
}

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNote = () => {
    if (title.trim() !== "" && content.trim() !== "") {
      const newNote = { title, content };
      setNotes([...notes, newNote]);
      setTitle("");
      setContent("");
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div>
      <Header />
      <div style={styleNote}>
        <input
          style={styleNoteh1}
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          style={styleNotep}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button style={stylebutton} onClick={handleAddNote}>
          Add
        </button>
      </div>
      <div id="my-notes">
        {notes.map((note, index) => (
          <Noting
            key={index}
            title={note.title}
            content={note.content}
            onDelete={() => handleDeleteNote(index)}
          />
        ))}
      </div>
    </div>
  );
}

return <App />;
