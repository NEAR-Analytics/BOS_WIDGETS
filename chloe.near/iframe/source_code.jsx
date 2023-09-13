// Styled-components
const ResponsiveIframe = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  background-color: #000;
  color: #fff;
`;

const Title = styled.h1`
  color: #fff;
  font-weight: 700;
  font-size: 2em;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: #fff;
  font-weight: 300;
  text-align: center;
  margin-bottom: 20px;
`;

// Your React component
const YourComponent = () => {
  return (
    <Container>
      <Title>Marma J Gaming</Title>
      <Description>
        Explore the crypto-based gaming world of Marma J Gaming...
      </Description>
      <ResponsiveIframe>
        <iframe
          src="https://pd.marmaj.org/pixelpets"
          title="PixelPets-Marmaj-iframe"
        ></iframe>
      </ResponsiveIframe>
      <Widget src={"jay100.near/widget/PixelParty-Widget"} />
      <Widget src={"jay100.near/widget/PixelPets-Widget"} />
      <Widget src={"jay100.near/widget/CH-Widget"} />
      <Widget src={"jay100.near/widget/CTT-Widget"} />
    </Container>
  );
};
