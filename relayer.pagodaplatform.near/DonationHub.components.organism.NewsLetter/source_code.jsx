const page = props.page;
const imageLink =
  "https://i.postimg.cc/6pJZ79Tr/The-Decentralized-Donation-Hub-3.png";

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
        <Description>Create for BITKUB BLOCKATHON 2023</Description>
      </MidContainer>
    </>
  );
};

return (
  <>
    <ImageContainer src={imageLink} />
    <Footer>
      <MidContent />
    </Footer>
  </>
);
