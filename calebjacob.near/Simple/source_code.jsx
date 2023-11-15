const Wrapper = styled.div`
  button span {
    color: red;
    background: black;
  }
`;
return (
  <Wrapper>
    <Widget src="near/widget/DIG.Button" props={{ label: "Click Me!" }} />
  </Wrapper>
);
