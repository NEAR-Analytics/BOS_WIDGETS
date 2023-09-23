const diameterPx = `${props.radius * 2}px`;
return (
  <div
    style={{
      width: diameterPx,
      height: diameterPx,
      borderRadius: "100%",
      backgroundColor: props.color,
    }}
  >
    {props.children}
  </div>
);
