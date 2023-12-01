//********** */
//*******JAVASCRIPT SECTION */
//********** */

//definimos la variable de la elección del usuario,
// la elección de Computadora BOS y el resultado final del juego.
let eleccionUsuario;
let eleccionComputadora;
let resultado;

//funcion en la que el usuario elige Piedra como  opción de Ataque
const setPiedra = () => {
  eleccionUsuario = "piedra";
  console.log("Inicia Juego Nuevo");
  console.log("Elegiste Piedra");
};

//funcion en la que el usuario elige Papel como opción de  Ataque
const setPapel = () => {
  eleccionUsuario = "papel";
  console.log("Inicia Juego Nuevo");
  console.log("Elegiste Papel");
};

//funcion en la que el usuario elige Tijera como opción de Ataque
const setTijeras = () => {
  eleccionUsuario = "tijera";
  console.log("Inicia Juego Nuevo");
  console.log("Elegiste Tijera");
};

//funcion inicializar Juego

const jugar = () => {
  //Opciones opciones que puede elegir la maquina
  const opciones = ["piedra", "papel", "tijera"];

  //Mediante un random se obtiene la elección  de la computadora y se hace console.log
  eleccionComputadora = opciones[Math.floor(Math.random() * 3)];
  console.log(`La máquina eligió: ${eleccionComputadora}`);

  //Lógica para elegir al ganador y se hace consol log del resultado
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

//********** */
//*******CSS SECTION */
//********** */

//Contenedor General
const Wrapper = styled.div`
  --section-gap: 42px;
  padding-top: 52px;
   color: black;
   background: lightblue;
`;

//Contenedor del Header
const ContainerHeader = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: var(--section-gap);
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;
  color: blue;
`;

//Definir container de los titulos
const ContainerMain = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;
 
`;

//Definier container de botones
const ContainerAtack = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;
`;

//ContainerAreaJugar
const ContainerBotonesAtaque = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

//ContainerAreaJugar
const ContainerJugar = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 5px;

`;

//Container Footer
const Footer = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 5px;

`;

//********** */
//*******HTML SECTION */
//********** */
return (
  <Wrapper>
    <ContainerHeader>
      <h1>Cold Winter</h1>
    </ContainerHeader>
    <ContainerMain>
      <h2>Juega Piedra, Papel, o Tijera!!!! :D</h2>
      <h2> vs</h2>
      <h2>BlockChainOperationSystem</h2>
      <img
        class="rounded w-50 h-50"
        style={{ objectFit: "cover" }}
        src={`https://copper-ready-guanaco-464.mypinata.cloud/ipfs/QmXiVAB5DUPAdaT32kRfYbjPCAKJeaD6N9DUMVgGGy32En?_gl=1*y13oot*_ga*MTM1ODQ0MTgxMi4xNjk2NzkyMjEz*_ga_5RMPXG14TE*MTcwMTQ1OTUwMC4zOS4wLjE3MDE0NTk5MzYuNjAuMC4w`}
        alt="image view"
      />
      <h3>1) Abre tu consola:</h3>
      <h5> Click Derecho en navegador e inspeccionar</h5>
    </ContainerMain>
    <ContainerAtack>
      <h3> 2) Elige tu Ataque:</h3>
      <ContainerBotonesAtaque>
        <button onClick={setPiedra}>Piedra</button>
        <button onClick={setPapel}>Papel</button>
        <button onClick={setTijeras}>Tijera</button>
      </ContainerBotonesAtaque>
    </ContainerAtack>
    <ContainerJugar>
      <h3> 3) Da click en Jugar:</h3>
      <button onClick={jugar}>Jugar</button>
    </ContainerJugar>
    <Footer>
      <h4>Ayudanos a Seguir Desarrollando el juego.</h4>
      <h4>
        {" "}
        Haz Donaciones a la siguiente dirección NEAR:
        6131245a0c886f96bd516d3f4adc5b61a7dcb683f10e2a6eedb7dbf3c246f7a7{" "}
      </h4>
    </Footer>
  </Wrapper>
);
