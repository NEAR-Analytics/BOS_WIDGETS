const c = `
const [warning, setWarning] = useState(true);
return <a
      onMouseEnter={(e) => {console.log(e);setWarning(false)}}
      onMouseLeave={() => setWarning(true)}
      style={{ color: warning ? "goldenrod" : "green" }}
    >
      Please hover over <br/> the container{" "}
    </a>`;

console.log(c);
const d = <Widget code={c} />;
console.log(d);
return d;
