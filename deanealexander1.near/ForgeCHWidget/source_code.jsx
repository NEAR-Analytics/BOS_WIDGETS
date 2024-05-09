const name = props.name || "you forged an item";
const [Forging, setForge] = useState(1);

return (
  <div>
    <p>
      {" "}
      {count} cheers for {name}!{" "}
    </p>
    <button onClick={() => setForge(Forging + 1)}>Forge!</button>
  </div>
);
