return (
  <div style={{ padding: 2, border: "1px solid #f00" }}>
    <Widget
      src="dapplets.near/widget/Button"
      props={{
        onClick: () => props.onClick(),
        label: props.label,
      }}
    />
  </div>
);
