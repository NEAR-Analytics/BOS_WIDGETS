const contract = "guest-book.near";
const total_messages = Near.view(contract, "totalMessages", {});
const messages = Near.view(contract, "getMessages", {
  from_index: total_messages - 10,
}).reverse();
console.log(messages);

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
  <div class="p-3">
    <h3 class="text-center">Libro de Visitas (BOS + NEAR)</h3>
    <br />
    {context.accountId ? (
      <div class="border border-info p-4">
        <h3 class="text-center">Nuevo Mensaje</h3>
        <div class="row">
          <div>
            <input
              placeholder="Escribe aquí tu mensaje"
              onChange={(e) => State.update({ newMessage: e.target.value })}
            />
          </div>
        </div>
        <button
          class="btn btn-info mt-2 orange"
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
    <div class="border border-info p-3">
      <h3 class="text-center"> Listado de Mensajes</h3>
      <table className="table table-sm">
        <thead>
          <tr class="p-3 mb-2 bg-primary text-white text-center">
            <th>Cuenta</th>
            <th>Mensaje</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((data, key) => {
            return (
              <tr class="text-center">
                <td>{data.sender}</td>
                <td>{data.text}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);
