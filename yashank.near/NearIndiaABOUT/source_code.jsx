const styles = {
  page: {
    backgroundImage:
      "url(https://i.ibb.co/KsDkB06/Screenshot-2023-12-03-010713.png)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    fontSize: "60px",
    fontWeight: "bold",
    textAlign: "left",
    color: "#FF7722",
    padding: "20px",
  },
  about: {
    fontSize: "40px",
    padding: "10px",
    color: "#FF7722",
  },
  content: {
    display: "flex",
    height: "90%",
  },
  rightContent: {
    flex: 0.5,
    color: "white",
    fontSize: "20px",
    padding: "50px",
    overflowY: "auto",
  },
  button: {
    display: "inline-block",
    width: "120px",
    margin: "10px 10px",
    padding: "10px",
    background: "#FF7722",
    color: "white",
    fontWeight: "bold",
    textDecoration: "none",
    borderRadius: "5px",
    textAlign: "center",
  },
};

function App() {
  return (
    <div className="App" style={styles.page}>
      <div style={styles.header}>About Us</div>
      <div style={styles.content}>
        <div style={styles.rightContent}>
          <p>
            Near India is a community of NEAR Protocol enthusiasts, developers,
            and entrepreneurs dedicated to fostering the growth and adoption of
            NEAR Protocol in India. We believe that NEAR Protocol has the
            potential to revolutionize industries and empower individuals, and
            we are committed to building a thriving ecosystem around the
            technology in India.
          </p>
          <br />
          <br />
          <p>Connect with us:</p>
          <a
            href="https://t.me/nearindia"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.button}
          >
            Telegram
          </a>
          &nbsp;&nbsp;
          <a
            href="https://twitter.com/nearindia"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.button}
          >
            Twitter
          </a>
        </div>
      </div>
    </div>
  );
}

return <App />;
