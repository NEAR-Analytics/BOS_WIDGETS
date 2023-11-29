const userId = context.accountId;

const network1 = Storage.get("network1");
console.log(network1);
const loggedIn = true;

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

const Main = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@700&display=swap');
  width:90%;
  margin: auto;
  h1{
    font-family: 'Space Grotesk', sans-serif;
    text-align: center;
    font-size: 64px;
font-weight: 700;
line-height: 120%;
margin-bottom: 16px;
max-width: 880px;
margin:  auto;
  }
  p{
    text-align: center;
  }
`;

const ConnectWallet = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
padding: 22px 46px 21px 45px;
border-radius: 8px;
border: 1px solid rgba(0, 0, 0, 0.07);
width: 100%;
`;
const Wallets = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 594px;
background: #FAFAFA;
margin: auto;
border-radius: 12px;
gap: 32px;
`;

const main = (
  <Main>
    <h1>Connect multiple ethereum wallets to a NEAR wallet</h1>
    <p>Connect an ethereum wallet now</p>
    <Wallets>
      <ConnectWallet>
        <Web3Connect />
      </ConnectWallet>
    </Wallets>
  </Main>
);
return <div>{main}</div>;
<div>
  <p>Here are all the accounts you've interacted with:</p>
  <div>
    <h4>Account 1</h4>
    <h6>
      <strong>Network Name:</strong> {Storage.get("networkName")}
    </h6>
    <h6>
      <strong>Chain ID:</strong> ethereum0001
    </h6>
    <h6>
      <strong>Account ID: </strong> 0x8Efd7b62Aff059615FB26b2CDb474C888C799D84
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
  </div>
  <p>{lastBlockHeight}</p>

  <Wallet>
    <p>Metamask </p>
    <img src="https://i.ibb.co/N2jtj0m/Meta-Mask-Fox-1.png" />
  </Wallet>
  <Wallet>
    <p>Coinbase Wallet </p>
    <img src="https://i.ibb.co/wQw8FNP/coinbase-logo-1.png" />
  </Wallet>
  <Wallet>
    <p>Other wallets </p>
    <img src="https://i.ibb.co/313ZsHz/Group-1-1.png" />
  </Wallet>
</div>;
