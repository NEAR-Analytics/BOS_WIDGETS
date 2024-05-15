const name = props.name || "Maria";
const [count, setCount] = useState(1);

return (
  <div>
    <div style={{ paddingLeft: "20px" }}>
      <p>
        {" "}
        {count} aplausos para {name}!{" "}
      </p>
    </div>
    <button onClick={() => setCount(count + 1)}>Aplaudir!</button>
  </div>
);
