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
    <div style={containerStyles}>
      <div className="mb-5" style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Widget src="harmonic1.near/widget/MusicPlayer-Harmonic" />
        </div>
        <div style={{ flex: 1, paddingLeft: "4rem", padding: "2rem" }}>
          <p style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
            Decentralised Music Streaming
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
    <div style={containerStyles}>
      <div className="mb-5" style={{ display: "flex" }}>
        <div style={{ flex: 1, paddingLeft: "4rem", padding: "2rem" }}>
          <p style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
            Upload Your First Song
          </p>
          <p style={{ fontSize: "1.25rem" }}>
            We're excited to have you onboard, whether you're a budding artist
            seeking to make your mark or a seasoned pro looking to diversify
            your distribution platforms. Unleashing your musical creativity and
            sharing your work with the world has never been more empowering or
            accessible.
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <Widget src="harmonic1.near/widget/MusicUpload" />
        </div>
      </div>
    </div>
  </>
);
