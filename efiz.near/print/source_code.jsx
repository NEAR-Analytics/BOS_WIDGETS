return (
  <textarea
    value={JSON.stringify(props, undefined, 2)}
    style={props.style ?? { width: "100%", height: "100%" }}
  />
);
