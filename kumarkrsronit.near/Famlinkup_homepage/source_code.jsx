const styles = {
  bannerImage: {
    width: "100%",
    height: "auto",
    margin: "0",
    padding: "0",
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
