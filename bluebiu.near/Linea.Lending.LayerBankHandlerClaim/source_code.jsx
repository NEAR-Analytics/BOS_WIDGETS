const UNITROLLER_ABI = [
  {
    inputs: [],
    name: "claimLab",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const { loading, market, dapp, onSuccess, onError } = props;

if (!loading) return "";

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
  .catch(() => {
    onError();
  });

return "";
