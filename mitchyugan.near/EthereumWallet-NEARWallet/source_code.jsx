const userId = context.accountId;

const network1 = Storage.get("network1");
console.log(network1);

const connectedAccountId = [
  {
    networkname: "Ethereum",
    chainId: "ethereum0001",
    accountID: 0x8efd7b62aff059615fb26b2cdb474c888c799d84,
    status: "Connected",
  },
  {
    networkname: "Polygon",
    chainId: "polygon0001",
    accountID: 0x8efd7b62aff059615fb26b2cdb474c888c799d84,
    status: "Disconnected",
  },
];

return (
  <div>
    <h3>Hello {userId}</h3>
    <div>
      <p>Here are all the accounts you've Interracted with:</p>
      <div>
        <h4>Account 1</h4>
        <h6>
          <strong>Network Name:</strong> {Storage.get("networkName")}
        </h6>
        <h6>
          <strong>Chain ID:</strong> ethereum0001
        </h6>
        <h6>
          <strong>Account ID: </strong>{" "}
          0x8Efd7b62Aff059615FB26b2CDb474C888C799D84
        </h6>
        <h6>
          <strong>Status:</strong> Connected
        </h6>
      </div>
      <hr />
      <div>
        <h4>Account 2</h4>
        <h6>
          <strong>Network Name:</strong> Polygon
        </h6>
        <h6>
          <strong>Chain ID:</strong> polygon0001
        </h6>
        <h6>
          <strong>Account ID: </strong> 0x8Efd7b62Aff059615FB26b2CDb474C888C799D84
        </h6>
        <h6>
          <strong>Status:</strong> Disconnected
        </h6>
      </div>;

      <p>{lastBlockHeight}</p>
    </div>
  </div>
);

<Web3Connect />;
