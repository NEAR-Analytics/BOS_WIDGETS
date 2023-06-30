// Widget Props
// *Game Description
const wiki_description = {
  title: "Chain Team Tactics",
  description: `Chain Team Tactics is an nft based pvp battle simulator. Collect a minimum of 6 units and start to battle other players! Each battle is fought as best of three and the starting player changes each round. To make it more spicy, you will battle about your PXT stake (after beta). Still don't understand? Take a game like Fire Emblem or Final Fantasy Tactics, slap it onto the blockchain, and you're left with this amazing game called Chain Team Tactics.`,
};

// *Carousel
const slide_data = [
  {
    img_url:
      "https://user-images.githubusercontent.com/100770363/241330819-010617e4-b2b3-4d34-a59c-c1b58bf92d8d.png",
    title: "The Basics",
  },
  {
    img_url:
      "https://user-images.githubusercontent.com/100770363/241331374-56bd3f0c-7ed3-4923-bd48-4aac7367b280.png",
    title: "Main Menu",
    description:
      "From the main menu, you can see all of the main things you can do in the game. Battle, Mint Unit, Check the Leaderboard, Check Active Rooms, and the market. On the right hand side of your image, this is where the troops that you own will be displayed.",
  },
  {
    img_url:
      "https://user-images.githubusercontent.com/100770363/241335354-eaf25884-de02-4d7a-a8f2-3c4e59214d5f.png",
    title: "Battles",
    description:
      "This is what you'll see when you select battle. You will have the option to create a new challenge, or fight against someone's challenge. These matches are best 2 out of 3",
  },
  {
    img_url:
      "https://user-images.githubusercontent.com/100770363/241335498-727bf24d-a65c-4bff-b404-8bcadc558512.png",
    description:
      "This is the challenge you chose to accept. As you can see the opponent already set the field for the first round, and it is your job to assemble your own side so that you can attempt to take the first round.",
  },
  {
    img_url:
      "https://user-images.githubusercontent.com/100770363/241335871-e9c8e5fe-db38-4ada-b1ff-7d895e61f44e.png",
    description:
      "Thanks to the cheeky placement of the warlock, You were able to take the first round. From here, you will have to wait for the opponent to respond before you can attack again.",
  },
];

// End

const Title = styled.h5` color: #fff; font-weight: 700; font-size: 16px; text-align: center; text-transform: uppercase; `;
const Cover = styled.img` border-radius: 5px; width: 150px; height: 150px; object-fit: cover; `;
const Description = styled.p`@import url('https://fonts.googleapis.com/css?family=Press+Start+2P'); font-family: "Pixel Emulator", "Press Start 2P", Courier new, monospace;  color: #fff; font-weight: 300; `;
const FakeButton = styled.a` border-radius: 5px; width: auto; text-transform: uppercase; padding: 8px 14px; background: rgba(155, 155, 155, 0.2); color: #fff; cursor: pointer; border: 1px solid #000; outline: 0; font-weight: 600; :hover { opacity: 0.8; text-decoration: none; color: #fff; } `;
const Card = styled.div` border-radius: 8px; color: #0c0c0c; background: #000; align-items: center; justify-content: center; max-width: 20rem; padding: 25px 32px; display: flex; flex-direction: column; `;
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
    title: "Chain Team Tactics Image",
    url: "https://pd.marmaj.org/ctt/mint2.png",
  },
];
const Mainnet = [
  { title: "Chain Team Tactics", url: "https://pd.marmaj.org/chainteam" },
];
const Testnet = [
  {
    title: "Chain Team Tactics",
    url: "https://pd-testnet.marmaj.org/chainteam",
  },
];
const Wiki = [
  {
    title: "Chain Team Tactics Wiki",
    url: "https://github.com/MarmaJFoundation/chainteamtactics-wiki/wiki",
  },
];
const Test_Slides = [
  {
    slideImage: "https://www.w3schools.com/howto/img_nature_wide.jpg",
    slideInfo: "Dummy Information 1",
  },
  {
    slideImage: "https://www.w3schools.com/howto/img_snow_wide.jpg",
    slideInfo: "Dummy Information 2",
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
          src={`https://user-images.githubusercontent.com/100770363/241338189-eb7cd1db-00a7-4dd3-ab44-d1ab6f24c2e8.png`}
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
    <Widget src="jay100.near/widget/CTTDescription" props={wiki_description} />
    <Widget src="jay100.near/widget/Carousel" props={slide_data} />
    {isUserRegistered ? (
      <Widget src="jay100.near/widget/PlayerDashboard" />
    ) : (
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
            ]}
          />
        ))}
      </CardList>
    )}
  </div>
);
