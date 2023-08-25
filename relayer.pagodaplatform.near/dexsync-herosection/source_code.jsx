const HeroSection = styled.div`
display: flex;
margin-top: 50px;
position: relative;
`;

const LeftDiv = styled.div`
display: flex-col;
  margin-left: 45px;

`;

const RightDiv = styled.div`
display: flex-col;
  margin-right: 45px;

`;

const MainText = styled.h1`
font-style: normal;
color:white;
font-weight: 700;
width: 320px;
font-size: 36px;
line-height: 40px;`;

const Button = styled.div`
margin-top: 30px;
  text-decoration: none;
  cursor: pointer;
  font: bold;
  padding: 12px 32px;
  font-size: 16px;
background: #FFFFFF;
  color: black; /* Set text color to white */
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
  width: 610px;
  height: 489px;
  position: absolute;
  right: -250px; /* Position it to the left, one full width away */
  top: 0;
`;

const MeshImage = styled.img`
  width: 100%;
  height: 100%;
    border: 1px solid #6F3CE4; /* Add border at the bottom */


  object-fit: cover; /* Adjust to your desired object-fit behavior */
`;

const Banner = styled.div`
  width: 340px;
  position: absolute;
  margin-left: 50px;
  top: 0;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Adjust to your desired object-fit behavior */
`;

return (
  <HeroSection>
    <LeftDiv>
      <MainText>
        Say doodbye to tab clutter qith <GrayText>our innovative</GrayText>{" "}
        <PurpleText>chrome extension</PurpleText>
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
