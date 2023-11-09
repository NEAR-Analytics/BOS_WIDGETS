const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #313131;
  background-image: radial-gradient(rgba(255, 255, 255, 0.171) 2px, transparent 0);
  background-size: 30px 30px;
  background-position: -5px -5px;
  display: flex;
  justify-content: center;
  align-items: center;

`;
const Text = styled.p`
  color: white;

`;
const text = props.text || "Add props text to test";
return (
  <Container>
    {" "}
    <Text>{text}</Text>
  </Container>
);
