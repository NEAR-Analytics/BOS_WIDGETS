// Your original styled components
const Container = styled.div`
  background-color: #fff;
  color: #fff;
`;

const Title = styled.h1`
  color: #fff;
  font-weight: 700;
  font-size: 2em;
  text-align: center;
  text-transform: uppercase;
  margin: 20px auto;
`;

const Description = styled.p`
  color: #fff;
  font-weight: 300;
  text-align: center;
  margin-bottom: 20px;
`;

const IframeContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 40%;  // Adjust this to change the height relative to the width
  width: 80%;  // Control the width
  margin-top: 20px;  // Top margin
  margin-bottom: 20px;  // Bottom margin
  margin-left: auto;  // Left margin set to auto for centering
  margin-right: auto;  // Right margin set to auto for centering
`;

return (
  <Container>
    {/* Embedding the iframe */}
    <IframeContainer>
      <iframe
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        }}
        src="https://pd.marmaj.org/"
        title="Marma-J-Gaming-iframe"
      ></iframe>
    </IframeContainer>
    <Widget
      src="jay100.near/widget/CTTDescription"
      props={{
        title: "Marma J Gaming",
        description: `Explore the crypto-based gaming world of Marma J Gaming where you can collaborate artistically with friends, gather your pets for a battle, outfit your hero to explore dungeons and take part in raids, and gather an army to position yourself as the master tactician.`,
      }}
    />
    <Widget src={"jay100.near/widget/PixelParty-Widget"} />
    <Widget src={"jay100.near/widget/PixelPets-Widget"} />
    <Widget src={"jay100.near/widget/CH-Widget"} />
    <Widget src={"jay100.near/widget/CTT-Widget"} />
  </Container>
);
