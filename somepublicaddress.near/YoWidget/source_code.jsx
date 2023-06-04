const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  font-size: 1em;
  margin: 0 10px;
  padding: 10px 20px;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: #ddd;
  }
`;

const getYo = () => {
  State.update({ yo: 'Yo' });
};

return <Wrapper>
  <Title>{state.yo}</Title>
  <Button onClick={getYo}>Yo</Button>
</Wrapper>;