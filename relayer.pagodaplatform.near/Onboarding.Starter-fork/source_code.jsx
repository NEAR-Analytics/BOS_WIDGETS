const nftAddress = "0x3e0f64d801823706f29686eeca0aac521e77674e";
const NFTManagerABI = fetch(
  "https://raw.githubusercontent.com/test1883/files/main/NFTManager.json"
);
if (!NFTManagerABI.ok) {
  return "Loading..";
}
const walleyAddress = "0x2ebb88cd2a775308636afad718800bbb82f19137";
const WalleyABI = fetch(
  "https://raw.githubusercontent.com/test1883/files/main/Walley.json"
);

if (!WalleyABI.ok) {
  return "Loading..";
}

State.init({
  chainId: undefined,
  balance: 0,
  transfers: [],
});
const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;
if (state.chainId === undefined && ethers !== undefined && sender) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
  Ethers.provider()
    .getBalance(sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
  console.log(sender);
}
if (state.chainId !== undefined && state.chainId !== 11155111) {
  return <p>Switch to Ethereum Sepolia</p>;
}
console.log(NFTManagerABI);
const nftIface = new ethers.utils.Interface(JSON.parse(NFTManagerABI.body).abi);
console.log("hehe");
const nftContract = new ethers.Contract(
  nftAddress,
  JSON.parse(NFTManagerABI.body).abi,
  Ethers.provider().getSigner()
);
const walleyIface = new ethers.utils.Interface(JSON.parse(WalleyABI.body).abi);
const walleyContract = new ethers.Contract(
  walleyAddress,
  JSON.parse(WalleyABI.body).abi,
  Ethers.provider().getSigner()
);

const mint = () => {
  walleyContract
    .mint()
    .send({ from: sender })
    .then((tokenId) => console.log(tokenId))
    .catch((err) => console.log(err));
};

const initTransfer = () => {
  walleyContract.methods
    .mint()
    .send({ from: sender })
    .on("receipt", function (receipt) {
      console.log("minted");
      // List the NFT
      const tokenId = receipt.events.NFTMinted.returnValues[0];
      nftContract.methods
        .initTransaction(
          walleyAddress,
          tokenId,
          ethers.utils.toWei("0.1", "ether"),
          "0xF0DB85E02DBC2d2c9b86dFC245cd9C2CAF9a901B",
          "Test"
        )
        .send({ from: accounts[0], value: "0.1 ether" })
        .on("receipt", function () {
          console.log("listed");
        });
    });
};

const createTransfer = () => {
  if (contract) {
    console.log("hhh");
    contract
      .createTransfer(1000, "0xF0DB85E02DBC2d2c9b86dFC245cd9C2CAF9a901B")
      .then(() => {
        console.log("hello");
      })
      .catch((err) => console.log(err));
  }
};
const getTransfers = () => {
  if (state.transfers.length === 0) {
    console.log("hhh");
    contract
      .getTransfers()
      .then((transfers) => {
        const tmp = [...state.transfers];
        transfers.map((transfer) => {
          console.log(transfer);

          tmp.push({
            id: Big(transfer[0]).toFixed(0),
            amount: Big(transfer[1]).div(Big(10).pow(18)).toFixed(20),
            to: transfer[2],
            sent: transfer[3],
            approver: transfer[4],
          });
        });
        State.update({ transfers: tmp });
        console.log(transfers);
      })
      .then(() => {
        console.log(state.transfers);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
const approveTransfer = (id) => {
  console.log(id);
  contract.approveTransfer(id).send({ from: sender });
};
return (
  <>
    <p>{state.chainId}</p>
    <p>{state.balance}</p>
    <button onClick={mint}>Mint</button>
    <button onClick={initTransaction}>init</button>
  </>
);
