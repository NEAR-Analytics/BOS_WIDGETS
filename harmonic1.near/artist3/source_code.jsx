const Wrapper = styled.div`
  display: flex;
  background-color: #c5f003;
  height: 80vh;
  color: black;
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;  /* Changed from center to flex-start */
  align-items: center;
  padding-top: 2rem;  /* Add some top padding if needed */
`;

const ArtistName = styled.h1`
  margin-bottom: 1rem;
`;

const ArtistImage = styled.img`
  max-width: 80%;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 2rem;
`;

const SectionTitle = styled.p`
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
`;

const HorizontalLine = styled.hr`
  border: 0;
  height: 1px;
  background: black;
  margin: 1rem 0;
`;

const SocialLink = styled.a`
  color: black;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;

const data = props.data;

return (
  <Wrapper>
    {/* Image and name section */}
    <ImageWrapper>
      <ArtistName>{data.name}</ArtistName>
      <ArtistImage src={data.avatar} alt={data.name} />
    </ImageWrapper>

    {/* Content section */}
    <ContentWrapper>
      <SectionTitle>About Me</SectionTitle>
      <p>{data.bio}</p>
      <HorizontalLine />

      {data.links.map((link, index) => (
        <SocialLink
          key={index}
          href={link.value}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.key}
        </SocialLink>
      ))}
      <HorizontalLine />

      <SectionTitle>Contact Me</SectionTitle>
      <p>You can reach me at {}</p>
    </ContentWrapper>
  </Wrapper>
);
