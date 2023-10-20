// const contratc = "dev-1697764823856-92090162270530";
const contract = "sazonmx.near";
const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;

const Main = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr; /* Cambiado a una columna para pantallas pequeñas */
  align-items: start;

  @media (min-width: 1200px) {
    grid-template-columns: 352px minmax(0, 1fr);
  }
`;

// Agregar un controlador de eventos al botón de envío
const handleSubmit = async () => {
  const name = document.querySelector('input[name="name"]').value;
  const title = document.querySelector('input[name="title"]').value;
  const description = document.querySelector(
    'textarea[name="description"]'
  ).value;
  const imageLink = ""; // Debes obtener el enlace de la imagen subida

  await submitRecipe(name, title, description, imageLink);
  alert("Receta enviada correctamente!");
};

const footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
   /* Hace que la imagen se adapte al contenedor */
  max-width: 10%; /* Establece un tamaño máximo de 200x200 píxeles */
  margin-right: 12px;
  margin-top: 1px;
`;
const LogoImage2 = styled.img`
  width: 100%; /* Asegura que la imagen se adapte al contenedor */
  margin-right: 12px;
  margin-top: 1px; 
`;

const SidebarWrapper = styled.div`
  position: relative;
  z-index: 5;
  margin-top: -55px;

  @media (max-width: 900px) {
    margin-top: -40px;
  }
`;

const Content = styled.div`
  .post {
    padding-left: 0;
    padding-right: 0;
  }
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: ${(p) => p.size || "25px"};
  line-height: 1.2em;
  color: #11181c;
  margin: ${(p) => (p.margin ? "0 0 24px" : "0")};
  overflow-wrap: anywhere;
`;

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap; /* Para manejar múltiples botones en pantallas pequeñas */
  border-bottom: 1px solid #eceef0;
  overflow: auto;
  scroll-behavior: smooth;
  align-items: center;

  @media (max-width: 1200px) {
    background: #f8f9fa;
    border-top: 1px solid #eceef0;
    margin: 0 -12px 48px;
e
    > * {
      flex: 1;
    }
  }
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 22px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#ffffff")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    color: #5EBDD4;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #59e692;
  }
`;

if (!cssFont) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
      font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      ${css}
    `,
  });
}
const Theme = state.theme;

// OUTPUT UI

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

// subida de imagen

State.init({ img: null });

const uploadFileUpdateState = (body) => {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then((res) => {
    const cid = res.body.cid;
    State.update({ img: { cid } });
  });
};

const filesOnChange = (files) => {
  if (files) {
    State.update({ img: { uploading: true, cid: null } });
    uploadFileUpdateState(files[0]);
  }
};

const handleFormSubmit = (e) => {
  e.preventDefault();
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

const sendTransactionToSmartContract = async (
  name,
  title,
  description,
  imageCID
) => {
  const keyPair = nearAPI.KeyPair.fromString("YOUR_PRIVATE_KEY"); // Reemplaza con tu clave privada

  const near = await nearAPI.connect({
    deps: { keyStore: new nearAPI.keyStores.InMemoryKeyStore() },
    nodeUrl: "https://rpc.near.org",
    networkId: "maiinet",
  });

  const account = await near.account("sazonmx.near"); // Reemplaza con tu ID de cuenta

  const contract = new nearAPI.Contract(account, "CONTRACT_ID", {
    viewMethods: ["VIEW_METHODS"], // Lista de métodos de consulta si los hay
    changeMethods: ["CHANGE_METHODS"], // Lista de métodos de cambio si los hay
  });

  try {
    await contract.METHOD_NAME(
      {
        name,
        title,
        description,
        imageCID,
      },
      300000000000000,
      nearAPI.utils.format.parseNearAmount("0.1")
    );
  } catch (error) {
    console.error("Error al enviar la transacción:", error);
  }
};

return (
  <Theme>
    <div
      className="container-fluid py-4"
      style={{ backgroundColor: "#9972ad" }}
    >
      <Tabs>
        <LogoImage
          src="https://pbs.twimg.com/profile_images/1714387582786654208/7lKexrWK_400x400.jpg"
          alt="Company Logo"
        />
        <TabsButton
          href={`sazonmx.near/widget/subirreceta`}
          selected={state.selectedTab === "home"}
        >
          Inicio
        </TabsButton>

        <TabsButton href={`#`} selected={state.selectedTab === "how"}>
          ¿Quienes somos?
        </TabsButton>

        <TabsButton href={`#`} selected={state.selectedTab === "tokens"}>
          Desayuno
        </TabsButton>
        <TabsButton
          href={`sazonmx.near/widget/galeriaconimagen`}
          selected={state.selectedTab === "tokens"}
        >
          Comidas
        </TabsButton>

        <TabsButton href={`#`} selected={state.selectedTab === "tokens"}>
          Cenas
        </TabsButton>

        <TabsButton href={`#`} selected={state.selectedTab === "tokens"}>
          Repostería
        </TabsButton>

        <TabsButton href={`#`} selected={state.selectedTab === "benefits"}>
          Sube tu receta
        </TabsButton>

        <TabsButton
          href={`sazonmx.near/widget/subirreceta`}
          selected={state.selectedTab === "Supporters"}
        >
          Suscripción
        </TabsButton>
      </Tabs>

      <div className="container-fluid py-4">
        <LogoImage2
          src="https://pbs.twimg.com/profile_banners/1712868201384804352/1697215404/1500x500"
          alt="Imagen de fondo"
          width="120px"
        />
      </div>
      <TabsButton>
        {!!state.sender ? (
          <button
            className=""
            onClick={() => submitEthers(state.strEther, state.sender)}
          >
            <span></span>
          </button>
        ) : (
          <Web3Connect className="" connectLabel="Connect Wallet" />
        )}
      </TabsButton>
      <h1> Comparte tu receta</h1>
      <div
        className="container"
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <div
          className="container"
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          <div
            id="comparte"
            style={{
              padding: "20px",
              background: "#ffffff",
              borderRadius: "8px",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Comparte tu receta
            </h2>

            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Título receta"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <textarea
                className="form-control"
                name="description"
                placeholder="Descripción de la receta"
                rows="4"
              ></textarea>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div className="d-inline-block">
                <input type="file" name="image" />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* fin */}
  </Theme>
);
