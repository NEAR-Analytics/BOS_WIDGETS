const containerStyle = {
  background: "#415697",
  height: "100px",
  display: "flex", // Use o flex para alinhar itens na mesma linha
  alignItems: "center", // Centraliza verticalmente
  justifyContent: "space-between",
};

const logo = {
  width: "100px",
  marginRight: "10px", // Adicione uma margem à direita do logotipo
};

const listItemStyle = {
  fontSize: "30px",
  color: "white",
  marginRight: "30px",
};

const secondDivStyle = {
  background: "#415670",
  height: "300px",
  display: "flex", // Use o flex para alinhar itens na mesma linha
  alignItems: "center", // Centraliza verticalmente
  justifyContent: "space-between",
};

return (
  <>
    <div style={containerStyle}>
      <img
        style={logo}
        src="https://ipfs.near.social/ipfs/bafkreid25lsb6p73u3zpb7et23qc66fe63knsi22xneuzo3of4m4dnjqgu"
      />
      <p style={listItemStyle}>Login</p>
    </div>
    <div style={secondDivStyle}>
      <p>a</p>
    </div>
  </>
);
