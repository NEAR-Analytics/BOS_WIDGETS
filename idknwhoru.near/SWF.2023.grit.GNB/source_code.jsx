const GNBWrapper = styled.div`
  width: 100vw;
  background-color: #fff;
  display: flex;
`;

return (
  <GNBWrapper>
    <h1>KGRIT</h1>
    <ul>
      <h2>선수투자</h2>
      <h2>AI NFT</h2>
    </ul>
    <Web3Connect connectLabel="Connect To Wallet" />
  </GNBWrapper>
);
