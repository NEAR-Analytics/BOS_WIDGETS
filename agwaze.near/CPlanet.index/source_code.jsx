const Root = styled.div`
  display: flex;
  width: 100%;
  height: 500px;
`;

return (
  <>
    <Widget src="agwaze.near/widget/CPlanet.Navbar.index" />
    <Root>
    <Widget src="agwaze.near/widget/CPlanet.Explore.index" />
    </Root>
    <Widget src="agwaze.near/widget/CPlanet.Footer" />
  </>
);
