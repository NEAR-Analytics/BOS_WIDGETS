const sender = Ethers.send("eth_requestAccounts", [])[0];

const ContainerLogin = styled.div`
  .web3-connect{
    width:480px;
    height:60px;
    border-radius:10px;
    background-color:#f22;
    color:#0F1126;
    font-size:18px;
    font-weight:500;
    border:none;
    margin-top:20px;
  }
  .address{
    border-radius:10px;
    background-color:#f55f12;
    color:#f1f1f1;
    font-size:14px;
    font-weight:500;
    border:none;
    padding: 8px 40px;
  }
`;

if (!sender)
  return (
    <ContainerLogin
      style={{
        display: "flex",
        maxWidth: "500px",
        flexDirection: "column",
        margin: "80px auto auto auto",
      }}
    >
      <Web3Connect className="web3-connect" connectLabel="Connect ETH wallet" />
    </ContainerLogin>
  );

return (
  <div>
    <ContainerLogin
      style={{
        display: "flex",
        maxWidth: "500px",
        flexDirection: "column",
        margin: "80px auto auto auto",
      }}
    >
      <Web3Connect className="web3-connect" connectLabel="Connect ETH wallet" />
      <div
        style={{
          display: "flex",
          maxWidth: "500px",
          flexDirection: "column",
          margin: "20px auto auto auto",
        }}
      >
        <h5 className="address">{sender}</h5>
      </div>
    </ContainerLogin>
  </div>
);
