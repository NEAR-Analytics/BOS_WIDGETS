return (
  <button
    style={{
      border: "none",
      background: "none",
      margin: 0,
      padding: 2,
      cursor: "pointer",
    }}
    onClick={() => props.onClick()}
  >
    <Widget src="dapplets.near/widget/Cat" />
  </button>
);
