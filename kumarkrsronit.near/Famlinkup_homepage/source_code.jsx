const styles = {
  bannerImage: {
    width: "100%",
    height: "auto",
    margin: "0",
    padding: "0",
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

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
};

const paragraph = {
  fontSize: "20px",
  color: "black",
  textAlign: "left",
  margin: "20px 0",
  marginLeft: "10px",
};

function Banner() {
  return (
    <div className="banner-container" style={containerStyle}>
      <img
        src="https://i.ibb.co/Hnpy4S4/Screenshot-2024-01-28-184447.png"
        alt="FamLinkUp"
        style={styles.bannerImage}
      />
      <p style={paragraph}>
        Lets connect with family and friends in real environment..
        <br />
        <br />
        FamLinkUp is a platform where people of different intersts can come
        together and share their feeling with each other. They can connect ,
        text , post their thoughts and join the irl events.
      </p>
      <br /> <br />
      <p>Explore our web2 site till we are shifting it to near.org :</p>
      <a
        href="https://socialbook-abhay2131.onrender.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.button}
      >
        FamLinkUp
      </a>
      &nbsp;&nbsp;
      <a
        href="https://socialbook-abhay2131.onrender.com/mainsite"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.button}
      >
        Mainsite
      </a>
      &nbsp;&nbsp;
      <a
        href="https://github.com/abhay2131/socialbook"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.button}
      >
        Github
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
      <p style={paragraph}>You can tip me on - kumarkrsronit.near</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Banner />
    </div>
  );
}

return <App />;
