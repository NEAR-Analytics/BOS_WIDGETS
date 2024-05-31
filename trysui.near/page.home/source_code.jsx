const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  min-height: 80vh;
`;
const Button = styled.button`
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  background-color: #000;
  color: #a5a5a5;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #1c1a1a;
  }
`;
const StlyedInput = styled.input`
  color: black;
  padding: 4px;
`;
const Dropdown = styled.select`
  background-color: #1c1c1c;
  width: 300px;
  height: 47px;
  padding: 10px 20px 10px 20px;
  border: 1px solid #444;
`;
const OptionComponent = styled.div`
  padding: 20px;
  border-radius: 4px;
  width: 80%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Separator = styled.div`
  height: 10px;
  width: 100%;
`;
const MonospaceText = styled.span`
  font-family: monospace;
`;
return (
  <Container>
    <h3>welcome</h3>
    <br />
    <p>
      check out the{" "}
      <Link to={`/trysui.near/widget/Index?page=library`}>library</Link> of Sui
      components to build with,
    </p>
    <p>
      then go to the{" "}
      <Link to={`/trysui.near/widget/Index?page=sandbox`}>sandbox</Link> to try
      it out
    </p>
  </Container>
);
