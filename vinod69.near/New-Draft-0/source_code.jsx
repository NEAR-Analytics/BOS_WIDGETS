const characterCount = state.note.length;

return (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#FFD580",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    }}
  >
    <h1
      style={{
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#333",
      }}
    >
      Notepad
    </h1>
    <p style={{ fontSize: "16px", marginBottom: "20px", color: "#555" }}>
      you can type anything you like and see it appear on the screen.
      Additionally, you'll notice a character count that shows you how many
      characters you've typed so far. <div></div>
    </p>
    <div style={{ marginTop: "20px", textAlign: "right" }}>
      <img
        src="https://shard.dog/v3/images/nearindia.jpg"
        alt="Near India"
        style={{ maxWidth: "80px", maxHeight: "80px" }}
      />
    </div>
    <div style={{ marginBottom: "20px", position: "relative" }}>
      <textarea
        type="text"
        rows={10}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "20px",
          border: "1px solid #ccc",
          color: "#fff",
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(https://img.freepik.com/free-vector/gradient-india-independence-day-background_79603-1824.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "inset 0 2px 2px rgba(0, 0, 0, 0.1)", // Optional: Add a subtle inset shadow
          resize: "none",
        }}
        value={state.note}
        onChange={(e) => State.update({ note: e.target.value })}
      />
      <p style={{ fontSize: "14px", marginTop: "5px", color: "#888" }}>
        Number of typed character: {characterCount}
      </p>
    </div>
    <button
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#ff0000",
        color: "#fff",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
      }}
    >
      Save
    </button>
  </div>
);
