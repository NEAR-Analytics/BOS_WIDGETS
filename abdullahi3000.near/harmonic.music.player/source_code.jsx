const containerStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#151718",
  color: "#fff",
};

const innerContainerStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const paragraphStyles = {
  fontSize: "1.25rem",
};

return (
  <>
    <div style={containerStyles}>
      <div className="mt-5 mb-5" style={innerContainerStyles}>
        <div style={{ flex: 1, padding: "2rem" }}>
          <p style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
            Decentralised Music Streaming
          </p>
          <p style={paragraphStyles}>
            Experience a truly decentralized music player fully on-chain. Our
            mission is to bring transparency to streaming and revolutionize
            payments for musicians. With Harmonic Guild, we are returning
            ownership to music, ensuring that artists are fairly compensated for
            their creations.
          </p>
        </div>
        <div style={{ flex: 1, color: "BLACK" }}>
          <Widget src="harmonic1.near/widget/MusicPlayer-Harmonic" />
        </div>
      </div>
    </div>
  </>
);
