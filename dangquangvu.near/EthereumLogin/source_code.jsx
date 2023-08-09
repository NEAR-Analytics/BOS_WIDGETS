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
`;

return (
  <div>
    <div>
      {sender ? (
        <div>
          <h5>{sender}</h5>
          <Web3Connect className="btn mt-3" connectLabel="Disconnect Wallet" />
        </div>
      ) : (
        <div>
          <Web3Connect
            className="btn mt-3"
            connectLabel="Connect with Wallet"
          />
        </div>
      )}
    </div>
  </div>
);
