const contract = "guest-book.near";

const [messages, setMessages] = useState([]);
const [newMessage, setNewMessages] = useState("");
const [newDeposit, setNewDeposit] = useState(0);

useEffect(() => {
  const data = Near.view(contract, "getMessages", {}).reverse();
  console.log(data);
  setMessages(data);
}, []);

const addNewMessage = () => {
  if (newMessage.trim() == "") {
    return;
  }

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
