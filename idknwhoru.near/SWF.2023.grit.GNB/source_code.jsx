const GNBWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  display: flex;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  ul {
    display: flex;
  }
`;

return (
  <GNBWrapper>
    <h1>KGRIT</h1>
    <ButtonWrapper>
      <ul>
        <h2>선수투자</h2>
        <h2>AI NFT</h2>
      </ul>
      <Web3Connect connectLabel="Connect To Wallet" />
    </ButtonWrapper>
  </GNBWrapper>
);
