const wiki_description = {
  title: "Crypto Heros",
  description: ` Crypto Heroes is an nft based battle simulator game that will be
        familiar to people who have played WoW: PVE gameplay — looting, selling
        and crafting items, fighting friends against dungeon bosses. Collect a
        minimum of 6 units and start to battle other players! Each battle is
        fought as best of three and the starting player changes each round. To
        make it more spicy, you will battle about your PXT stake (after beta).
        Still don't understand? Take a game like World of Warcraft, slap it onto
        the blockchain, and you're left with this amazing game called Crypto
        Heroes`,
};

const slide_data = [
  {
    img_url:
      "https://user-images.githubusercontent.com/93423666/240480322-7ae64756-e31e-4c3f-b776-fac8719ddca0.png",
    title: "The Rundown",
  },
  {
    img_url:
      "https://user-images.githubusercontent.com/93423666/240481674-dd55212c-caba-4024-803c-a07c0f5c0463.png",
    title: "Main Menu",
    description: `In the main menu, we see 3 available characters — knight, mage and ranger. To open access to the character, click on the “+” above the class name. Three icons will appear above the hero — inventory (armor icon), a dungeon window (axe icon) and a potions window (bottle icon).`,
  },
];

const button_data = [
  {
    title: "Play Now",
    link: "https://pd.marmaj.org/cryptoheroes",
  },
  {
    title: "TestNet",
    link: "https://pd-testnet.marmaj.org/cryptoheroes",
  },
  {
    title: "Wiki",
    link: "https://github.com/MarmaJFoundation/cryptoheroes-wiki/wiki",
  },
  {
    title: "NFT",
    link: "https://mitntbase.xyz/",
  },
  {
    title: "Forge",
    link: "https://mitntbase.xyz/",
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
  height: 150px;
  object-fit: cover;
`;

const Description = styled.p`
  color: #fff;
  font-weight: 300;
`;

const FakeButton = styled.a`
  border-radius: 5px;
  width: auto;
  text-transform: uppercase;
  padding: 8px 14px;
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
  max-width: 20rem;
  padding: 25px 32px;
  display: flex;
  flex-direction: column;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  text-align: center;
  justify-content: center;
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

const Pixel = styled.div`
  background: aliceblue;
  font-size: 1.3rem;
  font-weight: 10rem;
  color: white;
  height: auto;
  margin: 10px;
  
  position: relative;
  display: inline-block;
  vertical-align: top;
  text-transform: uppercase;
  
  cursor: pointer;
  
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

 line-height: 0;
  
  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges; /* Firefox */
  image-rendering: -o-crisp-edges; /* Opera */
  image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming) */
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
  
  border-style: solid;
  border-width: 20px;
  border-image: url(https://i.imgur.com/sREM8Yn.png) 20 stretch;

  :active{
    top: 2px;
  }
`;

const PixelText = styled.p`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 6.5rem;
  text-align: center;
  margin: -20px -20px;
  line-height: 1.5rem;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
  padding: 10px 20px;
  
		background:
		linear-gradient(135deg, transparent 10px, #000000 0) top left,
		linear-gradient(225deg, transparent 10px, #000000 0) top right,
		linear-gradient(315deg, transparent 10px, #000000 0) bottom right,
		linear-gradient(45deg,  transparent 10px, #000000 0) bottom left;
	background-size: 50% 50%;
	background-repeat: no-repeat;
	background-image:
		radial-gradient(circle at 0 0, rgba(204,0,0,0) 14px, #000000 15px),
		radial-gradient(circle at 100% 0, rgba(204,0,0,0) 14px, #000000 15px),
		radial-gradient(circle at 100% 100%, rgba(204,0,0,0) 14px, #000000 15px),
		radial-gradient(circle at 0 100%, rgba(204,0,0,0) 14px, #000000 15px);
`;

const PixelContainer = styled.div`
  display: flex;
  width: 50%;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const WidgetCard = ({ title, coverSrc, description, actionButtons }) => {
  return (
    <Card>
      <Title>{title}</Title>
      <Cover src={coverSrc} alt={title} />
      <Description>{description}</Description>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-evenly",
        }}
      >
        {actionButtons.map((button, index) => (
          <a
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            /*onClick={() => handleButtonClick(button.url)}*/
            href={button.url}
          >
            <PixelContainer>
              <Pixel>
                <PixelText> {button.label}</PixelText>
              </Pixel>
            </PixelContainer>
          </a>
        ))}
      </div>
    </Card>
  );
};

const WidgetImages = [
  {
    title: "Crypto Heroes Image",
    url: "https://github.com/Dark-St-r/mjg-widget-data/assets/93423666/8d7eab5a-f278-43f5-a2da-88a323ce9da9",
  },
];

const Mainnet = [
  { title: "Crypto Heroes", url: "https://pd.marmaj.org/cryptoheroes" },
];

const Testnet = [
  { title: "Crypto Heroes", url: "https://pd-testnet.marmaj.org/cryptoheroes" },
];

const Wiki = [
  {
    title: "Crypto Heroes Wiki",
    url: "https://github.com/MarmaJFoundation/cryptoheroes-wiki/wiki",
  },
];

const isUserRegistered = Near.view(
  "pixeltoken.near",
  "ch_is_player_registered",
  {
    account_id: context.accountId,
  }
);

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
          src={`https://user-images.githubusercontent.com/93423666/240491905-685f6374-7997-4426-aa18-968a7377d866.png`}
        />
      </a>

      <div style={{ marginBottom: "20px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></div>
      </div>
    </Hero>
    <Widget src="jay100.near/widget/CTTDescription" props={wiki_description} />{" "}
    <Widget src="jay100.near/widget/Carousel" props={slide_data} />
    {isUserRegistered ? (
      <>
        <Widget src="jay100.near/widget/CH-Dashboard" />
        <Widget src="jay100.near/widget/CTT-Button" props={button_data} />
      </>
    ) : (
      <Widget src="jay100.near/widget/CTT-Button" props={button_data} />
    )}{" "}
  </div>
);
