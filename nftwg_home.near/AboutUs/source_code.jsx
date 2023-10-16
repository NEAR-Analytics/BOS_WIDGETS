/*----------------About Us --------------------*/

const AboutUsContainer = styled.div`

position: absolute;
width: 1320px;
height: 228px;
left: 80px;
top: 312px;

`;

const AboutUs = styled.div`
position: absolute;
width: 1360px;
height: 84px;
left: calc(50% - 490px/2);
top: 1612px;

font-family: inherit;
font-style: normal;
font-weight: 700;
font-size: 70px;
line-height: 120%;
/* identical to box height, or 84px */

color: #333333;
`;

const Sentence = styled.div`

position: absolute;
width: 510px;
height: 120px;
left: 80px;
top: 1720px;


font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 150.5%;
/* or 30px */

color: #333333;

`;
return (
  /*---------------------About Us---------------*/
  <AboutUsContainer>
    <AboutUs id="aboutus">About Us</AboutUs>
    <Sentence style={{ left: -45 }}>
      The NFT Work Group is a community-driven initiative that aims to provide
      solutions and standards for the challenges and limitations associated with
      NFTs on NEAR. Our primary objective is to revitalize and expand the Near
      NFT ecosystem.
    </Sentence>
    <Sentence style={{ left: 630 }}>
      Elected by the community, the Work Group strives for long-term
      sustainability, aligning with Near Protocol's core goals through NFTs as a
      catalyst for mass adoption. Read on to know more about our goals, team and
      the WG innovations.
    </Sentence>
  </AboutUsContainer>
);
