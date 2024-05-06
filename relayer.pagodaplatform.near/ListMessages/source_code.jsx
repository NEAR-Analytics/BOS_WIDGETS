const contract = "guest-book.near";
const total_messages = Near.view(contract, "total_messages", {});
const messages = Near.view(contract, "get_messages", {
  from_index: total - 10,
}).reverse();

State.init({
  newMessage: "",
  errorMessage: "",
});

const addNewMessage = () => {
  if (state.newMessage.trim() === "") {
    State.update({ errorMessage: "El mensaje no puede estar vacío" });
    return;
  }

  Near.call(contract, "add_message", {
    text: state.newMessage,
  });
  State.update({ errorMessage: "" });
};

return (
  <div class="p-3 bg-black bg-gradient text-white rounded-5">
    <h3 class="text-center ">Customized By C€S4R</h3>
    <br />
    {context.accountId ? (
      <>
        <div
          class="nav nav-tabs nav-pills nav-fill"
          id="nav-tab"
          role="tablist"
        >
          <button
            class="nav-link active"
            id="nav-message-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-message"
            type="button"
            role="tab"
            aria-controls="nav-message"
            aria-selected="true"
          >
            Agregar
          </button>
          <button
            class="nav-link"
            id="nav-list-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-contact"
            type="button"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Listado
          </button>
        </div>
        <div class="tab-content " id="nav-tabContent">
          <div
            class="tab-pane fade show active"
            id="nav-message"
            role="tabpanel"
            aria-labelledby="nav-message-tab"
          >
            <div class="container p-3 ">
              <div class="row">
                <div class="col">
                  <div class="text-center">
                    <h3>Nuevo Mensaje</h3>
                    <br />
                    <div style={{ width: "100%", margin: "0 auto" }}>
                      <input
                        placeholder="Escribe un mensaje"
                        style={{ width: "50%", display: "inline-block" }}
                        onChange={(e) =>
                          State.update({ newMessage: e.target.value })
                        }
                      />
                    </div>
                    <br />
                    <button
                      class="btn btn-primary mt-2 "
                      style={{ width: "50%", height: "50px" }}
                      onClick={async () => {
                        addNewMessage();
                      }}
                    >
                      Guardar
                    </button>
                    <br />
                    <br />
                    {state.errorMessage && (
                      <p class="text-danger text-center">
                        {state.errorMessage}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="tab-pane fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
          >
            <div class="p-4 ">
              <h3>Listado de Mensajes</h3>
              <table
                className="table table-dark table-striped table-hover"
                style={{ width: "100%" }}
              >
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
        </div>
      </>
    ) : (
      <p class="text-center py-2">
        Debes iniciar sesión para guardar un mensaje
      </p>
    )}
    <br />
  </div>
);
