const accountId = props.accountId || context.accountId;

const HeroSection = styled.div`
width: 100vw;
display: flex;
margin-top: 120px;
// position: relative;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%; /* Set the width to half of the screen */
  margin-left: 45px;
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%; /* Set the width to half of the screen */
  margin-right: 45px;
`;

const MainText = styled.h1`
font-style: normal;
color:white;
font-weight: 700;
width: 600px;
font-size: 56px;
line-height: 56px;`;

const Button = styled.div`
margin-top: 30px;
  text-decoration: none;
  cursor: pointer;
  font: bold;
  padding: 12px 52px;
  font-size: 16px;
background: #6F3CE4;
  color: white; /* Set text color to white */
  border: 1px solid #6F3CE4; /* Add border at the bottom */
  display: inline-block; /* Display as inline-block to fit content */
`;

const GrayText = styled.span`
  color: #898989; /* Set your desired color */
`;

const PurpleText = styled.span`
  color: #6F3CE4; /* Set your desired color */
`;

const Mesh = styled.div`
  color: #6F3CE4; /* Set your desired color */
  width: 950px;
  left: 400px;
  margin-top: 40px;
  position: absolute;
  top: 0;
`;

const MeshImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Adjust to your desired object-fit behavior */
`;

const Banner = styled.div`
  width: 550px;
  position: absolute;
  margin-left: 10px;
  margin-top: 190px;
  top: 0;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Adjust to your desired object-fit behavior */
`;

const Hello = styled.span`
  color: white;
  font-size: 18px;
  margin-bottom: 15px;
`;

return (
  <HeroSection>
    <LeftDiv>
      <Hello>
        Hey{" "}
        <PurpleText>
          {accountId}
          {accountId ? `@ ${accountId}` : "Folks"}
        </PurpleText>
      </Hello>
      <MainText>
        Discover the Ultimate <GrayText>Meta DEX Aggregator:</GrayText>{" "}
        <PurpleText>One Platform, Best Prices!</PurpleText>
      </MainText>
      <a href="https://dex-sync.vercel.app/" target="_blank">
        <Button>Go to app</Button>
      </a>
    </LeftDiv>

    <RightDiv>
      <Mesh>
        <MeshImage src="https://i.ibb.co/8gF6vxB/Frame-3.png" />
      </Mesh>

      <Banner>
        <BannerImage src="https://i.ibb.co/r2F3T6D/Group-10.png" />
      </Banner>
    </RightDiv>
  </HeroSection>
);
