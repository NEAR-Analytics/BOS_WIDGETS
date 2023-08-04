return (
  <div>
    <button onClick={() => console.log(props.label)}>
      {props.label ?? "Default Label"}
    </button>
  </div>
);
