const { app, provider, assets, content } = VM.require(
  `rubycop.near/widget/mdao.config`
);

const Container = styled.div`
  position: relative;
  width: 100%;
  height: max-content;
  overflow: hidden;
`;

const HeroSection = styled.div`
  position: relative;
  fill: linear-gradient(96deg, #fdefb1 -19.42%, #e1c4fe 49.87%, #95c3fe 98.55%);
  width: 100%;
  height: 600px;
  padding: 1.5rem 3rem;

  h1 {
    font-size: 96px;
    font-weight: 600;
  }

  h2 {
    font-size: 32px;
    font-weight: 300;
    max-width: 800px;
  }

  img {
    @media screen and (max-width: 786px) {
      display: none;
    }
  }
`;

return (
  <Container>
    <HeroSection className="d-flex justify-content-between align-items-center gap-3">
      <div>
        <h1>{content.home.heroTitle}</h1>
        <h2>{content.home.heroDesc}</h2>
      </div>
      <img src={assets.home.hero} />
    </HeroSection>
  </Container>
);
