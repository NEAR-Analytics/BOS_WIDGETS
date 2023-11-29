const contract = "guest-book.near";
const total_messages = Near.view(contract, "totalMessages", {});
const messages = Near.view(contract, "getMessages", {
  from_index: total - 10,
}).reverse();
const Button = styled.button`
  font-size: 1em;
  margin: 10px 2px 0px;
  padding: 0.25em 1em;
  border: 2px solid;
  color: rgb(66, 135, 137);
  border-radius: 20px;
  font-weight: 600;
  position: relative;
  transition: 0.3s all;
  &:hover ${Button} {
    color: #153763;
  }
`;

const H3 = styled.h3`
  color: rgb(66, 135, 137);
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const H2 = styled.h2`
  color: #153763;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

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
    <H2 class="text-center">Libro de Visitas (BOS + NEAR)</H2>
    <br />
    {context.accountId ? (
      <div class="border border-black p-3">
        <H3>Nuevo Mensaje</H3>
        <div class="row">
          <div>
            <input
              placeholder="Message"
              onChange={(e) => State.update({ newMessage: e.target.value })}
            />
          </div>
        </div>
        <Button
          class="btn btn-primary mt-2"
          onClick={async () => {
            addNewMessage();
          }}
        >
          Guardar
        </Button>
      </div>
    ) : (
      <p class="text-center py-2">
        Debes iniciar sesión para guardar un mensaje
      </p>
    )}
    <br />

    <div class="border border-black p-3">
      <H3>Listado de Mensajes</H3>
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
