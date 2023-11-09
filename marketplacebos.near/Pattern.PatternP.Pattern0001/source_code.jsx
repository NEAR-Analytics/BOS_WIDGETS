const Container = styled.div`
  width: 100%;
  height: 96%;
  background-image: linear-gradient(#ffffff 1.1rem, #ccc 1.2rem);
  background-size: 100% 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;

`;
const Text = styled.p`
  color: black;

`;
const text = props.text || "Add props text to test";
return (
  <Container>
    {" "}
    <Text>{text}</Text>
  </Container>
);
