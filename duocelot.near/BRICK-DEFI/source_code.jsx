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
  "https://ipfs.near.social/ipfs/bafkreifikdi444catqds54ulo3kwujvetmng7pwmr2tmg7hadtxmfguyeu";

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
        <Title>DEFI - DEFI CONSTELLATION </Title>
        <Text>
          The NEAR Protocol emerges as a stronghold for decentralized finance
          (DeFi), propelled by cutting-edge infrastructure and robust smart
          contracts. Anchored by the DeFi DAO, NEAR's ecosystem prioritizes
          security while facilitating a myriad of financial solutions. From
          lending platforms to decentralized exchanges, NEAR empowers the
          community to reimagine traditional finance, driving forward both
          innovation and decentralized collaboration.
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
