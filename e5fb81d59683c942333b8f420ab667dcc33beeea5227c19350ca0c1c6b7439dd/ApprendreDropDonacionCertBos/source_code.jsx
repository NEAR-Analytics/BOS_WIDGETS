// This is a demo component to transfer NEAR tokens using BOS component with a helper `transfer-near.near` contract as native transfers are not supported on BOS yet: https://t.me/neardev/29391
// Here is the contract itself: https://github.com/frol/transfer-near-contract; it is implemented with nesdie, so it only requires only 1 TGas attached to the function call.

const amount = props.amount ?? "0.001";
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
`;

const Nav = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;
  font-weight: 500;

  a {
    color: #0000FF;
    font-size: 16px;
    text-decoration: none;
    padding: 8px;
    cursor: pointer;

    &:hover {
      border-bottom: 2px solid #000;
    }
  }
`;

const SectionContainer = styled.div`
  padding: 20px;
`;

const header = (
  <HeaderContainer>
    <h4 style={{ fontWeight: 700 }}>Apprende Drop</h4>

    <Nav>
      <a href="#" onClick={() => handleNavigation("device-status")}>
        Donar
      </a>{" "}
     
    </Nav>
  </HeaderContainer>
);

const smallImageStyle = {
  maxHeight: 200,
  width: "50%",
  objectFit: "cover",
  margin: "auto",
};

const homePageContent = (
  <SectionContainer>
    
  </SectionContainer>
);

const snmpSection = (
  <SectionContainer>
   :)
{" "}
    <h2>DONA AQUI</h2>
    <div>
      {content}
      <h3>
        {" "}
        <img
          style={smallImageStyle}
          src="https://img.freepik.com/fotos-premium/near-protocol-o-near-silver-coin-3d-rendering-inclinado-vista-izquierda-cryptocurrency-ilustracion-dibujos-animados_477250-381.jpg"
          alt="SNMP Devices"
        />{" "}
      </h3>
      <p> ________________________________________ </p>
      <p>
        ¿Quieres donar al creador del curso ? para mas cursos
        <label htmlFor="contact"></label>
        <input type="text" id="contact" name="contact" />
      </p>
      {/* Agrega más detalles según la información que desees mostrar */}
    </div>
    <div>
      {state.showAmount && (
        <div className=" mb-2">
          Introduce aqui la Cantidad
          <input
            type="number"
            placeholder={state.amount}
            onChange={(e) => onChangeAmount(e.target.value)}
          />
        </div>
      )}
      {state.showReceiver && <div className="mb-2"></div>}
      <button className="join-button" onClick={transferNEAR}>
        Transfer {state.amount} NEAR to {state.receiver}
      </button>
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
