const amount = props.amount ?? "";
const receiver = props.receiver ?? "apprendedrop.near";
const showReceiver = props.showReceiver ?? true;
const showAmount = props.showAmount ?? true;

State.init({
  amount: amount,
  receiver: receiver,
  showReceiver: showReceiver,
  showAmount: showAmount,
});
const transferNEAR = () => {
  const oneTeraGas = 1000000000000;
  const oneNEARInYoctoNEAR = 1000000000000000000000000;
  // Let's transfer amount NEAR to frol.near
  Near.call(
    "transfer-near.near",
    "transfer_near",
    state.receiver,
    oneTeraGas,
    state.amount * oneNEARInYoctoNEAR
  );
};
const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};
const onChangeReceiver = (receiver) => {
  //   const validReceiverLink = isNearAddress(receiver); // add error message or change button based on this
  State.update({
    receiver,
    // validReceiver: validReceiverLink,
  });
};
// styled div
const Actions = styled.div`
  display: flex;
  gap: 6px;
`;
const FollowButtonWrapper = styled.div`
  width: 100%;
  div,
  button {
    width: 100%;
  }
  @media (max-width: 1200px) {
    width: auto;
    div,
    button {
      width: auto;
    }
  }
`;

const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 8px;
  background-color: #3333FF;
`;

const Logo = styled.img`
  height: 40px; /* Ajusta la altura de tu logo según sea necesario */
`;

const Header = () => {
  return (
    <HeaderContainer>
      {/* Otros elementos del encabezado */}
      <Logo
        src="https://pbs.twimg.com/profile_images/1714369486311067648/BOS8UR6t_400x400.jpg"
        alt="Logo de la aplicación"
      />
    </HeaderContainer>
  );
};

const Nav = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;
  font-weight: 500;

  a {
    color: #ffffff;
    font-size: 16px;
    text-decoration: none;
    padding: 8px;
    cursor: pointer;

    &:hover {
      border: 0px solid #3333FF; /* Borde sólido de 2px */
      padding: 6px; /* Ajusta el relleno para mantener el tamaño del cuadrado */
      background-color: #0500FF; /* Relleno azul al pasar el ratón */
      color: #EBFF00; /* Cambio de color al pasar el ratón */
    }
  }
`;

const SectionContainer = styled.div`
  padding: 20px;
`;

const header = (
  <HeaderContainer>
    <h4 style={{ color: "#FFFF" }}>Apprende Drop</h4>

    <Nav>
      <a href="#" onClick={() => handleNavigation("device-status")}>
        Clases
      </a>
      <a href="#" onClick={() => handleNavigation("home")}>
        Donar
      </a>
    </Nav>
  </HeaderContainer>
);

const smallImageStyle = {
  maxHeight: 200,
  width: "90%",
  objectFit: "cover",
  margin: "auto",
};

const homePageContent = (
  <SectionContainer>
    <div>
      {content}
      <h3>
        <img
          style={smallImageStyle}
          src="https://pbs.twimg.com/media/F81fROwWYAAq7Ay?format=jpg&name=large"
          alt="SNMP Devices"
        />
        <h4>Esta es la plataforma que queremos construir </h4>
        <p> </p>
        <h2 style={{ color: "#3333FF" }}>¿Te gustó la clase?</h2>
        <p> </p>
        <h2 style={{ color: "#3333FF" }}> DONA AQUÍ:</h2>
      </h3>
      <p> </p>

      {/* Agrega más detalles según la información que desees mostrar */}
    </div>

    <div>
      {state.showAmount && (
        <div className=" mb-2">
          Introduce aqui la cantidad de Near que deseas donar:
          <input
            type="number"
            placeholder={state.amount}
            onChange={(e) => onChangeAmount(e.target.value)}
          />
        </div>
      )}
      {state.showReceiver && <div className="mb-2"></div>}
      <button className="join-button" onClick={transferNEAR}>
        Donar {state.amount} NEAR para {state.receiver}
      </button>
    </div>
  </SectionContainer>
);

const snmpSection = (
  <SectionContainer>
    <h2>Hacktahon web 3</h2>

    <div></div>

    <iframe
      title="vimeo-player"
      src="https://player.vimeo.com/video/882363594?h=99a9e4fab3"
      width="2000"
      height="450"
      frameborder="0"
      allowfullscreen
    ></iframe>

    <h3> ¿Que es un Hackathon web 3?</h3>
    <div>
      <p>
        Un hackathon web3 es un evento en el que los participantes, generalmente
        programadores, desarrolladores y diseñadores, se reúnen para colaborar
        en proyectos relacionados con tecnologías web3. La expresión "web3" se
        refiere a la próxima evolución de la web, que incluye conceptos como
        descentralización, blockchain y criptomonedas. En un hackathon web3, los
        participantes tienen la oportunidad de trabajar en proyectos que
        utilizan tecnologías emergentes como blockchain, contratos inteligentes,
        descentralización y aplicaciones descentralizadas (dApps). Estos eventos
        suelen durar un período específico de tiempo, que puede ser de unos
        pocos días a una semana, durante los cuales los participantes trabajan
        intensivamente en el desarrollo de sus proyectos. Los hackathones web3
        pueden abordar una variedad de temas, como finanzas descentralizadas
        (DeFi), juegos blockchain, identidad digital, cadenas de suministro,
        entre otros. Además de la competencia, los participantes tienen la
        oportunidad de aprender de expertos en la industria, colaborar con otros
        desarrolladores y, en algunos casos, ganar premios y reconocimiento por
        sus proyectos. Estos eventos son una excelente manera para los
        desarrolladores de sumergirse en las tecnologías web3, aprender nuevas
        habilidades y contribuir al crecimiento y la innovación en el espacio
        blockchain y descentralizado.
      </p>

      <h3>Estructura general</h3>
      <p>
        <ul>
          <li>
            <strong>Tiempos de entrega de proyectos:</strong> NEAR utilizes
            sharding for improved scalability.
          </li>
          <li>
            <strong>Pitch:</strong> NEAR focuses on making DApp development more
            accessible.
          </li>
          <li>
            <strong>Jurado:</strong> NEAR aims for cost-effective and fast smart
            contract execution.
          </li>
          <li>
            <strong>Premio:</strong> NEAR allows unique usernames for
            user-friendly interactions.
          </li>
        </ul>
      </p>

      <h3>Recomendaciones para tu primer hackathon web 3</h3>
      <p>
        <ul>
          <li>
            <strong>Illia Polosukhin:</strong> Co-founder of NEAR Protocol.
          </li>
          <li>
            <strong>Alex Skidanov:</strong> Co-founder of NEAR Protocol.
          </li>
        </ul>
      </p>
      {/* Agrega más ejemplos según sea necesario */}
    </div>
  </SectionContainer>
);

// Resto del código...

// Función para manejar la navegación
const handleNavigation = (section) => {
  if (section === "home") {
    // Muestra la página de inicio
    setPageContent(homePageContent);
  } else {
    // Muestra otras secciones según sea necesario
    setPageContent(snmpSection); // Puedes cambiar esto según la sección actual
  }
};

// Estado para almacenar el contenido de la página actual
const [pageContent, setPageContent] = useState(snmpSection);

// Resto del código...

return (
  <div>
    {header}
    {pageContent}
    {/* ... Otro contenido de la página ... */}
  </div>
);
