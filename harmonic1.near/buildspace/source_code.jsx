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
              Simple Profiles to connect with your audience
            </p>
            <p style={{ fontSize: "1.25rem" }}>
              Create your own personal corner on the decentralised web. Host
              information and updates for your audience. Save yourself from
              platform risk and censorship powered by Blockchain technology.
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <Widget
              src="every.near/widget/every.thing.view"
              props={{ path: "qsaharmonic.near/thing/artist/Quinn" }}
            />
          </div>
        </div>
      </div>
      <div style={containerStyles}>
        <div className="mb-5" style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <Widget src="harmonic1.near/widget/create.artist" />
          </div>
          <div style={{ flex: 1, paddingLeft: "4rem", padding: "2rem" }}>
            <p style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
              Create your Profile
            </p>
            <p style={{ fontSize: "1.25rem" }}>
              Go ahead and create your Profile that no one but you control.
              Without the fear of intermediaries platforms, share information
              with your audeince on your own terms.
            </p>
          </div>
        </div>
      </div>
      <h3 style={titleStyle}>Featured Profiles</h3>
      <div>
        <Widget src="harmonic1.near/widget/artist.feed" />
      </div>
    </div>

    <div style={footerStyle} className="m-2 text-center">
      Built by <span style={{ color: "#4472c4" }}>Harmonic</span> with Love.
    </div>
  </>
);
