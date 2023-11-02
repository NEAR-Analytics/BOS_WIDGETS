const ownerId = "nearcon23.near";

const desktopImage =
  "https://ipfs.near.social/ipfs/bafkreic2w3bmzfmnc7e6qohtigrclmvnwgmu6xa3iaerzs5rjxxalqo6he";

const mobileImage =
  "https://ipfs.near.social/ipfs/bafkreidqjgiygcw7ejw2hpufp46tueacznpu3mskbjhh46cplfsqptqqey";

const MyImage = styled.img`
  width:100%;
  @media (max-width: 650px) {    
    content:url(${mobileImage});   
  }
`;

const Section = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;

  & > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;

    & > h2 {
      display: flex;
      flex-direction: column;
      color: var(--black, #000);
      font-size: 2rem;
      font-family: FK Grotesk;
      font-weight: 500;
    }

    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 1rem;

  }
`;

return (
  <Section>
    <h2
      style={{
        padding: "3.125rem",
        paddingBottom: 0,
      }}
    >
      2023 Partners
    </h2>

    <MyImage src={desktopImage} />
  </Section>
);
