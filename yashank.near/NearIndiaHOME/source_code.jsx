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
  backgroundColor: "#0D0115",
};

const paragraph = {
  fontSize: "20px",
  color: "white",
  textAlign: "left",
  margin: "20px 0",
  marginLeft: "10px",
};

function Banner() {
  return (
    <div className="banner-container" style={containerStyle}>
      <img
        src="https://i.ibb.co/sFwQKv8/Screenshot-2023-12-03-011312.png"
        alt="Banner"
        style={styles.bannerImage}
      />
      <p style={paragraph}>
        A community of Indian builders and entrepreneurs building on Near
        Protocol <br />
        <br />
        Near Protocol is a high-performance layer 1 blockchain that is designed
        to be scalable, secure, and user-friendly. Near India is a community of
        Indian builders and entrepreneurs who are building on Near Protocol to
        create the next generation of decentralized applications and services.
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
