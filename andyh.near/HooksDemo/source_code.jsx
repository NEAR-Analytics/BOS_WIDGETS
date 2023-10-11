const [value, setValue] = useState(0);
const [text, setText] = useState("");
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
    <span>{isInit.toString()}</span>
    <span>{value.toString()}</span>
    <button className="btn" onClick={() => setValue(value + 1)}>
      Increment Value
    </button>
    <br />
    <h2>{text}</h2>
    <input type="text" onChange={(e) => setText(e.target.value)} />

    <div className="input-group mb-3">
      <label className="input-group-text" htmlFor="inputGroupSelect0">
        Message
      </label>
      <input
        type="text"
        className="form-control"
        placeholder=""
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
        <option value="100">100</option>
        <option value="500">500</option>
        <option value="1000">1000</option>
      </select>
    </div>
  </>
);
