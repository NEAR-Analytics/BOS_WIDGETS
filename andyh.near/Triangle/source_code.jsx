return (
  <div
    style={{
      width: 0,
      height: 0,
      borderLeft: `${props.height / 2}px solid transparent`,
      borderRight: `${props.height / 2}px solid transparent`,
      borderBottom: `${props.height}px solid ${props.color}`,
    }}
  >
    <i className={`bi-${props.icon}`} style={{ color: props.iconColor }} />
  </div>
);
