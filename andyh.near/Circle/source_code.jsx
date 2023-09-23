const diameterPx = `${props.radius * 2}px`;
return (
  <div
    style={{
      width: diameterPx,
      height: diameterPx,
      borderRadius: "100%",
      backgroundColor: props.color,
      verticalAlign: "center",
      position: "relative",
      top: "calc(50% - 16px)",
    }}
  >
    <i className={`bi-${props.icon}`} style={{ color: props.iconColor }} />
  </div>
);
