const contract = "guest-book.near";
const total_messages = Near.view(contract, "totalMessages", {});
const messages = Near.view(contract, "getMessages", {
  from_index: total_messages - 10,
}).reverse();
console.log(messages);

// Additional CSS for styling
const styles = {
  container: {
    backgroundColor: "#FFF5E9", // Light orange background similar to the image
    padding: "1rem",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // subtle shadow
  },
  tableHeader: {
    backgroundColor: "#FFAD60", // Orange background for headers
    color: "white",
  },
  tableRow: {
    borderBottom: "1px solid #FFAD60", // Orange border for separation
  },
  tableRowStriped: {
    backgroundColor: "#FFE9CC", // Lighter orange for striped effect
  },
  actionButton: {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    color: "#FF6A00", // Orange color for icons
  },
};

State.init({
  newMessage: "",
});

const addNewMessage = () => {
  if (state.newMessage.trim() == "") {
    return;
  }

  Near.call(contract, "addMessage", {
    text: state.newMessage,
  });
};

return (
  <div style={styles.container}>
    <h3>Libro de Visitas (BOS + NEAR)</h3> {/* Orange text for heading */}
    <br />
    {context.accountId ? (
      <div class="border border-primary p-3">
        <h3>Nuevo Mensaje</h3>
        <div class="row">
          <div>
            <input
              class="form-control"
              placeholder="Message"
              onChange={(e) => State.update({ newMessage: e.target.value })}
            />
          </div>
        </div>
        <button
          class="btn btn-primary mt-2"
          onClick={async () => {
            addNewMessage();
          }}
        >
          Guardar
        </button>
      </div>
    ) : (
      <p class="text-center py-2">
        Debes iniciar sesión para guardar un mensaje
      </p>
    )}
    <br />
    <div class="p-3">
      <h3>Listado de Mensajes</h3>
      <table className="table">
        <thead>
          <tr style={styles.tableHeader}>
            <th>ID</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((data, index) => {
            const isEven = index % 2 === 0;
            return (
              <tr
                key={index}
                style={isEven ? styles.tableRowStriped : styles.tableRow}
              >
                <td>{data.sender}</td>
                <td>{data.text}</td>
                <td>
                  <button style={styles.actionButton}>♥</button>
                  <button style={styles.actionButton}>✎</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);
