const imageLink =
  "https://www.cpacanada.ca/-/media/cpa-digital-hub/featured-images/2019/12/hub_12_18_charity-hero-1200x900.jpg?rev=af800c90a32a4bac8e7c01400388d10c";

const HeroSection = styled.div`
  position: relative;
  height: auto;
  z-index: 3;
  width: 60%;
  background: 
    linear-gradient(45deg,#000000,#2D871F,#3CA52B,#ffffff);
  clip-path: polygon(0 0, 100% 0%, 75% 100%, 0% 100%);

  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-left: 3.375rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 1rem 1.5rem;
    clip-path: none;
  }
`;

const Title = styled.h1`
  color: #f4f4f4;
  font-size: 4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 88px */
  letter-spacing: -1.76px;

  @media screen and (max-width: 768px) {
    font-size: 2.25rem;
    letter-spacing: -0.72px;
    margin: 0;
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: max-content;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    background: #f4f4f4;
  }
`;

const ImageContainer = styled.div`
  width: 90%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  background: transparent;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Image = styled.img`
  margin-left: 15.625rem;
  height: 100%;
  width: 100%;
  filter: grayscale(50%);
  object-fit: cover;
`;

const MobileImage = styled.img`
  display: none;

  width: 100%;
  height: 196px;

  width: 100%;
  object-fit: cover;
  filter: grayscale(1);

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

return (
  <Container>
    <HeroSection>
      <Title>
        The Decentralized <br />
        <span style={{ color: "#ffffff" }}>Donation</span> <br />
        Hub
      </Title>
    </HeroSection>
    <MobileImage src={imageLink} />
    <ImageContainer>
      <Image src={imageLink} />
    </ImageContainer>
  </Container>
);
