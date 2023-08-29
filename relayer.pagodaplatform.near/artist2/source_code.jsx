const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageSide = styled.div`
  flex: 1;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    height: 50vh;
  }

`;

const ContentSide = styled.div`
  flex: 1;
  background-color: #f4f1de; /* Off creamish background */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media (max-width: 768px) {
    height: 50vh;
  }
`;

const Name = styled.h1`
  color: #1f355c;
`;

const Bio = styled.p`
  color: #1f355c;
`;

const LinkArray = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  margin: 2rem;
`;

const LinkCard = styled.a`
  flex: 0 0 calc(50% - 20px);
  margin: 10px;
  padding: 10px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  color: #1f355c;
  text-decoration: none;
  font-size: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const data = props.data;

return (
  <Container>
    <ImageSide image={data.avatar} />
    <ContentSide>
      <Name>{data.name}</Name>
      <Bio>{data.bio}</Bio>
      <LinkArray>
        {data.links &&
          data.links.length > 0 &&
          data.links.map((link, index) => (
            <LinkCard key={index} href={link.value}>
              {link.key}
            </LinkCard>
          ))}
      </LinkArray>
    </ContentSide>
  </Container>
);
