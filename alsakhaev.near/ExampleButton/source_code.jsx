return (
  <button
    onClick={() => console.log(props.label)}
    style={{ backgroundColor: "#f00" }}
  >
    {props.label ?? "Default Label"}
  </button>
);
