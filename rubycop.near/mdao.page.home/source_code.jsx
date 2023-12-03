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
  background: linear-gradient(
    96deg,
    #fdefb1 -19.42%,
    #e1c4fe 49.87%,
    #95c3fe 98.55%
  );
  width: 100%;
  height: 600px;
  padding: 1.5rem 3rem;

  @media screen and (max-width: 786px) {
    padding: 1.5rem 2rem;
    text-align: center;
  }

  h1 {
    font-size: 5.2rem;
    font-weight: 600;
    margin-bottom: 0;
    @media screen and (max-width: 786px) {
      font-size: 3rem;
    }
  }

  h2 {
    font-size: 2rem;
    font-weight: 300;
    max-width: 800px;
    margin-bottom: 0;
  }

  img {
    @media screen and (max-width: 786px) {
      display: none;
    }
  }

  a.btn-primary {
    border-radius: 10px;
    background: #151718;
    box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.25);
    color: white;
    color: #fff;
    font-size: 24px;
    font-weight: 400;
    padding: 15px 25px;
    width: 400px;

    &:hover {
      opacity: 0.9;
      text-decoration: none;
    }

    @media screen and (max-width: 786px) {
      width: 100%;
    }
  }
`;

return (
  <Container>
    <HeroSection className="d-flex justify-content-between align-items-center gap-3">
      <div className="d-flex flex-column gap-5">
        <h1>{content.home.heroTitle}</h1>
        <h2>{content.home.heroDesc}</h2>
        <a
          href=""
          className="text-center btn-primary d-flex justify-content-end"
        >
          <div className="d-flex justify-content-between w-75">
            <span>Read More</span>
            <i className="bi bi-chevron-right" />
          </div>
        </a>
      </div>
      <img src={assets.home.hero} />
    </HeroSection>
  </Container>
);
