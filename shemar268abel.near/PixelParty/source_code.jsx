const Title = styled.h5`
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  text-transform: uppercase;
`;

const Cover = styled.img`
  border-radius: 5px;
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

const Description = styled.p`
  color: #fff;
  font-weight: 500;
`;

const FakeButton = styled.a`
  border-radius: 0px;
  width: 100%;
  text-transform: uppercase;
  padding: 10px 14px;
  background: rgba(155, 155, 155, 0.2);
  color: #fff;
  cursor: pointer;
  border: 1px solid #000;
  outline: 0;
  font-weight: 600;
  :hover {
    opacity: 0.8;
    text-decoration: none;
    color: #fff;
  }
`;

const Card = styled.div`
  border-radius: 8px;
  color: #0c0c0c;
  background: #000;
  align-items: center;
  justify-content: center;
  max-width: 210px;
  padding: 25px 32px;
  display: flex;
  flex-direction: column;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 15px;
  text-align: center;
  justify-content: center;
  padding: 15px;
  background-color: #0c0c1f;
  color: #fff;
`;

const CardList = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: repeat(200px, 1fr);
  gap: 0.5rem;
`;

const WidgetCard = (props) => {
  const { title, coverSrc, description, actionButtons } = props;

  const handleButtonClick = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <Card>
      <Title>{title}</Title>
      <Cover src={coverSrc} alt={title} />
      <Description>{description}</Description>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
        }}
      >
        {actionButtons.map((button, index) => (
          <FakeButton
            key={index}
            onClick={() => handleButtonClick(button.url)}
            href={button.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {button.label}
          </FakeButton>
        ))}
      </div>
    </Card>
  );
};

const WidgetImages = [
  {
    title: "Pixel Party Image",
    url: "https://pd.marmaj.org/pixelparty2.jpg",
  },
];

const Mainnet = [
  { title: "Pixel Party", url: "https://pixelparty.marmaj.org/" },
];

const Testnet = [
  { title: "Pixel Party", url: "https://testnet.pixelparty.marmaj.org/" },
];

const Wiki = [
  {
    title: "Pixel Party Wiki",
    url: "https://github.com/MarmaJFoundation/pixelparty-wiki/wiki",
  },
];

const NFT = [
  {
    title: "Pixel Party NFT",
    url: "https://www.mintbase.xyz/contract/mjr.mintbase1.near/token/0",
  },
];

return (
  <div
    style={{
      display: "flex",
      flexFlow: "column",
      alignItems: "space-evenly",
      backgroundColor: "#0e0e1e",
      padding: "20px",
    }}
  >
    <Hero>
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          alignItems: "space-evenly",
          backgroundColor: "#0e0e1e",
          padding: "20px",
        }}
      >
        <Cover
          src={WidgetImages[0].url}
          alt={WidgetImages[0].title}
          style={{ width: "100%" }}
        />
        <h1 style={{ marginBottom: "10px", textAlign: "center" }}>
          <a
            href="https://pixelparty.marmaj.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            PIXEL PARTY
          </a>
        </h1>
        <p
          style={{
            marginBottom: "20px",
            fontSize: "1.3em",
            fontWeight: "bold",
          }}
        >
          NFT FRAME SHOWCASE
        </p>

        <Description
          style={{ marginBottom: "20px", width: "100%", textAlign: "justify" }}
        >
          PixelParty, a groundbreaking and innovative NFT Frame showcase
          meticulously constructed on the NEAR Protocol, embodies the fusion of
          cutting-edge technology and artistic brilliance, boasting a truly
          remarkable total supply of 600 tokens that serve as a testament to its
          exceptional rarity and exclusivity.
        </Description>
      </div>
    </Hero>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginLeft: "15px",
      }}
    >
      <FakeButton
        href={Mainnet[0].url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        Play{" "}
      </FakeButton>
      <FakeButton
        href={Testnet[0].url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        Test{" "}
      </FakeButton>
      <FakeButton href={Wiki[0].url} target="_blank" rel="noopener noreferrer">
        {" "}
        Wiki{" "}
      </FakeButton>
      <FakeButton href={NFT[0].url} target="_blank" rel="noopener noreferrer">
        {" "}
        NFT{" "}
      </FakeButton>
    </div>
  </div>
);
