// Definición del nombre del contrato inteligente.
const contract = "guest-book.near";

// Declaración de los hooks de React para almacenar la información necesaria en el state del componente.
const [messages, setMessages] = useState([]);
const [newMessage, setNewMessages] = useState("");
const [newDeposit, setNewDeposit] = useState(0);

// Indicamos al componente que consulte la información del contrato después de renderizarse.
useEffect(() => {
  // Llamamos al método getMessages del contrato inteligente.
  const data = Near.view(contract, "getMessages", {}).reverse();
  // Asignamos la información obtenida del contrato a la propiedad messages del state.
  setMessages(data);
}, []);

// Función para agregar un nuevo mensaje al libro de visitas.
const addNewMessage = () => {
  // Se asegura de que el nuevo mensaje no esté vacío antes de agregarlo.
  if (newMessage.trim() == "") {
    return;
  }

  // Se llama al contrato para agregar un nuevo mensaje, junto con el texto y el depósito.
  Near.call(
    contract,
    "addMessage",
    {
      text: newMessage,
    },
    "30000000000000",
    newDeposit * 1e24
  );
};

return (
  <div class="p-3">
    <h3 class="text-center">Guest Book (BOS + NEAR)</h3>
    <br />
    {context.accountId ? (
      <div class="border border-black p-3">
        <h3>New Message</h3>
        <div class="row">
          <div class="col-sm">
            <input
              placeholder="Message"
              onChange={(e) => setNewMessages(e.target.value)}
            />
          </div>
          <div class="col-sm">
            <input
              type="number"
              min="0"
              placeholder="Deposit"
              onChange={(e) => setNewDeposit(e.target.value)}
            />
          </div>
        </div>
        <button
          class="btn btn-primary mt-2"
          onClick={async () => {
            addNewMessage();
          }}
        >
          Send Message
        </button>
      </div>
    ) : (
      <p class="text-center py-2">
        Debes iniciar sesión para guardar un mensaje
      </p>
    )}
    <br />
    <div class="border border-black p-3">
      <h3>List of Messages</h3>
      <table className="table table-sm">
        <thead>
          <tr class="p-3 mb-2 bg-primary text-white text-center">
            <th>Account</th>
            <th>Message</th>
            <th>Premium</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((data, key) => {
            return (
              <tr class="text-center">
                <td>{data.sender}</td>
                <td>{data.text}</td>
                <td>{data.premium ? "Yes" : "No"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);
