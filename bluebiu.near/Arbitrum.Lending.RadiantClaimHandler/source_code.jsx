const CLAIM_ABI = [
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "claimAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const account = Ethers.send("eth_requestAccounts", [])[0];
const { loading, market, dapp, onSuccess, onError } = props;

if (!loading) return "";

const CollateralContract = new ethers.Contract(
  dapp.incentiveController,
  CLAIM_ABI,
  Ethers.provider().getSigner()
);
CollateralContract.claimAll(account)
  .then((tx) => {
    tx.wait().then((res) => {
      onSuccess(res);
    });
  })
  .catch(() => {
    onError();
  });

return "";
