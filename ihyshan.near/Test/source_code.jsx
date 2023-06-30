// *Carousel
const slide_data = [
  {
    img_url:
      "https://user-images.githubusercontent.com/100770363/250137626-6887c829-b9ac-48fd-aa1a-24dc7337eda0.png",
    title: "Main Menu",
    description:
      "Yay! you're in pixel pets. Now whats all this stuff about? I will go over each element and explain what it does, so you can start breeding pets and fighting in no time.",
  },
  {
    img_url:
      "https://user-images.githubusercontent.com/100770363/239694635-a87d47fd-c323-4124-8957-dd16fb396ea2.png",
    title: "Battles",
    description:
      "Select your 3 pets on the right by either right clicking them, or pressing the Select Pet button.",
  },
  {
    img_url:
      "https://user-images.githubusercontent.com/100770363/239694681-57386625-21c1-4d4b-a0ab-24b53193011d.png",
    title: "Combat System",
    description:
      "The combat is automatic, and the way it works is very simple. Each player attacks within the order of their creatures in crescent order. Being Pet #1 the first attacker on each side, and up to Pet #3. This sequence loops until one of the players has lost all of his pets in combat and the winner is decided.",
  },
  {
    img_url:
      "https://user-images.githubusercontent.com/100770363/239652886-be78f0f3-9d0e-413b-9d1e-7f2d42e884e1.png",
    title: "Merging Pets",
    description:
      "It's possible to merge two pets of the same type and rarity to enhance the power level of the primary pet and also increase the rarity if the power level is already at 100.",
  },
];

// End

const Title = styled.h5` color: #fff; font-weight: 700; font-size: 16px; text-align: center; text-transform: uppercase; `;
const Cover = styled.img` border-radius: 5px; width: 150px; height: 150px; object-fit: cover; `;
const Description = styled.p`   color: #fff;   font-weight: 300; `;
const FakeButton = styled.a`   border-radius: 5px;   width: auto;   text-transform: uppercase;   padding: 8px 14px;   background: rgba(155, 155, 155, 0.2);   color: #fff;   cursor: pointer;   border: 1px solid #000;   outline: 0; font-weight: 600; :hover {opacity: 0.8; text-decoration: none; color: #fff;} `;
const Card = styled.div` border-radius: 8px; color: #0c0c0c; background: #000; align-items: center; justify-content: center; max-width: 210px; padding: 25px 32px; display: flex; flex-direction: column; `;
const Hero = styled.div` display: flex; flex-direction: column; border-radius: 15px; text-align: center; justify-content: center; padding: 15px; background-color: #0c0c1f; color: #fff; `;
const CardList = styled.div` display: grid; justify-items: center; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); grid-template-rows: repeat(200px, 1fr); gap: 0.5rem; `;
const Pixel = styled.div` background: aliceblue; font-size: 1.3rem; font-weight: 10rem; color: white; height: auto; margin: 10px; position: relative; display: inline-block; vertical-align: top; text-transform: uppercase; cursor: pointer; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; line-height: 0; image-rendering: optimizeSpeed; image-rendering: -moz-crisp-edges; /* Firefox */ image-rendering: -o-crisp-edges; /* Opera */ image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming) */ image-rendering: crisp-edges; -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */ border-style: solid; border-width: 20px; border-image: url(https://i.imgur.com/sREM8Yn.png) 20 stretch; :active{ top: 2px; } `;
const PixelText = styled.p` @import url("https://fonts.googleapis.com/css?family=Press+Start+2P"); font-family: "Pixel Emulator", "Press Start 2P", "Courier new", "monospace"; display: inline-block; vertical-align: top; position: relative; width: 6.5rem; text-align: center; margin: -20px -20px; line-height: 1.5rem; transition: all 0.2s ease-in-out; :hover { transform: scale(1.1); } padding: 10px 20px; background: linear-gradient(135deg, transparent 10px, #000000 0) top left, linear-gradient(225deg, transparent 10px, #000000 0) top right, linear-gradient(315deg, transparent 10px, #000000 0) bottom right, linear-gradient(45deg, transparent 10px, #000000 0) bottom left; background-size: 50% 50%; background-repeat: no-repeat; background-image: radial-gradient(circle at 0 0, rgba(204,0,0,0) 14px, #000000 15px), radial-gradient(circle at 100% 0, rgba(204,0,0,0) 14px, #000000 15px), radial-gradient(circle at 100% 100%, rgba(204,0,0,0) 14px, #000000 15px), radial-gradient(circle at 0 100%, rgba(204,0,0,0) 14px, #000000 15px); `;
const PixelContainer = styled.div` display: flex; width: 50%; text-align: center; align-items: center; justify-content: center; `;

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
        {" "}
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
            /*onClick={()=> handleButtonClick(button.url)}*/ href={button.url}
          >
            {" "}
            <PixelContainer>
              <Pixel>
                <PixelText> {button.label}</PixelText>
              </Pixel>
            </PixelContainer>
          </a>
        ))}{" "}
      </div>
    </Card>
  );
};
const WidgetImages = [
  {
    title: "Pixel Pets Image",
    url: "https://pd.marmaj.org/hatch.png",
  },
];

const Mainnet = [
  { title: "{PixelPets}", url: "https://pd.marmaj.org/pixelpets" },
];

const Testnet = [
  {
    title: "PixelPets",
    url: "https://pd-testnet.marmaj.org/pixelpets/testnet.html",
  },
];

const Wiki = [
  {
    title: "PixelPets Wiki",
    url: "https://github.com/MarmaJFoundation/pixelpets-wiki/wiki",
  },
];

const NFT = [
  {
    title: "PixelPets NFT",
    url: "https://www.mintbase.xyz/meta/mjr.mintbase1.near%3A0e1888dca342ee552547f8ef39ad8785",
  },
];

const isUserRegistered = Near.view(
  "pixeltoken.near",
  "ctt_is_player_registered",
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
      padding: "20px",
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
          src={`https://user-images.githubusercontent.com/100770363/249336643-530248f3-5e7b-4a2d-bb66-91cf4b588004.png`}
        />
      </a>

      <p
        style={{ marginBottom: "20px", fontSize: "1.3em", fontWeight: "bold" }}
      >
        PixelPets
      </p>
      <p style={{ marginBottom: "20px", width: "100%", textAlign: "justify" }}>
        PixelPets is an NFT game for pet trading and battling. Each token
        represents one of a total of 60 different pet types. Each pet has a
        certain rarity type (common, rare, epic or legendary) which affects
        their strength beneath other stats like quality and level. It combines
        collect to earn/compete to earn concept via the built-in pet marketplace
        and by a few days lasting tournaments with a prizepool for the best
        players running each week.
      </p>
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
    <Widget src="ihyshan.near/widget/Carousel" props={slide_data} />
    <CardList>
      {" "}
      {Mainnet.map((widget, index) => (
        <WidgetCard
          key={index}
          coverSrc={WidgetImages[index].url}
          description=""
          actionButtons={[
            { label: "Play", url: widget.url },
            { label: "Test", url: Testnet[index].url },
            { label: "Wiki", url: Wiki[index].url },
            { label: "NFT", url: NFT[index].url },
          ]}
        />
      ))}
    </CardList>
    )}
  </div>
);
