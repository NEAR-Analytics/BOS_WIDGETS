return (
  <button
    style={{ background: "#f00", borderColor: "#f00" }}
    onClick={() => props.onClick()}
  >
    {props.label}
  </button>
);
