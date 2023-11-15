const Wrapper = styled.div`
  button span {
    color: aqua;
    background: black;
    font-family: sans-serif;
  }
`;

return (
  <Wrapper>
    <Widget src="near/widget/DIG.Button" props={{ label: "Click Me" }} />
  </Wrapper>
);
