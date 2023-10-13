const styles = {
  instruction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "752px",
  },
  instructionWrap: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "4rem 0",
  },
  header: {}, // Keep this, even if it's empty for now
  headerH2: {
    fontSize: "2.5rem",
    color: "#6C83EC",
  },
  content: {
    marginTop: "3rem",
    display: "flex",
    marginleft: "1rem",
  },
  contentHeader: {
    fontWeight: "700",
    color: "#6C83EC",
    textAlign: "center",
  },
  step: {
    maxWidth: "15rem",
    padding: "1.4rem 1rem",
    textAlign: "center",
    border: "1px solid #6C83EC",
    borderRadius: "10px",
  },
  stepH4: {
    fontWeight: "500",
    fontSize: "0.938rem",
  },
  stepH3: {
    fontWeight: "700",
    fontSize: "1.063rem",
    color: "#6C83EC",
    margin: "0.6rem 0",
  },
  stepP: {
    fontSize: "0.875rem",
    fontWeight: "300",
    padding: "0 0.4rem",
  },
};

return (
  <div style={styles.instructionWrap}>
    <div style={styles.header}>
      <h2 style={styles.headerH2}>HOW TO PLAY</h2>
    </div>
    <div style={styles.instruction}>
      <div style={styles.content}>
        <div style={styles.step}>
          <h4 style={styles.stepH4}>STEP 1</h4>
          <h3 style={styles.stepH3}>BUY TICKET</h3>
          <p style={styles.stepP}>
            Select the number on the board. Select the amount for each ticket.
          </p>
        </div>
      </div>
      <div style={styles.content}>
        <div style={styles.step}>
          <h4 style={styles.stepH4}>STEP 2</h4>
          <h3 style={styles.stepH3}>WAIT FOR THE DRAW</h3>
          <p style={styles.stepP}>The draw continously for every 10 minutes.</p>
        </div>
      </div>
      <div style={styles.content}>
        <div style={styles.step}>
          <h4 style={styles.stepH4}>STEP 3</h4>
          <h3 style={styles.stepH3}>CHECK FOR THE PRIZE</h3>
          <p style={styles.stepP}>
            Once the round's over, come back to the page and check to see if
            you've won!
          </p>
        </div>
      </div>
    </div>
  </div>
);
