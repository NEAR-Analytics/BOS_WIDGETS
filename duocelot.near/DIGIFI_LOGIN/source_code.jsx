const accountId = context.accountId;

if (!accountId) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundSize: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '"Press Start 2P", sans-serif',
      }}
    >
      <div
        style={{
          background: "#415697",
          height: "262px",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://ipfs.near.social/ipfs/bafkreid25lsb6p73u3zpb7et23qc66fe63knsi22xneuzo3of4m4dnjqgu"
          alt="ERROR 001"
          style={{
            maxHeight: "200px",
            maxWidth: "200px",
          }}
        />
      </div>
      <h2 style={{ fontSize: "14px", color: "black" }}>
        VOCE NAO ESTA LOGADO.
      </h2>
      <h3 style={{ fontSize: "12px", color: "black" }}>
        ENTRE COM SUA CARTEIRA NEAR. SE VC NAO TEM CLIQUE
      </h3>
      <a
        href="https://shard.dog/humansofbrazil"
        style={{ fontSize: "14px", color: "black" }}
      >
        AQUI
      </a>
      {/* Placeholder for QR Code */}
      <div style={{ marginTop: "20px" }}>
        <img
          src="YOUR_QR_CODE_IMAGE_URL"
          alt="QR Code"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
    </div>
  );
}

return (
  <div>
    <p> VOCE ESTA LOGADO</p>
  </div>
);
