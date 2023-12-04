let { assets } = VM.require(`rubycop.near/widget/mdao.config`);

const page = props.page;

const Footer = styled.div`
  width: 100%;
  background: #151718;
  padding: 1.5rem;
`;

const Description = styled.p`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-weight: 300;
  tet-align: center;
`;

const MidContainer = styled.div`
  width: 720px;
  ${
    (page === "community" || page === "communities" || page === "feed") &&
    "display: none;"
  }
`;

const ImageContainer = styled.img`
  ${page !== "home" && "display: none;"}
  height: 280px;
  width: 100%;
  object-fit: cover;
`;

const Socials = () => (
  <div className="d-flex gap-2">
    <a href="https://twitter.com/NEARDevHub" target="_blank">
      {assets.xIcon}
    </a>
    <a href="https://t.me/NEARDevHub" target="_blank">
      {assets.telegramIcon}
    </a>
    <a href="https://www.youtube.com/@NEARDevHub" target="_blank">
      {assets.youtubeIcon}
    </a>
  </div>
);

const MidContent = () => {
  return (
    <>
      <MidContainer className="d-flex flex-column align-items-center gap-2">
        <img src={assets.logoColor} />
        <Description>
          Stay in the loop. Get the latest updates, announcements,
          <br />
          opportunities, and insights
          <br />
          from the ecosystem.
        </Description>
        <Socials />
      </MidContainer>
    </>
  );
};

const SmallContainer = styled.div`
  display: none;
  ${
    (page === "communities" || page === "community" || page === "feed") &&
    "display: flex !important;"
  }
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    justify-content: center;
    gap: 1rem;
    align-items: center;
  }
`;

const SmallContent = () => {
  return (
    <SmallContainer>
      <Socials />
    </SmallContainer>
  );
};

return (
  <>
    <ImageContainer src={assets.home.support_bg} />
    <Footer className="d-flex justify-content-center">
      <MidContent />
      <SmallContent />
    </Footer>
  </>
);
