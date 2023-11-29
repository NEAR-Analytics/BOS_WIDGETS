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

  Near.call(contract, "addMessage", {
    text: state.newMessage,
  });
};

return (
  <div class="p-3">
    <h3 class="text-center">Mi primera Practica (BOS + NEAR)</h3>
    <br />
    {context.accountId ? (
      <div class="border border-pink p-3">
        <h3>Ingresa un mensaje </h3>

        <div class="row">
          <div>
            <input
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
      <p class="text-center py-2">inicia sesión para guardar tu mensaje</p>
    )}
    <br />
    <div class="border border-pink p-3">
      <h3> Mensajes ingresados </h3>
      <table className="table table-sm">
        <thead>
          <tr class="p-3 mb-2 bg-primary text-pink text-center">
            <th>Usuario</th>
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
