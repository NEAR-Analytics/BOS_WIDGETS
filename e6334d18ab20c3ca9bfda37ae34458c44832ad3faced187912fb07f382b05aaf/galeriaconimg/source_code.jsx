// FETCH CSS
// const contratc = "dev-1697764823856-92090162270530";
const contract = "sazonmx.near";
const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;

const Main = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr; /* Cambiado a una columna para pantallas pequeñas */
  aligne-items: start;

  @media (min-width: 1200px) {
    grid-template-columns: 352px minmax(0, 1fr);
  }
`;

const footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
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

const ImageGrid = styled.div`
 display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  max-width: 80%;
  margin: 30px auto;
`;

const GalleryImageContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
max-width: 500px;
margin: 0 auto;
  &:hover .overlay {
    opacity: 1;
  }
`;

const GalleryImageDescription = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  transition: opacity 0.3s;
  opacity: 0;
`;

const ImageOverlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
`;
const GalleryImage = styled.img`
  width: 100%; /* Asegura que la imagen se adapte al contenedor */
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: 1200px) {
    max-width: 500px;
  }
`;
const OverlayText = styled.div`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
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

// Lista de información de imágenes
const imageInfo = [
  {
    url: "https://cheforopeza.com.mx/wp-content/uploads/2017/11/pollo-mole.jpg",
    description: "Mole con Pollo",
    link: "sazonmx.near/widget/moleconpollo",
  },
  {
    url: "https://i.pinimg.com/originals/35/ac/cd/35accd4a4a48add5941923f36cca6168.jpg",
    description: "Cochinita Pibil",
  },

  {
    url: "https://www.comedera.com/wp-content/uploads/2019/02/1280px-TlayudaMazunte2.jpeg",
    description: "Tlayudas ",
  },

  {
    url: "https://i.blogs.es/b4889c/1/840_560.jpg",
    description: "Barbacoa",
  },

  {
    url: "https://aguabela.com.mx/images/blog/pescado-veracruzana-receta-temporada-veracruz-slider.webp",
    description: "Pescado a la Veracruzana",
  },

  // Añade más objetos según sea necesario
];

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

return (
  <Theme>
    <div
      className="container-fluid py-4"
      style={{ backgroundColor: "rgb(153, 114, 173)", minHeight: "100vh" }}
    >
      <Tabs>
        <LogoImage
          src="https://pbs.twimg.com/profile_images/1714387582786654208/7lKexrWK_400x400.jpg"
          alt="Company Logo"
        />
        <TabsButton
          href={`https://near.social/e6334d18ab20c3ca9bfda37ae34458c44832ad3faced187912fb07f382b05aaf/widget/subirreceta`}
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
          href={`https://near.social/e6334d18ab20c3ca9bfda37ae34458c44832ad3faced187912fb07f382b05aaf/widget/galeriaconimg`}
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
          href={`https://near.social/e6334d18ab20c3ca9bfda37ae34458c44832ad3faced187912fb07f382b05aaf/widget/subirreceta`}
          selected={state.selectedTab === "Supporters"}
        >
          Suscripción
        </TabsButton>
      </Tabs>
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
      <ImageGrid>
        {imageInfo.map((info, index) => (
          <GalleryImageContainer key={index}>
            <GalleryImage src={info.url} alt={`Imagen ${index + 1}`} />
            <GalleryImageDescription>
              {info.description}
            </GalleryImageDescription>
            <ImageOverlay className="overlay">
              <OverlayText>{info.description}</OverlayText>
            </ImageOverlay>
          </GalleryImageContainer>
        ))}
      </ImageGrid>
    </div>
  </Theme>
);
