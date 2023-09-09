const accountId = context.accountId;

const commonStyles = {
  width: "100%",
  height: "100vh",
  background: "#415697",
  display: "flex",
  flexDirection: "column",
  fontFamily: '"Press Start 2P", sans-serif',
  alignItems: "center",
  justifyContent: "center",
};

if (!accountId) {
  return (
    <div style={commonStyles}>
      <img
        src="https://ipfs.near.social/ipfs/bafkreid25lsb6p73u3zpb7et23qc66fe63knsi22xneuzo3of4m4dnjqgu"
        alt="coinTAG"
        style={{
          height: "200px",
          width: "200px",
          marginBottom: "20px",
        }}
      />
      <h2 style={{ fontSize: "14px", color: "white" }}>
        VOCE NAO ESTA LOGADO.
      </h2>
      <h3 style={{ fontSize: "12px", color: "white", textAlign: "center" }}>
        CONECTE COM SUA CARTEIRA NEAR
      </h3>{" "}
      <h3 style={{ fontSize: "12px", color: "white", textAlign: "center" }}>
        SE VC NAO TEM CLIQUE
      </h3>
      <a
        href="https://shard.dog/humansofbrazil"
        style={{
          fontSize: "14px",
          color: "white",
          margin: "20px 10px",
          textDecoration: "underline",
        }}
      >
        AQUI
      </a>
      <img
        src="https://ipfs.near.social/ipfs/bafkreiex77ly3hboiiyile6j2v3cjwhuaang2r4lqagdbld6fyvnzm4u6i"
        alt="QR Code"
        style={{
          width: "200px",
          height: "AUTO",
          marginTop: "20px",
        }}
      />
    </div>
  );
}

return (
  <div style={commonStyles}>
    <img
      src="https://ipfs.near.social/ipfs/bafkreid25lsb6p73u3zpb7et23qc66fe63knsi22xneuzo3of4m4dnjqgu"
      alt="coinTAG"
      style={{
        height: "200px",
        width: "200px",
        marginBottom: "20px",
      }}
    />
    <h2 style={{ fontSize: "14px", color: "white" }}>Bem Vindo {accountId}!</h2>
    <Widget
      src="mob.near/widget/ProfileImage"
      props={{
        profile,
        fast,
        accountId,
        style: { width: "8rem", height: "8rem", marginRight: "10px" },
        className: "mb-2",
        imageClassName: "rounded-square w-100 h-100 img-thumbnail d-block",
        thumbnail: false,
      }}
    />{" "}
    <p style={{ color: "white" }}> VOCE ESTA LOGADO </p>
  </div>
);
