const backgroundColor = props.theme.mode === "dark" ? "#d1d5db80" : "#40425280";
return (
  <div style={{ padding: 6, backgroundColor, width: "fit-content" }}>
    <p
      style={{
        color: props.theme.mode === "dark" ? "white" : "black",
        fontWeight: "600",
        marginBottom: 0,
      }}
    >
      MINT
    </p>
  </div>
);
