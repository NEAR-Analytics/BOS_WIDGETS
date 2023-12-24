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
  <div class="p-3 bg-dark">
    <h3 class="text-center fw-light text-white">
      Libro de Visitas (BOS + NEAR)
    </h3>
    <br />
    {context.accountId ? (
      <div class="border border-white p-3 rounded-3">
        <h3 class="text-center text-white">Nuevo Mensaje</h3>
        <div class="row">
          <div>
            <input
              placeholder="Message"
              onChange={(e) => State.update({ newMessage: e.target.value })}
            />
          </div>
        </div>
        <div class="align-items-center">
          <button
            class="btn btn-success mt-2"
            onClick={async () => {
              addNewMessage();
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    ) : (
      <p class="text-center py-2">
        Debes iniciar sesión para guardar un mensaje
      </p>
    )}
    <br />
    <div class="border border-white p-3 rounded-3">
      <h3 class="text-center text-white">Listado de Mensajes</h3>
      <table className="table table-bordered table-dark table-sm rounded-3">
        <thead>
          <tr class="p-3 mb-2 bg-primary text-white text-center">
            <th>Cuenta</th>
            <th>Mensaje</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((data, key) => {
            return (
              <div>
                <tr class="text-center">
                  <td>{data.sender}</td>
                  <td>{data.text}</td>
                </tr>
              </div>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);
