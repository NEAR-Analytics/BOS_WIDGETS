const Wrapper = styled.div`
  button span {
    color: white;
    background: black;
    font-family: sans-serif;
  }
`;

return (
  <Wrapper>
    <Widget src="near/widget/DIG.Button" props={{ label: "Click Me" }} />
  </Wrapper>
);
