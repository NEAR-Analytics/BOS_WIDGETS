const HeaderBox = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%;

    .connect-wallet {
        background:rgba(0,0,0,1);
        border-radius:10px;
        font-size:.8rem;
        font-weight:bold;
        color:#fff;
        box-shadow: 0 0 0 4px rgba(0,0,0,.1);
        height:40px;
    }
`;

const Heading = styled.p`
  margin: 0;
  padding:0;
  font-size: 1.5em;
  color:#0f1d40;
  text-align: center;
  font-family: "SF Pro Display",sans-serif;
`;

return (
  <HeaderBox>
    <Heading
      style={{
        "text-align": "left",
      }}
      className="fw-bold"
    >
      GeoQuête
    </Heading>
    <Web3Connect
      className="connect-wallet"
      connectLabel="Connect wallet"
      disconnectLabel="Disconnect"
    />
  </HeaderBox>
);
