const HeroSection = styled.div`
display: flex;
margin-top: 50px
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
      <img src="https://i.ibb.co/8gF6vxB/Frame-3.png" />
    </RightDiv>
  </HeroSection>
);
