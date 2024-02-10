const Guestbook = (props) => {
  const [accountId, setAccountId] = useState(
    props.accountId || context.accountId
  );
  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState([]);
  const contractId = "guestbook.workshopcamp.near";

  useEffect(() => {
    getMessages();
  }, []); // Run only once on component mount

  const getMessages = () => {
    const messages = Near.view(contractId, "get_messages", null);
    setMessages(messages);
  };

  const postMessage = () => {
    if (!accountId) return;

    if (status === "") return;

    Near.call(contractId, "add_message", {
      text: status,
    });

    getMessages();
    setStatus(""); // Clear the status after posting the message
  };

  return (
    <div>
      <div className="hero min-h-screen bg-primary">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-base-content">
              BOS workshop
            </h1>
            <p className="mb-4 text-base-content">
              Welcome to the GuestBook, add your message for everyone to see!
            </p>
            <p className="mb-4 text-base-content">
              You are logged in as <b>{accountId}</b>
            </p>
            <div className="my-2">
              <textarea
                placeholder="Your status"
                className="textarea textarea-bordered textarea-lg w-full max-w-xs"
                value={status}
                onChange={({ target: { value } }) => setStatus(value)}
              ></textarea>
            </div>
            <button className="btn btn-primary mb-4" onClick={postMessage}>
              Add a message
            </button>

            <div className="my-4">
              {messages.map((status, index) => (
                <div key={index} className="card bg-base-100 shadow-xl mb-4">
                  <div className="card-body">
                    <h2 className="card-title text-base-content">
                      {status.text}
                    </h2>
                    <p className="text-left text-base-content">
                      {status.sender}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
