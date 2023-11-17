const [inputValue, setInputValue] = useState("");
const [count, setCount] = useState([]);
const [toggle, setToggle] = useState(false);

// Let's assume this is a costly computation
const expensiveComputation = (input) => {
  setCount((prev) => [...prev, "Running expensive computation!"]);
  // Some time-consuming logic...
  return input.toUpperCase();
};

// // Memoize the result of the expensive computation
const memoizedResult = useMemo(() => {
  return expensiveComputation(inputValue);
}, [inputValue]);

// Call the expensive computation directly in the render
// const resultWithoutMemo = expensiveComputation(inputValue);

const handleInputChange = (event) => {
  setInputValue(event.target.value);
};

return (
  <div>
    <label>
      Type something:
      <input type="text" value={inputValue} onChange={handleInputChange} />
    </label>
    <p>Transform to Uppercase: {memoizedResult}</p>
    <button onClick={() => setToggle(!toggle)}>
      Toggle - {toggle.toString()}
    </button>
    <div style={{ display: "flex", flexDirection: "column" }}>
      {count.map((message, index) => (
        <span key={index}>{message}</span>
      ))}
    </div>
  </div>
);
