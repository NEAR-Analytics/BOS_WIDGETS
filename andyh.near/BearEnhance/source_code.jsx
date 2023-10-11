const [message, setMessage] = useState("");
const [sentMessages, setSentMessages] = useState([]);
const [step, setStep] = useState(0);
const [height, setHeight] = useState(100);
const [width, setWidth] = useState(100);

const DIMENSIONAL_INCREMENT = 25;

useEffect(() => {
  (async () => {
    const res = await fetch("https://api.api-ninjas.com/v1/facts?limit=1");
    console.log(res);
  })();
}, [step]);

return (
  <>
    <h3>Send a message to the Future</h3>

    <div className="mb-3">
      <ul>
        {sentMessages.map((msg) => (
          <li key={msg}>{msg}</li>
        ))}
      </ul>
    </div>
    <div className="input-group mb-3">
      <label className="input-group-text" htmlFor="inputGroupSelect0">
        Message
      </label>
      <input
        type="text"
        className="form-control"
        placeholder=""
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        aria-label="Example text with button addon"
        aria-describedby="button-addon1"
      />
    </div>

    <div className="input-group mb-3">
      <label className="input-group-text" htmlFor="inputGroupSelect01">
        Delay
      </label>
      <select
        className="form-select"
        id="inputGroupSelect01"
        onChange={(e) => setDelay(e.target.value)}
      >
        <option value="0">Instant</option>
        <option value="100">0.1 seconds</option>
        <option value="500">0.5 seconds</option>
        <option value="1000">1 second</option>
      </select>
    </div>
    <div className="d-grid gap-2">
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => {
          const updatedMessages = [...sentMessages];
          updatedMessages.push(message);
          setTimeout(() => setSentMessages(updatedMessages), delay);
          setMessage("");
        }}
      >
        Send Message
      </button>
    </div>
  </>
);
