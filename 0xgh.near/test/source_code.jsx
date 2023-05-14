const Component1Wrapper = styled.div`
  background-color: lightblue;
  padding: 1rem;
`;

return (
  <Component1Wrapper>
    <p>Component-1 : text.jsx</p>
    <Widget src={`0xgh.near/widget/near-2`} props={{ name: "Dylan Jeon" }} />
  </Component1Wrapper>
);
