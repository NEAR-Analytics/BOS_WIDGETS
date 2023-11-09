const Container = styled.div`
  width: 100%;
  height: 96%;
  background-color: #e5e5f7;
  background-image: radial-gradient(#444cf7 10%, transparent 10%),
                    radial-gradient(#444cf7 10%, transparent 10%);
  background-size: 100px 100px;
  background-position: 0 0, 50px 50px;
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
