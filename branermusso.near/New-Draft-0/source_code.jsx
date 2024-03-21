const name = props.name || "Branermus";
const [count, setCount] = useState(1);

return (
  <div>
    <p>
      {" "}
      {count} cheers for {name}!{" "}
    </p>
    <button onClick={() => setCount(count + 100)}>Cheers!</button>
  </div>
);
