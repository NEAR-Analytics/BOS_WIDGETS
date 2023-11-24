const page = props.page;
const imageLink =
  "https://ipfs.near.social/ipfs/bafybeiap2mzwsly4apaldxguiunx4rjwqyadksj5yxuzwrww3kue3ao5qe";

const Footer = styled.div`
  width: 100%;
  background-color: #00ec97;
  padding: 1.5rem;
`;

const Title = styled.h5`
  color: #151515;
  text-align: center;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 43.2px */
  margin: 0;
`;

const Description = styled.p`
  color: #151515;
  text-align: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 28.8px */
  letter-spacing: -0.72px;
  margin: 0;
`;

const MidContainer = styled.div`
  width: 720px;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
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

const MidContent = () => {
  return (
    <>
      <MidContainer>
        <Title>Donation Hub</Title>
        <Description>Create for BitkubHackathon 2023</Description>
      </MidContainer>
    </>
  );
};
/*
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
/*
const SmallContent = () => {
  return (
    <SmallContainer>
      <SocialLinks>
        <a href="https://twitter.com/NEARDevHub" target="_blank">
          <XIcon />
        </a>
        <a href="https://t.me/NEARDevHub" target="_blank">
          <TelegramIcon />
        </a>
        <a href="https://www.youtube.com/@NEARDevHub" target="_blank">
          <YoutubeIcon />
        </a>
      </SocialLinks>
      <div className="d-flex align-items-center gap-3">
        <h5 className="m-0">Subscribe to our newsletter</h5>
        <CTA href="https://newsletter.neardevhub.org" target="no_blank">
          Subscribe
        </CTA>
      </div>
    </SmallContainer>
  );
};
*/
return (
  <>
    <ImageContainer src={imageLink} />
    <Footer>
      <MidContent />
    </Footer>
  </>
);
