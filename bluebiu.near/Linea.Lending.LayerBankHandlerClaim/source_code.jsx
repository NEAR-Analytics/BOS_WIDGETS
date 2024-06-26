const UNITROLLER_ABI = [
  {
    inputs: [],
    name: "claimLab",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const { loading, dapp, onSuccess, onError } = props;

if (!loading || !dapp.unitrollerAddress) return "";

const CollateralContract = new ethers.Contract(
  dapp.unitrollerAddress,
  UNITROLLER_ABI,
  Ethers.provider().getSigner()
);
CollateralContract.claimLab()
  .then((tx) => {
    tx.wait().then((res) => {
      onSuccess(res);
    });
  })
  .catch((err) => {
    onError(err);
  });

return "";
