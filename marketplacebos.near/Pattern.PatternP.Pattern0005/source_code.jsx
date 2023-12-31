const Container = styled.div`
  width: 100%;
  height: 96%;
  --color1: rgb(0, 3, 49);
  --color2: rgb(248, 255, 182);
  background-image: linear-gradient(45deg, var(--color2) 25%, transparent 25%, transparent 75%, var(--color2) 75%, var(--color2)), 
                    linear-gradient(135deg, var(--color2) 25%, var(--color1) 25%, var(--color1) 75%, var(--color2) 75%, var(--color2));
  background-size: 90px 90px;
  background-position: 0 0, 135px 135px;
  display: flex;
  justify-content: center;
  align-items: center;

`;
const Text = styled.p`
  color: red;

`;
const text = props.text || "Add props text to test";
return (
  <Container>
    {" "}
    <Text>{text}</Text>
  </Container>
);
