const containerStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#151718",
  color: "#fff",
};

return (
  <>
    <div style={containerStyles}>
      <div className="mb-5" style={{ display: "flex" }}>
        <div style={{ flex: 1, paddingLeft: "4rem", padding: "2rem" }}>
          <p style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
            Connect with Your Community
          </p>
          <p style={{ fontSize: "1.25rem" }}>
            With our landing page product, you can create your own personal
            corner on the decentralized web. Host information and updates that
            you fully own without any intermediaries. With our platform, you can
            take full control over your content, enjoy fair and transparent
            compensation, and connect directly with your fans.
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <Widget src="abdullahi3000.near/widget/create.artist" />
        </div>
      </div>
    </div>
  </>
);
