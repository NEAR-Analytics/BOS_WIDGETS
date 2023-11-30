return (
  <div style={{ display: "flex" }}>
    <Widget
      src={"jibolaojo.near/widget/NFLogo"}
      componentProps={{ scale: 0.8 }}
    />

    <span
      style={{
        display: "inline-block",
        fontSize: "1.5rem",
        margin: "auto",
      }}
    >
      {context.accountId}
    </span>
    <Widget
      src={"jibolaojo.near/widget/NoNFLogo"}
      componentProps={{ scale: 0.8 }}
      style={{ visibility: "hidden" }}
    />
  </div>
);
