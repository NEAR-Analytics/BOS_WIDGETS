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
    <h1 className="text-danger">Libro de Visitas (BOS + NEAR)</h1>
    <input
      onChange={(e) => State.update({ newMessage: e.target.value })}
      placeholder="Mensaje"
    />
    <button
      onClick={() => {
        nuevoMensaje();
      }}
    >
      Guardar
    </button>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Usuario</th>
          <th scope="col">Mensaje</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((m) => {
          return (
            <tr>
              <th scope="col">{m.sender}</th>
              <th scope="col">{m.text}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
