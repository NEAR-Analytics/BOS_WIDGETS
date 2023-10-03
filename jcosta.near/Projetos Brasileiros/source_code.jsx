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
  font-weight: 00;

  a{
    color: #000000;
    font-size: 16px
  }
`;
const header = (
  <HeaderContainer>
    <h4 style={{ fontWeight: 500 }}>Near Brasil</h4>
    <Nav>
      <a href="#">Projetos Brasileiros</a>
      <a
        href="#"
        style={{
          backgroundColor: "#000",
          color: "#FFF",
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingInline: 24,
        }}
      >
        Em construção
      </a>
    </Nav>
  </HeaderContainer>
);

const projects = [
  {
    image:
      "https://global-uploads.webflow.com/6241bcd9e666c1514401461d/62e156a2c420dd2b31cc61d8_Caramelo-Club-NFTMintRadar.png",
    name: "Caramelo Clube",
    rtl: false,
  },
  {
    image:
      "https://pbs.twimg.com/media/FsQwvVdXoAAU8a3?format=png&name=360x360",
    name: "Rasta Cripto",
    link: "https://twitter.com/home",
    rtl: true,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv_jznVZ-xZOGEHWzuIK4xRV13mjUtkjcKzw2yM4rvYo25rEGn7Wzkwgaro6JbhlUIu98&usqp=CAU",
    name: "Pug Gang",
    rtl: true,
  },
  // Adicione mais projetos conforme necessário
];
return (
  <div>
    {header}
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {projects.map((project) => (
        <div
          key={project.id}
          style={{
            width: "25%", // Cada coluna ocupa 25% da largura da página
            padding: "5px", // Espaçamento interno
            boxSizing: "border-box",
          }}
        >
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            <img
              style={{
                width: "100%",
                height: "100px", // Altura da imagem
                objectFit: "cover",
              }}
              src={project.image}
              alt={project.name}
            />
          </a>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  </div>
);
