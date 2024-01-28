const styles = {
  page: {
    backgroundImage:
      "url(https://i.ibb.co/FH5B8dg/Screenshot-2024-01-28-191432.png)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "95vh",
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
    padding: "20px",
  },
  rightContent: {
    flex: 0.5,
    color: "black",
    fontSize: "20px",
    padding: "50px",
    overflowY: "auto",
  },
  button: {
    display: "inline-block",
    width: "120px",
    margin: "10px 20px",
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
            FamLinkUp is a platform where people of different intersts can come
            together and share their feeling with each other. They can connect ,
            text , post their thoughts and join the irl events.
          </p>
          <br />
          <br />
          <p>Explore us:</p>
          <a
            href="https://socialbook-abhay2131.onrender.com/mainsite"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.button}
          >
            web2 site
          </a>
          &nbsp;&nbsp;
          <a
            href="https://twitter.com/kumarkrsronit"
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
