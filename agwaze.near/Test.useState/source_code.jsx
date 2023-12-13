const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  transition: background-color 0.5s ease;
  background-color: ${(props) => (props.toggle ? "#87CEFA" : "#f0f0f0")};
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  color: ${(props) => (props.toggle ? "white" : "#333")};
`;

const Status = styled.h3`
  margin-bottom: 10px;
  color: ${(props) => (props.toggle ? "white" : "#333")};
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  margin: 5px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #45a049;
  }
`;

State.init({
  toggle: false,
});

const handleToggle = () => {
  State.update({ toggle: !state.toggle });
};

return (
  <Container toggle={state.toggle}>
    <Title toggle={state.toggle}>Switch Background</Title>
    <Status toggle={state.toggle}></Status>
    <Button onClick={handleToggle}>Toggle</Button>
  </Container>
);
