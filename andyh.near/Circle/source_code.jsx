const diameterPx = `${props.radius * 2}px`;
return (
  <div
    style={{
      width: diameterPx,
      height: diameterPx,
      borderRadius: "100%",
      backgroundColor: props.color,
      textAlign: "center",
    }}
  >
    <i
      className={`bi-${props.icon}`}
      onClick={props.onClick}
      style={{
        color: props.iconColor,
        position: "relative",
        top: "calc(50% - 16px)",
      }}
    />
  </div>
);
