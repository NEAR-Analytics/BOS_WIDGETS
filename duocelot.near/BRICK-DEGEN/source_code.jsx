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
  position: relative; // To position the back button absolutely within this div
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
  width: 60px;  // Enlarged size
  height: 60px;  // Enlarged size
  background-color: #666;
  border-radius: 5px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 15px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  position: absolute;  // Absolute positioning
  bottom: 10px;  // Position at the bottom right
  right: 10px;
`;

const imageUrl =
  "https://ipfs.near.social/ipfs/bafkreigqamafvyfqcwsp4gl4nyh4wof7ldrz7oloj5fb22lqbu77fz7pda";

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
        <Title>DEGEN - DEGEN CONSTELLATION </Title>
        <Text>
          In the crypto realm, "degen" is playful slang derived from
          "degenerate." It describes individuals who pursue high-risk,
          high-reward strategies, often diving into new projects with zeal. They
          epitomize the adventurous spirit of the decentralized world.
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
      <Button
        onClick={() =>
          (window.location.href =
            "https://near.social/duocelot.near/widget/onboardHUB")
        }
      >
        Back
      </Button>
    </ContentDiv>
  </div>
);
