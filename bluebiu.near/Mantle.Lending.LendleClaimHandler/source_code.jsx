const CLAIM_ABI = [
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "claim",
    inputs: [
      { type: "address", name: "_user", internalType: "address" },
      { type: "address[]", name: "_tokens", internalType: "address[]" },
    ],
  },
];
const account = Ethers.send("eth_requestAccounts", [])[0];
const { loading, market, dapp, onSuccess, onError } = props;

if (!loading || !dapp.incentiveController) return "";

const CollateralContract = new ethers.Contract(
  dapp.incentiveController,
  CLAIM_ABI,
  Ethers.provider().getSigner()
);
CollateralContract.claim(account, market.allPools)
  .then((tx) => {
    tx.wait().then((res) => {
      onSuccess(res);
    });
  })
  .catch((err) => {
    onError(err);
  });

return "";
