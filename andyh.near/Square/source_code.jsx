const lengthPx = `${props.length}px`;
return (
  <div
    style={{
      width: lengthPx,
      height: lengthPx,
      backgroundColor: props.color,
    }}
  >
    {props.children}
  </div>
);
