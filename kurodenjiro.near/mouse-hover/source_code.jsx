const [warning, setWarning] = useState(true);
return (
  <div
    className="container"
    onMouseEnter={() => setWarning(false)}
    onMouseLeave={() => setWarning(true)}
  >
    <h1 style={{ color: warning ? "goldenrod" : "green" }}>
      Please hover over the container{" "}
    </h1>
  </div>
);
