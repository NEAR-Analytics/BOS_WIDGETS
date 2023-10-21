let greeting = "Hello develpers";

const Button = styled.button`
  background-color: rgb(118, 207, 118);
  border-color: rgb(118, 207, 118);
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
`;

return (
  <>
    <div class="container border border-info p-1 text-center">
      <h1>Hello</h1>
      <p> {greeting} </p>
      <Button>Normal</Button>
      <Button primary>Primary</Button>
    </div>
  </>
);
