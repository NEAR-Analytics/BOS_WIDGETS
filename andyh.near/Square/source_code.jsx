const lengthPx = `${props.length}px`;
return (
  <div
    style={{
      width: lengthPx,
      height: lengthPx,
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
