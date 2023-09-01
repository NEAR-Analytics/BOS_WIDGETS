const missingProps = [];

// @ts-ignore
if (!props.pool) missingProps.push("example (type)");
// @ts-ignore
// @ts-ignore
if (!props.name) missingProps.push("name (string)");
// @ts-ignore


function MissingPropsWarning({ missingProps }) {
  return (
    <div
      className="card border-warning mb-3 shadow"
      style={{ maxWidth: "30rem", margin: "auto" }}
    >
      <div className="card-header text-white bg-warning">
        <h4 className="card-title mb-0">Attention!</h4>
      </div>
      <div className="card-body text-danger">
        <p className="card-text">
          There {missingProps.length === 1 ? "is" : "are"} {missingProps.length}{" "}
          missing prop{missingProps.length === 1 ? "" : "s"}:
        </p>
        <ul className="list-group list-group-flush">
          {missingProps.map((prop) => (
            <li key={prop} className="list-group-item">
              <pre className="m-0">{prop}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}






// @ts-ignore
return  <>
{missingProps.length && <MissingPropsWarning missingProps={missingProps} />}
</>
