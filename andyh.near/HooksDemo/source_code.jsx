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

    <div class="input-group mb-3">
      <label class="input-group-text" for="inputGroupSelect01">
        Options
      </label>
      <select class="form-select" id="inputGroupSelect01">
        <option selected>Choose...</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
  </>
);
