const accountId = context.accountId;

if (!accountId) {
  return (
    <div
      style={{
        width: "512px",
        height: "512px",
        backgroundSize: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        fontFamily: '"Press Start 2P", sans-serif',
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="https://bafybeiep6yscx365ici64ce2o7ktr3vewuyk7rwj4kxpwrf4ugeloxgfri.ipfs.w3s.link/error-001.jpg"
        alt="ERROR 001"
        style={{
          width: "340px",
          margin: "50px 40px 10px 80px",
        }}
      />
      <h2
        style={{
          fontFamily: "Press Start 2P",
          fontSize: "14px",
          color: "black",
        }}
      >
        VOCE NAO ESTA LOGADO.
      </h2>
      <h3
        style={{
          fontFamily: "Press Start 2P",
          fontSize: "12px",
          color: "black",
        }}
      >
        ENTRE COM SUA CARTEIRA NEAR. SE VC NAO TEM CLIQUE
      </h3>
      <a
        href="https://shard.dog/humansofbrazil"
        style={{
          fontFamily: "Press Start 2P",
          fontSize: "14px",
          color: "black",
          margin: "40px 10px 10px 10px",
        }}
      >
        AQUI
      </a>
    </div>
  );
}

return (
  <div
    style={{
      width: "512px",
      height: "512px",
      backgroundSize: "100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      fontFamily: '"Press Start 2P", sans-serif',
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <img
      src="https://ipfs.near.social/ipfs/bafkreid25lsb6p73u3zpb7et23qc66fe63knsi22xneuzo3of4m4dnjqgu"
      alt="coinTAG"
      style={{
        height: "200px",
        width: "200px",
        marginBottom: "20px",
      }}
    />
    <h2
      style={{ fontFamily: "Press Start 2P", fontSize: "14px", color: "black" }}
    >
      Bem Vindo!
    </h2>
    <p> VOCE ESTA LOGADO </p>
  </div>
);
