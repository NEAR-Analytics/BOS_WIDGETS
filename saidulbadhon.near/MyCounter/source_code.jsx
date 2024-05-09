const [counter, setCounter] = useState(0);

return (
  <div style={{ display: "flex", gap: 16 }}>
    <button onClick={() => setCounter((e) => (e -= 1))}>-</button>
    <h1>{counter}</h1>
    <button onClick={() => setCounter((e) => (e += 1))}>+</button>
  </div>
);
