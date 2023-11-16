const Wrapper = styled.div`
  button span {
    color: pink;
    background: black;
    font-family: sans-serif;
    border-radius: 10px;
    border: 1px solid orange;
  }
`;

console.log("Hello!");

return (
  <Wrapper>
    <Widget src="near/widget/DIG.Button" props={{ label: "Click Me" }} />
  </Wrapper>
);
