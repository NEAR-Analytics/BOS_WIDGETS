let { assets, content } = VM.require(`ndcdev.near/widget/MDAO.Config`);
assets = assets.home;
content = content.home;

const STATUS = {
  GOOD: ["Yes", "Approved", "Yes, include in special request"],
  BAD: ["No"],
};
const Container = styled.div`
  position: relative;
  width: 100%;
  height: max-content;
  overflow: hidden;
`;

const HeroSection = styled.div`
  width: 100%;
  background: linear-gradient(
    96deg,
    #fdefb1 -19.42%,
    #e1c4fe 49.87%,
    #95c3fe 98.55%
  );
  height: 600px;
  padding: 3rem;

  @media screen and (max-width: 786px) {
    padding: 2rem;
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

  h3 {
    font-size: 1.5rem;
    font-weight: 300;
    max-width: 800px;
    margin-bottom: 0;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 0;
  }

  img {
    width: 500px;
    height: 500px;
    @media screen and (max-width: 786px) {
      display: none;
    }
  }
}`;

const ConnectSection = styled.div`
  padding: 5rem 3rem;

  @media screen and (max-width: 786px) {
    padding: 2rem;
    text-align: center;
  }
`;

return (
  <>
    <HeroSection className="d-flex justify-content-between align-items-center gap-3">
      <div className="d-flex flex-column gap-5">
        <h1>{content.heroTitle}</h1>
        <h3>{content.heroDesc}</h3>
      </div>
      <img src={assets.hero} />
    </HeroSection>
    <Container>
      <ConnectSection className="d-flex flex-column gap-5">
        <Widget src="ndcdev.near/widget/MDAO.Components.Communities" />
      </ConnectSection>
    </Container>
  </>
);
