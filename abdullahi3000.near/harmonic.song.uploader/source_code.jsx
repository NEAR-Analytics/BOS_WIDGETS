return (
  <div
    className="d-flex flex-column justify-content-center align-items-center text-white"
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#151718",
      padding: "2rem",
    }}
  >
    <div className="mb-5 p-2">
      <h2 className="fs-3 fw-bold mb-3 text-center">Upload Your First Song</h2>
      <p className="fs-5">
        We're excited to have you onboard, whether you're a budding artist
        seeking to make your mark or a seasoned pro looking to diversify your
        distribution platforms. Unleashing your musical creativity and sharing
        your work with the world has never been more empowering or accessible.
      </p>
      <div className="mt-4" style={{ flex: 1, color: "BLACK" }}>
        <Widget src="harmonic1.near/widget/MusicUpload" />
      </div>
    </div>
  </div>
);
