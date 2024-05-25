const styles = {
  component1Container: {
    width: "100%",
    display: "flex",
    overflow: "auto",
    minHeight: "100vh",
    alignItems: "center",
    flexDirection: "column",
  },
  component1Component1: {
    width: "667px",
    height: "172px",
    display: "flex",
    position: "relative",
    alignItems: "flex-start",
    flexShrink: 1,
    backgroundColor: "rgba(0, 70, 42, 1)",
  },
  component1Text: {
    top: "109px",
    left: "195px",
    color: "rgba(255, 255, 255, 1)",
    width: "432px",
    height: "auto",
    position: "absolute",
    fontSize: "30px",
    fontStyle: "italic",
    textAlign: "left",
    fontFamily: "Inter",
    fontWeight: 300,
    lineHeight: "normal",
    fontStretch: "normal",
    textDecoration: "none",
  },
  component1Text2: {
    top: "40px",
    left: "47px",
    color: "rgba(255, 255, 255, 1)",
    width: "364px",
    height: "auto",
    position: "absolute",
    fontSize: "48px",
    fontStyle: "italic",
    textAlign: "left",
    fontFamily: "Inter",
    fontWeight: 900,
    lineHeight: "normal",
    fontStretch: "normal",
    textDecoration: "none",
  },
};

return (
  <div style={styles.component1Container}>
    <div style={styles.component1Component1}>
      <span style={styles.component1Text}>
        <span>Where We Lead the Industry</span>
      </span>
      <span style={styles.component1Text2}>
        <span>EWHA-CHAIN💚</span>
      </span>
    </div>
  </div>
);
