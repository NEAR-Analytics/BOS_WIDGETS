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
  <div
    style={{
      border: "1px solid black",
      borderRadius: "10px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <h1
      style={{
        color: "Black",
        fontSize: "36px",
        textAlign: "center",
        margin: "10px 0",
      }}
    >
      Libro Visitas
    </h1>

    <img
      style={{ width: "100px", margin: "10px 0" }}
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
      alt="Description"
    />
    <input
      onChange={(e) => State.update({ newMessage: e.target.value })}
      placeholder="Nuevo Mensaje"
    />
    <button
      onClick={() => {
        nuevoMensaje();
      }}
    >
      Guardar
    </button>
    <table className="table" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Cuenta</th>
          <th>Mensaje</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((m, index) => (
          <tr key={index}>
            <td>{m.sender}</td>
            <td>{m.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
