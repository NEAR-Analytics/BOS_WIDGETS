// props.production = true;
// props.counterTrigger = 1;
// props.thingToLog = "my bird flies";
const production = props.production; // removes the returned JSX for better UX
State.init({
  // make this 0 unless you wanna start counting right away
  counterTrigger: undefined,
  // strings only for better compatibility with console log
  thingToLog: undefined,
});

if (props.counterTrigger !== state.counterTrigger) {
  State.update({ counterTrigger: props.counterTrigger });
}

if (props.thingToLog !== state.thingToLog) {
  State.update({ thingToLog: props.thingToLog });
}

function main(thingToLog, counterTrigger) {
  if (counterTrigger) {
    console.log(thingToLog);
  }
}

main(state.thingToLog, state.counterTrigger);

const missingProps = [];

!props.production && missingProps.push("production (boolean)");
!props.counterTrigger && missingProps.push("counterTrigger (number)");
!props.thingToLog && missingProps.push("thingToLog (string)");

if (missingProps.length) {
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
          There are {missingProps.length} missing prop(s):
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
