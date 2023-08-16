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
    <div style={cardStyle} className="m-4 text-center">
      <div style={containerStyles}>
        <div className="mb-5" style={{ display: "flex" }}>
          <div style={{ flex: 1, paddingLeft: "4rem", padding: "2rem" }}>
            <p style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
              Connect with Your Community
            </p>
            <p style={{ fontSize: "1.25rem" }}>
              With our landing page product, you can create your own personal
              corner on the decentralized web. Host information and updates that
              you fully own without any intermediaries. With our platform, you
              can take full control over your content, enjoy fair and
              transparent compensation, and connect directly with your fans.
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <Widget src="harmonic1.near/widget/create.artist" />
          </div>
        </div>
      </div>
      <h3 style={titleStyle}>Join our Network of Artists</h3>
      <div>
        <Widget src="harmonic1.near/widget/artist.feed" />
      </div>
    </div>

    <div style={footerStyle} className="m-2 text-center">
      Built by <span style={{ color: "#4472c4" }}>Harmonic</span> with Love.
    </div>
  </>
);
