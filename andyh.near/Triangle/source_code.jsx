return (
  <div
    style={{
      width: 0,
      height: 0,
      borderLeft: `${props.height / 2}px solid transparent`,
      borderRight: `${props.height / 2}px solid transparent`,
      borderBottom: `${props.height}px solid ${props.color}`,
      textAlign: "center",
    }}
  >
    <i
      className={`bi-${props.icon}`}
      style={{
        color: props.iconColor,
        position: "relative",
        top: "calc(50% - 16px)",
      }}
    />
  </div>
);
