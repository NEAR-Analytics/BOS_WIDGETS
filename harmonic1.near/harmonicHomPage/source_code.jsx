//import React from "react";

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "90vh", // Full viewport height
  backgroundColor: "#fff", // White background
};

const heroStyles = {
  fontSize: "4em",
  textAlign: "center",
  color: "#000", // Black color
};

const blueTextStyles = {
  color: "#4472c4", // Blue color
};

const paragraphStyles = {
  fontSize: "2em",
  textAlign: "center",
  color: "#000", // Black color
  marginTop: "20px",
};

const paragraphStyles2 = {
  fontSize: "1em",
  textAlign: "center",
  color: "#000", // Black color
  marginTop: "20px",
};

//const App = () => {
return (
  <div>
    <div style={containerStyles}>
      <h1 style={heroStyles}>
        <span>Welcome to </span>
        <span style={blueTextStyles}>Harmonic Guild</span>
        <span>Gateway</span>
      </h1>
      <p style={paragraphStyles}>Check our latest fully onchain Apps below.</p>
    </div>
    <div style={containerStyles}>
      <div className="mb-5" style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Widget src="harmonic1.near/widget/MusicPlayer-Harmonic" />
        </div>
        <div style={{ flex: 1, paddingLeft: "4rem", padding: "2rem" }}>
          <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
            Fair pay for free music
          </p>
          <p style={{ fontSize: "1.5rem" }}>
            Experience a truly decentralized music player fully onchain. Our
            mission is to bring transparency to streaming and revolutionize
            payments for musicians. With Harmonic Guild, we are returning
            ownership to music, ensuring that artists are fairly compensated for
            their creations.
          </p>
        </div>
      </div>
    </div>
    <div style={containerStyles}>
      <div className="" style={{ display: "flex" }}>
        <div style={{ flex: 1, paddingLeft: "4rem", padding: "2rem" }}>
          <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
            Introducing Minter
          </p>
          <p style={{ fontSize: "1.5rem" }}>
            Our minting sets the stage for future advancements, including the
            exploration of encryption. As we continue to innovate, we are
            actively working on integrating encryption technology to enhance the
            security and privacy of your music. Stay tuned for upcoming updates
            as we strive to bring cutting-edge encryption features to our
            platform. Together, let's unlock the potential of encrypted music.
          </p>
          <p>
            Contact us at hello@harmonicguild.io to get a trial account to use
            our Minter for free. No passphrase, no crypto needed.
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <Widget src="harmonic1.near/widget/NFTMinter" />
        </div>
      </div>
    </div>
  </div>
);
//};

//export default App;
