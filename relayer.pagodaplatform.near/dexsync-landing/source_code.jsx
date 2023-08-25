const Container = styled.div`
background-color: #141414;
  width: 102%;
    height: 100vh;
    display:flex;
      overflow: hidden; /* Add overflow hidden to hide overflowing content */

`;

const HeroSections = styled.div`
margin-top: 100px;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Adjust to your desired object-fit behavior */
`;

return (
  <Container>
    <Widget src={`0xchirag.near/widget/dexsync-navbar`} props={props} />
    <HeroSections>
      <Widget src={`0xchirag.near/widget/dexsync-herosection`} props={props} />
    </HeroSections>
  </Container>
);
