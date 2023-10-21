let greeting = "Hello develpers";

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
`;

return (
  <>
    <div class="container border border-info p-1 text-center">
      <h1>Hello</h1>
      <p> {greeting} </p>
      <Button className="btn mb-2 mt-2 px-8 py-1">Sell</Button>
    </div>
  </>
);
