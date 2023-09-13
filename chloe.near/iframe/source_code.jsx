// Assuming styled-components is imported
const Container = styled.div`
  background-color: #000;
  color: #fff;
`;

// Your React component
const YourComponent = () => {
  return (
    <Container>
      <iframe
        src="https://pd.marmaj.org/pixelpets"
        width="800"
        height="600"
        title="PixelPets-Marmaj-iframe"
      ></iframe>
    </Container>
  );
};
