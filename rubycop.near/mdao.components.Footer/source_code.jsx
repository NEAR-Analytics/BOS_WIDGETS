let { assets, socials, content } = VM.require(
  `rubycop.near/widget/mdao.config`
);

const page = props.page;

const Footer = styled.div`
  width: 100%;
  background: #151718;
  padding: 4rem;
`;

const Description = styled.p`
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 300;
  tet-align: center;
`;

const MidContainer = styled.div`
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
const FooterLogo = styled.img`
  width: 70px;
  height: 70px;
`;

const Socials = () => (
  <div className="d-flex gap-5">
    {Object.entries(socials).map(([name, link]) => (
      <a href={link} target="_blank">
        <i className={`fs-1 bi bi-${name}`} />
      </a>
    ))}
  </div>
);

const MidContent = () => {
  return (
    <MidContainer className="d-flex flex-column align-items-center gap-4">
      <FooterLogo src={assets.logoColor} />
      <Description>{content.home.footerDesc}</Description>
      <Socials />
    </MidContainer>
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
