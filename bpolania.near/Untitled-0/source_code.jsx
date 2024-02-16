const name = props.name || "Boris";
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
