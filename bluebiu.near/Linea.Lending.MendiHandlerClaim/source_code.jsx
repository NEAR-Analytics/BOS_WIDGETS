const UNITROLLER_ABI = [
  {
    inputs: [{ internalType: "address", name: "holder", type: "address" }],
    name: "claimComp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const account = Ethers.send("eth_requestAccounts", [])[0];
const { loading, market, dapp, onSuccess, onError } = props;

if (!loading || !dapp.unitrollerAddress) return "";

const CollateralContract = new ethers.Contract(
  dapp.unitrollerAddress,
  UNITROLLER_ABI,
  Ethers.provider().getSigner()
);
CollateralContract.claimComp(account)
  .then((tx) => {
    tx.wait().then((res) => {
      onSuccess(res);
    });
  })
  .catch((err) => {
    onError(err);
  });

return "";
