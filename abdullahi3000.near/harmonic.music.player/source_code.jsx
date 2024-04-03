return (
  <>
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100%", backgroundColor: "#151718", color: "#fff" }}
    >
      <div className="container mt-5 mb-5">
        <div className="row">
          <div
            className="col d-flex flex-column justify-content-center align-items-center"
            style={{ padding: "2rem" }}
          >
            <p
              className="text-center"
              style={{ fontSize: "1.75rem", fontWeight: "bold" }}
            >
              Decentralised Music Streaming
            </p>
            <p className="text-left" style={{ fontSize: "1.25rem" }}>
              Experience a truly decentralized music player fully on-chain. Our
              mission is to bring transparency to streaming and revolutionize
              payments for musicians. With Harmonic Guild, we are returning
              ownership to music, ensuring that artists are fairly compensated
              for their creations.
            </p>
          </div>
        </div>
        <div className="col" style={{ color: "black" }}>
          <Widget src="abdullahi3000.near/widget/MusicPlayer-Harmonic" />
        </div>
      </div>
    </div>
  </>
);
