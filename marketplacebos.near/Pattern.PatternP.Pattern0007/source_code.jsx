const Container = styled.div`
  width: 100%;
  height: 100%;
  --color: #a748f5;
  background: linear-gradient(95deg, var(--color) 25%, transparent 25%) -50px 0,
        linear-gradient(-15deg, var(--color) 25%, transparent 25%) -50px 0,
        linear-gradient(25deg, transparent 75%, var(--color) 75%) -50px 0,
        linear-gradient(-45deg, transparent 75%, var(--color) 75%) -50px 0,
        linear-gradient(-15deg, transparent 75%, var(--color) 75%) -50px 0;
  background-color: #b669fd;
  background-size: 40px 40px;
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
