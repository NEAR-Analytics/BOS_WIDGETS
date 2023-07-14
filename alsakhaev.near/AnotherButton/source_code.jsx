const Button = styled.button`
  background: palevioletred;
  color: white;

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
`;

return (
  <Button onClick={() => console.log(props.label)}>
    {props.label ?? "Another Button"}
  </Button>
);
