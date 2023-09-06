const accountId = context.accountId;

<Widget src="duocelot.near/widget/error_001" />;

const dealCard = styled.keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const MenuImage = styled.img`
  box-sizing: border-box;
  width: 150px;
  height: auto;
  border-radius: 30px;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${dealCard} 0.5s forwards;
  transition: transform 0.5s, filter 0.3s;

  &:hover {
    transform: scale(1.1);
    filter: sepia(1) hue-rotate(30deg);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const urls = [
  "https://ipfs.near.social/ipfs/bafkreib56aciji2mgnwhqt3nkmutxqfednxqllgzvd5gm6d4mcjbumnxzm",
  "https://ipfs.near.social/ipfs/bafkreifikdi444catqds54ulo3kwujvetmng7pwmr2tmg7hadtxmfguyeu",
  "https://ipfs.near.social/ipfs/bafkreigqamafvyfqcwsp4gl4nyh4wof7ldrz7oloj5fb22lqbu77fz7pda",
  "https://ipfs.near.social/ipfs/bafkreiae77ymuywxv5iqofxygb26iy5b44qtao2gp4ipbxbrzadjf2rpwy",
  "https://ipfs.near.social/ipfs/bafkreifzp5dafotrrzitwrp2op6shyavpad4nx6rxl2wk2xf343a6vtgqa",
  "https://ipfs.near.social/ipfs/bafkreiesatthnz7gp25slanw3nlhztrvuqllmqyxng62x4kg7jxaerclba",
];

const linkUrls = [
  "https://near.social/duocelot.near/widget/BRICK-ART",
  "https://near.social/duocelot.near/widget/BRICK-DEFI",
  "https://near.social/duocelot.near/widget/BRICK-DEGEN",
  "https://near.social/duocelot.near/widget/BRICK-DEV",
  "https://near.social/duocelot.near/widget/BRICK-GAME",
  "https://near.social/duocelot.near/widget/BRICK-MKT",
];

return (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "linear-gradient(to right, white, white, white)",
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
      position: "relative",
      overflow: "hidden",
      zIndex: 0,
    }}
  >
    <div style={{ width: "100%" }}>
      <div
        style={{
          backgroundImage: "url()",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100%",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {urls.map((url, index) => (
          <ImageWrapper key={url}>
            <a href={linkUrls[index]} rel="noopener noreferrer">
              <MenuImage
                src={url}
                alt="btn"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  opacity: 0, // initial state with zero opacity
                }}
              />
            </a>
          </ImageWrapper>
        ))}
      </div>
    </div>
  </div>
);
