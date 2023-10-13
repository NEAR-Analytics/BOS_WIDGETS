const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;
const Contents = styled.div`

`
return (
  <Root>
    <Widget src="agwaze.near/widget/CPlanet.Navbar.index" />
    <Contents>
    <Widget src="agwaze.near/widget/CPlanet.Explore.index" />
    </Contents>
    <Widget src="agwaze.near/widget/CPlanet.Footer" />
  </Root>
);
