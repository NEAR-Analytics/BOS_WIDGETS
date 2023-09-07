const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 4.5em;
  gap: 0.625em;
  background: #000;

  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 2.5em;
    line-height: 1.25em;
    color: #fff;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 1.25em;
    line-height: 140%;
    color: #00ec97;
  }
`;

return (
  <Container>
    <image src="https://pbs.twimg.com/profile_banners/1688015970911367169/1691627385/1500x500"></image>

    <h1>OpenCann Marketplace</h1>
    <p>Find, fund, and do cannabis research.</p>
  </Container>
);
