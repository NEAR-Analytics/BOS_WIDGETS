const wiki_description = {
  title: "NFT Frame Showcase",
  description: `PixelParty, a groundbreaking and innovative NFT Frame showcase
          meticulously constructed on the NEAR Protocol, embodies the fusion of
          cutting-edge technology and artistic brilliance, boasting a truly
          remarkable total supply of 600 tokens that serve as a testament to its
          exceptional rarity and exclusivity.`,
};

const widget_title = {
  title: "Pixel Party",
};

const button_data = [
  {
    title: "Play Now",
    link: "https://pixelparty.marmaj.org/",
  },
  {
    title: "TestNet",
    link: "https://testnet.pixelparty.marmaj.org/",
  },
  {
    title: "Wiki",
    link: "https://github.com/MarmaJFoundation/pixelparty-wiki/wiki",
  },
  {
    title: "NFT",
    link: "https://www.mintbase.xyz/contract/mjr.mintbase1.near/token/0",
  },
];

const slide_data = [
  {
    img_url: "https://pd.marmaj.org/pixelparty2.jpg",
    title: "Who made Pixelparty?",
    description:
      "PixelParty was created by a talented team of developers and artists who poured their passion and expertise into bringing this extraordinary NFT Frame showcase to life. The collective efforts of these visionary individuals, fueled by their unwavering dedication and innovative spirit, culminated in the birth of PixelParty, an immersive platform that seamlessly blends technology, art, and creativity to redefine the boundaries of the NFT space.",
  },
  {
    img_url:
      "https://user-images.githubusercontent.com/93423666/238833011-3538bfcb-082f-41bb-8a12-8670735f6b12.png",
    description:
      "Each token you possess grants you the privilege of unleashing your creative prowess on a well designed canvas, carefully measured at 20x20px, affording you the space to weave your artistic vision, imprinting a mesmerizing tapestry of boundless imagination and boundless possibilities.",
  },
  {
    img_url:
      "https://user-images.githubusercontent.com/93423666/238837072-34abe80a-a9c5-4ade-8b52-5cd359c7d723.png",
    description:
      "Should the bounds of a singular 20x20px frame fail to contain your grand vision, fear not, for a world of expansive artistic possibilities beckons. By acquiring multiple interconnected frames, seamlessly merging together in harmonious unity, you transcend the limitations of a confined canvas, creating a vast expanse where your creativity knows no bounds. With each additional frame, your artistic dominion expands, allowing you to fashion a larger, more captivating frame that embodies the magnitude of your imagination, enabling your artistic dreams to unfurl on an awe-inspiring scale that leaves onlookers spellbound in wonderment.",
  },
];

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
  padding: .75rem;
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
    }}
  >
    <Hero>
      <a
        href={Mainnet.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          color: "inherit",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        <img
          style={{
            width: "100%",
          }}
          src={`https://user-images.githubusercontent.com/93423666/238831499-d56223f0-749f-4ddb-b6b9-d1c9a393b554.png`}
        />{" "}
      </a>{" "}
    </Hero>{" "}
    <Widget src="jay100.near/widget/CTTDescription" props={widget_title} />{" "}
    <Widget src="jay100.near/widget/CTTDescription" props={wiki_description} />{" "}
    <Widget src="jay100.near/widget/Carousel" props={slide_data} />{" "}
    <Widget src="jay100.near/widget/CTT-Button" props={button_data} />
  </div>
);
