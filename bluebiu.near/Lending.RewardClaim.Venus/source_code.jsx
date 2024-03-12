const CLAIM_ABI = [
  {
    constant: false,
    inputs: [{ internalType: "address", name: "holder", type: "address" }],
    name: "claimVenus",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
const account = Ethers.send("eth_requestAccounts", [])[0];
const { loading, market, dapp, record, onSuccess, onError } = props;

if (!loading || !dapp.unitrollerAddress) return "";

const CollateralContract = new ethers.Contract(
  dapp.unitrollerAddress,
  CLAIM_ABI,
  Ethers.provider().getSigner()
);

CollateralContract.estimateGas
  .claimVenus(account)
  .then((gas) => {
    CollateralContract.claimVenus(account, { gasLimit: gas })
      .then((tx) => {
        tx.wait().then((res) => {
          onSuccess(res);
        });
      })
      .catch((err) => {
        onError(err);
      });
  })
  .catch((err) => {
    onError(err);
  });

return "";
