const Wrapper = styled.div`
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 100%;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  margin: auto;
  width: 100%;
  text-align: center;
  padding: 2px 16px;
}

.details{
    margin-top: 40px;
}
`;

return (
  <Wrapper>
    <div className="card container">
      <a
        href="https://keypom.xyz/claim/v2.keypom.near#5FxjxU7GxU3wqYMDeoTta5gXcds5J2ruA4oPvf7Pn1adYSGaajaTHmEGhGqdU3e3NmmPJ8oDJPsbE53ZPVXgFxJm"
        onClick={handleLightbox}
      >
        <div className="details">
          <h1>WOAPS - Life events stored on chain</h1>
          <h2>Inmutable Proof of Achievements - Collectibles</h2>
          <br />
        </div>
        <div>
          <img
            style={{ borderRadius: 30, width: "550px", height: "550px" }}
            src="https://cloudflare-ipfs.com/ipfs/bafybeieqeh3pcbsnj7wabm6uqfglht5lyzh7djki2uxd77tb75g6dr5rbi"
            alt="Rustacean Builder Evolution"
            width="auto"
            height="auto"
          />

          <h3 style={{ marginTop: 30 }}>Rustaceans Buidlers</h3>
          <p style={{ marginBottom: 40 }}>
            Note: Keypom link drop updated periodically, claimed if you identify
            with built on Rust
          </p>
        </div>
      </a>
    </div>
  </Wrapper>
);
