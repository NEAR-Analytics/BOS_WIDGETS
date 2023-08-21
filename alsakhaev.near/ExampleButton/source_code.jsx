return (
  <div>
    <button
      onClick={() => props.onClick(props.label)}
      style={{ backgroundColor: "#0f0" }}
    >
      {props.label ?? "Default Label"}
    </button>
    <iframe
      style={{ display: "none" }}
      srcDoc={props.iframe}
      message={{ exp: props.label || "" }}
      onMessage={(res1) => console.log("from iframe", res1)}
    />
  </div>
);
