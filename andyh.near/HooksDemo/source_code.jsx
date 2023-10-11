const [value, setValue] = useState(0);
const [message, setMessage] = useState("");
const [isInit, setIsInit] = useState(false);
// const [value, setValue] = [4, console.log];
// const textRef = useRef(null);

useEffect(() => {
  console.log({ isInit });
  if (!isInit) {
    setTimeout(() => setValue(500), 5000);
    setIsInit(true);
  }
}, [isInit]);

// useEffect(() => {
//   console.log({ textRef: textRef.current });
//   textRef.current?.focus();
// }, [textRef.current]);

return (
  <>
    <h3>Send a message to the Future</h3>

    <div className="input-group mb-3">
      <label className="input-group-text" htmlFor="inputGroupSelect0">
        Message
      </label>
      <input
        type="text"
        className="form-control"
        placeholder=""
        onChange={(e) => setMessage(e.target.value)}
        aria-label="Example text with button addon"
        aria-describedby="button-addon1"
      />
    </div>

    <div className="input-group mb-3">
      <label className="input-group-text" htmlFor="inputGroupSelect01">
        Delay
      </label>
      <select className="form-select" id="inputGroupSelect01">
        <option value="0">Instant</option>
        <option value="100">0.1 seconds</option>
        <option value="500">0.5 seconds</option>
        <option value="1000">1 second</option>
      </select>
    </div>
    <div class="d-grid gap-2">
      <button class="btn btn-primary" type="button">
        Send Message
      </button>
    </div>
  </>
);
