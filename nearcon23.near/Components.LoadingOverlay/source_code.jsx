return (
  <div
    style={{
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",

      height: "max(100vh, 700px)",
      backgroundColor: "rgba(0,0,0,.05)",
      backdropFilter: "blur(4px)",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      class="spinner-border"
      style={{ color: "rgb(0, 236, 151)" }}
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
);
