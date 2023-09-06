const accountId = context.accountId;

<Widget src="duocelot.near/widget/error_001" />;

const MenuImage = styled.img`
  box-sizing: border-box;
  width: 150px;
  height: auto;
  border-radius: 30px;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const ContentDiv = styled.div`
  flex: 1;
  background-color: #E0E0E0;
  border-radius: 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const Title = styled.h1`
  margin: 0;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Text = styled.p`
  margin: 0;
  font-size: 16px;
  color: #666;
`;

const IconLink = styled.div`
  width: 60px;
  height: 60px;
  background-color: #666;
  border-radius: 5px;
  margin-right: 10px;
`;

const ButtonLink = styled.a`
  padding: 5px 10px;
  border: none;
  border-radius: 15px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const imageUrl =
  "https://ipfs.near.social/ipfs/bafkreifzp5dafotrrzitwrp2op6shyavpad4nx6rxl2wk2xf343a6vtgqa";

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
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px",
    }}
  >
    <MenuImage src={imageUrl} alt="btn" />
    <ContentDiv>
      <div>
        <Title>GAME - GAME CONSTELLATION </Title>
        <Text>
          At NEAR Protocol, gaming transcends traditional boundaries, entering
          the realm of blockchain-powered possibilities. Leveraging NEAR's
          scalable and user-friendly platform, game developers craft immersive
          experiences, infusing play with tokenomics, NFTs, and decentralized
          mechanics. The GAME team at NEAR is at the forefront, turning
          imaginative concepts into interactive realities, all while championing
          a new era of decentralized gaming.
        </Text>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <IconLink />
          <IconLink />
          <IconLink />
          <IconLink />
          <IconLink />
          <IconLink />
          <IconLink />
        </div>
      </div>
      <ButtonLink href="https://near.social/duocelot.near/widget/onboardHUB">
        Back
      </ButtonLink>
    </ContentDiv>
  </div>
);
