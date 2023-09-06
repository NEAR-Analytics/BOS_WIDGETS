const accountId = context.accountId;

<Widget src="duocelot.near/widget/error_001" />;

// Define the keyframe animation using styled-components
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
  transition: transform 0.5s;
`;

State.init({
  show: false,
});

const handleOnMouseEnter = () => {
  State.update({ show: true });
};

const handleOnMouseLeave = () => {
  State.update({ show: false });
};

const overlay = (
  <div
    className="border m-3 p-3 rounded-4 bg-white shadow"
    style={{ maxWidth: "24em", zIndex: 1070 }}
    onMouseEnter={handleOnMouseEnter}
    onMouseLeave={handleOnMouseLeave}
  >
    This is the overlay Message
  </div>
);

const urls = [
  "https://ipfs.near.social/ipfs/bafkreib56aciji2mgnwhqt3nkmutxqfednxqllgzvd5gm6d4mcjbumnxzm",
  "https://ipfs.near.social/ipfs/bafkreifikdi444catqds54ulo3kwujvetmng7pwmr2tmg7hadtxmfguyeu",
  "https://ipfs.near.social/ipfs/bafkreigqamafvyfqcwsp4gl4nyh4wof7ldrz7oloj5fb22lqbu77fz7pda",
  "https://ipfs.near.social/ipfs/bafkreiae77ymuywxv5iqofxygb26iy5b44qtao2gp4ipbxbrzadjf2rpwy",
  "https://ipfs.near.social/ipfs/bafkreifzp5dafotrrzitwrp2op6shyavpad4nx6rxl2wk2xf343a6vtgqa",
  "https://ipfs.near.social/ipfs/bafkreiesatthnz7gp25slanw3nlhztrvuqllmqyxng62x4kg7jxaerclba",
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
          <MenuImage
            src={url}
            alt="btn"
            className="menu-image"
            style={{ animationDelay: `${index * 0.2}s` }}
            onMouseEnter={() => handleMouseOver(index)}
            onMouseLeave={handleMouseOut}
          />
        ))}
      </div>
    </div>
  </div>
);
