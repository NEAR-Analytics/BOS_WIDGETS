const name = props.name || "Maria";
const [count, setCount] = useState(1);

return (
  <div>
    <p>
      {" "}
      {count} cheers for {name}!{" "}
    </p>
    <button onClick={() => setCount(count + 1)}>Cheers!</button>
  </div>
);
