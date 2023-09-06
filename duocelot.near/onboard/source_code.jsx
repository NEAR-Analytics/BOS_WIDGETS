const accountId = context.accountId;

<Widget src="duocelot.near/widget/error_001" />;

const MenuImage = styled.img`
  box-sizing: border-box;
  width: 150px;
  height: auto;
  border-radius: 30px;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const handleOnMouseEnter = (url) => {
  State.update({ hoveredImg: url });
};

const handleOnMouseLeave = () => {
  State.update({ hoveredImg: null });
};

const getOverlayMessage = (url) => {
  const messages = {
    "https://ipfs.near.social/ipfs/bafkreib56aciji2mgnwhqt3nkmutxqfednxqllgzvd5gm6d4mcjbumnxzm":
      {
        title: "Title for Image 1",
        content: "Content for Image 1",
      },
    // Add more messages for other images...
  };
  const message = messages[url] || {
    title: "Default Title",
    content: "Default message",
  };

  return (
    <div
      className="border m-3 p-3 rounded-4 bg-white shadow"
      style={{
        maxWidth: "200px",
        width: "200px",
        height: "200px",
        zIndex: 1,
      }}
      onMouseEnter={() => handleOnMouseEnter(url)}
      onMouseLeave={handleOnMouseLeave}
    >
      <h5>{message.title}</h5>
      <p>{message.content}</p>
    </div>
  );
};

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
        {[
          "https://ipfs.near.social/ipfs/bafkreib56aciji2mgnwhqt3nkmutxqfednxqllgzvd5gm6d4mcjbumnxzm",
          "https://ipfs.near.social/ipfs/bafkreifikdi444catqds54ulo3kwujvetmng7pwmr2tmg7hadtxmfguyeu",
          "https://ipfs.near.social/ipfs/bafkreigqamafvyfqcwsp4gl4nyh4wof7ldrz7oloj5fb22lqbu77fz7pda",
          "https://ipfs.near.social/ipfs/bafkreiae77ymuywxv5iqofxygb26iy5b44qtao2gp4ipbxbrzadjf2rpwy",
          "https://ipfs.near.social/ipfs/bafkreifzp5dafotrrzitwrp2op6shyavpad4nx6rxl2wk2xf343a6vtgqa",
          "https://ipfs.near.social/ipfs/bafkreiesatthnz7gp25slanw3nlhztrvuqllmqyxng62x4kg7jxaerclba",
        ].map((url) => (
          <OverlayTrigger
            key={url}
            show={state.hoveredImg === url}
            trigger={["hover", "focus"]}
            delay={{ show: 250, hide: 300 }}
            placement="auto"
            overlay={getOverlayMessage(url)}
          >
            <MenuImage
              src={url}
              alt="btn"
              onMouseEnter={() => handleOnMouseEnter(url)}
              onMouseLeave={handleOnMouseLeave}
            />
          </OverlayTrigger>
        ))}
      </div>
    </div>
  </div>
);
