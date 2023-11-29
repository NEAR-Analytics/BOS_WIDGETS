const contract = "guest-book.near";
const total_messages = Near.view(contract, "totalMessages", {});
const messages = Near.view(contract, "getMessages", {
  from_index: total - 10,
}).reverse();
console.log(messages);

State.init({
  newMessage: "",
});

const addNewMessage = () => {
  if (state.newMessage.trim() == "") {
    return;
  }

  Near.call(contract, "add_message", {
    text: state.newMessage,
  });
};

return (
  <div class="p-3">
    <h3 class="text-center">Libro de Visitas</h3>
    <br />
    {context.accountId ? (
      <div class="border border-black p-3 text-center">
        <h3>Este texto se mueve de derecha a izquierda</h3>
        <div class="row">
          <div>
            <input
              placeholder="Ingresa tu mensaje aqui"
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
        <button
          type="button"
          class="btn btn-dark mt-2"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Listado de Mensajes
        </button>
      </div>
    ) : (
      <p class="text-center py-2">
        Debes iniciar sesión para guardar un mensaje
      </p>
    )}
    <br />
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Listado de Mensajes
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="border border-black p-4">
              <h3>Listado de Mensajes</h3>
              <table className="table table-sm">
                <thead>
                  <tr class="table-primary text-center">
                    <th>Cuenta</th>
                    <th>Mensaje</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((data, key) => {
                    return (
                      <tr class="text-center table-info">
                        <td>{data.sender}</td>
                        <td>{data.text}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
