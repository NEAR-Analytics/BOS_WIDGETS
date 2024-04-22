const Container = styled.div`
  background-color: #2eabc4;
  color: #000;
  padding: 20px;
}

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

return (
  <Container>
    <Widget
      src="jay100.near/widget/CTTDescription"
      props={{
        title: "Marma J Gaming",
        description: `Explore the crypto-based gaming world of Marma J Gaming where you can
      collaborate artistically with friends, gather your pets for a battle,
      outfit your hero to explore dungeons and take part in raids, and gather an
      army to position yourself as the master tactician.`,
      }}
    />
    <Widget src={"jay100.near/widget/PixelParty-Widget"} />
    <Widget src={"jay100.near/widget/PixelPets-Widget"} />
    <Widget src={"jay100.near/widget/CH-Widget"} />
    <Widget src={"deanealexander1.near/widget/ForgeCHWidget"} />
    <Widget src={"jay100.near/widget/CTT-Widget"} />
    <Widget />
  </Container>
);
