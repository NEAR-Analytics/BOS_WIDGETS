const styles = {
  bannerImage: {
    width: "17%",
    height: "auto",
    margin: "0",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    display: "inline-block",
    width: "12%",
    margin: "10px 20px",
    padding: "10px",
    background: "white",
    color: "orange",
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

const paragraph1 = {
  fontSize: "60px",
  color: "	#8B4000",
  textAlign: "center",
  margin: "20px 0",
  marginLeft: "10px",
};

function Banner() {
  return (
    <div className="banner-container" style={containerStyle}>
      <p style={paragraph1}> Stake NearHub </p>
      <h1>
        {" "}
        Welcome to our site we will let you know about all the near wallet
        options available and where can you stake your near tokens to earn the
        rewards 💲💲💲{" "}
      </h1>
      <br />
      <h1> What is staking??? 🤔 </h1>
      <h3>
        {" "}
        Staking in cryptocurrency refers to the process of participating in the
        proof-of-stake (PoS) consensus mechanism of a blockchain network by
        holding and locking up a certain amount of cryptocurrency to support the
        network's operations and secure transactions.
      </h3>
      <br />
      <h1> Wallets to load your fund for staking them.. </h1>
      <div style={containerStyle}>
        <h3>
          {" "}
          🥳🥳 Well you can get a free name wallet powered by near india and
          shardog 🥳🥳{" "}
        </h3>
        <img
          src="https://i.ibb.co/YNw7Ckv/photo-2022-06-15-12-02-28.jpg"
          alt="photo-2022-06-15-12-02-28"
          style={styles.bannerImage}
        />
        <a
          href="https://shard.dog/nearindia"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.button}
        >
          Click Here
        </a>

        <h1> Other ways to get onboard on near 💲💲 </h1>
        <img
          src="https://i.ibb.co/FD35G5v/G31y-DGOS-400x400.jpg"
          alt="mYNEARWALLET"
          style={styles.bannerImage}
        />
        <a
          href="https://app.mynearwallet.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.button}
        >
          MynearWallet
        </a>
      </div>
      <img
        src="https://i.ibb.co/XJ9BykJ/Screenshot-2024-01-29-181133.png"
        alt="Screenshot-2024-01-29-181133"
        style={styles.bannerImage}
      />
      <a
        href="https://www.herewallet.app/"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.button}
      >
        Here Wallet
      </a>
      &nbsp;
      <img
        src="https://i.ibb.co/Svq8r9L/download-1.png"
        alt="download-1"
        style={styles.bannerImage}
      />
      <a
        href="https://senderwallet.io/"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.button}
      >
        Sender
      </a>
      &nbsp;
      <img
        src="https://i.ibb.co/HhxqfYk/download-2.jpg"
        alt="download-2"
        style={styles.bannerImage}
      />
      <a
        href="https://wallet.meteorwallet.app/wallet"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.button}
      >
        Meteorwallet
      </a>
      <h1>
        {" "}
        Now lets see where you can stake those near you loaded in your desired
        wallet....{" "}
      </h1>
      <img
        src="https://i.ibb.co/FD35G5v/G31y-DGOS-400x400.jpg"
        alt="mYNEARWALLET"
        style={styles.bannerImage}
      />
      <a
        href="https://app.mynearwallet.com/staking"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.button}
      >
        MynearWallet
      </a>
      <img
        src="https://i.ibb.co/7ktmhMj/download-2.png"
        alt="mYNEARWALLET"
        style={styles.bannerImage}
      />
      <a
        href="https://www.metapool.app/stake?token=ethereum"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.button}
      >
        Metapool
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
