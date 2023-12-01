// Contrato Inteligente a utilizar
const contract = "bookstorebos.near";

// Métodos de consulta para obtener el listado de eventos
const books = Near.view(contract, "all_books", {});
const booksbuy = context.accountId
  ? Near.view(contract, "books_for_owner", {
      account_id: context.accountId,
    })
  : [];

// Inicialización del objeto de estado con propiedades
State.init({
  title: "",
  description: "",
  author: "",
  year: "",
  price: "",
  stock: "",
});

// Método para agregar un evento
const createBook = () => {
  if (state.organizator == "") {
    return console.log("El nombre del organizador no debe estar vacio");
  }
  if (state.issue == "") {
    return console.log("La descripcion del tema no debe estar vacio");
  }
  if (state.date == "") {
    return console.log("La fecha del evento no debe estar vacio");
  }
  if (state.time == "") {
    return console.log("La hora del evento no debe estar vacio");
  }
  if (state.link == "") {
    return console.log("El link del evento no debe estar vacio");
  }
  if (state.extras == "") {
    return console.log(
      "Agrega algun premio por participación, POAP o cualquier informacion adicional"
    );
  }

  Near.call(contract, "create_book", {
    title: state.title,
    description: state.description,
    author: state.author,
    year: state.year,
    price: state.price,
    stock: state.stock,
  });
};

// Método para comprar un libro
const buyBook = (book_id, price) => {
  const amount = price * 1000000000000000000000;
  Near.call(
    contract,
    "buy_book",
    {
      book_id: book_id,
    },
    300000000000000,
    amount
  );
};

// Renderizado de la UI
return (
  <>
    <div class="container border border-info p-3">
      <h3 class="text-center">Eventos de Comunidades Criptos en LATAM</h3>
      <br />
      {context.accountId ? (
        <div class="border border-black p-3">
          <h3>Ingresa tu Evento</h3>
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <input
                  placeholder="Organizador"
                  onChange={(e) => State.update({ title: e.target.value })}
                />
              </div>
              <div class="col-sm">
                <input
                  placeholder="Tema"
                  onChange={(e) =>
                    State.update({ description: e.target.value })
                  }
                />
              </div>
              <div class="col-sm">
                <input
                  placeholder="Fecha"
                  onChange={(e) => State.update({ author: e.target.value })}
                />
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-sm">
                <input
                  placeholder="Hora"
                  onChange={(e) => State.update({ year: e.target.value })}
                />
              </div>
              <div class="col-sm">
                <input
                  placeholder="Link"
                  onChange={(e) => State.update({ price: e.target.value })}
                />
              </div>
              <div class="col-sm">
                <input
                  placeholder="Extras"
                  onChange={(e) => State.update({ stock: e.target.value })}
                />
              </div>
            </div>
            <br />
            <button
              class="btn btn-primary mt-2"
              onClick={async () => {
                createBook();
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      ) : (
        <p class="text-center py-2">
          Debes iniciar sesión para ingresar eventos
        </p>
      )}
      <br />
      <div class="border border-black p-3">
        <h3>Próximos Eventos:</h3>
        <table className="table table-hover table-sm">
          <thead>
            <tr class="p-3 mb-2 bg-primary bg-gradient text-white rounded-5 text-center">
              <th>Organizador</th>
              <th>Tema</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th></th>
              <th>Link</th>
              <th>Extras</th>
            </tr>
          </thead>
          <tbody>
            {books.map((data, key) => {
              return (
                <>
                  <tr class="text-center">
                    <td>{data.title}</td>
                    <td>{data.author}</td>
                    <td>{data.stock}</td>
                    <td>{data.price}</td>
                    <td>
                      {context.accountId ? (
                        <button
                          class="btn btn-primary"
                          onClick={async () => {
                            buyBook(data.book_id, data.price);
                          }}
                        >
                          Asistiré
                        </button>
                      ) : (
                        <span></span>
                      )}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />
      {context.accountId ? (
        <div class="border border-black p-3">
          <h3>Eventos a los que asistiré</h3>
          <table className="table table-hover table-sm">
            <thead>
              <tr class="p-3 mb-2 bg-primary bg-gradient text-white rounded-5 text-center">
                <th>Organizador</th>
                <th>Tema</th>
              </tr>
            </thead>
            <tbody>
              {booksbuy.map((data, key) => {
                return (
                  <>
                    <tr class="text-center">
                      <td>{data.title}</td>
                      <td>{data.author}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  </>
);
