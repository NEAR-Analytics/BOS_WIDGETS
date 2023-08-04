return (
  <div>
    <button
      onClick={() => console.log(props.label)}
      style={{ backgroundColor: "#0f0" }}
    >
      {props.label ?? "Default Label"}
    </button>
    <button
      onClick={() => console.log(props.label)}
      style={{ backgroundColor: "#f00" }}
    >
      {props.label ?? "Default Label"}
    </button>
    <button
      onClick={() => console.log(props.label)}
      style={{ backgroundColor: "#00f" }}
    >
      {props.label ?? "Default Label"}
    </button>
  </div>
);
