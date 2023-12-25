return (
  <button
    style={{
      border: "none",
      background: "none",
      margin: 0,
      padding: 2,
      cursor: "pointer",
    }}
    title={props.label}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      props.onClick();
    }}
  >
    <Widget src="dapplets.near/widget/Cat" />
  </button>
);
