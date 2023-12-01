// CSS

const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 8px;

`;
const Nav = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;
  font-weight: 500;

  a{
    color: #000000;
    font-size: 16px
  }
`;

const Opciones = styled.div`
  text-align: center;

`;

// HEADER

const header = (
  <HeaderContainer>
    <h4 style={{ fontWeight: 700 }}>Confirma tu asistencia</h4>

    <Nav>
      <button
        class="btn btn-primary mt-2"
        onClick={async () => {
          defaultp();
        }}
      >
        Home
      </button>
    </Nav>
  </HeaderContainer>
);

// DATOS DE LOS EVENTOS

const defaultprops = {
  mostrar: false,
};

const posadaprops = {
  mostrar: true,
  image:
    "https://i5.walmartimages.com.mx/mg/gm/3pp/asr/c1de7025-b988-4fda-99e1-7218366c5ea2.56315d77c10b7d04f089e142606e9bc8.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
  name: "Posada Cripto",
  lugar: "Casa de Chucho",
  fecha: "20/12/2023",
  hora: "9:00 pm",
  mensaje: "De mensaje comenta que botana llevaras a la fiesta",
};

const fiestaprops = {
  mostrar: true,
  image:
    "https://weezevent.com/wp-content/uploads/2022/12/15122850/ano-nuevo-empresa-vf.jpg",
  name: "Fiesta fin de año",
  lugar: "Casino Bosques",
  fecha: "31/12/2023",
  hora: "7:00 pm",
  mensaje: "De mensaje comenta que bedida tomarás para organizar las mesas",
};

// SELECCIONAR EVENTO QUE MOSTRAR

State.init({
  props: defaultprops,
});

function posada() {
  State.update({ props: posadaprops });
}

function fiesta() {
  State.update({ props: fiestaprops });
}

function defaultp() {
  State.update({ props: defaultprops });
}

//CONEXIÓN AL CONTRATO

const contract = "guest-book.near";
const messages = Near.view(contract, "getMessages", {}).reverse();
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

// RETURN

return (
  <div class="p-3">
    <div>
      {header}
      <Widget
        src="352e049bdf43c27e9ff26f6bf3e94772f9e4067445fc11f4351b12ad3bdaae4b/widget/DatosEvento2"
        props={state.props}
      />
    </div>

    {state.props.mostrar ? (
      <>
        {context.accountId ? (
          <div class="border border-black p-3">
            <h3>Nueva Confirmación</h3>
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
          <p class="text-center py-2">
            Debes iniciar sesión para confirmar tu asistencia
          </p>
        )}
        <br />
        <div class="border border-black p-3">
          <h3>Listado de Asistencias</h3>
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
      </>
    ) : (
      <>
        <Opciones>
          <button
            class="btn btn-primary mt-2"
            onClick={async () => {
              posada();
            }}
          >
            Posada
          </button>
          <button
            class="btn btn-primary mt-2"
            onClick={async () => {
              fiesta();
            }}
          >
            Fiesta fin de año
          </button>
        </Opciones>
      </>
    )}
  </div>
);