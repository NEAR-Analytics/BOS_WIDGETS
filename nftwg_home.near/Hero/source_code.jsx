/*-------------------------Hero-------------------------*/
const Hero = styled.div`
position: absolute;
width: 1280px;
height: 756px;
left: 80px;
top: 180px;
`;
const ImageLayout = styled.div`
/* Placeholder / picture */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

position: absolute;
width: 1050px;
height: 500px;
left: 10px;
top: 436px;
background-size: cover;
background-repeat: no-repeat;


background: url('https://i.ibb.co/qRHzxvw/Rectangle-23798.png'), #DDE1E6;

`;

const ImageCss = styled.div`
/* Rectangle 23798 */

width: 1050px;
height: 500px;

background: url('https://i.ibb.co/qRHzxvw/Rectangle-23798.png'), #D9D9D9;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
background-size: cover;
background-repeat: no-repeat;

`;

const Text1 = styled.div`
/* The NFT Workgroup */

position: absolute;
width: 300px;
height: 50px;
left: 10px;
top: 40px;
font-family: inherit;
font-style: normal;
font-weight: 1000;
font-size: 30px;
line-height: 120%;
/* identical to box height, or 24px */
text-transform: uppercase;
white-space: nowrap;
color: #6333DD;
`;

const Text2 = styled.div`
/* Empowering NFTs on NEAR: Bridging Communities, Pioneering Innovations! */

position: absolute;
width: 1280px;
height: 168px;
left: 10px;
top: 190px;

font-family: 'Outfit';
font-style: normal;
font-weight: 700;
font-size: 60px;
line-height: 120%;
/* or 84px */

color: #333333;
`;
const HeroContainer = styled.div`
position:absolute;
width:1200px;
height:80px;
`;
return (
  /*------------Hero----------------*/
  <HeroContainer>
    <Hero>
      <Text1 id="home">THE NFT WORKGROUP</Text1>
      <Text2>
        Empowering NFTs on NEAR: Bridging Communities, Pioneering Innovations!
      </Text2>

      <ImageLayout>
        <ImageCss />
      </ImageLayout>
    </Hero>
  </HeroContainer>
);
