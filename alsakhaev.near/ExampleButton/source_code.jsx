return (
  <button
    style={{ backgroundColor: "#0f0" }}
    onClick={() => props.onClick(props.label)}
  >
    {props.label ?? "Default Label"}
  </button>
);
