const sender = Ethers.send("eth_requestAccounts", [])[0];

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
