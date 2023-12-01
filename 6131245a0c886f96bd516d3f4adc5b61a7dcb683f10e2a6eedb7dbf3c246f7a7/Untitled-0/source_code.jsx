let eleccionUsuario;

const setPiedra = () => {
  eleccionUsuario = "piedra";
  console.log("Inicia Juego Nuevo");
  console.log("Elegiste Piedra");
};
const setPapel = () => {
  eleccionUsuario = "papel";
  console.log("Inicia Juego Nuevo");
  console.log("Elegiste Papel");
};
const setTijeras = () => {
  eleccionUsuario = "tijera";
  console.log("Inicia Juego Nuevo");
  console.log("Elegiste Tijera");
};

let resultado;
let eleccionComputadora;

const jugar = () => {
  const opciones = ["piedra", "papel", "tijera"];
  eleccionComputadora = opciones[Math.floor(Math.random() * 3)];
  console.log(`La máquina eligió: ${eleccionComputadora}`);
  if (eleccionUsuario === eleccionComputadora) {
    resultado = "Empate";
  } else if (
    (eleccionUsuario === "piedra" && eleccionComputadora === "tijera") ||
    (eleccionUsuario === "papel" && eleccionComputadora === "piedra") ||
    (eleccionUsuario === "tijera" && eleccionComputadora === "papel")
  ) {
    resultado = "¡Ganaste!";
  } else {
    resultado = "Perdiste";
  }
  console.log(resultado);
};

const juego = "Piedra, Papel, y Tijera!!!!   :D";

const Wrapper = styled.div`
  --section-gap: 42px;
  padding-top: 52px;
`;

//Definir container de los titulos
const Container1 = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;
  color: blue;
`;

//Definier container de botones
const Container2 = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;
`;

//Definier container de botones
const Container3 = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 5px;
`;

return (
  <Wrapper>
    <Container1>
      <h1>{juego}</h1>
      <img
        class="rounded w-100 h-100"
        style={{ objectFit: "cover" }}
        src={`https://copper-ready-guanaco-464.mypinata.cloud/ipfs/QmXiVAB5DUPAdaT32kRfYbjPCAKJeaD6N9DUMVgGGy32En?_gl=1*y13oot*_ga*MTM1ODQ0MTgxMi4xNjk2NzkyMjEz*_ga_5RMPXG14TE*MTcwMTQ1OTUwMC4zOS4wLjE3MDE0NTk5MzYuNjAuMC4w`}
        alt="image view"
      />
      <h3>1 )Abre tu consola</h3>
      <h3> 2) Selecciona tu ataque</h3>
      <h3> 3) Da click en Jugar</h3>
    </Container1>
    <Container2>
      <button onClick={setPiedra}>Piedra</button>
      <button onClick={setPapel}>Papel</button>
      <button onClick={setTijeras}>Tijera</button>
    </Container2>
    <Container3>
      <button onClick={jugar}>Jugar</button>
    </Container3>
  </Wrapper>
);
