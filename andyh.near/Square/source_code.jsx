const lengthPx = `${props.length}px`;
return (
  <div
    style={{
      width: lengthPx,
      height: lengthPx,
      backgroundColor: props.color,
    }}
  >
    <i className={`bi-${props.icon}`} style={{ color: props.iconColor }} />
  </div>
);
