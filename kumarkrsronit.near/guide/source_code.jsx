const styles = {
  bannerImage: {
    width: "30%",
    height: "auto",
    margin: "0",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  justifyContent: "left",
  alignItems: "left",
  backgroundColor: "#90EE90",
};

const paragraph = {
  fontSize: "30px",
  color: "black",
  textAlign: "left",
  margin: "20px 0",
  marginLeft: "10px",
};

function Banner() {
  return (
    <div className="banner-container" style={containerStyle}>
      <h1>
        {" "}
        Welcome to our site we will let you know about all the near wallet
        options available and where can you stake your near tokens to earn the
        rewards{" "}
      </h1>
      <img
        src="https://i.ibb.co/hK6XCMJ/61a88f6b006c1e7b4f8d8afd-Meta-Image-1200x631.png"
        alt="61a88f6b006c1e7b4f8d8afd-Meta-Image-1200x631"
        height
        style={styles.bannerImage}
      />
      <br />
      <h1> What is staking??? </h1>
      <h3>
        {" "}
        Staking in cryptocurrency refers to the process of participating in the
        proof-of-stake (PoS) consensus mechanism of a blockchain network by
        holding and locking up a certain amount of cryptocurrency to support the
        network's operations and secure transactions.
      </h3>
      <br />
      <h1> Wallets to load your fund for staking them </h1>
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
