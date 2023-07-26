const cardStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column", // To align children vertically
  minHeight: "80vh", // Set the minimum height to take the full screen height
  // Rest of your styles...
};

const titleStyle = {
  fontSize: "2.25rem",
  fontWeight: "bold",
  marginBottom: "1.5rem",
};

const footerStyle = {
  fontSize: "1.25rem",
  fontWeight: "medium",
  marginBottom: "1.5rem",
};

const subTitleStyle = {
  fontSize: "1.25rem",
  marginBottom: "2rem",
};

const linkStyle = {
  backgroundColor: "#4472c4",
  color: "#fff",
  paddingTop: "0.75rem",
  paddingBottom: "0.75rem",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  borderRadius: "0.5rem",
  fontSize: "1.25rem",
  fontWeight: "600",
  textDecoration: "none",
};

const hoverLinkStyle = {
  backgroundColor: "#3b62a8",
};

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "90vh", // Full viewport height
  backgroundColor: "#fff", // White background
};

return (
  <>
    <div
      style={cardStyle}
      className="text-black flex items-center justify-center h-[80vh]"
    >
      <div className="container mx-auto px-4 text-center">
        <h1
          style={titleStyle}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
        >
          Fair <span style={{ color: "#4472c4" }}>Pay</span> for Your Music
        </h1>
        <div
          style={subTitleStyle}
          className="text-lg sm:text-xl md:text-2xl mb-8"
        >
          Convert concert goers into online fans.
          <p>
            Connect with your fanbase on your own terms. Showcase your music,
            your way.
          </p>
        </div>
        <a
          href="/#/harmonic1.near/widget/create.artist"
          style={linkStyle}
          className="hover:bg-blue-600"
        >
          Sign up
        </a>
      </div>
    </div>
    <div style={cardStyle} className="m-4 text-center">
      <h3 style={titleStyle}>Join our Network of Artists</h3>
      <div>
        <Widget src="harmonic1.near/widget/artist.feed" />
      </div>
    </div>
    <div style={containerStyles}>
      <div className="mb-5" style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Widget src="harmonic1.near/widget/MusicPlayer-Harmonic" />
        </div>
        <div style={{ flex: 1, paddingLeft: "4rem", padding: "2rem" }}>
          <p style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
            Decentralised Distribution of Music
          </p>
          <p style={{ fontSize: "1.25rem" }}>
            Experience a truly decentralized music player fully onchain. Our
            mission is to bring transparency to streaming and revolutionize
            payments for musicians. With Harmonic Guild, we are returning
            ownership to music, ensuring that artists are fairly compensated for
            their creations.
          </p>
        </div>
      </div>
    </div>
    <div style={footerStyle} className="m-2 text-center">
      Built by <span style={{ color: "#4472c4" }}>Harmonic</span> with Love.
    </div>
  </>
);
