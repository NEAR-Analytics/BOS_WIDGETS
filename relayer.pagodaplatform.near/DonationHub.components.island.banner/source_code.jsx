const imageLink =
  "https://i.pinimg.com/564x/69/cb/db/69cbdb5337d07961ff56b77820fbc932.jpg";

const HeroSection = styled.div`
  position: relative;
  height: 380px;
  z-index: 0;
  width: 500px;


  padding-top: 0rem;
  padding-bottom: 0rem;
  

  @media screen and (max-width: 768px) {
    width: 100%;
  
    clip-path: none;
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
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  background: transparent;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Image = styled.img`
  margin-left: 0rem;
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
    <HeroSection></HeroSection>
    <MobileImage src={imageLink} />
    <ImageContainer>
      <Image src={imageLink} />
    </ImageContainer>
  </Container>
);
