const name = props.name || "Maria";
const [count, setCount] = useState(1);

return (
  <div>
    <p>
      {" "}
      {count} aplausos para {name}!{" "}
    </p>
    <button onClick={() => setCount(count + 1)}>Aplaudir!</button>
  </div>
);
