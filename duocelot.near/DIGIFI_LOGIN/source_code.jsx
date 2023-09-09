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
        position: "flex",
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
          position: "flex",
        }}
      />
      <h2
        style={{
          fontFamily: "Press Start 2P",
          fontSize: "14px",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        VOCE NAO ESTA LOGADO.{" "}
      </h2>{" "}
      <h3
        style={{
          fontFamily: "Press Start 2P",
          fontSize: "12px",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        ENTRE COM SUA CARTEIRA NEAR. SE VC NAOP TEM CLIQUE
      </h3>
      <a
        href="https://shard.dog/humansofbrazil"
        style={{
          fontFamily: "Press Start 2P",
          fontSize: "14px",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "40px 1opx 10px 10px",
        }}
      >
        AQUI
      </a>
    </div>
  );
}

return (
  <div>
    <p> VOCE ESTA LOGADO</p>
  </div>
);
