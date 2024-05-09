const CustomStyledDiv = styled.div`
  width: 95vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  background: url("https://asset-signax.b-cdn.net/background/istockphoto-1191154632-612x612.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 20px;
`;

const CustomContentDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CustomContentDivLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 0.6;
`;

const ParagraphTag = styled.p`
  color: white;
  font-weight: 400;
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 0px 0px;
  color: #b6b6b6;
`;
const HeadingTagOne = styled.h1`
  color: white;
  font-weight: bold;
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 0px 0px;
  font-size: 45px !important;
`;
const FooterDivLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-left: 1px solid yellow;
  padding: 10px;
  margin-top: 30px;
`;
const ParagraphTagSecondary = styled.p`
  color: white;
  font-weight: 400;
  font-size: 12px;
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 0px 0px;
  width: 80%;
  color: #b6b6b6;
`;
const ButtonGroup = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
`;

const ExploreButtonTag = styled.button`
  background: transparent;
  outline: none;
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  padding: 5px;
  width: 20%;
  margin-right: 20px;
`;

const ExperienceButtonTag = styled.button`
  background: yellow;
  outline: none;
  border: none;
  border-radius: 5px;
  color: black;
  padding: 5px;
  width: 30%;
  margin-left: 20px;
`;

const CustomContentDivRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 0.4;
  margin-right: 30px;
`;

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

const AppbarLogo = styled.div`
  height: 50px;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

return (
  <CustomStyledDiv>
    <AppbarLogo>
      <img
        src="https://asset-signax.b-cdn.net/signax_logo_white.png"
        style={imageStyle}
      />
    </AppbarLogo>
    <CustomContentDiv>
      <CustomContentDivLeft>
        <ParagraphTag>Industrial Revolution</ParagraphTag>
        <HeadingTagOne>Future of Industrial Metaverse</HeadingTagOne>
        <FooterDivLeft>
          <ParagraphTagSecondary>
            Signa X is the 3D asset creation platform for the Metaverse. We
            optimise the entire 3D asset production process for enterprises,
            industries and gaming projects to build and deploy metaverse
            experiences at scale. Our proprietary tech stack is ensuring digital
            3D assets are created and tokenized at one of the fastest rates in
            the world.
          </ParagraphTagSecondary>
          <ButtonGroup>
            <ExploreButtonTag>Explore</ExploreButtonTag>
            <ExperienceButtonTag>Experience</ExperienceButtonTag>
          </ButtonGroup>
        </FooterDivLeft>
      </CustomContentDivLeft>
      <CustomContentDivRight>
        <img
          src="https://asset-signax.b-cdn.net/background/metaverse-6743471-5580560.png"
          style={imageStyle}
        />
      </CustomContentDivRight>
    </CustomContentDiv>
  </CustomStyledDiv>
);
