const contract = "guest-book.near";
const messages = Near.view(contract, "getMessages", {}).reverse();
console.log(messages);

State.init({
  newMessage: "",
});

const nuevoMensaje = () => {
  Near.call(contract, "addMessage", { text: state.newMessage });
};

return (
  <div>
    <h1 className="text-danger">My List</h1>
    <input onChange={(e) => State.update({ newMessage: e.target.value })} />
    <button
      onClick={() => {
        nuevoMensaje();
      }}
    >
      Guardar
    </button>

    <table
      border="1"
      style={{ width: "100%", marginTop: "15px", borderCollapse: "collapse" }}
    >
      <thead>
        <tr style={{ background: "#f2f2f2" }}>
          <th style={{ padding: "8px", textAlign: "left" }}>User</th>
          <th style={{ padding: "8px", textAlign: "left" }}>Message</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((m, index) => (
          <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "8px" }}>{m.sender}</td>
            <td style={{ padding: "8px" }}>{m.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
