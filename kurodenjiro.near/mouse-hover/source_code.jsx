const c = `
const [warning, setWarning] = useState(true);
return <h1
      onMouseEnter={() => setWarning(false)}
      onMouseLeave={() => setWarning(true)}
      style={{ color: warning ? "goldenrod" : "green" }}
    >
      Please hover over the container{" "}
    </h1>`;

console.log(a);

return <Widget code={c} />;
