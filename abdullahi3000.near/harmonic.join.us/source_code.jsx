return (
  <>
    <div
      className="d-flex flex-column justify-content-center align-items-center text-white"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#151718",
        padding: "2rem",
      }}
    >
      <div className="row w-100 mb-5">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-start ps-md-4 pe-md-4 pt-2 pb-2">
          <h2 className="fs-3 fw-bold mb-3">Connect with Your Community</h2>
          <p className="fs-5">
            With our landing page product, you can create your own personal
            corner on the decentralized web. Host information and updates that
            you fully own without any intermediaries. With our platform, you can
            take full control over your content, enjoy fair and transparent
            compensation, and connect directly with your fans.
          </p>
        </div>
        <div className="col-md-6" style={{ flex: 1, color: "BLACK" }}>
          <Widget src="abdullahi3000.near/widget/create.artist" />
        </div>
      </div>
    </div>
  </>
);
